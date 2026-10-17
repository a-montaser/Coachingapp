# Coach For All: design handoff for engineering

Version 1.0 · 17 October 2026 · Source of truth for UX, UI, design system and business rules.

This file describes what the app must look like and how it must behave. It was written from the approved design canvases and the working HTML prototype. Where this file and the canvases disagree, this file wins. Where something is undecided it is marked **[OPEN]** or shown as a bracketed placeholder such as `[late-cancellation policy]`; never invent a value for those.

---

## 1. Product in one page

**What it is.** A Cairo marketplace for booking private and small-group lessons in four categories: **Hobbies** (the lead category), **Sports**, **Education** and **Languages**. Learners find an instructor, pick a time or a workshop seat, pay, and manage the booking. Instructors publish lessons and workshops and get booked.

**Who uses it.**
- **Learner** (MVP): an adult in Cairo booking for themselves, or a parent booking for a child.
- **Instructor** (later phase): coach, instructor, tutor or teacher who sets prices, availability and workshops.
- **Ops admin** (MVP, internal): verifies instructors, fixes bookings, issues refunds.

**Hobbies-first.** The app opens on Hobbies. Workshops (fixed date, fixed capacity, materials included) are the hero object on Hobbies. Sports, Education and Languages are one tap away through the category tray on Home.

**Vocabulary per category.** The person teaching is called:

| Category | Person | Group product | Example disciplines |
|---|---|---|---|
| Hobbies | Instructor | Workshop | Pottery, painting, photography, oud, Arabic calligraphy, cooking, chess, dance, baking |
| Sports | Coach | Small group session | Padel, tennis, squash, swimming, basketball, fitness, boxing, football, volleyball, golf |
| Education | Tutor | Revision group | Maths, physics, chemistry, biology, coding, SAT, IGCSE |
| Languages | Teacher | Conversation group | English, French, German, Spanish, Italian, Arabic, Turkish |

**Markets and money.** Egypt only. Currency EGP, shown as `650 EGP`. Prices include VAT. "From" always means the lowest price the instructor offers.

**Languages.** English and Arabic are both first-class. Arabic is right-to-left. Arabic uses Arabic-Indic digits (`١٧:٣٠`, `٣٩٠ ج.م`).

---

## 2. Platform and look

- **Target look:** iOS 26 with Apple's **Liquid Glass** material. Android must look native-quality with a frosted fallback where glass is not available (section 4.3).
- **Reference device:** iPhone 16 Pro, 393 × 852 pt, display corner radius 55.
- **Theme:** light and dark, following the system setting, with a manual override in Profile → Appearance.
- **Typography:** SF Pro (system font) for all UI. **Playfair Display 600** only for three brand moments (section 3.3). SF Arabic for Arabic.

---

## 3. Design tokens (exact values)

Implement tokens once, in code, and reference them everywhere. No raw hex values in components.

### 3.1 Colour

| Token | Light | Dark | Use |
|---|---|---|---|
| `bg` | `#f2f2f7` | `#000000` | Grouped page background |
| `surface` | `#ffffff` | `#1c1c1e` | Cards, list rows, solid content |
| `surface-2` | `#e9e9ef` | `#2c2c2e` | Fills inside content: chips at rest, incoming chat bubbles, plain buttons |
| `label` | `#000000` | `#ffffff` | Primary text and icons |
| `label-2` | `#6c6c70` | `#aeaeb2` | Secondary text (passes 4.5:1 on surface) |
| `label-3` | `#a1a1a6` | `#636366` | Disabled text and unavailable slots only |
| `separator` | `rgba(60,60,67,0.29)` | `rgba(84,84,88,0.65)` | Hairlines between rows |
| `brand` | `#3b0a6b` | `#7a3fc4` | Solid selected fills: chosen chip, date, slot, own chat bubble |
| `brand-text` | `#3b0a6b` | `#c9a8f0` | Purple as text or icon: links, prices |
| `brand-tint` | `#efe7f8` | `#2a1745` | Quiet selected backgrounds, "Next:" pill, date tile |
| `on-brand` | `#ffffff` | `#ffffff` | Text on `brand` |
| `gold` | `#c9a96e` | `#d4b47a` | Premium accent as a fill: stars, Members' Circle mark, confirmation ring |
| `gold-ink` | `#7a5a1e` | `#e2c58e` | Gold as readable text |
| `gold-tint` | `#f7efdf` | `#2e2414` | Background behind gold-ink |
| `success` | `#248a3d` | `#30d158` | Confirmed status, switches on |
| `success-tint` | `#e3f4e7` | `#0f2a17` | Confirmed pill background |
| `warning` | `#c93400` | `#ff9f0a` | Pending, policy warnings |
| `warning-tint` | `#fff0e0` | `#3a2610` | Pending pill, policy banner |
| `danger` | `#d70015` | `#ff453a` | Destructive actions, unread badges |
| `glass-fill` | `rgba(255,255,255,0.10)` | `rgba(255,255,255,0.06)` | Regular Liquid Glass |
| `glass-clear` | `rgba(255,255,255,0.06)` | `rgba(255,255,255,0.04)` | Glass over photos and maps |
| `glass-tint` | `rgba(255,255,255,0.10)` | `rgba(255,255,255,0.06)` | Prominent glass (primary action) |
| `glass-label` | `#000000` | `#ffffff` | Every glyph and label on glass |
| `glass-tint-label` | `#000000` | `#ffffff` | Label on prominent glass |
| `glass-stroke` | `rgba(255,255,255,0.90)` | `rgba(255,255,255,0.24)` | 0.5 pt glass rim; 1 pt on prominent glass |
| `glass-highlight` | `rgba(255,255,255,0.95)` | `rgba(255,255,255,0.35)` | Specular sheen on glass edges |
| `glass-selected` | `rgba(255,255,255,0.55)` | `rgba(255,255,255,0.14)` | Selected capsule inside glass (active tab) |
| `glass-frosted` | `#f7f7fa` | `#232326` | Reduce Transparency / Android fallback fill |
| `scrim` | `rgba(0,0,0,0.28)` | `rgba(0,0,0,0.50)` | Dim behind sheets; top fade on photo heroes |

