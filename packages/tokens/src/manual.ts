// Values the handoff gives in prose (§4–§8), not in the §3 tables. Each cites its section.
// `provisional` marks a size the handoff does not specify; listed in the Phase 0 report for design to confirm.

export const tray = {
  dim: 'rgba(0,0,0,0.45)', // §3.1 note, §6.2
  shadow: '0px 18px 50px rgba(0,0,0,0.28)', // §6.2
} as const;

export const layout = {
  sideMargin: 16, // §3.2
  cardGap: 20, // §3.2
  sectionGap: 24, // §3.2
} as const;

export const motion = {
  trayDimMs: 250, // §6.2, §8
  traySpringMs: 500, // §6.2
  trayDotMs: 200, // §6.2
  trayCloseDelayMs: 250, // §6.2
  tabMinimiseMs: 250, // §8
  toastHoldMs: 2600, // §5, §8
  navTitleRise: 6, // §8
} as const;

export const component = {
  glass: { rim: 0.5, rimProminent: 1, frostedProminentBorder: 1.5, contrastRim: 1.5, prominentWeight: '700' }, // §4.2, §4.3
  button: { height: 50, smallHeight: 36, weight: '600', smallFontSize: 15, iconSize: 17 /* provisional */ }, // §5
  iconButton: { size: 44, iconSize: 22 /* provisional */ }, // §5
  chip: { height: 36, fontSize: 15, weight: '600', hairline: 0.5 }, // §5
  pill: { height: 24, fontSize: 12, weight: '600' }, // §5
  groupedListIcon: { size: 18 /* provisional */ },
  tabBadge: { minSize: 18 /* provisional */ },
  categoryButton: { iconSize: 17 /* provisional */, chevronSize: 12 /* provisional */ },
  trayClose: { iconSize: 17 /* provisional */ },
  searchField: { height: 44, iconSize: 17 /* provisional */ }, // §5
  segmented: { height: 40, padding: 3 }, // §5
  groupedList: { rowMinHeight: 56, padding: 16, iconTile: 32, iconTileRadius: 9, separatorInset: 60 }, // §5
  instructorCard: { padding: 8, photoWidth: 96, photoHeight: 120, metaFontSize: 13 }, // §5
  workshopCard: { bannerMinHeight: 126, bannerMaxHeight: 150, railWidth: 252, bannerAspect: 2 }, // §5
  dateTile: { width: 56, height: 64, capsSize: 12, capsWeight: '700', daySize: 22, dayWeight: '700' }, // §5
  dayPicker: { emptyOpacity: 0.45, dotSize: 6 /* provisional */, tileMinHeight: 56 /* provisional */ }, // §5
  timeSlot: { height: 44, columns: 3, morningEndsHour: 12, eveningStartsHour: 17 }, // §5
  progress: { segments: 3, height: 4, radius: 2, gap: 4 /* provisional */ }, // §5
  toast: { fontSize: 15, weight: '600' }, // §5
  navBar: {
    height: 52,
    padding: 4,
    inset: 12,
    hairlineWidth: 0.5,
    hairlineHeight: 22,
    fadeHeight: 120,
    fadeBlur: 8,
    titleFadeAfter: 150,
  }, // §4.4, §8
  tabBar: { height: 64, padding: 4, inset: 16, aboveHomeIndicator: 26, iconSize: 22 /* provisional */ }, // §4.4
  bottomBar: { inset: 8, radius: 34 }, // §4.4
  sheet: { inset: 8, radius: 34, grabberWidth: 36, grabberHeight: 5 }, // §4.4
  tray: {
    triggerHeight: 40,
    inset: 8,
    radius: 32,
    padTop: 22,
    padSide: 22,
    padBottom: 10,
    titleSize: 20,
    titleWeight: '700',
    closeSize: 36,
    rowHeight: 56,
    iconSize: 22,
    labelSize: 14,
    labelWeight: '600',
    labelTracking: 0.28, // +0.02 em at 14 pt
    radioSize: 22,
    radioBorderOff: 1.5,
    radioBorderOn: 2,
    radioDot: 12,
  }, // §6.2
} as const;
