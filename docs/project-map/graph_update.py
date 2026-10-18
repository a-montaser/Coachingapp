# graphify --update, the deterministic halves, as run after each task in this project.
#   python graph_update.py prepare   -> detect changes, check doc cache, AST-parse changed code;
#                                        prints the docs that need the extraction agent
#   python graph_update.py finish    -> merge chunk + AST, keep old doc nodes whose file still exists,
#                                        cluster, name groups, write graph.json / report / html
import json, sys, subprocess
from pathlib import Path
from datetime import datetime, timezone

OUT = Path('graphify-out')
SPEC = '/Users/Abdelrahman Montaser/.claude/skills/graphify/references/extraction-spec.md'


def prepare():
    from graphify.detect import detect_incremental
    from graphify.paths import out_path
    from graphify.watch import _read_build_excludes, _read_build_gitignore
    from graphify.cache import check_semantic_cache
    from graphify.extract import collect_files, extract
    (OUT / '.graphify_old.json').write_text((OUT / 'graph.json').read_text())
    r = detect_incremental(Path('.'), extra_excludes=_read_build_excludes(out_path()), gitignore=_read_build_gitignore(out_path()))
    nf = r.get('new_files', {})
    (OUT / '.graphify_incremental.json').write_text(json.dumps(r, ensure_ascii=False))
    (OUT / '.graphify_detect.json').write_text(json.dumps({'files': nf, 'all_files': r.get('files', {}), 'total_files': r.get('new_total', 0), 'total_words': r.get('total_words', 0), 'skipped_sensitive': r.get('skipped_sensitive', []), 'needs_graph': True}, ensure_ascii=False))
    docs = [f for c in ('document', 'paper', 'image') for f in nf.get(c, [])]
    cn, ce, ch, unc = check_semantic_cache(docs, root='.', prompt_file=SPEC)
    (OUT / '.graphify_cached.json').write_text(json.dumps({'nodes': cn, 'edges': ce, 'hyperedges': ch}, ensure_ascii=False))
    (OUT / '.graphify_uncached.txt').write_text('\n'.join(unc))
    for s in OUT.glob('.graphify_chunk_*.json'):
        s.unlink()
    code = []
    for f in nf.get('code', []):
        code.extend(collect_files(Path(f)) if Path(f).is_dir() else [Path(f)])
    ast = extract(code, cache_root=Path('.'), root=Path('.')) if code else {'nodes': [], 'edges': []}
    (OUT / '.graphify_ast.json').write_text(json.dumps(ast, ensure_ascii=False))
    print('changed code:', [Path(f).name for f in nf.get('code', [])])
    print('deleted:', [Path(f).name for f in r.get('deleted_files', [])])
    print('AST:', len(ast['nodes']), 'nodes', len(ast['edges']), 'edges')
    print('DOCS FOR AGENT:')
    print('\n'.join(unc))