The category tray uses a stronger dim of `rgba(0,0,0,0.45)` (section 6.2).

### 3.2 Shadow, blur, radius, spacing

| Token | Value |
|---|---|
| `shadow-glass` (light) | `0 6 22 rgba(0,0,0,0.08)` + inner top 1 pt `rgba(255,255,255,0.95)` + inner bottom 1 pt `rgba(255,255,255,0.40)` |
| `shadow-glass` (dark) | `0 6 22 rgba(0,0,0,0.40)` + inner top 1 pt `rgba(255,255,255,0.28)` + inner bottom 1 pt `rgba(255,255,255,0.10)` |
| `shadow-card` | none. Cards rest flat; the `bg` → `surface` tone step separates them |
| `shadow-thumb` | light `0 1 2 rgba(0,0,0,0.10), 0 3 8 rgba(0,0,0,0.08)`; dark `0 1 2 rgba(0,0,0,0.50)`. Only for the segmented-control thumb |
| `glass-blur` | 24 |
| `glass-blur-clear` | 14 |
| `radius-sm` | 12 (slots, date tiles, thumbnails) |
| `radius-md` | 20 (cards, bubbles) |
| `radius-lg` | 34 (sheets, floating bars) |
| `radius-pill` | 999 (buttons, chips, search, tabs) |
| `radius-device` | 55 |
| `space-1…8` | 4, 8, 12, 16, 20, 24, 32 |
| `touch` | 44 minimum touch target |

Side margin is 16. 20 between cards. 24 between sections.

### 3.3 Type scale

| Style | Size / line | Weight | Use |
|---|---|---|---|
| largeTitle | 34 / 41 | 700, tracking +0.4 | Screen titles (Explore, Messages) |
| title1 | 28 / 34 | 700 | Screen headings, sheet titles |
| title2 | 22 / 28 | 700 | Section titles |
| title3 | 20 / 25 | 600 | Prices in footers, sub-sections |
| headline | 17 / 22 | 600 | Names, row titles, button labels |
| body | 17 / 22 | 400 | Default text, chat |
| callout | 16 / 21 | 400 | Bios, review text |
| subheadline | 15 / 20 | 400 | Metadata, chips, segmented labels |
| footnote | 13 / 18 | 400 | Policy notes, secondary metadata |
| caption1 | 12 / 16 | 500 | Tab labels, badges, timestamps. **Nothing smaller** |
| brandHero | Playfair 36 / 40 | 600 | Welcome headline only |
| brandTitle | Playfair 30 / 34 | 600 | Instructor name on profile hero only |
| brandConfirm | Playfair 32 / 36 | 600 | Booking confirmation headline only |
| arBody | 17 / 26 | 400 | Arabic body (taller line height for diacritics) |
| arHeadline | 17 / 26 | 700 | Arabic names and row titles |

Support Dynamic Type up to accessibility sizes. Never truncate a price or a time; wrap instead.

---

## 4. Materials and the rules of Liquid Glass

### 4.1 Where glass goes
Glass is **only the navigation layer**: tab bar, navigation bars, back/close buttons that float over content, search fields, segmented controls, sheets, map controls, the bottom action bar. **Content is never glass:** cards, lists, photos, chat bubbles and text are solid `surface`.

### 4.2 How glass looks
- Glass is **colourless**. No hue on any glass control. Glyphs, labels, selected tab and badges on glass use `glass-label`. The material comes from blur, the 0.5 pt `glass-stroke` rim and the `shadow-glass` highlights.
- Each screen has **one primary action**, drawn as *prominent glass* (`glass-tint`): the same clear glass with a 1 pt rim and a bold (700) label. In SwiftUI terms this is `.buttonStyle(.glassProminent)`; secondary actions are `.buttonStyle(.glass)`.
- Brand purple lives in content only (chips, selected dates and slots, prices, links), never on glass.
- Neighbouring glass controls are grouped into one shape (one container), never glass on glass.

