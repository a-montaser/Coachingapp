// Builds the Project Map page's data from graphify's graph (graphify-out/graph.json).
//   node docs/project-map/build-data.mjs [--previous <old graph.json>] [--note "what changed"]
// Writes map-data.json (a slim copy of the graph for the page) and appends one entry to
// history.json comparing it with the previous map-data.json (or --previous, a graphify graph.json).
// No dependencies: plain Node.
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const read = (p) => JSON.parse(readFileSync(p, 'utf8'));

const graph = read(join(root, 'graphify-out', 'graph.json'));
const labels = existsSync(join(root, 'graphify-out', '.graphify_labels.json'))
  ? read(join(root, 'graphify-out', '.graphify_labels.json'))
  : {};

const nodes = graph.nodes.map((n) => ({
  id: n.id,
  l: n.label ?? n.id,
  c: n.community ?? -1,
  t: n.file_type ?? 'code',
  f: n.source_file ?? null,
  s: n.source_location ?? null,
  ...(n.rationale ? { r: n.rationale } : {}),
}));
const ids = new Set(nodes.map((n) => n.id));
const links = (graph.links ?? graph.edges ?? [])
  .filter((e) => ids.has(e.source) && ids.has(e.target) && e.source !== e.target)
  .map((e) => ({ s: e.source, t: e.target, r: e.relation, k: (e.confidence ?? 'EXTRACTED')[0] }));

const communities = {};
for (const n of nodes) {
  const c = (communities[n.c] ??= {
    id: n.c,
    name: labels[n.c] ?? graph.nodes.find((x) => x.community === n.c)?.community_name ?? `Group ${n.c}`,
    size: 0,
  });
  c.size += 1;
}
const commit = (() => {
  try {
    return execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim();
  } catch {
    return null;
  }
})();

const data = {
  builtAt: new Date().toISOString(),
  commit,
  communities: Object.values(communities).sort((a, b) => b.size - a.size),
  hyperedges: (graph.hyperedges ?? []).map((h) => ({
    label: h.label,
    nodes: h.nodes.filter((id) => ids.has(id)),
  })),
  nodes,
  links,
};

// Previous version: an explicit graphify graph.json, else the last map-data.json.
const prevPath = arg('--previous');
const dataPath = join(here, 'map-data.json');
const prev = prevPath
  ? (() => {
      const g = read(prevPath);
      return {
        nodes: g.nodes.map((n) => ({ id: n.id, l: n.label ?? n.id, c: n.community, f: n.source_file })),
        links: g.links ?? g.edges ?? [],
      };
    })()
  : existsSync(dataPath)
    ? read(dataPath)
    : null;

const historyPath = join(here, 'history.json');
const history = existsSync(historyPath) ? read(historyPath) : [];
const brief = (n) => ({ id: n.id, l: n.l, c: n.c, f: n.f });
const entry = {
  at: data.builtAt,
  commit,
  note: arg('--note') ?? null,
  nodes: nodes.length,
  links: links.length,
  communities: data.communities.length,
};
if (prev) {
  const before = new Set(prev.nodes.map((n) => n.id));
  const added = nodes.filter((n) => !before.has(n.id));
  const removed = prev.nodes.filter((n) => !ids.has(n.id));
  entry.added = added.map(brief);
  entry.removed = removed.map(brief);
  entry.linkDelta = links.length - prev.links.length;
  entry.files = [...new Set([...added, ...removed].map((n) => n.f).filter(Boolean))].sort();
}
history.unshift(entry);

writeFileSync(dataPath, JSON.stringify(data));
writeFileSync(historyPath, JSON.stringify(history.slice(0, 50), null, 1));
console.log(
  `map-data.json: ${nodes.length} nodes, ${links.length} links, ${data.communities.length} groups` +
    (prev ? ` · +${entry.added.length} / −${entry.removed.length} nodes since the previous map` : ''),
);
