import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Award,
  Code,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Layers,
  Terminal,
  Trophy,
} from 'lucide-react';
import dataService from '@/services/dataService';
import { RatingBars } from '@/components/common/RatingBars';
import {
  ColorBends,
  DotField,
  ProfileCard,
  CardSwap,
  Card,
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
} from '@/components/reactbits';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const profile = dataService.getProfile();
  const allProjects = dataService.getProjects();
  const topProjects = dataService.getTopProjects(5);
  const techStack = dataService.getTechStack();
  const achievements = dataService.getAchievements();

  const [activeHoveredSkill, setActiveHoveredSkill] = useState<{ title: string; proficiency: number } | null>(null);
  const [hoveredAwardIndex, setHoveredAwardIndex] = useState<number | null>(null);

  // All 9 achievements split into 2 rows for AccordionGallery
  const allAccordionAwards = achievements.map((a, idx) => ({
    id: a.id,
    image: allProjects[idx % allProjects.length]?.gallery[0] || '/images/Escano_Business-Profile-Image_Transparent.png',
    label: a.title.split('|')[0]?.trim() || a.title,
    fullTitle: a.title,
    description: a.description,
  }));

  const awardsRow1 = allAccordionAwards.slice(0, 5);
  const awardsRow2 = allAccordionAwards.slice(5);

  // Tech stack logo loop rows (pure titles)
  const frontendSkills = techStack['Frontend']?.items || [];
  const backendSkills = techStack['Backend']?.items || [];
  const gameAiSkills = [
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

  const displayedAward =
    hoveredAwardIndex !== null ? allAccordionAwards[hoveredAwardIndex] : allAccordionAwards[0];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* ──────────────────────────────────────────────────────────
          1. HERO SECTION (DotField on top of ColorBends)
      ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Layered Background Shaders: ColorBends + DotField */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-60 overflow-hidden">
          <ColorBends
            colors={['#3845C9', '#60a5fa', '#f97316']}
            rotation={75}
            speed={0.15}
            scale={1.2}
            warpStrength={0.8}
            intensity={1.1}
            transparent={true}
          />
          <div className="absolute inset-0">
            <DotField
              dotRadius={1.5}
              dotSpacing={16}
              bulgeStrength={65}
              glowRadius={160}
              gradientFrom="rgba(56, 69, 201, 0.45)"
              gradientTo="rgba(249, 115, 22, 0.35)"
            />
          </div>
        </div>

        {/* Smooth blur and gradient transition to the next section */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none backdrop-blur-[1px] z-10" />

        <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Responsive Text Alignment (Centered on small, Left-aligned on large) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-brand-cobalt/40 shadow-md backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange"></span>
              </span>
              <ShinyText
                text="Available for Full-Stack & Game Development • Cebu, PH"
                speed={3}
                className="text-xs font-mono font-medium"
              />
            </div>

            {/* Main Name Drawing Title ("simon-escano") */}
            <div className="w-full max-w-2xl flex justify-center lg:justify-start">
              <StrokeText
                text="simon-escano"
                strokeColor="#3845C9"
                fillColor="currentColor"
                strokeWidth={1.8}
                drawDuration={1.6}
                fillDelay={0.2}
                fontSize={72}
                fontWeight={600}
                letterSpacing={-1.5}
                className="text-slate-900 dark:text-white"
              />
            </div>

            {/* Tagline */}
            <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-slate-800 dark:text-slate-100">
              <GradientText
                colors={['#3845C9', '#60a5fa', '#f97316']}
                animationSpeed={5}
                className="font-semibold"
              >
                Full-Stack Developer & Software Architect
              </GradientText>
            </h2>

            {/* Philosophy / Intro Scramble */}
            <div className="max-w-xl text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <ScrambledText radius={70} duration={500}>
                {profile.philosophy}
              </ScrambledText>
            </div>

            {/* Key Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
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
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-brand-orange" />
                  <span>Get in Touch</span>
                </Link>
              </Magnet>
            </div>

            {/* Floating Mini-Badges */}
            <div className="flex flex-wrap gap-2 pt-2 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-brand-cobalt/10 border border-brand-cobalt/30 text-brand-cobalt dark:text-blue-400">
                <Trophy className="w-3.5 h-3.5 text-brand-orange" />
                <span>9x Hackathon Winner</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-brand-cobalt/10 border border-brand-cobalt/30 text-brand-cobalt dark:text-blue-400">
                <Code className="w-3.5 h-3.5 text-brand-cobalt dark:text-blue-400" />
                <span>BS Computer Science (CIT-U)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-brand-cobalt/10 border border-brand-cobalt/30 text-brand-cobalt dark:text-blue-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>AWS & PhilNITS Certified</span>
              </span>
            </div>
          </div>

          {/* Right Column: 3D Profile Card */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-sm sm:max-w-md">
              <ProfileCard
                name="simon-escano"
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
      <section id="stats" className="py-12 border-y border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <SpotlightCard className="text-center p-6 bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-display font-semibold text-brand-orange">
                <CountUp to={10} duration={1.5} />
                <span>+</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Flagship Projects
              </p>
            </SpotlightCard>

            <SpotlightCard className="text-center p-6 bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-display font-semibold text-brand-cobalt dark:text-blue-400">
                <CountUp to={9} duration={1.5} />
                <span>🏆</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Hackathon Awards
              </p>
            </SpotlightCard>

            <SpotlightCard className="text-center p-6 bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-display font-semibold text-brand-orange">
                <CountUp to={5} duration={1.5} />
                <span>+</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Industry Badges
              </p>
            </SpotlightCard>

            <SpotlightCard className="text-center p-6 bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-display font-semibold text-emerald-500">
                <CountUp to={100} duration={1.5} />
                <span>%</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Performance Focus
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. TOP 5 FLAGSHIP SHOWCASE (CardSwap with Photos)
      ────────────────────────────────────────────────────────── */}
      <section id="featured" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-cobalt/10 border border-brand-cobalt/30 text-brand-cobalt dark:text-blue-400 text-xs font-mono mb-2">
              <Layers className="w-3.5 h-3.5 text-brand-orange" />
              <span>Interactive 3D Deck</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              Selected <GradientText colors={['#3845C9', '#60a5fa', '#f97316']}>Flagship Works</GradientText>
            </h2>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-mono font-medium text-white transition-all group"
          >
            <span>View All 10 Projects</span>
            <ChevronRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* CardSwap Deck with Images */}
        <div className="bg-slate-100/60 dark:bg-slate-900/30 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md flex justify-center overflow-hidden">
          <CardSwap width={480} height={370} cardDistance={45} verticalDistance={28}>
            {topProjects.map((p) => (
              <Card
                key={p.id}
                className="p-5 flex flex-col justify-between cursor-pointer group h-full select-none"
                onClick={() => navigate(`/projects/${p.id}`)}
              >
                <div>
                  {/* Embedded Project Image */}
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-3 bg-slate-950/80 border border-slate-200 dark:border-white/10">
                    <img
                      src={p.gallery[0] || '/images/Escano_Business-Profile-Image_Transparent.png'}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-slate-900/90 text-brand-orange border border-white/10 font-semibold backdrop-blur-md">
                      {p.contributions.split('&')[0]?.trim() || 'Architecture'}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-semibold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {p.one_liner}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {p.tech_stack.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-mono font-semibold text-brand-cobalt dark:text-blue-400 group-hover:underline flex items-center gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. TECH PROFICIENCY (LogoLoop + 10-Bar Hover Rating)
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-cobalt/10 border border-brand-cobalt/30 text-brand-cobalt dark:text-blue-400 text-xs font-mono mb-2">
              <Terminal className="w-3.5 h-3.5 text-brand-orange" />
              <span>Multi-Disciplinary Stack</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Tech Proficiency
            </h2>
            <p className="mt-1 text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-mono">
              (hover to show proficiency)
            </p>
          </div>

          {/* Active Hover Rating Indicator Card */}
          <div className="h-12 flex items-center justify-center mb-6">
            {activeHoveredSkill ? (
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-brand-cobalt/40 shadow-lg animate-in fade-in zoom-in-95 duration-150">
                <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
                  {activeHoveredSkill.title}
                </span>
                <RatingBars value={activeHoveredSkill.proficiency} />
                <span className="text-xs font-mono text-brand-orange font-semibold">
                  {activeHoveredSkill.proficiency}/10
                </span>
              </div>
            ) : (
              <span className="text-xs font-mono text-slate-400">Hover over any technology badge to inspect rating</span>
            )}
          </div>

          <div className="space-y-5">
            {/* Frontend Row */}
            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/5 backdrop-blur-sm">
              <div className="text-[11px] font-mono uppercase tracking-wider text-brand-cobalt dark:text-blue-400 mb-2 px-2 font-semibold">
                Frontend & UI Architecture
              </div>
              <LogoLoop
                logos={frontendSkills.map((item) => ({
                  title: item.title,
                  proficiency: item.proficiency,
                }))}
                speed={45}
                direction="left"
                gap={20}
                scaleOnHover={true}
                onLogoHover={(logo) => setActiveHoveredSkill(logo as any)}
                onLogoLeave={() => setActiveHoveredSkill(null)}
              />
            </div>

            {/* Backend Row */}
            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/5 backdrop-blur-sm">
              <div className="text-[11px] font-mono uppercase tracking-wider text-brand-orange mb-2 px-2 font-semibold">
                Backend, Cloud & Microservices
              </div>
              <LogoLoop
                logos={backendSkills.map((item) => ({
                  title: item.title,
                  proficiency: item.proficiency,
                }))}
                speed={45}
                direction="right"
                gap={20}
                scaleOnHover={true}
                onLogoHover={(logo) => setActiveHoveredSkill(logo as any)}
                onLogoLeave={() => setActiveHoveredSkill(null)}
              />
            </div>

            {/* Game Dev, AI & Database Row */}
            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/5 backdrop-blur-sm">
              <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-500 mb-2 px-2 font-semibold">
                Game Physics, AI Diagnostics & Storage
              </div>
              <LogoLoop
                logos={gameAiSkills.map((item) => ({
                  title: item.title,
                  proficiency: item.proficiency,
                }))}
                speed={40}
                direction="left"
                gap={20}
                scaleOnHover={true}
                onLogoHover={(logo) => setActiveHoveredSkill(logo as any)}
                onLogoLeave={() => setActiveHoveredSkill(null)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          5. ACHIEVEMENTS & AWARDS (Two Rows Accordion + Hover Card)
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-slate-200 dark:border-white/10 bg-slate-100/40 dark:bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono">
              <Award className="w-3.5 h-3.5" />
              <span>National & APAC Honors</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Championships & <span className="text-brand-orange">Awards</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-mono">
              (hover over items to inspect details)
            </p>
          </div>

          {/* Row 1 Accordion Gallery */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-500 uppercase px-2">Premier National Championships (Batch 1)</div>
            <AccordionGallery
              items={awardsRow1}
              height={260}
              accentColor="#f97316"
              expandRatio={0.45}
              onItemHover={(idx) => setHoveredAwardIndex(idx)}
            />
          </div>

          {/* Row 2 Accordion Gallery */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-500 uppercase px-2">APAC & Research Honors (Batch 2)</div>
            <AccordionGallery
              items={awardsRow2}
              height={260}
              accentColor="#3845C9"
              expandRatio={0.45}
              onItemHover={(idx) => setHoveredAwardIndex(idx + awardsRow1.length)}
            />
          </div>

          {/* Dynamic Hover Details Card */}
          {displayedAward && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/70 border border-slate-200 dark:border-brand-cobalt/30 shadow-xl backdrop-blur-md transition-all duration-300">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4 mb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase text-brand-orange font-semibold">
                    Honors Recognition
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-slate-900 dark:text-white mt-1">
                    {displayedAward.fullTitle}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-brand-cobalt/10 border border-brand-cobalt/30 text-brand-cobalt dark:text-blue-400 font-semibold">
                  Verified Honor
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {displayedAward.description}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          6. CURVED MARQUEE & CONTACT CTA
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-white/10">
        <div className="w-full mb-8">
          <CurvedLoop
            marqueeText="LET'S BUILD SOMETHING EXTRAORDINARY TOGETHER ✦ FULL STACK ✦ GAME DEV ✦ SIMON-ESCANO ✦ "
            speed={1.4}
            curveAmount={130}
            className="fill-slate-800 dark:fill-white font-display text-3xl sm:text-4xl font-semibold uppercase tracking-widest"
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
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                Have a project or opportunity in mind?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                Type your inquiry or email below to jump directly into a connected discussion with simon-escano.
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
