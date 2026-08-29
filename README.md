# simon-escano — Personal Engineering Portfolio & Technical Blueprint

[![Live Site](https://img.shields.io/badge/Live-simon--escano.pages.dev-3845c9?style=flat-square&logo=cloudflare)](https://simon-escano.pages.dev)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3.4-38b2ac?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Deployment-Cloudflare%20Pages-f38020?style=flat-square&logo=cloudflare-pages)](https://pages.cloudflare.com/)

> *"Built tough, crafted clean. I connect scalable backends, intelligent data models, and modern web architectures into fast, reliable software that delivers a great user experience across any problem space."*

Welcome to the open-source repository for **simon-escano**, a modern personal portfolio and technical showcase engineered by **Simon Escaño** (Full-Stack Developer, AI Integration Architect, and Cum Laude Computer Science Graduate). 

Rather than a simple static resume, this application serves as an interactive, production-grade technical showcase demonstrating real-time computer vision, edge-native microservices, WebGL shader pipelines, offline-first healthcare engineering, and interactive structural system architectures.

---

## 🌟 Key Highlights & Innovations

- **Curated Engineering Showcase**: Deep technical case studies complete with problem statements, architectural decisions, quantified outcomes, live demo links, and high-fidelity galleries.
- **Interactive System Architecture Blueprints**: Custom pan & zoom architecture diagrams powered by **Mermaid.js**, rendering live SVG node graphs with zero layout shift.
- **Responsive WebGL Motion Layer**: Custom shaders (`ColorBends`, `DotField`, `ProfileCard`) built with **OGL** and **Three.js**, with lifecycle management via `IntersectionObserver` to automatically halt animation loops off-screen.
- **Micro-Interactions & Floating State**: Cursor-following floating achievement and skill inspection cards, 10-bar skill telemetry, and seamless frosted blur transitions.
- **Edge-Native Serverless & Bot Protection**: Contact submission pipeline routed through **Cloudflare Pages Functions** (`/api/contact`) guarded by an interactive **Cloudflare Turnstile** bot challenge.
- **Enterprise-Grade Security**: Strict Content Security Policy (CSP), HSTS, frame protection, and referrer directives configured in `public/_headers`.

---

## 🚀 Featured Solutions & Technical Index

The portfolio curates 14 production-grade systems, ranked by architectural depth and real-world impact:

| # | Solution | Core Stack | Domain / Architectural Highlight | Rating |
|:-:|:---|:---|:---|:-:|
| **1** | **[PixCell](https://pixcell-ai.vercel.app)** | Next.js, FastAPI, YOLOv8, Supabase | Real-time medical diagnostic suite with computer vision & LLM reporting *(2x Champion: DisruptorX 2026, Pitch Perfect 2025)* | `0.98` |
| **2** | **[Lupus Lens](https://lupus-lens-two.vercel.app)** | React 19, Swin-SNN, Canvas DSP, Grad-CAM | Multi-modal SLE clinical screening fusing retinal fundus scans with 20-gene transcriptomics *(Runner-Up: Taiwan DSP 2026)* | `0.94` |
| **3** | **[STEMIFlow](https://stemiflow.vercel.app)** | Next.js, TypeScript, Leaflet, Supabase | Prehospital emergency cardiac triage, traffic-aware hospital routing & cath-lab pre-alerts *(Winner: Swiss Innovation Prize)* | `0.91` |
| **4** | **[Gitlore](https://web.gitlore.workers.dev)** | React 19, Hono, Cloudflare Workers, Cerebras | Edge-native portfolio intelligence turning Git repos into streaming architectural blueprints via Wafer-Scale LLMs | `0.88` |
| **5** | **[KaagapAI](https://kaagapai-tntw.onrender.com)** | React 19, Vite, Tailwind CSS, Render | Offline-first 5-step clinical triage, predictive stockout forecasting & multilingual handoffs in English, Cebuano, and Filipino | `0.85` |
| **6** | **[AutoPBI](https://docs-autopbi.vercel.app)** | C#, Avalonia UI, Power BI Service REST APIs | Enterprise automation tool streamlining bulk dataset synchronization, scanning, and desktop `.pbix` management | `0.78` |
| **7** | **[TekNotes](https://github.com/Wetooa/TekNotes)** | Django, PostgreSQL, Redis, WebSockets | Asynchronous note-taking & real-time collaboration platform with WebSocket messaging | `0.72` |
| **8** | **[Sprout](https://github.com/Wetooa/sprout)** | Next.js, ASP.NET, Google Earth Engine, Azure | Satellite remote-sensing platform providing NDVI vegetation forecasting and drought early-warning models | `0.67` |
| **9** | **[Pawductive](https://github.com/simon-escano/Pawductive_2)** | Android (Kotlin/Java), Firebase | Gamified habit & productivity tracker leveraging psychological intrinsic drivers and virtual pet mechanics | `0.60` |
| **10**| **[Fashion MNIST](https://simon-escano.github.io/Fashion-MNIST-Classifier/)** | TensorFlow.js, WebGL, Tailwind CSS | Zero-server-cost client-side apparel classification utilizing browser-native WebGL hardware acceleration | `0.52` |
| **11**| **[Fasaar](https://github.com/simon-escano/Fasaar)** | Java, LibGDX, KryoNet, MySQL | 2.5D multiplayer game showcasing custom low-level TCP/UDP socket networking and multi-threading concurrency | `0.42` |
| **12**| **[Night Shift at Freddy's](https://simonescano.itch.io/night-shift-at-freddys)** | Java Swing, AWT | 2D retro survival horror game engineered from scratch with A* node pathfinding and proximity audio attenuation | `0.35` |
| **13**| **[Dittobase](https://youtu.be/E1VfazO4wmw)** | PHP 8, AWS RDS MySQL, Apache | Relational database portal and community cataloging system with normalized SQL architectures | `0.24` |
| **14**| **[Seizuki](https://simon-escano.github.io/Seizuki/)** | JavaScript, HTML5/CSS3, Web3.js | Streetwear-inspired Web3 frontend simulation and interactive minting experience on the SEI Network | `0.15` |

---

## 🛠️ Technology Architecture

### **Frontend & Rendering**
- **Framework**: React 18 / 19, TypeScript
- **Bundler & Build Tooling**: Vite 6, PostCSS, Autoprefixer
- **Styling**: Tailwind CSS v3.4 (custom design system tokens, CSS variables, dark/light adaptive theming)
- **Routing**: React Router DOM v6 with dynamic slug-matching (`/projects/:id`)

### **Graphics, Shaders & Visual Motion**
- **Shaders & 3D**: Three.js, OGL (lightweight WebGL library for GPU particle fields and generative gradients)
- **Motion**: Motion (`framer-motion`), GSAP (GreenSock Animation Platform)
- **Interactive Graphs**: Mermaid.js 11 (interactive client-rendered structural diagrams)
- **Icons**: Lucide React

### **Edge & Infrastructure**
- **Hosting**: Cloudflare Pages (`simon-escano.pages.dev`)
- **Serverless Edge Functions**: Cloudflare Pages Functions (`functions/api/contact.ts`)
- **Bot Mitigation**: Cloudflare Turnstile CAPTCHA integration
- **Observability**: Cloudflare Web Analytics (zero-cookie, privacy-first)

---

## 📂 Project Structure

```text
simon-escano/
├── functions/                     # Cloudflare Pages Functions
│   └── api/
│       └── contact.ts             # Contact form handler + Turnstile verification
├── public/                        # Static assets served at root
│   ├── _headers                   # Security headers (CSP, HSTS, X-Frame-Options)
│   ├── _redirects                 # SPA routing fallback rules
│   ├── favicon.svg                # Vector brand favicon
│   ├── robots.txt                 # Search crawler indexing configuration
│   ├── sitemap.xml                # SEO URL catalog
│   └── images/                    # Curated project screenshots & asset directories
│       ├── Achievements/          # Diplomas, awards, conference honors
│       ├── KaagapAI/              # BarrioCare screenshots
│       ├── Lupus Lens/            # Retinal & microarray screenshots
│       ├── PixCell/               # Medical CV suite screenshots
│       └── ...                    # Other solution galleries
├── src/
│   ├── components/
│   │   ├── common/                # Shared UI primitives (ArchitectureDiagram, RatingBars, etc.)
│   │   ├── layout/                # Global Navbar, Footer, Layout shells
│   │   └── reactbits/             # Interactive shaders & motion components (ColorBends, DotField, etc.)
│   ├── context/                   # ThemeContext (Dark/Light mode provider)
│   ├── data/
│   │   └── data.json              # Canonical single source of truth for profile & projects
│   ├── pages/                     # Main page views
│   │   ├── Home.tsx               # Hero, Metrics, CardSwap, Skills loop, Achievements gallery
│   │   ├── Projects.tsx           # Filterable ChromaGrid portfolio explorer
│   │   ├── ProjectDetail.tsx      # Comprehensive case study view with lightbox & Mermaid diagram
│   │   ├── About.tsx              # Narrative bio, education, experience, core engineering principles
│   │   ├── Contact.tsx            # Contact channels + Turnstile challenge form
│   │   └── NotFound.tsx           # 404 error fallback
│   ├── services/
│   │   └── dataService.ts         # Type-safe query service for data.json
│   ├── types/
│   │   └── data.ts                # TypeScript interface definitions (Project, Experience, Profile, etc.)
│   ├── App.tsx                    # Route hierarchy & providers
│   ├── index.css                  # Global design tokens & utility styles
│   └── main.tsx                   # Application entry point
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript compiler settings
├── vite.config.ts                 # Vite bundler, path aliases (@/), and code-splitting configuration
└── HANDOFF.md                     # Design guidelines, rhythm rules, and architectural notes
```

---

## 💻 Local Development

### **Prerequisites**
- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **npm** or **pnpm**

### **Installation**
```bash
# Clone the repository
git clone https://github.com/simon-escano/simon-escano.git

# Navigate to project directory
cd simon-escano

# Install dependencies
npm install
```

### **Running Locally**
```bash
# Start the local development server (with HMR)
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### **Production Build & Verification**
```bash
# Type check and build optimized bundle into dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 🚀 Deployment

The site is configured for edge delivery via **Cloudflare Pages**:

```bash
# Deploy production build directly using Wrangler
npx wrangler pages deploy dist --project-name=simon-escano --branch=main
```

### Automated CI/CD
When connected to GitHub via Cloudflare Pages:
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/`

---

## 🛡️ Security & Privacy

- **Content Security Policy (CSP)**: Strict script, style, and connect boundaries preventing XSS.
- **Turnstile Verification**: Server-side verification of cryptographic bot challenges before processing submissions.
- **Zero Tracker Bloat**: Privacy-respecting analytics with no third-party trackers or fingerprinting cookies.

---

## 👤 Author

**Simon Escaño**  
- **Portfolio**: [https://simon-escano.pages.dev](https://simon-escano.pages.dev)  
- **GitHub**: [@simon-escano](https://github.com/simon-escano)  
- **LinkedIn**: [linkedin.com/in/simon-escano](https://www.linkedin.com/in/simon-escano/)  
- **Email**: `escanosimonlyster@gmail.com`

---

## 📄 License

This repository is maintained as an open-source technical showcase under the [MIT License](LICENSE).
