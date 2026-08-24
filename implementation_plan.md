# Implementation Plan — Portfolio Refinements & Enhancements

> **Status (2026-08-25):** Phases 1–6 are implemented on branch `v1`. Remaining work is the browser walkthrough in Verification Plan below. Live agent notes: [`HANDOFF.md`](./HANDOFF.md).

This plan outlines the systematic updates to implement all requested changes across the homepage, projects directory, project case studies, about page, contact page, background shaders, typography, and light mode styling.

---

## User Review Required

> [!IMPORTANT]
> - **Persona Naming**: All public mentions and cards across the portfolio will use `"simon-escano"`, reserving the full name "Simon Escaño" strictly for the About page story.
> - **Font Weight Restriction**: The entire design system and components will enforce a maximum font weight of `font-semibold` (weight 600) — eliminating `font-bold`, `font-extrabold`, and `font-black`.
> - **Three.js Installation**: `three` and `@types/three` will be installed to support the `ColorBends` shader.
> - **Hero Background**: The hero section will feature `DotField` layered on top of `ColorBends`, transitioning into the next section via a smooth blur/gradient mask.

---

## Proposed Changes

### Phase 1: Background Shaders & Three.js Integration
- Install `three` and `@types/three`.
- Implement `src/components/reactbits/ColorBends.tsx` + `ColorBends.css` from `reactbit-prompts/backgrounds/color-bends.txt`.
- Implement `src/components/reactbits/DotField.tsx` + `DotField.css` from `reactbit-prompts/backgrounds/dot-field.txt`.
- Export both from `src/components/reactbits/index.ts`.
- Update `vite.config.ts` manual chunks to include `vendor-three`.

### Phase 2: Design System, Typography & Light Mode Overhaul
- **Font Weight Cap**:
  - Update `src/index.css` and all component classes to replace `font-bold`, `font-extrabold`, `font-black` (700-900) with `font-semibold` (600).
- **Light Mode Colors & Contrast Overhaul**:
  - Fix card backgrounds in light mode: replace hard-coded dark slate colors (`bg-slate-900/60`, `bg-[#090d16]`) with adaptive tokens (`bg-white/80 dark:bg-slate-900/70 border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white`).
  - Fix `ShinyText`: in light mode, base text is dark gray (`#475569`) with signature blue/ember shine (`#3845C9`), ensuring high contrast against light backgrounds.
  - Fix muted grays: replace overly faint grays with `text-slate-600 dark:text-slate-300`.
  - Fix Hero background in light mode: subtle vibrant color bends on clean white backdrop.
- **ScrambledText Space Fix**:
  - In `src/components/reactbits/ScrambledText.tsx`, ensure spaces between words are preserved as explicit non-breaking spaces or regular space nodes without collapse.

### Phase 3: Reusable Components
- **`RatingBars` Component** (`src/components/common/RatingBars.tsx`):
  - A reusable widget displaying 10 thin horizontal bars for ratings (e.g. `7/10` -> 7 filled brand-colored bars + 3 grayed-out bars).
- **Interactive `ArchitectureDiagram` with Zoom & Pan** (`src/components/common/ArchitectureDiagram.tsx`):
  - Add interactive zoom in (+), zoom out (-), reset, and mouse wheel / drag pan controls for the Mermaid topology graph.

### Phase 4: Homepage Assembly Updates (`src/pages/Home.tsx`)
1. **Hero Section**:
   - Align text responsively: on large screens (`lg:`), all text is aligned left (`lg:text-left lg:items-start`), while on small screens, all text is centered (`text-center items-center`).
   - Title: StrokeText `"simon-escano"`.
   - ProfileCard: name `"simon-escano"`.
   - Hero background: `DotField` on top of `ColorBends` with frosted blur/gradient transition to the stats bar.
2. **Stats Counter**:
   - Update labels and styling to match font-semibold and light mode contrast.
3. **Selected Flagship Works (CardSwap)**:
   - Remove the descriptive subtitle paragraph beneath the heading.
   - Embed screenshots/photos inside the cards in `CardSwap` with title, badge, and inspect button.
4. **Remove Infinite Project Stream (`DriftWall`)**:
   - Remove the entire DriftWall section.
5. **Tech Stack -> "Tech Proficiency"**:
   - Section heading: "Tech Proficiency" with subtext `"(hover to show proficiency)"`.
   - `LogoLoop` items show pure tech names (e.g. `"CSS"`, `"React"`, `"Python"`).
   - On hover, reveal tooltip/popover containing the 10-bar horizontal rating widget.
6. **Achievements Section**:
   - Two rows of `AccordionGallery` (Row 1: top 5 awards; Row 2: remaining 4-5 awards).
   - On hovering over an accordion gallery item, dynamically display its full description and details card.

### Phase 5: Projects & Project Detail Pages
1. **Projects Directory (`src/pages/Projects.tsx`)**:
   - Heading: "Built by simon-escano".
   - Remove "Architectural Portfolio" badge.
   - Remove view options toggle buttons; make **Chroma Grid** the default and only view.
   - Fix category filter pill container overflow to align vertically with the searchbox without scrollbar displacement.
   - Replace any "Case Study" label with "Project".
2. **Project Detail (`src/pages/ProjectDetail.tsx`)**:
   - Remove "Case Study" labels.
   - Replace badges with clean text headers "The Challenge" and "The Goal".
   - Integrate interactive pan-and-zoom controls in the `ArchitectureDiagram`.
   - Minimal Previous / Next project buttons with zero stroke/box background.

### Phase 6: About Page & Contact Page
1. **About Page (`src/pages/About.tsx`) & Data (`data.json`)**:
   - Update `data.json` to reflect:
     - BSCS at CIT-U: *"Graduating Cum Laude with 4.59/5.0 GWA"*.
     - Languages: Japanese (Beginner, 3/10), English (Fluent, 10/10), Tagalog (Native, 10/10), Cebuano (Native, 10/10).
     - Standardize dates to `"Aug 25, 2026"` / `"Jun 2025 - Aug 2025"` format.
   - Merge the two intro body paragraphs into a single clear, impactful paragraph.
   - Render language ratings using the 10-bar `RatingBars` component.
   - Simplify Engineering Principles into punchy, larger-font bento cards.
2. **Contact Page (`src/pages/Contact.tsx`)**:
   - Update buttons: "GitHub Profile" -> "GitHub", "LinkedIn Network" -> "LinkedIn".
   - Remove the "Active Opportunity Window" card.

---

## Verification Plan

### Automated Verification
- Run `npm run build` to verify clean TypeScript compilation and code-splitting across all chunks.

### Browser Walkthrough Verification
- Launch preview server (`http://localhost:4173/`).
- Use the browser subagent to record a visual walkthrough:
  1. **Home Page**: Check `DotField` + `ColorBends` hero background, responsive left/center text alignment, "simon-escano" branding, `ScrambledText` spacing, `CardSwap` with images, "Tech Proficiency" hover rating bars, two-row `AccordionGallery` with hover previews.
  2. **Projects Directory**: Verify Chroma Grid default view, "Built by simon-escano" heading, search and category filter pill alignment.
  3. **Project Detail**: Test interactive pan/zoom on Mermaid topology diagram, "The Challenge" & "The Goal" headers, and minimal next/prev buttons.
  4. **About Page**: Verify merged intro text, Cum Laude 4.59 GWA, 10-bar language ratings (Japanese Beginner), punchy principles, and date format.
  5. **Contact Page**: Verify "GitHub" and "LinkedIn" buttons without opportunity window card.
  6. **Light/Dark Toggle**: Verify crisp contrast, legible text, and bright card backgrounds in light mode.