### 4.3 Fallbacks
- **Reduce Transparency** (iOS) and **Android without blur**: every glass shape becomes solid `glass-frosted` with the same radius; prominent glass gets a 1.5 pt `glass-label` border.
- **Increase Contrast:** glass rim becomes 1.5 pt `label`.
- **Reduce Motion:** keep content, drop travel; sheets and the tray fade instead of sliding.

### 4.4 Signature glass components
- **Navigation bar** = one glass capsule (height 52, padding 4, radius pill) holding back button, centred title (headline, single line, ellipsis) and up to two actions, separated by 0.5 × 22 pt `separator` hairlines. It floats 12 pt in from the sides. Content scrolls under it with a scroll-edge fade (a `bg` gradient plus 8 pt blur, ~120 pt tall). On detail screens with a hero, the title fades in once the hero scrolls away (~150 pt).
- **Tab bar** = floating glass capsule (height 64, padding 4, 16 pt side inset, 26 pt above the home indicator). Five tabs: Home, Explore, Bookings, Messages, Profile. Active tab is a `glass-selected` capsule with bold label. Messages shows a `danger` unread badge. **On scroll down it minimises** to one capsule showing the active tab (icon + label) on the left and a round glass button on the right (Messages, or Home when on Messages); scrolling up or tapping the capsule restores it. (`tabBarMinimizeBehavior(.onScrollDown)`.)
- **Bottom action bar** = glass slab (left/right/bottom inset 8, radius 34) with a caption and price on the left and the primary action on the right. Used on Instructor profile, Book, Review & pay, Workshop.
- **Sheets** = glass, inset 8 from the edges, radius 34, grab handle 36 × 5, max height leaves the status area visible, dim `scrim` behind.

---

## 5. Components

| Component | Spec |
|---|---|
| **Button** | Height 50, capsule, 17/600. Sizes: regular 50, small 36 (15/600). Variants: prominent glass (primary), glass (secondary), plain (`surface-2` fill, for content-area actions), destructive (text `danger`; "filled" variant on `surface-2`), disabled (`surface-2`, `label-3`). One primary per screen. Labels say the outcome: "Book a session", "Show 6 coaches", "Pay 585 EGP", "Reserve". |
| **Icon button** | 44 × 44 circle. Glass when floating over content. Always has an accessibility label. |
| **Chip** | Height 36, capsule, 15/600, `surface-2`. Selected: `brand` fill, `on-brand` text. A "Filters · N" chip uses `surface` with a hairline border. |
| **Pill** | Height 24, capsule, 12/600. `ok` (success on success-tint), `warn`, `next` (brand-text on brand-tint), `gold`, neutral (`label-2` on `surface-2`). |
| **Search field** | Height 44, glass capsule, magnifier icon, placeholder per category (section 7.4). |
| **Segmented control** | Glass track, height 40, padding 3. Selected segment = solid `surface` capsule with `shadow-thumb`. Navigation layer only (List/Map, Upcoming/Past, Workshops/1:1 lessons, session type on Book). |
| **Card** | `surface`, radius 20, no shadow. |
| **Grouped list** | `surface`, radius 20; rows min 56 high, 16 pt padding; leading 32 × 32 icon tile (radius 9, `surface-2`); hairline separators inset 60 pt from the leading edge. |
| **Instructor card** | Card, 8 pt padding, 96 × 120 photo (radius 12, 4:5 crop, focus on face) + name (headline), discipline · levels (13, label-2), ★ rating (reviews) · distance · area, "Next: Today 17:30" pill, "From 390 EGP" in `brand-text` bold. Optional filled heart if favourited. |
| **Workshop card** | Card with 2:1 banner image on top (126–150 high), title (headline), date · time · area (footnote), "3 of 8 spots left" pill, price. Horizontal rail on Home (252 wide), full width in Explore. |
| **Date tile** | 56 × 64, radius 12, `brand-tint` / `brand-text`: weekday caps 12/700, day 22/700, month caps. Past bookings use neutral grey. |
| **Day picker** | 7 tiles in a row (flexible width), weekday + date number + a `success` dot when that day has open times. Selected = `brand`. Days with no times at 45% opacity. Week arrows above. |
| **Time slot** | 3-column grid, height 44, radius 12, `surface` with hairline. Shows start time and "– end" (or "booked" / "yours"). Selected `brand`. Booked = struck through, `label-3`, disabled. Grouped under Morning (<12:00), Afternoon (12–17), Evening (≥17). |
| **Switch** | iOS switch, on = `success`. |
| **Progress (onboarding)** | 3 segments, 4 high, radius 2, `surface-2`; done/current segments in `label`. A segment can fill partially (level-per-item step). No "Step 1 of 3" text labels. |
| **Chat bubbles** | Max width 260, radius 20 with a 6 pt tail corner. Theirs `surface-2`; mine `brand` with `on-brand`. Supports text, video thumbnail with play button and duration, voice note with waveform and duration, typing indicator, "Delivered/Read" under the last own message. |
| **Toast** | Glass capsule near the top, 15/600, optional leading icon, auto-dismiss after ~2.6 s, announced to VoiceOver. |
| **Confirmation ring** | 96 pt: gold circle draws in (0.8 s), then a `brand-text` tick (0.45 s). |
| **Empty state** | Centred 56 pt round icon tile, headline, one footnote sentence, one plain small button. |

