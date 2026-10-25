// GENERATED from docs/DESIGN_HANDOFF.md §3 by scripts/generate.ts. Do not edit; run `npm run tokens`.

export const light = {
  "bg": "#ffffff",
  "surface": "#faf9fc",
  "surface2": "#f1eaf8",
  "label": "#14101c",
  "label2": "#6e6878",
  "label3": "#b9b2c2",
  "separator": "#ece8f1",
  "brand": "#3b0a6b",
  "brandText": "#3b0a6b",
  "brandTint": "#f1eaf8",
  "onBrand": "#ffffff",
  "band": "#3b0a6b",
  "bandLabel": "#ffffff",
  "bandLabel2": "#d9c9ec",
  "bandControl": "rgba(255,255,255,0.16)",
  "gold": "#c9a96e",
  "goldInk": "#7a5a1e",
  "goldTint": "#f7efdf",
  "success": "#248a3d",
  "successTint": "#e3f4e7",
  "warning": "#c93400",
  "warningTint": "#fff0e0",
  "danger": "#d70015",
  "glassFill": "rgba(255,255,255,0.10)",
  "glassClear": "rgba(255,255,255,0.06)",
  "glassTint": "rgba(255,255,255,0.10)",
  "glassLabel": "#000000",
  "glassTintLabel": "#000000",
  "glassStroke": "rgba(255,255,255,0.90)",
  "glassHighlight": "rgba(255,255,255,0.95)",
  "glassSelected": "rgba(255,255,255,0.55)",
  "glassFrosted": "#f7f5fa",
  "scrim": "rgba(0,0,0,0.28)"
} as const;
export const dark = {
  "bg": "#0f0a16",
  "surface": "#1a1324",
  "surface2": "#261b33",
  "label": "#f5f1fa",
  "label2": "#aba3b8",
  "label3": "#6b6276",
  "separator": "rgba(255,255,255,0.10)",
  "brand": "#7a3fc4",
  "brandText": "#c9a8f0",
  "brandTint": "#2a1745",
  "onBrand": "#ffffff",
  "band": "#24083f",
  "bandLabel": "#ffffff",
  "bandLabel2": "#cdb9e6",
  "bandControl": "rgba(255,255,255,0.12)",
  "gold": "#d4b47a",
  "goldInk": "#e2c58e",
  "goldTint": "#2e2414",
  "success": "#30d158",
  "successTint": "#0f2a17",
  "warning": "#ff9f0a",
  "warningTint": "#3a2610",
  "danger": "#ff453a",
  "glassFill": "rgba(255,255,255,0.06)",
  "glassClear": "rgba(255,255,255,0.04)",
  "glassTint": "rgba(255,255,255,0.06)",
  "glassLabel": "#ffffff",
  "glassTintLabel": "#ffffff",
  "glassStroke": "rgba(255,255,255,0.24)",
  "glassHighlight": "rgba(255,255,255,0.35)",
  "glassSelected": "rgba(255,255,255,0.14)",
  "glassFrosted": "#221a2c",
  "scrim": "rgba(0,0,0,0.50)"
} as const;
export const shadow = {
  "light": {
    "glass": "0px 6px 22px rgba(0,0,0,0.08), inset 0px 1px 1px rgba(255,255,255,0.95), inset 0px -1px 1px rgba(255,255,255,0.40)",
    "card": "0px 8px 24px rgba(46,16,101,0.06)",
    "primary": "0px 10px 24px rgba(59,10,107,0.22)",
    "thumb": "0px 1px 2px rgba(0,0,0,0.10), 0px 3px 8px rgba(0,0,0,0.08)"
  },
  "dark": {
    "glass": "0px 6px 22px rgba(0,0,0,0.40), inset 0px 1px 1px rgba(255,255,255,0.28), inset 0px -1px 1px rgba(255,255,255,0.10)",
    "card": "0px 8px 24px rgba(0,0,0,0.35)",
    "primary": "0px 10px 24px rgba(0,0,0,0.45)",
    "thumb": "0px 1px 2px rgba(0,0,0,0.50)"
  }
} as const;
export const radius = {
  "sm": 12,
  "md": 20,
  "lg": 34,
  "pill": 999,
  "device": 55
} as const;
export const blur = {
  "regular": 24,
  "clear": 14
} as const;
export const space = {
  "space1": 4,
  "space2": 8,
  "space3": 12,
  "space4": 16,
  "space5": 20,
  "space6": 24,
  "space8": 32
} as const;
export const touch = 44 as const;
export const type = {
  "largeTitle": {
    "fontSize": 34,
    "lineHeight": 41,
    "fontWeight": "700",
    "letterSpacing": 0.4
  },
  "title1": {
    "fontSize": 28,
    "lineHeight": 34,
    "fontWeight": "700"
  },
  "title2": {
    "fontSize": 22,
    "lineHeight": 28,
    "fontWeight": "700"
  },
  "title3": {
    "fontSize": 20,
    "lineHeight": 25,
    "fontWeight": "600"
  },
  "headline": {
    "fontSize": 17,
    "lineHeight": 22,
    "fontWeight": "600"
  },
  "body": {
    "fontSize": 17,
    "lineHeight": 22,
    "fontWeight": "400"
  },
  "callout": {
    "fontSize": 16,
    "lineHeight": 21,
    "fontWeight": "400"
  },
  "subheadline": {
    "fontSize": 15,
    "lineHeight": 20,
    "fontWeight": "400"
  },
  "footnote": {
    "fontSize": 13,
    "lineHeight": 18,
    "fontWeight": "400"
  },
  "caption1": {
    "fontSize": 12,
    "lineHeight": 16,
    "fontWeight": "500"
  },
  "brandHero": {
    "fontSize": 36,
    "lineHeight": 40,
    "fontWeight": "600",
    "fontFamily": "PlayfairDisplay-SemiBold"
  },
  "brandTitle": {
    "fontSize": 30,
    "lineHeight": 34,
    "fontWeight": "600",
    "fontFamily": "PlayfairDisplay-SemiBold"
  },
  "brandConfirm": {
    "fontSize": 32,
    "lineHeight": 36,
    "fontWeight": "600",
    "fontFamily": "PlayfairDisplay-SemiBold"
  },
  "arBody": {
    "fontSize": 17,
    "lineHeight": 26,
    "fontWeight": "400"
  },
  "arHeadline": {
    "fontSize": 17,
    "lineHeight": 26,
    "fontWeight": "700"
  }
} as const;
