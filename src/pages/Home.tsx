import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Award,
  Code,
  ShieldCheck,
  Zap,
  ExternalLink,
  ChevronRight,
  Layers,
  Terminal,
  Trophy,
} from 'lucide-react';
import dataService from '@/services/dataService';
import {
  MoltenMetal,
  ProfileCard,
  CardSwap,
  Card,
  DriftWall,
  AccordionGallery,
  SpotlightCard,
  BorderGlow,
  SpecularButton,
  CurvedInput,
  LogoLoop,
  Magnet,
  CountUp,
  CurvedLoop,
  GradientText,
  ScrambledText,
  ShinyText,
  StrokeText,
  MagicBento,
} from '@/components/reactbits';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const profile = dataService.getProfile();
  const allProjects = dataService.getProjects();
  const topProjects = dataService.getTopProjects(5);
  const techStack = dataService.getTechStack();
  const achievements = dataService.getAchievements();

  // 10 DriftWall items
  const driftWallItems = allProjects.map((p) => ({
    title: p.title,
    image: p.gallery[0] || '/images/Escano_Business-Profile-Image_Transparent.png',
    internalPath: `/projects/${p.id}`,
  }));

  // AccordionGallery items for top achievements
  const topAchievementAwards = achievements.slice(0, 5).map((a, idx) => ({
    image: allProjects[idx % allProjects.length]?.gallery[0] || '/images/Escano_Business-Profile-Image_Transparent.png',
    label: a.title.split('|')[0]?.trim() || a.title,
    description: a.description,
  }));

  // Bento cards for MagicBento
  const bentoCards = [
    {
      title: 'Swiss Innovation Prize Champion',
      label: 'Batch 2026 Winner',
      description:
        'Engineered STEMIFlow real-time risk-prediction engines, hospital pre-alert telemetry, and automated PhilHealth referral pipelines.',
      tags: ['Next.js', 'WebSockets', 'HealthTech', 'Cloud'],
      className: 'lg:col-span-2',
    },
    {
      title: 'DisruptorX Champion 2026',
      label: 'College Track',
      description:
        'Architected PixCell full-stack platform and real-time vision pipelines to automate laboratory digital microscopy workflows.',
      tags: ['Computer Vision', 'Python', 'FastAPI', 'CAD'],
      className: 'lg:col-span-1',
    },
    {
      title: 'Huawei ICT Competition 1st Prize',
      label: 'Innovation Track',
      description:
        'Core systems developer behind AGIILA, engineering photogrammetry image-stitching pipelines and edge-to-ground streaming.',
      tags: ['Edge Computing', 'Photogrammetry', 'C++', 'Java'],
      className: 'lg:col-span-1',
    },
    {
      title: 'International Conference Presenter',
      label: 'Japan ACM / Scopus',
      description:
        'Presented Scopus-indexed research on cross-modal disease detection and multi-source genomic data routing pipelines.',
      tags: ['Research', 'Data Engineering', 'Machine Learning'],
      className: 'lg:col-span-2',
    },
  ];

  // Tech stack logo loop rows
  const frontendLogos = techStack['Frontend']?.items.map((item) => ({
    title: item.title,
    proficiency: item.proficiency,
  })) || [];

  const backendLogos = techStack['Backend']?.items.map((item) => ({
    title: item.title,
    proficiency: item.proficiency,
  })) || [];

  const gameAiLogos = [
    ...(techStack['Game Development']?.items || []),
    ...(techStack['AI/Machine Learning']?.items || []),
    ...(techStack['Database']?.items || []),
  ];

  const handleCurvedSubmit = (val: string) => {
    if (val.trim()) {
      navigate(`/contact?message=${encodeURIComponent(val)}`);
    } else {
      navigate('/contact');
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* ──────────────────────────────────────────────────────────
          1. HERO SECTION (With MoltenMetal Background)
      ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* WebGL Shader Container (Contained strictly to Hero with IO culling) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-55">
          <MoltenMetal
            color1="#3845C9"
            color2="#f97316"
            color3="#090d16"
            detail={0.7}
            speed={0.3}
          />
        </div>

        {/* Ambient Dark/Light Radial Vignette */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(9, 13, 22, 0.2) 0%, var(--tw-color-background, #090d16) 85%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Bio, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-900/90 border border-brand-cobalt/40 shadow-lg shadow-brand-cobalt/10 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange"></span>
              </span>
              <ShinyText
                text="Available for Full-Stack & Game Development • Cebu, PH"
                speed={3}
                color="#94a3b8"
                shineColor="#ffffff"
                className="text-xs font-mono font-medium"
              />
            </div>

            {/* Main Name Drawing Title */}
            <div className="w-full max-w-2xl">
              <StrokeText
                text="Simon Escaño"
                strokeColor="#3845C9"
                fillColor="#ffffff"
                strokeWidth={1.8}
                drawDuration={1.8}
                fillDelay={0.2}
                fontSize={76}
                fontWeight={800}
                letterSpacing={-2}
                className="mx-auto lg:mx-0"
              />
            </div>

            {/* Tagline */}
            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-slate-800 dark:text-slate-100">
              <GradientText
                colors={['#3845C9', '#60a5fa', '#f97316', '#ffedd5']}
                animationSpeed={5}
                className="font-extrabold"
              >
                Full-Stack Developer & Software Architect
              </GradientText>
            </h2>

            {/* Philosophy / Intro Scramble */}
            <div className="max-w-xl text-muted-foreground text-sm sm:text-base leading-relaxed">
              <ScrambledText radius={70} duration={500}>
                {profile.philosophy}
              </ScrambledText>
            </div>

            {/* Key Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <SpecularButton
                size="lg"
                tint="#f97316"
                tintOpacity={0.2}
                blur={8}
                onClick={() => {
                  const el = document.getElementById('featured');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else navigate('/projects');
                }}
              >
                <span>Explore 10 Projects</span>
                <ArrowRight className="w-4 h-4 ml-1 text-brand-orange" />
              </SpecularButton>

              <Magnet magnetStrength={0.3}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-brand-cobalt text-white font-medium text-sm transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-brand-orange" />
                  <span>Get in Touch</span>
                </Link>
              </Magnet>
            </div>

            {/* Floating Highlights Mini-Badges */}
            <div className="flex flex-wrap gap-2 pt-2 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-brand-cobalt/10 border border-brand-cobalt/30 text-blue-400">
                <Trophy className="w-3.5 h-3.5 text-brand-orange" />
                <span>9x Hackathon Champion</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-brand-cobalt/10 border border-brand-cobalt/30 text-blue-400">
                <Code className="w-3.5 h-3.5 text-brand-cobalt" />
                <span>BS Computer Science (CIT-U)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-brand-cobalt/10 border border-brand-cobalt/30 text-blue-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>AWS & PhilNITS Certified</span>
              </span>
            </div>
          </div>

          {/* Right Column: 3D Profile Card */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-sm sm:max-w-md">
              <ProfileCard
                name={profile.name}
                title={profile.role}
                handle="simon-escano"
                status="Available for Hire"
                avatarUrl="/images/Escano_Business-Profile-Image_Transparent.png"
                behindGlowColor="rgba(56, 69, 201, 0.45)"
                behindGlowSize="60%"
                contactText="Contact Me"
                onContactClick={() => navigate('/contact')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. IMPACT METRICS BAR (CountUp + Spotlight)
      ────────────────────────────────────────────────────────── */}
      <section id="stats" className="py-12 border-y border-white/10 dark:border-white/5 bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <SpotlightCard className="text-center p-6 bg-slate-900/50 border-white/10">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-display font-extrabold text-brand-orange">
                <CountUp to={10} duration={1.5} />
                <span>+</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider">
                Flagship Projects
              </p>
            </SpotlightCard>

            <SpotlightCard className="text-center p-6 bg-slate-900/50 border-white/10">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-display font-extrabold text-brand-cobalt dark:text-blue-400">
                <CountUp to={9} duration={1.5} />
                <span>🏆</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider">
                Hackathon Awards
              </p>
            </SpotlightCard>

            <SpotlightCard className="text-center p-6 bg-slate-900/50 border-white/10">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-display font-extrabold text-brand-orange">
                <CountUp to={5} duration={1.5} />
                <span>+</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider">
                Industry Badges
              </p>
            </SpotlightCard>

            <SpotlightCard className="text-center p-6 bg-slate-900/50 border-white/10">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-display font-extrabold text-emerald-400">
                <CountUp to={100} duration={1.5} />
                <span>%</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider">
                Performance Focus
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. TOP 5 FLAGSHIP SHOWCASE (CardSwap 3D Stack)
      ────────────────────────────────────────────────────────── */}
      <section id="featured" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-cobalt/10 border border-brand-cobalt/30 text-blue-400 text-xs font-mono mb-3">
              <Layers className="w-3.5 h-3.5 text-brand-orange" />
              <span>Interactive Card Stack</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Selected <GradientText colors={['#3845C9', '#60a5fa', '#f97316']}>Flagship Works</GradientText>
            </h2>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl">
              Click or drag through Simon’s top 5 architectural highlights — from low-level game engines to AI diagnostics.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-brand-orange text-sm font-medium text-slate-200 transition-all group"
          >
            <span>View All 10 Projects</span>
            <ChevronRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* CardSwap Deck */}
        <div className="bg-slate-900/30 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md flex justify-center overflow-hidden">
          <CardSwap
            width={480}
            height={340}
            cardDistance={50}
            verticalDistance={30}
          >
            {topProjects.map((p) => (
              <Card key={p.id} className="p-6 flex flex-col justify-between cursor-pointer group" onClick={() => navigate(`/projects/${p.id}`)}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-brand-orange/20 border border-brand-orange/40 text-brand-orange font-semibold">
                      {p.contributions.split('&')[0]?.trim() || 'Architecture'}
                    </span>
                    <span className="text-xs font-mono text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-brand-orange transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {p.one_liner}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech_stack.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                        {t.name}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-brand-cobalt dark:text-blue-400 group-hover:underline">
                    Case Study →
                  </span>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. 3D INFINITE DRIFT PROJECT WALL (DriftWall)
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/10 dark:border-white/5 bg-slate-950/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>3D Interactive Drift Gallery</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Infinite <span className="text-brand-orange">Project Stream</span>
          </h2>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Hover over any project to pause the motion physics. Click any card to inspect full technical case studies.
          </p>
        </div>

        {/* DriftWall Component */}
        <div className="w-full">
          <DriftWall
            items={driftWallItems}
            columns={4}
            speed={28}
            tileHeight={260}
            gap={20}
            tilt={-8}
          />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          5. CATEGORIZED SKILLS MATRIX (LogoLoop Rows)
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-cobalt/10 border border-brand-cobalt/30 text-blue-400 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5 text-brand-orange" />
            <span>Multi-Disciplinary Stack</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Engineered with <GradientText colors={['#3845C9', '#60a5fa', '#f97316']}>Precision Tools</GradientText>
          </h2>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base">
            Hover over any technology to inspect mastery proficiency.
          </p>
        </div>

        <div className="space-y-6">
          {/* Frontend Row (Left Loop) */}
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-2 px-2">
              Frontend & Web Architecture (Level 8-10)
            </div>
            <LogoLoop
              logos={frontendLogos.map((item) => ({
                title: `${item.title} (${item.proficiency}/10)`,
              }))}
              speed={45}
              direction="left"
              gap={24}
              scaleOnHover={true}
            />
          </div>

          {/* Backend & Systems Row (Right Loop) */}
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-brand-orange mb-2 px-2">
              Backend, Cloud & Microservices (Level 7-9)
            </div>
            <LogoLoop
              logos={backendLogos.map((item) => ({
                title: `${item.title} (${item.proficiency}/10)`,
              }))}
              speed={45}
              direction="right"
              gap={24}
              scaleOnHover={true}
            />
          </div>

          {/* Game Dev, AI & Database Row (Left Loop) */}
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2 px-2">
              Game Physics, AI / ML & Databases
            </div>
            <LogoLoop
              logos={gameAiLogos.map((item) => ({
                title: `${item.title} (${item.proficiency}/10)`,
              }))}
              speed={40}
              direction="left"
              gap={24}
              scaleOnHover={true}
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          6. HACKATHONS & RECOGNITION (AccordionGallery + MagicBento)
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/10 dark:border-white/5 bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>National & APAC Honors</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Championships & <span className="text-brand-orange">Awards</span>
            </h2>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base">
              Recognized nationally and internationally for breakthrough software architectures.
            </p>
          </div>

          {/* Accordion Gallery Showcase */}
          <div className="mb-16">
            <AccordionGallery
              items={topAchievementAwards}
              height={380}
              accentColor="#f97316"
              expandRatio={0.5}
            />
          </div>

          {/* Bento Grid Breakdown */}
          <MagicBento
            cards={bentoCards}
            particleCount={12}
            glowColor="56, 69, 201"
            enableTilt={true}
            enableBorderGlow={true}
          />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          7. CURVED MARQUEE & CONTACT CTA
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-slate-900/50 border-t border-white/10">
        <div className="w-full mb-8">
          <CurvedLoop
            marqueeText="LET'S BUILD SOMETHING EXTRAORDINARY TOGETHER ✦ FULL STACK ✦ GAME DEV ✦ SIMON ESCAÑO ✦ "
            speed={1.4}
            curveAmount={140}
            className="fill-slate-100 dark:fill-white font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-widest"
          />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BorderGlow
            edgeSensitivity={35}
            glowColor="24 95 53"
            backgroundColor="rgba(19, 27, 46, 0.85)"
            borderRadius={28}
            glowRadius={35}
          >
            <div className="p-8 sm:p-12 text-center space-y-6">
              <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                Have a project or opportunity in mind?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
                Type your inquiry or email below to jump directly into a connected discussion with Simon.
              </p>

              {/* Curved Input Inquiry Box */}
              <div className="pt-2 flex justify-center">
                <CurvedInput
                  width="100%"
                  height={56}
                  bend={12}
                  placeholder="Your message or email..."
                  buttonText="Send Inquiry"
                  onSubmit={handleCurvedSubmit}
                />
              </div>

              <div className="flex items-center justify-center gap-6 pt-4 text-xs font-mono text-slate-400">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="hover:text-brand-orange transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{profile.contact.email}</span>
                </a>
                <span>•</span>
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-brand-orange transition-colors"
                >
                  GitHub
                </a>
                <span>•</span>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-brand-orange transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>
    </div>
  );
};

export default Home;
