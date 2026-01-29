<!-- TOKEN_MAPPING.md -->
# TOKEN_MAPPING — Semantic Slots → Design Tokens

## Purpose
Renderer maps semantic slots to your design system tokens.
AI never references token keys directly.

---

## A) Typography Slots
heroTitle:
- use Display tier (e.g. display1)

sectionTitle:
- use Title tier (e.g. title2)

body:
- use Body tier (e.g. body2)

meta:
- use Caption tier (e.g. caption1)

---

## B) Color Slots (semantic)
text.primary
text.secondary
surface.page
surface.module
surface.overlay
stroke.subtle
accent.active
onImage.text
onImage.scrim

---

## C) Shape & Elevation Slots
radius.ctrl
radius.card
elevation.0 / 1 / 2 / 3
transition.fast / base

---

## D) Spacing Slots
gap.xs / sm / md / lg
pad.card
pad.ctrl

---

## E) Module Mapping (what each UI module uses)

### 1) Grouping Header (group label row)
- typography: sectionTitle
- text: text.primary
- background: transparent (inherits surface.page)
- no subtitle allowed

### 2) Grouping Module Container (Swimlane / Sections wrapper)
- surfaceTreatment:
  - flat  → background surface.page
  - card  → background surface.module + radius.card + elevation.1
  - glass → background surface.overlay + radius.card + elevation.2 (use scrim-like overlay)

### 3) Swimlane (Fast Compare)
- group header: sectionTitle
- list gap: gap.sm
- each group shows 6–8 reps (content rule)
- background: surface.module (card) or surface.overlay (glass)

### 4) Vertical Sections (Deeper Browse)
- each section header: sectionTitle
- default shows max 2 rows (content rule)
- Show more expands in place (content rule)
- section container: surface.module + radius.card + elevation.0/1

### 5) Image Tile (default state)
- image-only (no persistent text)
- radius: radius.ctrl
- hover/press only shows one line: Domain · Tag

### 6) Tile Hover Label (Domain · Tag)
- typography: meta
- background: surface.overlay
- text: onImage.text
- scrim required: onImage.scrim (behind text if label sits on image)
- ellipsis: single line only

### 7) Chips / Tabs (if present)
- default: surface.module (or ctrl subtle)
- selected: accent.active
- accentPolicy:
  - neutral → use system accent tokens
  - fromHeroImage → use extracted accent ONLY for selected state stroke/bg

### 8) Timeline / Indicators (if present)
- inactive: stroke.subtle
- active: accent.active
- do not use accent on large surfaces

---

## F) Preset Defaults (renderer rules)

### clean
- density: standard
- surfaceTreatment: card (light elevation)
- elevation: 0–1
- minimal overlay

### immersive
- density: airy or standard
- surfaceTreatment: glass
- elevation: 2–3
- onImage.scrim always on for text-over-image

### editorial
- density: airy
- surfaceTreatment: card
- stronger spacing rhythm (increase gaps/padding by one step)

### data
- density: standard
- surfaceTreatment: card
- clear card grouping, consistent section dividers