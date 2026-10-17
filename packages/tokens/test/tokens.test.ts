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
  assert.equal(rows.length, 29);
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

test('spacing has exactly the 7 listed values (D8)', () => {
  assert.deepEqual(Object.values(tokens.space), [4, 8, 12, 16, 20, 24, 32]);
});

test('radius, blur, touch and shadows', () => {
  assert.deepEqual(tokens.radius, { sm: 12, md: 20, lg: 34, pill: 999, device: 55 });
  assert.deepEqual(tokens.blur, { regular: 24, clear: 14 });
  assert.equal(tokens.touch, 44);
  assert.equal(tokens.shadow.dark.thumb, '0px 1px 2px rgba(0,0,0,0.50)');
  assert.match(tokens.shadow.light.glass, /inset 0px -1px 0px rgba\(255,255,255,0.40\)$/);
});

test('generated file is fresh', () => {
  assert.equal(readFileSync(join(import.meta.dirname, '../src/generated.ts'), 'utf8'), render(md));
});

test('generator rejects an unknown §3.2 token', () => {
  assert.throws(() => build(md.replace('| `touch` |', '| `mystery` |')), /Unknown §3.2 token "mystery"/);
});