Icons: SF Symbols in the app (non-circled variants, regular weight, filled only to show state, e.g. heart vs heart.fill). Never emoji.

---

## 6. Navigation and the category tray

### 6.1 App map

```
Welcome → Sign up (phone) → Verify code → Interests → Levels (per pick) → Who & where → Home
Tabs: Home · Explore · Bookings · Messages · Profile
Home → Category tray (sheet)
Home/Explore → Instructor profile → Book (1:1/group/kids) → Review & pay → Confirmed → Booking detail
Home/Explore/Instructor → Workshop → Review & pay → Confirmed
Bookings → Booking detail → Reschedule (Book) | Cancel (sheet) | Rate (sheet) | Message (Chat)
Explore → Filters (sheet), Sort (sheet), Map view
Messages → Chat → Instructor profile | Booking detail
Profile → Edit profile (sheet), Members' Circle (sheet), Family & kids → Add/Edit member (sheet),
          Payments & receipts, Notifications, Language (sheet), Appearance (sheet), Sign out (sheet)
```

Pushed screens hide the tab bar. Tapping a tab returns to that tab's root.

### 6.2 Category tray (exact behaviour)

Modelled on a reference video of a market-switcher sheet. It is the **only** way to change category and lives on Home (Explore shows the current category as a button that opens Home's tray).

- **Trigger:** a glass capsule button in the **top-right of Home** showing the current category icon, its name and a small chevron-down (e.g. "Hobbies ⌄"). Height 40. Accessibility label: "Category: Hobbies. Change category".
- **Presentation:** the screen dims with `rgba(0,0,0,0.45)` (fade 0.25 s). A **solid `surface` card** (not glass; this is a deliberate exception to match the reference) slides up from the bottom with a slight spring overshoot (~0.5 s). It floats 8 pt from the left, right and bottom edges, radius 32, padding 22 / 22 / 10, soft shadow `0 18 50 rgba(0,0,0,0.28)`. It sits above the tab bar.
- **Header:** title "Browse by" (20/700) and subtitle "Switch between hobbies, sports, education and languages" (13, label-2) on the left; a plain ✕ close button (36 pt, no glass) top-right. A hairline under the header.
- **Rows:** four rows, 56 high, hairlines between them, in this order: **HOBBIES, SPORTS, EDUCATION, LANGUAGES**. Each row: category icon (22 pt, `label`), label in capitals (14/600, +0.02 em tracking), and a radio on the right. Radio = 22 pt circle; unselected 1.5 pt `separator` border; selected 2 pt `label` border with a 12 pt `label` dot that scales in (0.2 s).
- **Interaction:** tapping a row selects its radio immediately, then the tray closes after ~0.25 s and Home re-renders for that category. Tapping the dim area or ✕ closes without change. Swipe down closes. The choice persists across launches.
- **Accessibility:** dialog with a radio group; each row is a radio with `aria-checked`/accessibility trait selected.

### 6.3 Category icons
Hobbies: artist palette. Sports: tennis ball. Education: book. Languages: two speech bubbles.

---

## 7. Screens

All screens: 16 pt side margins; top content begins below the status bar (≈ 60 pt on the reference device); scrolling content has bottom padding so nothing hides under the tab bar or bottom action bar.

### 7.1 Welcome
Full-bleed illustration/photo in the top 560 pt (an instructor mid-lesson in Cairo at golden hour). Over it, top row: wordmark "Coach For All" in Playfair 24 white on the left, "Sign in" small glass button on the right. A solid `surface` panel rises from the bottom with radius 34 top corners: headline "Train with Cairo's best coaches." (brandHero; update copy to the hobbies-first positioning, e.g. "Learn something new in Cairo." **[OPEN: final copy]**), one sentence ("Private, group and kids sessions in hobbies, sports, education and languages, with free cancellation up to 24 hours before."), primary "Get started".

### 7.2 Sign up and Verify
- **Sign up:** back button, largeTitle "Your phone number", subline "We'll text you a code. Instructors see your number only after you book." Phone field with fixed "EG +20" prefix (validates 10 digits after +20, e.g. `100 234 5678`; inline error under the field). Primary "Send code". Divider "or". Plain buttons "Continue with Apple", "Continue with Google". Footnote with Terms and Privacy Policy links.
- **Verify:** largeTitle "Enter the code", "Sent to +20 … Change number". Six boxes (60 high, `surface`, radius 20; the current box has a 2 pt `brand` ring). One-time-code autofill (iOS shows the code above the keyboard: "From Messages · 482 917"). Auto-submits at 6 digits. Wrong code: inline error, boxes clear. "Resend code in 0:42" countdown, then a "Resend code" link.

### 7.3 Onboarding: Interests, Levels, Who & where
- **Interests (step 1):** progress bar (1 of 3). title1 "What do you want to learn?", sub "Pick anything that sounds fun. You can switch between hobbies, sports, education and languages from Home at any time." Four sections in this order with a section icon, name and "N picked": **Hobbies** (9 tiles), **Sports**, **Education**, **Languages** (language tiles show codes EN/FR/DE…). 3-column grid of tiles (92 high, radius 20, hairline border; selected = 1.5 pt `brand` border, `brand-tint` fill, `brand-text`, round tick badge top-right). Sticky bottom: "Continue · N picked" (disabled "Pick at least one" when none).
- **Levels (step 2):** glass capsule nav bar (back · current pick's name · Skip). Progress: segment 1 full, segment 2 fills per item answered. For each pick in turn: 56 pt icon in a `brand-tint` circle, title1 "How do you play padel?" / "How experienced are you with pottery?", sub "Pick the closest match. Your instructor adjusts it after your first session." Four level rows: Beginner / Intermediate / Advanced / Pro, each with a 4-bar strength glyph and a one-line description; tapping one records it and advances. After the last pick: "You're all set" summary list (tap to edit) and "Continue".
- **Who & where (step 3):** back · full progress · Skip. "Who are the sessions for?" radio list: Me (adult sessions), My child (kids sessions, ages 6–14), Both (add kids as family members next). "Where do you usually learn?" chips: Use my location, New Cairo, Zamalek, Maadi, Sheikh Zayed, Heliopolis, Downtown. "Instructor preference" chips: No preference, Female, Male. Footnote "You can change any of this later in Profile." Primary "Show my picks" → Home.

### 7.4 Home (per category)
Top to bottom:
1. Row: wordmark "Coach For All" (Playfair 22) left; **category button** right (section 6.2).
2. title1 greeting by time of day ("Good evening, Omar") and a per-category subline.
3. Glass search field (opens Explore with focus). Placeholder per category: Hobbies "Pottery, oud, photography…", Sports "Coach, sport or area", Education "Subject, exam or tutor", Languages "Language, level or teacher".
4. **Next booking card** in this category (date tile, "Next workshop · in 3 days" kicker in brand-text, title, time · venue, chevron) or, if none, an empty card ("No lessons booked yet · Find a tutor for your next exam").
5. **Disciplines rail:** section title ("Pick up something new" / "Sports" / "Subjects" / "Languages") with "See all"; horizontally scrolling 64 pt rounded tiles (radius 20, `surface`, icon or language code in `brand-text`) with names under them.
6. **Group product rail** (if any): "Workshops this weekend" / "Revision groups" / "Conversation groups" (Sports shows none here in v1). Workshop cards (section 5).
7. **People list:** "Instructors near you" / "Open today near you" / "Tutors near you" / "Teachers near you": instructor cards sorted by soonest availability.
8. Floating tab bar.

Sports Home also shows a "Book again" card for the last completed session with that coach's next open slot.

### 7.5 Explore
largeTitle "Explore" with the category button on the right. Glass search (live filtering by name, discipline, area, venue; clear button). Segmented control: Hobbies "Workshops | 1:1 lessons"; other categories "List | Map". Chips: "Filters · N" (opens sheet) then discipline chips (All, Pottery, Painting…). Result line: "**6 coaches** within 10 km" / "**4** workshops this week" and "Sort: Soonest available ⌄" (sheet: Soonest available, Lowest price, Highest rated, Nearest). Results as cards; empty state "No matches · Loosen a filter or try another search · Clear search and filters".

**Filters sheet:** header (✕ · "Filters" · Reset). Max price slider 300–1,200 EGP in 50 steps (1,200 = "Any"). Chip groups: Session type (Any, 1:1, Group, Kids, Workshop), Instructor gender (Any, Female, Male), Rating (Any, 4.5+, 4.8+), Distance (Any, 2 km, 5 km, 10 km), Availability (Any time, Today, This week, Weekend = Fri–Sat). Results update live; primary button "Show N coaches" (disabled "No matches" at 0).

**Map view:** full-screen map, price pins ("390 EGP"; selected pin = `brand` and slightly larger), user location dot, top: search + filter button with count badge, List/Map segment, recenter button, "Search this area" small glass button. Bottom: the selected instructor card floating with previous/next arrows and "2 of 6 coaches". Tab bar is minimised on the map.

### 7.6 Instructor profile
Hero image 340 high (full bleed, top `scrim` fade) with floating glass back button and a glass cluster (Share | Favourite heart). Content sheet overlaps the hero by 28 with radius 34 top corners:
- Name (brandTitle), discipline · teaching focus, ★ rating · N reviews · years teaching · certification · distance/area.
- **Next available** card: three slot pills ("Today 17:30") + "All times".
- **Hobbies:** "Upcoming workshops" list (date tile, title, time · level, "3 of 8 spots left" in brand-text, price) then "Private lessons" list (e.g. "1:1 on the wheel · 90 min · clay and firing included · 900 EGP", "Kids clay club · 60 min · ages 7–12 · up to 6 kids").
- **Sports/Education/Languages:** session type list (Private 1:1 · 60 min · one player; Small group · 60 min · up to 4, price per person; Kids · 45 min · ages 6–14) with prices.
- Venue row and "What to bring" row. Policy lines: "Free cancellation up to 24 hours before", "Usually replies within an hour".
- Bottom action bar: "From 450 EGP" · glass "Message" · primary "Book".

### 7.7 Workshop
Banner hero 260 with glass back. "Workshop · beginners" pill, title1 name, one-paragraph description. Instructor row (photo, "With Yasmine Fathy", rating · venue). **Pick a date:** up to 3 date buttons (weekday, date, time, "3 left" / "Full"; full dates disabled). **Seats** stepper 1…min(3, spots left) with "Come with a friend, up to N". Included / You take home / cancellation rows. Bottom bar: "Sat 17 Oct · 11:00 · 2 seats" and total (seats × price) · primary "Reserve" → Review & pay.

### 7.8 Book (1:1, group, kids)
Header: back · "Book with Nour" / "Reschedule with Nour" · discipline. Segmented session type (only types the instructor offers) with a one-line description under it. Kids type shows a "For Ali, age 9 · A guardian stays on site · Change" card (or "Add a child to book kids sessions"). Month label with week arrows (this week / next week). Day picker. Slots grouped by part of day; a day with no times shows "No times on Friday · Nour isn't coaching that day." Group "Repeat weekly" switch ("Same time every Tuesday, cancel any week") and a note field ("Note for Nour (optional)"). Bottom bar: "Today · 19:00–20:00 · weekly" + price · "Continue", or disabled "Pick a time".

### 7.9 Review & pay
Header "Review & pay". Summary card (photo, "Padel with Nour El-Sayed", date · time · type · weekly, venue, "for Ali" if kids, "Edit" link back). **Pay with** list (radio rows): Apple Pay, InstaPay (instant bank transfer), Vodafone Cash, Fawry ("Pay at any Fawry outlet within 2 h"), saved card "Visa •••• 4821", Pay at the venue ("Cash or card on arrival"). **[OPEN: which methods ship in MVP; see build prompt.]** Promo code field with Apply/Remove, inline error ("“XYZ” isn't a valid code…") or success ("CFA10 applied: 10% off this session"). Breakdown: Session, Promo −X, Venue/court fee Included, policy line ("Free cancellation until Wed 14 Oct, 18:00." or "This is a same-day booking, so it can't be refunded."). Bottom bar: "Total"/"Due at the venue" + amount · primary "Pay 585 EGP" / Apple Pay button / "Confirm booking" (pay at venue). Paying shows an inline spinner "Processing" and disables the button.

### 7.10 Confirmed
Confirmation ring animation, brandConfirm "You're on the court." (confirmed) or "Request sent." (pending, e.g. kids), sub "Nour has confirmed. Booking ref CFA-48217". Details list (When, Where, Paid/Due). Three tiles: Add to calendar, Directions, Share. "Remind me · 2 hours before" row (sheet: 30 min, 1 h, 2 h, the evening before, Off). Primary "View booking", text button "Back to Home". Category-appropriate headline copy: Hobbies "You're in.", Education "Lesson booked.", Languages "See you in class." **[OPEN: final copy]**.

### 7.11 Bookings
Floating glass header: nav capsule (Calendar sync · "Bookings" · Filter by discipline · New booking "+") and segmented "Upcoming · N | Past". Cards: date tile, title ("Padel with Nour", "Swimming · Ali with Mariam"), time · type · "repeats weekly", venue, status pill, and two plain actions (upcoming: Directions/Reschedule + Message; past: Book again + Rate session / Rated 5★; cancelled: Book again + Details). Empty states per tab.

### 7.12 Booking detail
Map header 290 with venue pin and a glass "Directions · 18 min" button (opens the maps app). Content: status pill, title1, full date and time (· weekly), venue row (+ note), type/payment row ("Paid 800 EGP · Visa •••• 4821 · ref CFA-47930"). **Policy banner** (`warning-tint`): "Free cancellation until Wed 14 Oct, 18:00. After that the session is non-refundable." or "Less than 24 hours to go. Cancelling now isn't refunded." Actions: Message, Add to calendar, primary Reschedule, destructive Cancel booking. Instructor row and What to bring row. Past: Book again + Rate. Cancelled: refund line. Nav capsule: back · title (fades in on scroll) · Share · More (Email receipt, Add to calendar, Report a problem).

**Cancel sheet:** title1 "Cancel this session?", sentence explaining the refund outcome (section 9), "Cancel every week" switch for recurring bookings, optional reason chips (Schedule change, Injury, Weather, Other), primary "Keep booking", destructive "Cancel and refund 800 EGP" / "Cancel booking". After cancel: back to Bookings and a toast.

**Rate sheet:** five stars (34 pt, gold when on), optional text "Shared with Nour only", "Send rating".

### 7.13 Messages and Chat
- **Messages:** largeTitle, glass search (names and message text), grouped list: 48 pt photo, name, time, context line in brand-text ("Padel · Today, 17:30" / "Squash · last session 6 Oct"), last message (bold when unread) and unread count badge. Sorted by latest activity.
- **Chat:** back + glass capsule with the instructor (photo, name, "Padel coach · replies within an hour"; opens profile). If a booking exists, a card under it: "Next: Today 17:30–18:30 · Cedar Court Club · View". Bubbles (section 5). Composer: glass "+" (attachments), glass message field, mic button that turns into a send button when text is entered. Opening a chat clears its unread count.

### 7.14 Profile and settings
Header: 64 pt photo with gold ring (Members' Circle members), name (title2), "New Cairo · member since 2025", glass "Edit". Members' Circle card (`gold-tint`): "[N] session credits left · renews [date]". "Levels, set by your instructors" list per pick ("Intermediate · Nour, 6 Oct" or "Beginner · self-rated") with "Change interests and levels". Settings list: Family & kids, Payments & receipts, Notifications, Language (English / العربية), Appearance (Light / Dark / System), Become an instructor. "Sign out" (danger) with a confirmation sheet.
- **Family & kids:** largeTitle, explainer "Book and pay for your children from your account. Instructors see their first name and age only." Child cards (name · age, discipline · level, Edit), any pending booking for that child as a warning-tint row, primary "Book a session for Ali". "Add a family member" dashed card (sheet: first name, age; validation). Info rows: kids sessions 45 min ages 6–14; a guardian stays on site.
- **Payments & receipts:** saved methods (default marked), Add card, receipts list (refunded ones struck through).
- **Notifications:** switches for Session reminders, Messages from instructors, Booking changes, Offers (at most weekly); Remind me timing row.

### 7.15 Arabic / RTL
Full mirroring: layout, chevrons, back arrows, progress fill direction, tab order. Numbers in Arabic-Indic digits, `٫` decimal, prices `٣٩٠ ج.م`, distances `٢٫٤ كم`. Day names: الأحد الاثنين الثلاثاء الأربعاء الخميس الجمعة السبت. Approved Arabic strings exist for Home (e.g. greeting "مساء الخير يا عمر", search "مدرب أو رياضة أو منطقة", "الحصة القادمة · بعد يومين", "متاح اليوم بالقرب منك", tabs الرئيسية · استكشف · حجوزاتي · الرسائل · حسابي). All other Arabic copy **[OPEN]**: needs a translator.

---

## 8. Motion

| Moment | Spec |
|---|---|
| Push / pop | Native stack transition (new screen from the trailing edge). |
| Sheets | Native sheet; glass. |
| Category tray | Dim fades in over 0.25 s; card springs up over ~0.5 s with slight overshoot; radio dot scales in over 0.2 s; tray closes ~0.25 s after a choice. |
| Tab bar minimise | Scale/opacity pop, ~0.25 s. |
| Nav title on detail screens | Fades and rises 6 pt as the hero leaves. |
| Confirmation | Ring draw 0.8 s, then tick 0.45 s. |
| Toast | Slides down from the top, holds ~2.6 s, fades. |
| Typing indicator | Three dots pulsing in sequence. |
| Reduce Motion | All of the above become fades or nothing; content always visible. |

---

## 9. Business rules

1. **Cancellation:** free cancellation until 24 hours before the start time. Inside 24 hours: the booking can still be cancelled but is **not refunded**. Same-day bookings are final (non-refundable from the moment of booking). Pay-at-venue bookings: nothing charged, nothing refunded. Wording after the window: `[late-cancellation policy]`; refund timing: `[refund timing]` (prototype used "within 3–5 working days" as a placeholder).
2. **Recurring weekly bookings:** cancelling offers "this week only" (the series moves to next week) or "every week".
3. **Reschedule** moves the existing booking (same ref) to a new open slot of the same instructor; status recalculated.
4. **Session types:** Private 1:1 (60 min, one person), Small group (60 min, up to 4, price per person), Kids (45 min, ages 6–14, guardian on site, booked for a family member), Workshop (fixed date/time, fixed capacity, price per seat, max 3 seats per booking, materials as listed).
5. **Status:** `pending` (kids requests and any instructor-approval offering, until the instructor confirms), `confirmed`, `completed` (after end time), `cancelled` (with refund amount).
6. **Availability:** a slot is bookable only if it is in the future (today: at least 60 minutes ahead), not booked, and inside the instructor's published availability. Workshop seats are bookable while seats remain. Slot and seat holds must be atomic (no double booking).
7. **Prices:** shown in EGP, VAT included, venue/court fee included unless stated. "From" = lowest offered price (or lowest for the selected session type filter).
8. **Promo codes:** percentage off one booking (demo code `CFA10` = 10%). Invalid codes show an inline error.
9. **Booking reference:** `CFA-` + 5 digits.
10. **Privacy:** instructors see a learner's phone number only after a booking; for children, instructors see first name and age only.
11. **Reminders:** default 2 hours before; options in section 7.10.
12. **Members' Circle:** credit-based membership. All terms `[N]`, `[date]`, `[membership price]` are **[OPEN]**.

---

## 10. Data model (starting proposal for the spec)

`users` (phone, name, area, language, theme, created_at) · `family_members` (user_id, first_name, age) · `interests` (user_id, discipline_id, level, level_source: self|instructor, set_by, set_at) · `categories` (hobbies, sports, education, languages) · `disciplines` (category_id, name_en, name_ar, icon) · `instructors` (user_id, display_name, bio, gender, years, certification, rating_avg, rating_count, reply_time, verified) · `instructor_disciplines` (levels taught) · `venues` (name, area, lat, lng, notes) · `offerings` (instructor_id, discipline_id, type: private|group|kids|workshop, duration_min, price_egp, capacity, materials, description) · `availability_rules` and `slots` (offering/instructor, starts_at, ends_at, capacity, seats_taken) · `workshops` (offering_id, dates, capacity) · `bookings` (ref, user_id, for_family_member_id, slot_id, seats, status, price_egp, promo_id, recurring_series_id, note, created_at) · `payments` (booking_id, method, provider_ref, amount, status) · `refunds` · `promo_codes` · `threads` / `messages` (text, media type: video|voice|image, read_at) · `reviews` (booking_id, stars, text) · `favourites` · `notification_prefs` · `memberships` **[OPEN]**.

---

## 11. Content style

- Calm, specific, confident. Numbers over adjectives: "Next: Today 17:30", not "Available soon".
- Sentence case for titles and buttons. Buttons name the outcome.
- Status words explain themselves: "Waiting for Nour to confirm", not "Pending".
- No small labels above headings ("Step 2 of 3"), no rows of tick icons selling features, no shadows on resting content, no gradients except neutral scrims, no emoji, headlines in two lines or fewer.

---

## 12. Accessibility (acceptance criteria)

- Text contrast ≥ 4.5:1 in both themes (≥ 3:1 for 24 pt+). `label-3` only for disabled.
- Every control ≥ 44 × 44 pt and has an accessibility label; icon-only buttons always labelled.
- Dynamic Type to AX sizes without clipping prices or times.
- VoiceOver order follows visual order; sheets and the tray are modal; toasts are announced.
- Reduce Transparency, Increase Contrast and Reduce Motion each behave as in section 4.3 and 8.
- Full RTL in Arabic.

---

## 13. Imagery

Approved designs use flat illustrations as stand-ins. Production needs real photography: instructors in action (4:5 portraits, faces in the top third), workshop banners (2:1), Welcome hero (portrait, ~393 × 560 safe area). Until photos exist, use neutral placeholders with the instructor's initials-free silhouette; never ship stock photos presented as real instructors.

---

## 14. Sample content used in the designs (seed data, all fictional)

**Hobbies.** Yasmine Fathy, pottery, Zamalek (The Clay Room), 4.9 (112), from 450 EGP. Workshops: Wheel-throwing taster, Sat 17 Oct 11:00–13:00, 8 seats, 650 EGP, clay/glaze/firing included; Hand-building: a mug, Tue 20 Oct 19:00, 550 EGP; Glazing day, Sat 24 Oct 11:00, 400 EGP. 1:1 on the wheel 90 min 900 EGP; Kids clay club 60 min 450 EGP. Rana Mostafa, watercolour and oils, Maadi; workshop Watercolour on the Nile, Sat 17 Oct 16:30, Maadi Corniche, 10 seats, 450 EGP. Hany Adel, street photography, Downtown; Photo walk on Al-Muizz Street, Sun 18 Oct 08:00, 12 seats, 350 EGP. Dina Samir, oud, Heliopolis, from 500 EGP. Ahmed Ezz, Arabic calligraphy, Downtown; Ruq'ah calligraphy basics, Sun 18 Oct 18:00, 6 seats, 400 EGP.

**Sports.** Nour El-Sayed, padel, New Cairo (Cedar Court Club, Fifth Settlement), 4.9 (128), 1:1 650 / group 390 / kids 520, FIP Level 2, 9 yrs. Karim Fawzy, tennis, Zamalek (Gezira Courts, Court 3), 1:1 800 / group 480 / kids 600. Laila Hassan, squash, Maadi (Maadi Squash Centre, Degla), 1:1 850 / group 540. Mariam Tarek, swimming, Maadi (Aqua Club Pool), 1:1 600 / group 360 / kids 450. Hazem Shafik, basketball, New Cairo, 1:1 500 / group 300 / kids 400. Salma Nabil, fitness, Zamalek (Studio Nile), 1:1 550 / group 320.

**Education.** Mona Ashraf, maths (IGCSE and American diploma), New Cairo, from 450 EGP; IGCSE Maths revision group Mon & Wed 18:00, 6 seats, 450 EGP/session. Sherif Nabil, coding for kids 8–14, online or Maadi, from 400 EGP.

**Languages.** Claire Dubois, French A1–B2, Zamalek, from 420 EGP; French conversation café Sun 18 Oct 19:00, 10 seats, 300 EGP. Nada Youssef, English conversation, online or Heliopolis, from 350 EGP.

**Learner.** Omar Mansour, New Cairo, member since 2025, phone +20 100 234 5678, child Ali (9). Demo SMS code 482917.

---

## 15. Open questions for the product owner

1. Final Welcome and Confirmed copy for the hobbies-first positioning.
2. Late-cancellation wording, refund timing, Members' Circle terms and price.
3. Which payment methods ship in the MVP and with which provider.
4. Instructor commission and payout schedule.
5. Whether instructors must approve every booking or only kids/first-time bookings.
6. Full Arabic copy set.
