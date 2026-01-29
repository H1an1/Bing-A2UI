<!-- STYLE_CONTRACT.md -->
# STYLE_CONTRACT — Bing Image Dynamic View (AI Follow-Only)

## Purpose
AI generates **content + structure**, and only selects **style intent**.
AI MUST NOT output raw CSS values (no hex, no px). Use semantic roles only.

---

## 1) AI Output (styleSpec)
AI MUST output exactly these fields:

themeMode: "light" | "dark"
stylePreset: "clean" | "immersive" | "editorial" | "data"
density: "dense" | "standard" | "airy"
surfaceTreatment: "flat" | "card" | "glass"
accentPolicy: "neutral" | "fromHeroImage"
imageTextPolicy: "scrimRequired"

---

## 2) Non-Negotiables
1. Never output raw CSS values, only semantic roles.
2. Text-on-image always requires scrim + on-image text roles.
3. Accent can only be used on small UI elements:
   - selected chip state
   - timeline indicator
   - badge / key color dot
   - focus ring
4. Max 3 typography tiers per view:
   - hero/title
   - body
   - meta
5. Grouped mode must not show micro-summary (text layer exclusivity).

---

## 3) Preset Intent Guide (AI decision hints)
Use these hints only when selecting stylePreset:

clean:
- default for general browsing
- minimal decoration, high scan efficiency

immersive:
- when Focus mode or strong story vibe is helpful
- large imagery + glass/scrim layers

editorial:
- when content feels like a curated guide
- stronger layout rhythm, more breathing room

data:
- when lots of structured info modules exist (facts, comparisons)
- clearer cards, consistent spacing, strong hierarchy

---

## 4) Allowed Style Overrides (optional)
AI may optionally add:
moduleEmphasis: "low" | "medium" | "high"
(If absent, renderer decides based on preset.)

No other overrides allowed.