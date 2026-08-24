The primary reason "AI-generated" vibe-coded websites look generic is **visual saturation**: stacking too many competing gradients, glow borders, tilted 3D transforms, and animated text styles all fighting for the user's attention at the same time.

To combine all of these React Bits components and motion physics into a polished, high-end design, apply these structural and layout rules.

---

### 1. Establish Visual Hierarchy & Component Roles

Avoid putting multiple high-intensity effects in the same viewport. Every section needs a single **hero element** and quiet supporting elements.

* **Hero Section:** Keep the *Molten Metal* shader canvas strictly behind your main headline and *Lanyard* 3D card. Use *Stroke Text* sparingly (only on your name or primary role), and pair it with a plain, highly legible sans-serif font for your subheadline.
* **Feature Cards (Card Swap / Spotlight / Bento):** Do not combine *Border Glow*, *Spotlight Card*, *Glass Surface*, and *Tilted Card* all on the same single card.
* Use **Spotlight Card** for the primary Bento grid containers.
* Use **Tilted Card** exclusively for interactive media previews.
* Reserve **Border Glow** for your single high-priority call-to-action or featured project badge.


* **Text Effects (Gradient / Shiny / Curved Loop):** Treat animated text like hot sauce. Use *Gradient Text* on 1–2 key impact words per section, *Shiny Text* on small status badges (e.g., `"● Available for Hire"`), and *Curved Loop* as a subtle section divider—never on long paragraphs.

---

### 2. Tame the Blue & Orange Palette

AI prompts often generate over-saturated pure blues (`#0000FF`) and neon oranges (`#FFA500`) against pure `#000000` pitch black, which looks synthetic.

* **Set a 60-30-10 Distribution:**
* **60% Neutral Base:** Slate/zinc backgrounds (`#090d16` in dark mode, `#f8fafc` in light mode).
* **30% Primary Structural Color:** Deep Cobalt/Navy Blue for subtle borders, active navigation tabs, and badge backgrounds.
* **10% Electric Accent:** Warm Ember/Tangerine Orange reserved strictly for primary interactive actions (*Specular Button*, primary hover states, metrics highlights like the *Count Up* component).


* **Calibrate Glass Surfaces:** When using *Glass Surface*, use a very low opacity (`bg-white/5` or `bg-slate-900/40`) with a heavy backdrop blur (`backdrop-blur-md`) and a subtle 1px border (`border-white/10`) to keep text crisp.

---

### 3. Layout Architecture & Component Placement

Organize your four main views so the components feel natural rather than crammed:

```
├── Home Page
│   ├── Hero: Molten Metal Canvas + Lanyard Profile + Stroke Text Name + Magnet CTA
│   ├── Stats Bar: Count Up (10+ Projects) + Shiny Text Status
│   ├── Featured Work: Card Swap (Top 5 Projects)
│   ├── Project Wall: Drift Wall preview (endless infinite scroll)
│   ├── Tech Ecosystem: Logo Loop (categorized rows with hover popovers)
│   └── Experience & Highlights: Magic Bento + Accordion Gallery
│
├── Projects Page
│   ├── Header: Gradient Text + Filter Tabs
│   ├── Grid: Chroma Grid (clicking any card navigates to /projects/[id])
│   └── Project Detail (/projects/[slug]): Case study copy, tech Logo Loop, live demo links
│
├── About Page
│   ├── Narrative: Clean typography + Glass Surface timeline
│   └── Credentials: Magic Bento layout for tooling, education, and achievements
│
└── Contact Page
    └── Form Container: Curved Input fields + Specular Button submission + Turnstile

```

---

### 4. Spacing, Rhythm & Typography Rules

* **Generous Negative Space:** Give every section generous padding (`py-24` to `py-32` on desktop). Dense layouts immediately feel cluttered when animations are running.
* **Type Hierarchy:** Pair a modern geometric display font (e.g., *Geist*, *Inter*, or *Cabinet Grotesk*) for headlines with a clean, high-contrast monospace (e.g., *JetBrains Mono*) for technical badges, tags, and logo loop details.
* **Constrain Reading Widths:** Keep body text strictly inside `max-w-2xl` to ensure comfortable line lengths.

---

### 5. Defensive Performance Checklist

* **Canvas Viewport Culling:** Wrap the *Molten Metal* shader and *Lanyard* WebGL canvases in an `IntersectionObserver`. When scrolled out of view, set `cancelAnimationFrame` or toggle component rendering off.
* **Bundle Optimization:** Ensure Motion runs strictly under `<LazyMotion features="{domAnimation}" strict>` to prevent dragging the full Framer Motion bundle into the initial page load.
* **Logo Loop Efficiency:** In the categorized tech stack rows, use CSS translation keyframes (`transform: translate3d`) for infinite scrolling rather than heavy JavaScript loops. Attach shadcn `Tooltip` or `Popover` components to each item so proficiency info appears on hover without blocking the scroll thread.