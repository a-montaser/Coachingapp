---
name: Coach For All
description: Cairo lesson booking in the owner's aubergine and gold, iPhone first.
colors:
  ground: "#ffffff"
  lavender-paper: "#faf9fc"
  lavender-tint: "#f1eaf8"
  ink: "#14101c"
  ink-soft: "#6e6878"
  ink-faint: "#b9b2c2"
  hairline: "#ece8f1"
  aubergine: "#3b0a6b"
  night-aubergine: "#24083f"
  band-lavender: "#d9c9ec"
  gold: "#c9a96e"
  gold-ink: "#7a5a1e"
  gold-tint: "#f7efdf"
  success: "#248a3d"
  warning: "#c93400"
  danger: "#d70015"
  dark-ground: "#0f0a16"
  dark-paper: "#1a1324"
  dark-tint: "#261b33"
  dark-ink: "#f5f1fa"
  dark-brand: "#7a3fc4"
  dark-brand-text: "#c9a8f0"
typography:
  display:
    fontFamily: "PlayfairDisplay-SemiBold, Georgia, serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: "34px"
  display-hero:
    fontFamily: "PlayfairDisplay-SemiBold, Georgia, serif"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: "40px"
  title:
    fontFamily: "SF Pro, Roboto, system-ui"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: "34px"
  title-small:
    fontFamily: "SF Pro, Roboto, system-ui"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "25px"
  headline:
    fontFamily: "SF Pro, Roboto, system-ui"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: "22px"
  body:
    fontFamily: "SF Pro, Roboto, system-ui"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: "22px"
  label:
    fontFamily: "SF Pro, Roboto, system-ui"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "18px"
rounded:
  sm: "12px"
  md: "20px"
  lg: "34px"
  pill: "999px"
spacing:
  space1: "4px"
  space2: "8px"
  space3: "12px"
  space4: "16px"
  space5: "20px"
  space6: "24px"
  space8: "32px"
components:
  button-primary:
    backgroundColor: "{colors.aubergine}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
    height: "54px"
    padding: "0 24px"
  button-secondary:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.aubergine}"
    rounded: "{rounded.pill}"
    height: "54px"
  button-plain:
    backgroundColor: "{colors.lavender-tint}"
    textColor: "{colors.aubergine}"
    rounded: "{rounded.pill}"
    height: "38px"
    padding: "0 16px"
  chip:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "36px"
    padding: "0 14px"
  chip-selected:
    backgroundColor: "{colors.aubergine}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
    height: "36px"
  card:
    backgroundColor: "{colors.lavender-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "16px"
  home-band:
    backgroundColor: "{colors.aubergine}"
    textColor: "{colors.ground}"
    rounded: "{rounded.md}"
  departures-board:
    backgroundColor: "{colors.night-aubergine}"
    textColor: "{colors.ground}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
---

# Design System: Coach For All

The tokens come from `docs/DESIGN_HANDOFF.md` §3 (generated into `packages/tokens/src/generated.ts`) plus `packages/tokens/src/manual.ts`. If this file and the handoff disagree, the handoff and the decisions log win (D23, D54, D55, D58). Every color has a light and a dark value; the frontmatter lists the light ones and the main dark ones.

## Overview

**Creative North Star: "The evening class board"**

Coach For All is the owner's purple-and-gold prototype taken all the way through the app. Deep aubergine is the shell and the one colour you can press. Gold marks quality and time: ratings, the confirmation tick, and the start times on Home's departures board. The ground is plain white, so photos and the aubergine carry the colour, not tinted backgrounds. It should feel like a Cairo evening out: warm, sure of itself, a little dressed up.

Apple's own pieces stay native. On iOS the tab bar is Apple's Liquid Glass tab bar. The floating back and action buttons are system glass. Sliding selections use the glass lens (D47–D49). The brand lives in what the app draws: the Home band, the board, cards, buttons and chips.

The owner rejected two looks. The first was grey iOS-settings ground with purple only as a thin accent. The second was plain look-alike buttons and options ("too bland and white", "options and buttons too similar", D54).

