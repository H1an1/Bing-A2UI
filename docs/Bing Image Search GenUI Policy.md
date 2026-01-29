# Bing Image Search GenUI Policy (AI Follow-Only) v4
（最完整整合版：v0 + v1 + v2 + v3 + v4，含 Task / Ambiguity / Decomposition / Diversity 全部 packs）

## 0 Goal
Help users quickly understand what they’re looking at in Image Search using **images + text** together, without breaking fast scanning.

---

## 1 Global Non-Negotiables (Always)
1. **Never turn image search into reading.** Text must be skimmable and optional.
2. **Everything is query-driven.** Whether to group, which dimension, how many groups, placement, and layout are all decided per query and results.
3. **If you cannot be clear, do not group.** Prefer fallback over ambiguous grouping.
4. **No detail page logic for now.** Clicking images only opens a larger preview.
5. Closing preview **does not auto-jump/auto-align**. Keep the current viewport position.
6. If grouping exists, grouping is **navigation-only**. It does not control the entire results structure.
7. If grouping exists, the grouping module must be **immediately followed by normal results grid** (continuation is obvious).
8. Group representative images should be sampled from **Top 20–40** results (AI chooses exact N).
9. **No “Others/More/Misc/General/Stuff”** groups.
10. For Category grouping, ban vague titles (**General/Popular/Trending/Nice/Good/Aesthetic**) unless the query explicitly asks for them.

---

## 2 Primary Decision: Grouped vs Non-Grouped

### 2.1 MUST NOT Group (use Non-Grouped fallback) when any is true
- Query is clear and specific AND results are highly consistent
- Results show **high subject consistency** (same main thing / typical composition dominates)
- User intent appears **very explicit** (searching for a specific target, not exploring/comparing)

### 2.2 MAY Group only if ALL are true
- None of 2.1 applies
- You can generate **clear, mutually exclusive group titles** for every group
- Grouping improves understanding/comparison more than it costs scanning speed

If any requirement fails, use Non-Grouped fallback.

---

## 3 Non-Grouped Fallback: English Micro-Summary (Top of Results)
Use ONLY when NOT grouped.

### Hard Limits
- English only
- Max **2 sentences**
- Max **20 English words total**
- Max **3 information points**

### Content Rules
- Only describe **observable phenomena** in returned results:
  - distribution patterns, visual traits, common compositions, source patterns (if clearly apparent)
- Do NOT assert externally verifiable facts:
  - no identity claims, no years/dates, no locations, no numeric conclusions

### Tone
Objective descriptive. No instruction, no lecturing, no confident factual claims.

---

## 4 Grouped Mode: Titles and Structure

### 4.1 Group Title Rules (Mandatory)
- English noun phrases
- Prefer common vocabulary
- Allow up to **2 words** when needed
- No subtitles
- Not clickable
- No vague/empty buckets (Others/More/etc.)

### 4.2 Category Grouping Special Rules
- Category labels must be **user language** (filter-like), not CV object tags.
- Avoid object-level labels like Bottle/Glass unless the query explicitly calls for them.

### 4.3 Multi-membership
Same image can appear in multiple groups. If this reduces title mutual exclusivity/clarity, do not group.

---

## 5 Group Presentation Styles (AI chooses)

### 5.1 Swimlane (Fast Compare)
Use when each group only needs a small set of representative images.
- Each group shows **6–8** representative images
- Reps sampled from **Top 20–40** results

### 5.2 Vertical Sections (Deeper Browse)
Use when groups deserve deeper viewing.
- Each group shows max **2 rows** by default
- **Show more expands in place** (no navigation, no query change)
- Reps sampled from **Top 20–40** results

### Placement Guardrails
AI chooses placement, but:
- Grouping module must be **immediately followed by normal results grid**
- Must not mislead users into thinking only grouped content exists

### Text Layer Exclusivity
If grouped, **do NOT show** the micro-summary.

---

## 6 Focus vs Browse (AI chooses)

### 6.1 Browse Mode
Default dense scanning grid.

### 6.2 Focus Mode (Highly precise; above-the-fold may show 1–4 images)
Allowed if you believe results are extremely precise.

Mandatory in Focus Mode:
- Strong “more results” affordance (peek/continuation)
- Scroll must reveal more results immediately
- No dead-end hero-only screen

Allowed Focus layouts:
- 1 large hero + peek
- 2–4 large candidates
- Normal grid with 1–4 emphasized

---

## 7 Tile Text Policy (Information-Rich Without Clutter)

### Default
Tiles are image-only.

### Hover / Press
Show one ultra-short line:
- **Domain · Tag**

Rules:
- Tag must align with **current grouping dimension**
- If no grouping or tag not applicable: show **Domain only**
- Never hallucinate tags or show empty tags

---

# v4 Grouping Triggers + Packs (Complete)

## 8 Trigger Priority (when 2.2 grouping is possible)
1. **Task intent** (highest)
2. **Ambiguity**
3. **Decomposable sub-intents**
4. **High diversity / messy results** (lowest)

If only weak signals exist, prefer Non-Grouped fallback.

---

## 9 Task Intent Pack (Highest Priority)

### 9.1 Quick Detection
Task intent is strong if query implies:
- how to / tutorial / steps / DIY / recipe / method
- best / vs / review / price / buy / brand / model
- wallpaper / background / template / icon / logo / mockup
- menu / poster / presentation / packaging / design

