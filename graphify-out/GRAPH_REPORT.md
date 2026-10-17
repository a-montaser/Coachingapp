# Graph Report - docs  (2026-10-17)

## Corpus Check
- Corpus is ~6,668 words - fits in a single context window. You may not need a graph.

## Summary
- 57 nodes · 65 edges · 9 communities (5 shown, 4 thin omitted)
- Extraction: 71% EXTRACTED · 29% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.83)
- Token cost: 74,466 input · 0 output

## Community Hubs (Navigation)
- Booking and Payment Flow
- Categories and Discovery
- Design System and Accessibility
- Phase 0 Process Decisions
- Product Identity and Tokens
- Onboarding, Profile and Navigation
- Platform and Data Foundations

## God Nodes (most connected - your core abstractions)
1. `Data model proposal (users, instructors, offerings, slots, bookings, payments...)` - 7 edges
2. `Four categories: Hobbies, Sports, Education, Languages` - 5 edges
3. `Liquid Glass material rules` - 5 edges
4. `Category tray (market-switcher sheet)` - 5 edges
5. `Book screen (1:1, group, kids)` - 5 edges
6. `Review & pay screen (payment methods, promo)` - 5 edges
7. `Coach For All (Cairo lessons marketplace)` - 4 edges
8. `Design tokens (colour, shadow, blur, radius, spacing)` - 4 edges
9. `D9: iOS and Android testing in Expo Go` - 3 edges
10. `D11: Approved Phase 0 dependencies` - 3 edges

## Surprising Connections (you probably didn't know these)
- `D4: Hosted Supabase dev project; Docker Supabase only in Linux CI` --conceptually_related_to--> `Data model proposal (users, instructors, offerings, slots, bookings, payments...)`  [INFERRED]
  DECISIONS.md → DESIGN_HANDOFF.md
- `D8: Spacing tokens space1-space7 only` --rationale_for--> `Coach For All Design Handoff`  [INFERRED]
  DECISIONS.md → DESIGN_HANDOFF.md
- `D10: Category icon names (SF Symbols / Material)` --conceptually_related_to--> `Component specs (Button, Chip, Card, Slot, Chat bubbles...)`  [INFERRED]
  DECISIONS.md → DESIGN_HANDOFF.md
- `D11: Approved Phase 0 dependencies` --implements--> `English/Arabic bilingual with RTL and Arabic-Indic digits`  [INFERRED]
  DECISIONS.md → DESIGN_HANDOFF.md
- `D11: Approved Phase 0 dependencies` --implements--> `Liquid Glass material rules`  [INFERRED]
  DECISIONS.md → DESIGN_HANDOFF.md

## Hyperedges (group relationships)
- **Booking flow: Instructor profile to Confirmed** — docs_design_handoff_instructor_profile, docs_design_handoff_book_screen, docs_design_handoff_workshop_screen, docs_design_handoff_review_and_pay, docs_design_handoff_confirmed_screen [EXTRACTED 1.00]
- **Dev environment decisions driven by old macOS 12 Mac** — docs_decisions_d3_eas_cloud_dev_builds, docs_decisions_d4_hosted_supabase, docs_decisions_d7_expo_sdk58_node22, docs_decisions_d9_expo_go_testing, docs_decisions_d14_expo_sdk57 [INFERRED 0.85]
- **Liquid Glass design system** — docs_design_handoff_liquid_glass, docs_design_handoff_glass_fallbacks, docs_design_handoff_design_tokens, docs_design_handoff_tab_bar, docs_design_handoff_components [INFERRED 0.85]

## Communities (9 total, 4 thin omitted)

### Community 0 - "Booking and Payment Flow"
Cohesion: 0.18
Nodes (11): Book screen (1:1, group, kids), Booking status lifecycle (pending, confirmed, completed, cancelled), Bookings list, Booking detail, Cancel and Rate sheets, Confirmed screen, Instructor profile screen, Messages and Chat, Open questions for product owner, Promo codes (CFA10) and booking ref CFA-##### (+3 more)

### Community 1 - "Categories and Discovery"
Cohesion: 0.20
Nodes (7): Four categories: Hobbies, Sports, Education, Languages, Category icons (palette, tennis ball, book, speech bubbles), Category tray (market-switcher sheet), Per-category vocabulary (Instructor/Coach/Tutor/Teacher), Component specs (Button, Chip, Card, Slot, Chat bubbles...), Explore screen, Filters sheet, Map view, Home screen (per category)

### Community 2 - "Design System and Accessibility"
Cohesion: 0.32
Nodes (4): English/Arabic bilingual with RTL and Arabic-Indic digits, Design tokens (colour, shadow, blur, radius, spacing), Motion specs, Type scale (SF Pro, Playfair brand moments, SF Arabic)

### Community 4 - "Product Identity and Tokens"
Cohesion: 0.33
Nodes (4): Coach For All Design Handoff, Coach For All (Cairo lessons marketplace), space-1..8 spacing scale (7 values), User roles: Learner, Instructor, Ops admin

### Community 5 - "Onboarding, Profile and Navigation"
Cohesion: 0.33
Nodes (5): App map / navigation flow, Members' Circle credit membership [OPEN], Onboarding: Sign up, Verify, Interests, Levels, Who & where, Profile, Family & kids, Payments, Notifications, Floating glass tab bar with minimise on scroll

## Knowledge Gaps
- **9 isolated node(s):** `Per-category vocabulary (Instructor/Coach/Tutor/Teacher)`, `User roles: Learner, Instructor, Ops admin`, `Type scale (SF Pro, Playfair brand moments, SF Arabic)`, `Home screen (per category)`, `Explore screen, Filters sheet, Map view` (+4 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 18 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Data model proposal (users, instructors, offerings, slots, bookings, payments...)` connect `Platform and Data Foundations` to `Booking and Payment Flow`, `Categories and Discovery`, `Onboarding, Profile and Navigation`?**
  _High betweenness centrality (0.496) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Data model proposal (users, instructors, offerings, slots, bookings, payments...)` (e.g. with `D4: Hosted Supabase dev project; Docker Supabase only in Linux CI` and `Availability rules with atomic slot/seat holds`) actually correct?**
  _`Data model proposal (users, instructors, offerings, slots, bookings, payments...)` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Per-category vocabulary (Instructor/Coach/Tutor/Teacher)`, `User roles: Learner, Instructor, Ops admin`, `Type scale (SF Pro, Playfair brand moments, SF Arabic)` to the rest of the system?**
  _9 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `Four categories: Hobbies, Sports, Education, Languages` connect `Categories and Discovery` to `Product Identity and Tokens`, `Platform and Data Foundations`?**
  _High betweenness centrality (0.388) - this node is a cross-community bridge._
- **Why does `Category tray (market-switcher sheet)` connect `Categories and Discovery` to `Design System and Accessibility`?**
  _High betweenness centrality (0.273) - this node is a cross-community bridge._