**Key Characteristics:**
- An aubergine Home band and a night-aubergine departures board at full strength, never a pale tint.
- One action colour: aubergine fills mean "press me"; selection uses the same aubergine.
- Gold is for quality and time, never for buttons.
- Playfair Display for brand moments (wordmark, greetings, confirmations); the system font for everything you read and tap.
- Class name first and large, instructor small under it; price only on Review & pay.

## Colors

A white ground with one deep purple and one warm gold; everything else is soft lavender-grey.

### Primary
- **Aubergine** (#3b0a6b; dark #7a3fc4 fill, #c9a8f0 as text): Primary buttons, selected chips and segments, the chosen calendar day, links, the Home band. It is the only colour that means "you can press this".
- **Night Aubergine** (#24083f): The departures board (`board`) in both themes, and the Home band in dark mode.

### Secondary
- **Evening Gold** (#c9a96e; dark #d4b47a): Stars, the confirmation tick, the gold full stop after the Home greeting, calendar dots and the board's start times. As text it only sits on aubergine or night aubergine, where it reads clearly.
- **Gold Ink** (#7a5a1e on #f7efdf): Gold used as readable text on a light ground (the gold pill).

### Neutral
- **Ground** (#ffffff; dark #0f0a16): Page background.
- **Lavender Paper** (#faf9fc; dark #1a1324): Cards, search field, sheets.
- **Lavender Tint** (#f1eaf8; dark #261b33): Quiet fills: plain buttons, icon tiles, date tiles, the selected-day ring's ground.
- **Ink** (#14101c), **Soft Ink** (#6e6878), **Faint Ink** (#b9b2c2): Primary, secondary and disabled text.
- **Hairline** (#ece8f1): Chip outlines and dividers.
- **Band Lavender** (#d9c9ec): Secondary text on the band and the board. It is a tint of the purple, not grey.

### Named Rules
**The One Action Colour Rule.** Aubergine fill means pressable or chosen. Never use it for decoration.
**The Gold Is Earned Rule.** Gold marks quality (rating, verified, confirmed) and start times. It is never a button, and never text on white.
**The Full Strength Rule.** The band and the board are solid aubergine. Never a gradient, never a pale wash.

## Typography

**Display Font:** Playfair Display SemiBold (with Georgia, serif)
**Body Font:** the system font: SF Pro on iOS, Roboto on Android (needed for Arabic and Dynamic Type)

**Character:** Playfair adds the evening-out warmth. The system font keeps every control native and readable at any text size.

### Hierarchy
- **Display** (600, 30/34): Home greeting and wordmark; 36/40 on Welcome, 32/36 on Confirmed.
- **Title** (700, 28/34): Screen headings (Book with Nour, Review & pay).
- **Title 2 / 3** (700 22/28, 600 20/25): Section titles; the time on booking cards (bold, largest thing on the card); the board's start times.
- **Headline** (600, 17/22): Card titles, class names.
- **Body** (400, 17/22): Running text.
- **Subheadline / Footnote** (15/20, 13/18): Secondary lines: instructor under the class, venue, hints.
- **Board heading** (footnote 700, uppercase, tracking 1.5): "STARTING SOON NEAR YOU" only. It is the board's own heading, not a label above another heading.

### Named Rules
**The Class First Rule.** The class name is the large line; the instructor's name is smaller and sits under it.
**The Time Leads Rule.** On booking cards and the board, the start time is the largest, boldest thing.

## Layout

- **Edges:** 16pt side margins, cards 12pt apart, sections 24pt apart. Spacing runs on a 4pt grid (4, 8, 12, 16, 20, 24, 32).
- **Shape:** single-column phone layouts. Horizontal rails (disciplines, groups) bleed to the screen edge.
- **Home:** the band runs from the status bar down. The next session, shown only when it is within 24 hours, overlaps the band's edge by 28pt. Under it come the departures board, the disciplines rail, Groups near you and Classes near you.
- **Bottom bars:** pages with an action keep it in a bottom bar. It holds a one-line summary and the button; the price appears only on Review & pay.
- **Touch targets:** at least 44pt, including calendar days (40pt circle plus padding).

## Elevation & Depth

Depth is soft and purple-tinted, never a hard outline. Cards lift slightly off the white. The primary button carries the strongest shadow, since it is the one thing to press. Glass appears only on system chrome and over photos.

### Shadow Vocabulary
- **Card** (`0 8px 24px rgba(46,16,101,0.06)`; dark `rgba(0,0,0,0.35)`): every card.
- **Primary** (`0 10px 24px rgba(59,10,107,0.22)`): primary buttons only.
- **Thumb** (`0 1px 2px rgba(0,0,0,0.10), 0 3px 8px rgba(0,0,0,0.08)`): the white thumb in segmented controls.

### Named Rules
**The Glass Is Apple's Rule.** Liquid Glass is for system chrome and for controls over photos (`overMedia`). Content is never glass.

## Shapes

- **Cards and boards:** 20pt corners (`md`).
- **Small tiles:** 12pt corners (`sm`).
- **Buttons, chips, search and segments:** pills (999).
- **Band:** the Home band rounds only its bottom corners, at 20pt.
- **Round shapes:** avatars and calendar days are circles.
- **Borders:** 1pt hairlines on resting chips and the secondary button only. There are no coloured side stripes anywhere.

## Components

### Buttons
Solid and clearly different from each other (D55).
- **Shape:** pill (999); 54pt tall, 38pt for the small size.
- **Primary:** aubergine fill, white 700 label, primary shadow.
- **Secondary:** white with a 1pt aubergine outline and aubergine text.
- **Plain:** lavender tint fill with aubergine text (small actions such as Directions, Book again).
- **Over photos:** system glass instead.
- **Pressed:** scales to 0.97.
- **Disabled:** says why underneath ("Pick a time to continue").

### Chips
- **Style:** white with a 1pt hairline and ink text; 36pt tall.
- **Selected:** aubergine fill with white text.
- **Disabled:** faint ink, as for a full time slot.
- **Use:** filters, levels, times on the Group page and seat counts. Chips are options, never actions.

### Cards
- **Corner style:** 20pt.
- **Background:** lavender paper.
- **Shadow:** the card shadow.
- **Padding:** 16pt.
- **Class cards:** small, with no price. They show the level pill, then the class name, then the instructor.

### Inputs
- **Style:** lavender paper pill (search) or field with a footnote label above.
- **On the band:** the search field is solid white.
- **Errors:** footnote in danger red, read out by VoiceOver.

### Navigation
- **iOS tabs:** Apple's native tab bar, with the prototype's own icons.
- **Android tabs:** the floating glass tab bar.
- **Back and actions:** floating glass circles and clusters.
- **Selection:** segmented controls use the Liquid Glass lens.

### Month calendar
- **Layout:** Saturday first, Cairo days.
- **Marked days:** a 5pt gold dot under each day that has times or bookings.
- **Today:** a 1.5pt aubergine ring.
- **Chosen day:** filled aubergine.
- **Unavailable days:** days without times can't be tapped when booking.

### Departures board (signature, D58)
- **Panel:** night aubergine with 20pt corners.
- **Heading:** "STARTING SOON NEAR YOU" in gold.
- **Rows:** up to four, soonest first. The start time is gold, bold and tabular, with "Tomorrow" under it when needed. Then the class and "instructor · area · seats left".
- **Dividers:** hairlines in `board-line`.
- **Dark mode:** adds a hairline outline.

## Do's and Don'ts

### Do:
- **Do** use aubergine (#3b0a6b) for every primary action and selection, and nothing else.
- **Do** put the class name first and large, with the instructor smaller under it.
- **Do** keep prices off cards, Book and the Group page. Price first appears on Review & pay.
- **Do** mark dates on a month calendar with gold dots.
- **Do** take every value from `@cfa/tokens`. Screens hold no raw hex.

### Don't:
- **Don't** put a small label (kicker) above a heading. Make the heading carry it, or turn it into a button (Book again).
- **Don't** make buttons and options look alike. Buttons are filled or outlined pills; options are chips.
- **Don't** use gold for buttons, or as text on white.
- **Don't** tint the ground grey or lavender. The ground stays white (#ffffff), and colour comes from the band, the board, photos and aubergine.
- **Don't** put content in glass. Glass is for Apple's chrome and for controls over photos.
