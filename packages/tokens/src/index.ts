export * from './generated.ts';
export * from './manual.ts';

import type { light } from './generated.ts';
export type ColorToken = keyof typeof light;
export type Palette = Record<ColorToken, string>;
