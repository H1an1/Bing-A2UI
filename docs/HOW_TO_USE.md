<!-- HOW_TO_USE.md -->
# HOW_TO_USE — Integrate Content Policy + Tokens to Generate Beautiful Dynamic Views

## 1) Add these files
- STYLE_CONTRACT.md
- TOKEN_MAPPING.md
- (your existing CONTENT_POLICY v0-v4)

## 2) What AI sees (prompting)
System/Developer prompt includes:
1) CONTENT policy (grouping, summary, hover rules, etc.)
2) STYLE_CONTRACT (this file)

AI must output:
- contentSpec (your current schema / A2UI-like structure)
- styleSpec (fields defined in STYLE_CONTRACT)

## 3) What the renderer does
Renderer inputs:
- contentSpec
- styleSpec

Renderer steps:
1) Validate styleSpec fields (enum only)
2) Choose preset defaults (from TOKEN_MAPPING)
3) Map semantic slots → actual tokens (Typography, Color, Radius, Elevation, Spacing)
4) Apply module mapping rules per component type
5) Run style linter (see below)
6) Render UI

## 4) Style Linter (minimum required checks)
Fail or auto-fix if any happens:
- raw CSS values appear (hex, px)
- any text on image without scrim
- accent applied to large surfaces (page bg / module bg)
- more than 3 typography tiers in one view
- hover label not single-line ellipsis

## 5) Recommended defaults (if AI omits styleSpec)
- themeMode: light
- stylePreset: clean
- density: standard
- surfaceTreatment: card
- accentPolicy: neutral
- imageTextPolicy: scrimRequired

## 6) How to get “Gemini-like vibe” safely
Only allow dynamic accent when:
- stylePreset is immersive OR editorial
- accentPolicy is fromHeroImage
And enforce:
- accent only on selected chips / badges / indicators
- never on page/module large backgrounds