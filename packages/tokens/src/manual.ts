// Values the handoff gives in prose (§4–§8), not in the §3 tables. Each cites its section.
// `DS` = the "Coach For All — Liquid Glass" design system (cfa components/bundle.css) on the design canvas,
// the reference for details the handoff leaves out (DECISIONS D23).
// `provisional` = in neither; listed in the phase report for design to confirm.

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

export const icon = { regular: 22, small: 17, xsmall: 14 } as const; // DS .ic / .ic.s / .ic.xs

// Apple's home indicator: 5 pt tall, 8 pt above the screen edge, inside the bottom safe-area inset.
export const homeIndicator = { height: 5, fromBottom: 8 } as const;

export const component = {
  glass: {
    rim: 0.5,
    rimProminent: 1,
    frostedProminentBorder: 1.5,
    contrastRim: 1.5,
    prominentWeight: '700',
    sheenOpacity: 0.35,
  }, // §4.2, §4.3, DS .glass::before
  button: {
    height: 50,
    smallHeight: 36,
    weight: '600',
    padding: 24,
    smallPadding: 16,
    iconSize: icon.small,
    reasonGap: 6,
  }, // §5, DS .btn .why
  iconButton: { size: 44, iconSize: icon.regular }, // §5, DS .icbtn
  chip: { height: 36, weight: '600', padding: 14, outline: 1 }, // §5, DS .chip
  pill: { height: 24, weight: '600', padding: 10 }, // §5, DS .pill
  searchField: { height: 44, padding: 14, iconSize: icon.small }, // §5, DS .search
  segmented: { height: 40, padding: 3, weight: '600' }, // §5, DS .seg
  groupedList: {
    rowMinHeight: 56,
    padding: 16,
    paddingVertical: 10,
    iconTile: 32,
    iconTileRadius: 9,
    iconSize: icon.small,
    separatorInset: 60,
  }, // §5, DS .group .li
  instructorCard: { padding: 8, photoWidth: 96, photoHeight: 120, infoGap: 3, starSize: icon.xsmall }, // §5, DS .coach
  workshopCard: {
    bannerMinHeight: 126,
    bannerMaxHeight: 150,
    railWidth: 252,
    bannerAspect: 2,
    padTop: 12,
    padSide: 14,
    padBottom: 14,
    gap: 3,
    footerTop: 6,
  }, // §5, DS .ws
  price: { fontSize: 15, weight: '700' }, // DS .price.t-sub
  dateTile: { width: 56, height: 64, capsSize: 12, capsWeight: '700', daySize: 22, dayWeight: '700' }, // §5, DS .datetile
  dayPicker: { emptyOpacity: 0.45, tileHeight: 68, gap: 8, numberSize: 20, dotSize: 5 }, // §5, DS .day
  timeSlot: {
    height: 44,
    columns: 3,
    border: 1,
    startSize: 15,
    startWeight: '600',
    tailSize: 12,
    tailWeight: '500',
    morningEndsHour: 12,
    eveningStartsHour: 17,
  }, // §5, DS .slot
  progress: { segments: 3, height: 4, radius: 2, gap: 6 }, // §5, DS .progress
  toast: { fontSize: 15, weight: '600' }, // §5 (not in DS)
  navBar: {
    height: 52, // space reserved above content for the floating buttons
    padding: 4,
    inset: 16, // canvas Instructor/Workshop: buttons 16 in from the sides
    top: 4, // canvas: 58 from the top of an 852 frame = 4 below the status bar
    clusterPadding: 2, // DS .cluster
    hairlineWidth: 0.5,
    hairlineHeight: 22,
    fadeHeight: 120,
    fadeBlur: 8,
    titleFadeAfter: 150,
  }, // §4.4, §8, canvas Instructor/Workshop, DS .icbtn.glass + .cluster
  tabBar: {
    height: 64,
    padding: 4,
    inset: 16,
    aboveHomeIndicator: 26,
    tabHeight: 56,
    iconSize: icon.regular,
    labelWeight: '600',
    miniHeight: 52,
    miniPadStart: 14,
    miniPadEnd: 18,
    badgeSize: 18,
    badgePadding: 5,
    badgeTop: -3, // DS .badge top 5 in a 56 pt tab = 3 above the icon
    badgeFromCentre: 4, // DS left: calc(50% + 4px)
  }, // §4.4, DS .tabbar .tab .tabmini .fab .badge
  bottomBar: { inset: 8, radius: 34, padTop: 12, padEnd: 12, padBottom: 22, padStart: 20, gap: 10 }, // §4.4, DS
  sheet: { inset: 8, radius: 34, grabberWidth: 36, grabberHeight: 5 }, // §4.4
  welcome: { heroHeight: 560, wordmarkSize: 24 }, // §7.1
  homeWordmarkSize: 22, // §7.4
  emptyState: { iconTile: 56, iconSize: 26 /* provisional */ }, // §5
  phoneField: { minHeight: 56 }, // §7.2 (height not given: grouped-row height, provisional)
  profilePhoto: { size: 64, iconSize: 28 /* provisional */ }, // §7.14
  interestTile: {
    height: 92,
    padding: 14,
    gap: 10,
    iconSize: 26,
    codeSize: 20,
    codeWeight: '700',
    border: 1,
    selectedBorder: 1.5,
    tick: 22,
    tickIconSize: icon.xsmall,
    tickInset: 12,
  }, // §7.3, canvas .pick
  levels: {
    iconCircle: 56,
    iconSize: 28 /* provisional */,
    glyphWidth: 22,
    glyphHeight: 18,
    glyphBarGap: 2 /* provisional */,
  }, // §7.3
  dashedCard: { border: 1.5, minHeight: 64 /* provisional */ }, // §7.14 "Add a family member"
  otp: { boxHeight: 60, ring: 2, length: 6, resendSeconds: 60 }, // §7.2; resend = Supabase's 60 s limit
  categoryButton: { padStart: 10, padEnd: 12, gap: 6, iconSize: icon.small, chevronSize: icon.xsmall }, // §6.2, DS .modebtn
  tray: {
    triggerHeight: 40,
    inset: 8,
    radius: 32,
    padTop: 22,
    padSide: 22,
    padBottom: 10,
    headerGap: 16,
    titleSize: 20,
    titleWeight: '700',
    closeSize: 36,
    closeIconSize: icon.regular,
    rowHeight: 56,
    rowGap: 14,
    iconSize: 22,
    labelSize: 14,
    labelWeight: '600',
    labelTracking: 0.28, // +0.02 em at 14 pt
    radioSize: 22,
    radioBorderOff: 1.5,
    radioBorderOn: 2,
    radioDot: 12,
    springDamping: 0.75 /* provisional: "slight overshoot" */,
    dismissDistance: 80 /* provisional */,
    dismissVelocity: 800 /* provisional */,
  }, // §6.2, DS .tray .trow .radio
} as const;
