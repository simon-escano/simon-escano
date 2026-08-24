# Handoff — Portfolio refinements

Last updated: 2026-08-25  
Branch: `v1`

## Current status

Implementation plan phases 1–6 are in code (commit `4f98924`). Follow-up layout notes in `future_changes.md` are implemented on working tree (this commit).

| Area | Status |
|------|--------|
| Implementation plan Phases 1–6 | Done |
| `future_changes.md` layout pass | Done |
| Browser walkthrough (`implementation_plan.md` verification §2) | **Not done** |

## This commit

From `future_changes.md`:

- Content columns use `max-w-[1280px] mx-auto` (pages, footer, unscrolled nav inner).
- Scrolled header is a floating glassy bar (`mt-3`, `max-w-[1280px]`, blur, rounded) with a 500ms ease-out transition — not a full-bleed solid bar.
- Home: CardSwap and tech LogoLoop rows are unboxed. Page uses `overflow-x-hidden` so stacked cards are not clipped.
- Projects: ChromaGrid collages show up to 3 gallery shots; `+n` overlay when more exist.
- About: hero counts are plain numbers (no card chrome).
- Contact: mobile copy button; header pill is **Open to work** only.

## Repo map

- Pages: `Home.tsx`, `Projects.tsx`, `ProjectDetail.tsx`, `About.tsx`, `Contact.tsx`, `NotFound.tsx`
- Live data: `src/data/data.json` (`dataService`). Keep `data/data.json` in sync if you edit copy.
- Theme: UI that depends on dark vs light **must use `actualTheme`**, not `theme` (`system` is possible).
- Naming: `"simon-escano"` everywhere except the About story (`Simon Escaño`). Max font weight `font-semibold`.

## Known leftovers

- `DriftWall` still exists; not used on Home.
- AccordionGallery award images fall back to project screenshots.
- Home `LogoLoop` hover still uses `as any`.
- Contact Turnstile is a checkbox stub.
- Duplicate `data/data.json` vs `src/data/data.json`.
- Browser walkthrough still needed: `npm run dev` (port 3000) or preview 4173.

## How to continue

1. Walk Home / Projects / Detail / About / Contact / light-dark toggle.
2. After each **big** change: update this file and commit.

## Do not

- Use `font-bold` / `font-extrabold` / `font-black`.
- Put "Simon Escaño" on public cards/nav/hero.
- Reintroduce DriftWall on Home or a Projects view toggle.
- Skip commits or this handoff on sizable work.
