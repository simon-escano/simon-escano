I am building my personal developer portfolio from scratch.

### Context & Files in Workspace
1. `tips/`: Contains all design principles, performance guidelines, security rules, and exact component mappings (React Bits + m.dev + shadcn/ui). Read and follow every file in this directory strictly.
2. `data/`: Contains project metadata JSON and assets (project mockups, transparent profile image). Use these exact data shapes and asset paths.
3. `components/`: Contains components that should be used
4. `reactbit-prompts/`: Contains reactbit prompts for example usages

### Core Stack & Theme Constraints
- **Framework:** React / Next.js / Vite + Tailwind CSS + shadcn/ui
- **Motion & Visuals:** `m.dev` (wrapped in `<LazyMotion>`) + specific React Bits components as detailed in `tips/`
- **Color Palette:** Curated Blue & Orange theme (60% dark/light neutral base, 30% cobalt/navy structure, 10% electric ember/orange accents). Support system-default Light/Dark mode.
- **Pages / Routing:**
  - `/` (Home: Hero, Stats, Top 5 Card Swap, Drift Wall, Categorized Logo Loops, Magic Bento, Accordion Gallery)
  - `/projects` (Chroma Grid filterable gallery)
  - `/projects/[slug]` (Individual project case studies generated from `data/*.json`)
  - `/about` (Narrative, credentials, interactive profile profile-card, no project lists)
  - `/contact` (Curved Input form, Specular Button, Cloudflare Turnstile bot protection)

### Engineering & Performance Directives
- Implement `IntersectionObserver` on heavy WebGL/canvas elements (Molten Metal background, profile-card) to pause render loops when off-screen.
- Ensure all animations use GPU transforms (`transform`, `opacity`) with clean unmount lifecycles (no memory leaks).
- Keep body typography clean, legible, and unbloated—do not stack multiple competing glow/tilt effects on the same card.

### Next Step
First, analyze the project structure, inspect the files in `tips/` and `data/`, and outline the step-by-step implementation plan. Do not dump the entire codebase at once; start by scaffolding the project architecture and base theme.