### 9.2 Preferred Dimensions (user language first)
Use-case → Brand → Recipe/Method → Category (filter-like)
Avoid object-level CV categories.

### 9.3 Packs (Title Candidate Pools)
Use common vocabulary; up to 2 words; no Others/More.

#### Pack T1 Recipes / Cooking
- Dimensions: Recipe/Method, Use-case
- Titles: Recipes, Ingredients, Steps, Variations, Cocktails, Smoothies
- Layout: Swimlane for compare; Vertical for deeper browsing

#### Pack T2 Brand / Product Decision
- Dimensions: Brand, Use-case, Category
- Titles: Brands, Packaging, Reviews, Comparisons, Pricing, Store brands
- Layout: Swimlane for compare; Vertical for longer browsing

#### Pack T3 Wallpaper / Background
- Dimensions: Use-case, Style (only if distinct and nameable)
- Titles: Wallpapers, Phone, Desktop, Minimal, Dark
- Layout: Focus allowed, must show more-results affordance

#### Pack T4 Logo / Icon / Template
- Dimensions: Use-case, Category (design language)
- Titles: Logos, Icons, Templates, Mockups, Branding, Samples

#### Pack T5 How-to / Tutorial (non-food)
- Dimensions: Method, Use-case
- Titles: Steps, Tools, Examples, Diagrams, Before after
- If you cannot name mutually exclusive titles: do not group

#### Pack T6 Shopping Visual Search (find similar / buy)
- Dimensions: Brand, Category (shopping language), Use-case
- Titles: Similar, Alternatives, New, Used, Details

### 9.4 Non-Grouped Micro-summary templates (Task intent)
Only if you do NOT group; still must obey summary limits.
- Mostly product photos and packaging
- Many step by step visuals and ingredient shots
- Mixed styles, with templates and mockups

---

## 10 Ambiguity Pack (Second Priority)

### 10.1 Quick Detection
Ambiguity is strong if:
- The same query plausibly refers to multiple meanings (people/place/movie/brand/term)
- Results appear clustered into clearly different topics

### 10.2 Preferred Dimension
**Semantics** (different meanings) is preferred.
Titles must be user language and mutually exclusive.

### 10.3 Ambiguity Packs

#### Pack A1 Person vs Thing
- Titles: Person, Product, Artwork, Place
- Use only titles that are truly evident in results

#### Pack A2 Multiple People (same name)
- Titles: Musician, Actor, Athlete, Politician
- Use only if differences are clear; otherwise do not group

#### Pack A3 Media Titles (movie/book/game vs generic)
- Titles: Movie, Game, Book, Characters
- Use only if results clearly separate

#### Pack A4 Brand vs Generic Term
- Titles: Brand, Packaging, Ads, Products
- Use only if brand meaning is clearly present; otherwise fallback

Ambiguity micro-summary templates (Non-grouped only):
- Mixed topics with distinct visual clusters
- Results split across multiple meanings and contexts

---

## 11 Decomposition Pack (Third Priority)

### 11.1 Quick Detection
Decomposition is strong if:
- Query is not ambiguous, but naturally splits into common sub-intents
- You can name each sub-intent with clear mutual exclusivity

### 11.2 Preferred Dimension
Category (user language), or Use-case when it fits.

### 11.3 Decomposition Packs

#### Pack D1 Food/Drink Topic (non-recipe intent)
- Titles: Brands, Packaging, Drinks, Ingredients
- Avoid Steps unless query implies method

#### Pack D2 Design Topic (broad)
- Titles: Examples, Templates, Mockups, Branding, Posters
- Avoid vague aesthetic labels unless query asks

#### Pack D3 Travel/Place Topic
- Titles: Landmarks, Maps, Photos, Hotels
- Only if each cluster is clearly present

Decomposition micro-summary templates (Non-grouped only):
- Mostly similar subjects with a few common sub-themes
- Strong clusters by use and context

---

## 12 Diversity / Messy Results Pack (Lowest Priority)

### 12.1 When to use
Only if:
- Results are messy/diverse AND
- You can still produce mutually exclusive, clear titles

If you cannot name titles clearly, do not group.

### 12.2 Preferred Dimensions
Style or Use-case only if differences are obvious and nameable.

### 12.3 Diversity Packs

#### Pack V1 Style Split (only if obvious)
- Titles: Photos, Illustrations, 3D, Minimal
- Use only if clusters are unmistakable

#### Pack V2 Use-case Split (only if obvious)
- Titles: Wallpapers, Posters, Templates, Packaging
- Use only if task-like usage is evident

Diversity micro-summary templates (Non-grouped only):
- Highly mixed visuals across styles and contexts
- Diverse compositions with no single dominant pattern

---

## 13 Output Self-Check (Must do)
Before finalizing:
1. If grouped: all titles are clear, mutually exclusive, English noun phrases, <=2 words, no subtitles, not clickable
2. No banned vague buckets (Others/More/etc.)
3. If Swimlane: each group has 6–8 reps, sampled from Top 20–40
4. If Vertical: each group max 2 rows by default; Show more expands in place
5. Grouping module is immediately followed by normal results grid
6. If not grouped: micro-summary is English, <=2 sentences, <=20 words, <=3 points, observable-only
7. If Focus: more-results continuation is obvious; scroll reveals more immediately
8. Tile hover line is Domain · Tag; Tag aligns with current grouping dimension (or Domain-only fallback)