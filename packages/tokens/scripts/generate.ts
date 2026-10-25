// Reads docs/DESIGN_HANDOFF.md §3 tables and writes src/generated.ts.
// Usage: node scripts/generate.ts [--check]
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const handoffPath = join(root, '../../docs/DESIGN_HANDOFF.md');
const outPath = join(root, 'src/generated.ts');

// Name the bundled Playfair Display 600 font is registered under (see apps/mobile font loading).
export const PLAYFAIR = 'PlayfairDisplay-SemiBold';

type Rows = string[][];

function section(md: string, heading: string): string {
  const start = md.indexOf(`\n${heading}`);
  if (start < 0) throw new Error(`Handoff is missing "${heading}"`);
  const rest = md.slice(start + heading.length + 1);
  const end = rest.search(/\n#{2,3} /);
  return end < 0 ? rest : rest.slice(0, end);
}

function tableRows(text: string): Rows {
  return text
    .split('\n')
    .filter((l) => l.startsWith('|'))
    .slice(2) // header + separator
    .map((l) =>
      l
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim()),
    );
}

const unquote = (s: string) => s.replace(/`/g, '').trim();
const camel = (s: string) => s.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
const leadingNumber = (s: string) => {
  const m = /^-?\d+(\.\d+)?/.exec(s.trim());
  if (!m) throw new Error(`Expected a number in "${s}"`);
  return Number(m[0]);
};

// "0 6 22 rgba(...)" → "0px 6px 22px rgba(...)"
const cssShadow = (s: string) => s.trim().replace(/^(-?[\d.]+) (-?[\d.]+) (-?[\d.]+) /, '$1px $2px $3px ');

function glassShadow(value: string): string {
  const [outer, ...inner] = value.split(' + ');
  const parts = [cssShadow(unquote(outer!))];
  for (const p of inner) {
    const m = /inner (top|bottom) ([\d.]+) pt `([^`]+)`/.exec(p);
    if (!m) throw new Error(`Unparsed glass shadow part "${p}"`);
    // The handoff gives no blur for the inner lines; the design system uses 1 px (DS tokens.css --shadow-glass).
    parts.push(`inset 0px ${m[1] === 'top' ? '' : '-'}${m[2]}px 1px ${m[3]}`);
  }
  return parts.join(', ');
}

// Commas inside rgba() must not split; a new shadow starts with a digit after ", ".
const splitShadows = (s: string) =>
  s
    .split(/, (?=-?\d)/)
    .map(cssShadow)
    .join(', ');

export function build(md: string) {
  const colour = tableRows(section(md, '### 3.1 Colour'));
  const light: Record<string, string> = {};
  const dark: Record<string, string> = {};
  for (const [token, l, d] of colour) {
    const key = camel(unquote(token!));
    light[key] = unquote(l!);
    dark[key] = unquote(d!);
  }

  const radius: Record<string, number> = {};
  const blur: Record<string, number> = {};
  const space: Record<string, number> = {};
  const shadow = { light: {} as Record<string, string>, dark: {} as Record<string, string> };
  let touch = 0;
  for (const [rawToken, rawValue] of tableRows(section(md, '### 3.2 Shadow, blur, radius, spacing'))) {
    const token = unquote(rawToken!);
    const value = rawValue!;
    if (token === 'shadow-glass (light)') shadow.light.glass = glassShadow(value);
    else if (token === 'shadow-glass (dark)') shadow.dark.glass = glassShadow(value);
    else if (token.startsWith('shadow-')) {
      // shadow-card, shadow-thumb, shadow-primary: "light `…`; dark `…`".
      const m = /light `([^`]+)`; dark `([^`]+)`/.exec(value);
      if (!m) throw new Error(`Unparsed ${token}`);
      const key = camel(token.slice('shadow-'.length));
      shadow.light[key] = splitShadows(m[1]!);
      shadow.dark[key] = splitShadows(m[2]!);
    } else if (token.startsWith('radius-'))
      radius[camel(token.slice('radius-'.length))] = leadingNumber(value);
    else if (token === 'glass-blur') blur.regular = leadingNumber(value);
    else if (token === 'glass-blur-clear') blur.clear = leadingNumber(value);
    else if (token.startsWith('space-')) {
      // Handoff names "space-1…8" with 7 values: the design system's scale skips space-7 (DECISIONS D8, D23).
      const names = [1, 2, 3, 4, 5, 6, 8];
      const values = value.split(',').map(leadingNumber);
      if (values.length !== names.length) throw new Error(`Expected ${names.length} spacing values`);
      values.forEach((v, i) => (space[`space${names[i]}`] = v));
    } else if (token === 'touch') touch = leadingNumber(value);
    else throw new Error(`Unknown §3.2 token "${token}"`);
  }

  const type: Record<string, Record<string, string | number>> = {};
  for (const [name, sizeLine, weight] of tableRows(section(md, '### 3.3 Type scale'))) {
    const sl = /^(Playfair )?(\d+) \/ (\d+)$/.exec(sizeLine!);
    if (!sl) throw new Error(`Unparsed size/line "${sizeLine}"`);
    const style: Record<string, string | number> = {
      fontSize: Number(sl[2]),
      lineHeight: Number(sl[3]),
      fontWeight: String(leadingNumber(weight!)),
    };
    const tracking = /tracking ([+-][\d.]+)/.exec(weight!);
    if (tracking) style.letterSpacing = Number(tracking[1]);
    if (sl[1]) style.fontFamily = PLAYFAIR;
    type[name!] = style;
  }

  return { light, dark, shadow, radius, blur, space, touch, type };
}

export function render(md: string): string {
  const t = build(md);
  const out = (name: string, v: unknown) =>
    `export const ${name} = ${JSON.stringify(v, null, 2)} as const;\n`;
  return (
    '// GENERATED from docs/DESIGN_HANDOFF.md §3 by scripts/generate.ts. Do not edit; run `npm run tokens`.\n\n' +
    out('light', t.light) +
    out('dark', t.dark) +
    out('shadow', t.shadow) +
    out('radius', t.radius) +
    out('blur', t.blur) +
    out('space', t.space) +
    out('touch', t.touch) +
    out('type', t.type)
  );
}

if (import.meta.main) {
  const next = render(readFileSync(handoffPath, 'utf8'));
  if (process.argv.includes('--check')) {
    if (readFileSync(outPath, 'utf8') !== next) {
      console.error('packages/tokens/src/generated.ts is stale. Run `npm run tokens`.');
      process.exit(1);
    }
  } else writeFileSync(outPath, next);
}