def finish(tokens_in, tokens_out):
    from graphify.cache import save_semantic_cache
    from graphify.build import build_merge, build_from_json
    from graphify.detect import save_manifest
    from graphify.cli import _stamped_manifest_files
    from graphify.cluster import cluster, score_all
    from graphify.analyze import god_nodes, surprising_connections, suggest_questions
    from graphify.report import generate
    from graphify.export import to_json
    from graphify.diagnostics import diagnose_extraction

    unc = [l for l in (OUT / '.graphify_uncached.txt').read_text().splitlines() if l]
    chunk = {'nodes': [], 'edges': [], 'hyperedges': []}
    cp = OUT / '.graphify_chunk_01.json'
    if cp.exists():
        chunk = json.loads(cp.read_text())
        print('cached', save_semantic_cache(chunk['nodes'], chunk['edges'], chunk.get('hyperedges', []), root='.', allowed_source_files=unc, prompt_file=SPEC))
    cached = json.loads((OUT / '.graphify_cached.json').read_text())
    sem_nodes, seen = [], set()
    for n in cached['nodes'] + chunk['nodes']:
        if n['id'] not in seen:
            seen.add(n['id']); n.setdefault('_origin', 'semantic'); sem_nodes.append(n)
    sem_edges = cached['edges'] + chunk['edges']
    for e in sem_edges:
        e.setdefault('_origin', 'semantic')
    ast = json.loads((OUT / '.graphify_ast.json').read_text())
    ids = {n['id'] for n in ast['nodes']}
    nodes = list(ast['nodes']) + [n for n in sem_nodes if n['id'] not in ids]
    newx = {'nodes': nodes, 'edges': ast['edges'] + sem_edges, 'hyperedges': cached.get('hyperedges', []) + chunk.get('hyperedges', []), 'input_tokens': tokens_in, 'output_tokens': tokens_out}
    inc = json.loads((OUT / '.graphify_incremental.json').read_text())
    G = build_merge([newx], graph_path=str(OUT / 'graph.json'), prune_sources=list(inc.get('deleted_files', [])) or None, root='.', directed=False)
    ex = {'nodes': [{'id': n, **d} for n, d in G.nodes(data=True)],
          'edges': [{**{k: v for k, v in d.items() if k not in ('_src', '_tgt', 'source', 'target')}, 'source': d.get('_src', u), 'target': d.get('_tgt', v)} for u, v, d in G.edges(data=True)],
          'hyperedges': list(G.graph.get('hyperedges', [])), 'input_tokens': tokens_in, 'output_tokens': tokens_out}
    old = json.loads((OUT / '.graphify_old.json').read_text())
    have = {n['id'] for n in ex['nodes']}
    keep = {n['id']: n for n in old['nodes'] if n['id'] not in have and n.get('file_type') != 'code' and n.get('source_file') and Path(n['source_file']).exists()}
    ex['nodes'] += list(keep.values())
    allids = have | set(keep)
    ex['edges'] += [dict(e, _origin='semantic') for e in old['links'] if (e['source'] in keep or e['target'] in keep) and e['source'] in allids and e['target'] in allids]
    print('carried over', len(keep))
    mf = _stamped_manifest_files(inc['files'], newx, Path('.'))
    save_manifest(mf, root='.', scan_corpus={f for fl in inc['files'].values() for f in fl})

    det = json.loads((OUT / '.graphify_detect.json').read_text())
    G = build_from_json(ex, root='.', directed=False)
    com = cluster(G)
    coh = score_all(G, com)
    # Name each group after the old group most of its members came from; a repeated name gets the
    # group's most common file added, so every name stays unique.
    oldc = {n['id']: n.get('community_name') for n in old['nodes']}
    labels, used = {}, set()
    for k, v in sorted(com.items(), key=lambda kv: -len(kv[1])):
        names = [oldc.get(n) for n in v if oldc.get(n)]
        name = max(set(names), key=names.count) if names else None
        files = [Path(G.nodes[n].get('source_file') or '').stem for n in v if G.nodes[n].get('source_file')]
        top = max(set(files), key=files.count) if files else f'group {k}'
        if not name:
            name = top.replace('_', ' ').replace('-', ' ').title()
        if name in used:
            name = f'{name} ({top})'
        i = 2
        while name in used:
            name = f'{name} {i}'; i += 1
        used.add(name); labels[k] = name
    gods = god_nodes(G); sur = surprising_connections(G, com); q = suggest_questions(G, com, labels)
    if not to_json(G, com, str(OUT / 'graph.json'), community_labels=labels):
        raise SystemExit('REFUSED: shrink guard')
    (OUT / 'GRAPH_REPORT.md').write_text(generate(G, com, coh, labels, gods, sur, det, {'input': tokens_in, 'output': tokens_out}, '.', suggested_questions=q))
    (OUT / '.graphify_labels.json').write_text(json.dumps({str(k): v for k, v in labels.items()}, ensure_ascii=False))
    c = json.loads((OUT / 'cost.json').read_text())
    c['runs'].append({'date': datetime.now(timezone.utc).isoformat(), 'input_tokens': tokens_in, 'output_tokens': tokens_out, 'files': det.get('total_files', 0)})
    c['total_input_tokens'] += tokens_in; c['total_output_tokens'] += tokens_out
    (OUT / 'cost.json').write_text(json.dumps(c, indent=2))
    s = diagnose_extraction(ex, directed=False, root='.')
    print(f'Graph: {G.number_of_nodes()} nodes, {G.number_of_edges()} edges, {len(com)} groups; health:',
          {k: s[k] for k in ('dangling_endpoint_edges', 'missing_endpoint_edges', 'self_loop_edges') if s.get(k)} or 'OK')
    subprocess.run(['graphify', 'export', 'html'], check=True, capture_output=True)
    for f in ('.graphify_detect.json', '.graphify_ast.json', '.graphify_old.json', '.graphify_incremental.json', '.graphify_cached.json', '.graphify_uncached.txt', '.graphify_chunk_01.json'):
        (OUT / f).unlink(missing_ok=True)


if __name__ == '__main__':
    if sys.argv[1] == 'prepare':
        prepare()
    else:
        finish(int(sys.argv[2]) if len(sys.argv) > 2 else 0, int(sys.argv[3]) if len(sys.argv) > 3 else 0)
