import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { build, render } from '../scripts/generate.ts';
import * as tokens from '../src/generated.ts';

const md = readFileSync(join(import.meta.dirname, '../../../docs/DESIGN_HANDOFF.md'), 'utf8');

test('every §3.1 colour exists in both themes with the exact handoff value', () => {
  const rows = md
    .slice(md.indexOf('### 3.1 Colour'), md.indexOf('### 3.2'))
    .split('\n')
    .filter((l) => l.startsWith('| `'));
  assert.equal(rows.length, 33); // 29 from the handoff + 4 band tokens (owner revision, D55)
  for (const row of rows) {
    const [token, l, d] = row
      .split('|')
      .slice(1, 4)
      .map((c) => c.trim().replace(/`/g, ''));
    const key = token!.replace(/-([a-z0-9])/g, (_, c: string) =>
      c.toUpperCase(),
    ) as keyof typeof tokens.light;
    assert.equal(tokens.light[key], l, `light ${token}`);
    assert.equal(tokens.dark[key], d, `dark ${token}`);
  }
});

test('type scale spot checks', () => {
  assert.deepEqual(tokens.type.largeTitle, {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700',
    letterSpacing: 0.4,
  });
  assert.equal(tokens.type.caption1.fontSize, 12);
  assert.equal(tokens.type.brandHero.fontFamily, 'PlayfairDisplay-SemiBold');
  assert.equal(tokens.type.arBody.lineHeight, 26);
});

test('spacing is space1–6 and space8, matching the design system (D8, D23)', () => {
  assert.deepEqual(tokens.space, {
    space1: 4,
    space2: 8,
    space3: 12,
    space4: 16,
    space5: 20,
    space6: 24,
    space8: 32,
  });
});

test('radius, blur, touch and shadows', () => {
  assert.deepEqual(tokens.radius, { sm: 12, md: 20, lg: 34, pill: 999, device: 55 });
  assert.deepEqual(tokens.blur, { regular: 24, clear: 14 });
  assert.equal(tokens.touch, 44);
  assert.equal(tokens.shadow.dark.thumb, '0px 1px 2px rgba(0,0,0,0.50)');
  // Owner revision (D55): cards and the filled primary button carry soft purple shadows.
  assert.equal(tokens.shadow.light.card, '0px 8px 24px rgba(46,16,101,0.06)');
  assert.equal(tokens.shadow.light.primary, '0px 10px 24px rgba(59,10,107,0.22)');
  assert.match(tokens.shadow.light.glass, /inset 0px -1px 1px rgba\(255,255,255,0.40\)$/);
});

test('generated file is fresh', () => {
  assert.equal(readFileSync(join(import.meta.dirname, '../src/generated.ts'), 'utf8'), render(md));
});

test('generator rejects an unknown §3.2 token', () => {
  assert.throws(() => build(md.replace('| `touch` |', '| `mystery` |')), /Unknown §3.2 token "mystery"/);
});
