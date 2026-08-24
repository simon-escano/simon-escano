# Handoff — Portfolio refinements

Last updated: 2026-08-25  
Branch: `v1`  
Owner context: Quota cut off a prior agent mid-plan. This agent analyzed `implementation_plan.md`, closed remaining gaps, and committed.

## Current status

Implementation plan phases 1–6 are **in code**. `npm run build` (`tsc && vite build`) **passed** after the gap-close commit.

| Area | Status |
|------|--------|
| Phase 1 ColorBends + DotField + three.js vendor chunk | Done (prior commit `fc33760` / `d083de8`) |
| Phase 2 font-semibold cap, light-mode cards, ShinyText, ScrambledText spaces | Done |
| Phase 3 RatingBars + ArchitectureDiagram pan/zoom/wheel | Done |
| Phase 4 Home assembly (hero, no DriftWall section, CardSwap images, Tech Proficiency, two AccordionGallery rows) | Done |
| Phase 5 Projects ChromaGrid-only + Project Detail headers/nav | Done |
| Phase 6 About data + Contact labels | Done |
| Browser walkthrough (plan verification §2) | **Not done** — next agent should run preview at `http://localhost:4173/` (or `npm run dev` on port 3000) and walk Home / Projects / Detail / About / Contact / theme toggle |

## This commit (gap-close)

What landed after the interrupted session:

- **ArchitectureDiagram**: wheel zoom (`passive: false`), window mouseup, `actualTheme` (not `theme`, which can be `system`), light-mode error fallback.
- **ShinyText**: shine colors follow `actualTheme`.
- **ScrambledText**: non-breaking spaces so words do not collapse.
- **CurvedLoop**: public default copy `simon-escano`; SVG `fontWeight="600"`.
- **About**: education from `credentials` (`type === "education"`); language labels from `lang.level`.
- **data.json** (both `src/data/data.json` and duplicate `data/data.json`): internship `Jun 2025 - Aug 2025`; languages English Fluent 10, Tagalog Native 10, Cebuano Native 10, Japanese Beginner 3.
- **Projects**: category pills `flex-wrap` so they align with search without a layout-shifting scrollbar.
- **NotFound**: `font-semibold`; no full-name copy (full name stays on About).

## Repo map (do not rename blindly)

Windows is case-insensitive. Canonical names on disk:

- Pages: `Home.tsx`, `Projects.tsx`, `ProjectDetail.tsx`, `About.tsx`, `Contact.tsx`, `NotFound.tsx`
- Data: `src/data/data.json` is what `dataService` imports. Keep `data/data.json` in sync if you edit copy.
- ReactBits: `src/components/reactbits/` (`ColorBends`, `DotField`, `CardSwap`, `LogoLoop`, `AccordionGallery`, …)
- Theme: `useTheme()` returns `{ theme, actualTheme, setTheme, toggleTheme }`. UI that depends on dark vs light **must use `actualTheme`**.

## Known leftovers (not blockers)

- `DriftWall` still exists and is re-exported; it is **not** used on Home (plan: remove the section, not necessarily delete the primitive).
- AccordionGallery award images fall back to project gallery shots when achievements have no `image`.
- Home `LogoLoop` hover still uses `as any` when setting the active skill.
- Contact form Turnstile is a checkbox stub, not live Cloudflare Turnstile.
- Duplicate `data/data.json` vs `src/data/data.json`.

## How to continue

1. `npm run dev` (port 3000) or `npm run build && npm run preview` (4173).
2. Walk the six verification bullets in `implementation_plan.md`.
3. After each **big** change: update this file (status + leftovers) and commit.

## Do not

- Use `font-bold` / `font-extrabold` / `font-black`.
- Put "Simon Escaño" on public cards/nav/hero; About story only.
- Reintroduce DriftWall on Home or a Projects view toggle (ChromaGrid only).
- Skip commits or this handoff on sizable work.
