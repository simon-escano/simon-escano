import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Code,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Trophy,
  ArrowUpRight,
} from 'lucide-react';
import dataService from '@/services/dataService';
import { RatingBars } from '@/components/common/RatingBars';
import { useTheme } from '@/context/ThemeContext';
import {
  ColorBends,
  DotField,
  ProfileCard,
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
  DecryptedText,
} from '@/components/reactbits';
import type { DriftTileItem } from '@/components/reactbits';

const HERO_TITLES = [
  'Full-Stack Dev & Software Engineer',
  'Backend Dev & Integration Engineer',
  'AI Engineer & ML App Developer',
  'Web Architect & Technical SEO Dev',
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  useTheme();
  const profile = dataService.getProfile();
  const allProjects = dataService.getProjects();
  const techStack = dataService.getTechStack();
  const achievements = dataService.getAchievements();

  const [, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const driftItems = useMemo(
    () =>
      allProjects.map(
        (p) =>
        ({
          image: p.gallery[0] || '/images/Escano_Business-Profile-Image_Transparent.png',
          title: p.title,
          internalPath: `/projects/${p.id}`,
          _projectData: p,
        } as DriftTileItem & { _projectData: typeof p })
      ),
    [allProjects]
  );

  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % HERO_TITLES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Floating cursor hover states
  const [hoveredSkill, setHoveredSkill] = useState<{ title: string; proficiency: number } | null>(null);
  const [skillCursorPos, setSkillCursorPos] = useState({ x: 0, y: 0 });

  const [hoveredAward, setHoveredAward] = useState<{
    id: string;
    image: string;
    label: string;
    fullTitle: string;
    description: string;
  } | null>(null);
  const [awardCursorPos, setAwardCursorPos] = useState({ x: 0, y: 0 });

  // Global mouse move tracker for instant and smooth floating card placement
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setSkillCursorPos({ x: e.clientX, y: e.clientY });
      setAwardCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const awardImageMap: Record<number, string> = {
    0: '/images/Achievements/champion-swiss-innovation-prize-stemiflow.jpg',
    1: '/images/Achievements/champion-disruptorx-2026-pixcell.jpg',
    2: '/images/Achievements/runner-up-taiwan-dsp-competition-lupuslens.png',
    3: '/images/Achievements/finalist-ai-ready-asean-kaagapai.png',
    4: '/images/Achievements/coauthor-icmhi-japan-conference.png',
    5: '/images/Achievements/coauthor-philippine-computing-science-congress.jpg',
    6: '/images/Achievements/champion-pitch-perfect-2025-pixcell.jpg',
    7: '/images/Achievements/runner-up-dict-philippine-startup-challenge.jpg',
    8: '/images/Achievements/first-prize-huawei-ict-competition-agiila.jpg',
  };

  // All 9 achievements split into 2 rows for AccordionGallery
  const allAccordionAwards = achievements.map((a, idx) => ({
    id: a.id,
    image: awardImageMap[idx] || allProjects[idx % allProjects.length]?.gallery[0] || '/images/Escano_Business-Profile-Image_Transparent.png',
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

  const handleSkillHover = (logo: { title?: string; proficiency?: number }) => {
    if (logo.title && typeof logo.proficiency === 'number') {
      setHoveredSkill({ title: logo.title, proficiency: logo.proficiency });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ──────────────────────────────────────────────────────────
          1. HERO SECTION (ColorBends base + DotField overlay)
      ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[64vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Layered Background Shaders: ColorBends as base ambient shader, DotField on top */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Base Shader Layer: ColorBends */}
          <div className="absolute inset-0 opacity-50 dark:opacity-70">
            <ColorBends
              colors={['#3845C9', '#60a5fa', '#f97316']}
              rotation={75}
              speed={0.15}
              scale={1.25}
              warpStrength={0.85}
              intensity={1.15}
              transparent={true}
            />
          </div>

          {/* Foreground Canvas Layer: Interactive DotField */}
          <div className="absolute inset-0 opacity-80 dark:opacity-90">
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

        {/* Smooth gradient & blur transition to the impact metrics */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/85 to-transparent pointer-events-none backdrop-blur-[2px] z-10" />

        <div className="relative z-20 max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Responsive Text Alignment (Center on small, strict Left on wide screens) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-brand-cobalt/40 shadow-md backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 dark:bg-emerald-400"></span>
              </span>
              <ShinyText
                text="Open to work • Cebu, PH"
                speed={3}
                className="text-xs font-mono font-medium"
              />
            </div>

            {/* Main Name Drawing Title ("simon-escano") */}
            <div className="w-full flex justify-center lg:justify-start">
              <StrokeText
                text="simon-escano"
                align="auto"
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
            <h2 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-center lg:text-left w-full min-h-[1.5em] flex items-center justify-center lg:justify-start">
              <DecryptedText
                text={HERO_TITLES[titleIndex]}
                speed={60}
                maxIterations={16}
                className="font-medium bg-gradient-to-r from-[#3845C9] via-[#60a5fa] to-[#f97316] bg-clip-text text-transparent"
                encryptedClassName="font-mono text-brand-orange font-medium"
                animateOn="change"
              />
            </h2>

            {/* Philosophy / Intro Scramble */}
            <div className="w-full max-w-xl text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed text-center lg:text-left">
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
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 ml-1 text-brand-orange" />
              </SpecularButton>

              <Magnet magnetStrength={0.3}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all shadow-md"
                >
                  <ArrowUpRight className="w-4 h-4 text-brand-orange" />
                  <span>Get in Touch</span>
                </Link>
              </Magnet>
            </div>

            {/* Floating Mini-Badges */}
            <div className="flex flex-wrap gap-2 pt-2 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-brand-cobalt/10 border border-brand-cobalt/30 text-brand-cobalt dark:text-blue-400">
                <Trophy className="w-3.5 h-3.5 text-brand-orange" />
                <span>9x Competition Placer</span>
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
            <div className="flex justify-center w-full max-w-sm sm:max-w-md">
              <ProfileCard
                name="simon-escano"
                title={HERO_TITLES[titleIndex]}
                handle="simon-escano"
                status="Open to work"
                iconUrl="/images/icon-pattern.png"
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
          2. IMPACT METRICS BAR (No Top Border for Seamless Blur)
      ────────────────────────────────────────────────────────── */}
      <section id="stats" className="pb-12 border-b bg-transparent border-slate-200 dark:border-white/10 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <SpotlightCard className="text-center p-6 bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-display font-medium text-brand-orange">
                <CountUp to={9} duration={1.5} />
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Competitions Placed
              </p>
            </SpotlightCard>

            <SpotlightCard className="text-center p-6 bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-display font-medium text-brand-cobalt dark:text-blue-400">
                <CountUp to={5} duration={1.5} />
                <span>+</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Industry Certifications
              </p>
            </SpotlightCard>

            <SpotlightCard className="text-center p-6 bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-display font-medium text-emerald-500">
                <CountUp to={100} duration={1.5} />
                <span>%</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Architectural Rigor
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. PROJECTS DRIFT WALL (All Projects as Compact Card Tiles)
      ────────────────────────────────────────────────────────── */}
      <section id="featured" className="pt-16 sm:pt-24 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight">
              Featured <GradientText colors={['#3845C9', '#60a5fa', '#f97316']}>Projects</GradientText>
            </h2>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-mono font-medium text-white transition-all group"
          >
            <span>View All Projects</span>
            <ChevronRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* DriftWall Container - standalone without card wrapper, natural vignette edge fade */}
        <div className="relative w-full h-[580px] sm:h-[660px] md:h-[720px] overflow-hidden">
          {/* Subtle edge fade overlays for top/sides */}
          <div className="absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-background via-background/60 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-20" />
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background to-transparent pointer-events-none z-20" />

          <DriftWall
            items={driftItems}
            columns={5}
            tileWidth={240}
            tileHeight={230}
            gap={18}
            radius={16}
            tilt={14}
            turn={-12}
            perspective={1200}
            depth={90}
            speed={30}
            direction="up"
            variance={0.45}
            parallax={0.6}
            lift={56}
            fade={0.55}
            dim={0.8}
            overlayColor="transparent"
            renderTile={(item, _isActive) => {
              const p = (item as DriftTileItem & { _projectData?: typeof allProjects[0] })._projectData;
              if (!p) {
                return (
                  <img src={item.image} alt={item.title ?? ''} loading="lazy" decoding="async" draggable={false} className="w-full h-full object-cover" />
                );
              }
              return (
                <div className="flex flex-col w-full h-full bg-white/95 dark:bg-slate-900/95 text-left select-none border border-slate-200/90 dark:border-white/10 rounded-[inherit] overflow-hidden shadow-sm hover:shadow-xl dark:shadow-2xl transition-all duration-300 backdrop-blur-md">
                  {/* Thumbnail Preview */}
                  <div className="relative w-full h-[46%] overflow-hidden bg-slate-100 dark:bg-slate-950 border-b border-slate-100 dark:border-white/5 flex-shrink-0">
                    <img
                      src={p.gallery[0] || '/images/Escano_Business-Profile-Image_Transparent.png'}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-mono bg-white/90 dark:bg-slate-900/90 text-brand-orange border border-slate-200/80 dark:border-white/15 font-medium backdrop-blur-md shadow-sm">
                      {p.contributions.split('&')[0]?.trim() || 'Architecture'}
                    </span>
                  </div>

                  {/* Info Details with Ample Vertical Spacing */}
                  <div className="flex flex-col justify-between flex-1 p-3 min-h-0">
                    <div className="space-y-1">
                      <h3 className="text-xs font-display font-medium text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors leading-tight line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {p.one_liner}
                      </p>
                    </div>

                    {/* Tech Badges & Action Button - clean non-overlapping row */}
                    <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-slate-100 dark:border-white/10 flex-shrink-0">
                      <div className="flex items-center gap-1 overflow-hidden flex-wrap flex-1 min-w-0">
                        {p.tech_stack.slice(0, 2).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap"
                          >
                            {t.name}
                          </span>
                        ))}
                        {p.tech_stack.length > 2 && (
                          <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500 flex-shrink-0">
                            +{p.tech_stack.length - 2}
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-mono font-medium text-brand-cobalt dark:text-brand-orange group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                        View →
                      </span>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. TECH PROFICIENCY (Slower Loops + Cursor-Following Hover Card)
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-slate-900 dark:text-white">
                Tech Proficiency
              </h2>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                Hover over any technology badge to inspect verified competency ratings.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Frontend Row */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-brand-cobalt dark:text-blue-400 mb-2 px-2 font-medium">
                Frontend & UI Architecture
              </div>
              <LogoLoop
                logos={frontendSkills.map((item) => ({
                  title: item.title,
                  proficiency: item.proficiency,
                  category: 'frontend' as const,
                }))}
                speed={18}
                direction="left"
                gap={12}
                scaleOnHover={true}
                onLogoHover={handleSkillHover}
                onLogoLeave={() => setHoveredSkill(null)}
              />
            </div>

            {/* Backend Row */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-brand-orange mb-2 px-2 font-medium">
                Backend, Cloud & Microservices
              </div>
              <LogoLoop
                logos={backendSkills.map((item) => ({
                  title: item.title,
                  proficiency: item.proficiency,
                  category: 'backend' as const,
                }))}
                speed={18}
                direction="right"
                gap={12}
                scaleOnHover={true}
                onLogoHover={handleSkillHover}
                onLogoLeave={() => setHoveredSkill(null)}
              />
            </div>

            {/* Game Dev, AI & Database Row */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-500 mb-2 px-2 font-medium">
                Game Physics, AI Diagnostics & Storage
              </div>
              <LogoLoop
                logos={gameAiSkills.map((item) => ({
                  title: item.title,
                  proficiency: item.proficiency,
                  category: 'game-ai' as const,
                }))}
                speed={15}
                direction="left"
                gap={12}
                scaleOnHover={true}
                onLogoHover={handleSkillHover}
                onLogoLeave={() => setHoveredSkill(null)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Skill Proficiency Card (Rendered directly into document.body to prevent layout/stacking context trapping) */}
      {hoveredSkill &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed top-0 left-0 z-[99999] pointer-events-none transition-transform duration-75 ease-out"
            style={{
              transform: `translate3d(${Math.min(Math.max(16, skillCursorPos.x + 16), window.innerWidth - 260)}px, ${Math.min(Math.max(16, skillCursorPos.y - 52), window.innerHeight - 80)}px, 0)`,
            }}
          >
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-brand-cobalt/40 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
              <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">
                {hoveredSkill.title}
              </span>
              <RatingBars value={hoveredSkill.proficiency} />
              <span className="text-xs font-mono text-brand-orange font-medium">
                {hoveredSkill.proficiency}/10
              </span>
            </div>
          </div>,
          document.body
        )}

      {/* ──────────────────────────────────────────────────────────
          5. ACHIEVEMENTS & AWARDS (Two Rows Accordion + Floating Card)
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-slate-200 dark:border-white/10 bg-slate-100/40 dark:bg-slate-950/70">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-slate-900 dark:text-white">
              Championships & <span className="text-brand-orange">Awards</span>
            </h2>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
              National and international hackathons, competitions, and peer-reviewed conference publications.
            </p>
          </div>

          {/* Row 1 & 2 Accordion Gallery with mouse leave cleanup */}
          <div
            className="flex flex-col space-y-2"
            onMouseLeave={() => setHoveredAward(null)}
          >
            <AccordionGallery
              items={awardsRow1}
              height={260}
              accentColor="#f97316"
              expandRatio={0.45}
              onItemHover={(idx) => {
                const item = awardsRow1[idx];
                if (item) setHoveredAward(item);
              }}
              onMouseLeave={() => setHoveredAward(null)}
            />
            <AccordionGallery
              items={awardsRow2}
              height={260}
              accentColor="#3845C9"
              expandRatio={0.45}
              onItemHover={(idx) => {
                const item = awardsRow2[idx];
                if (item) setHoveredAward(item);
              }}
              onMouseLeave={() => setHoveredAward(null)}
            />
          </div>
        </div>
      </section>

      {/* Floating Award Details Card (Rendered directly into document.body to prevent layout/stacking context trapping) */}
      {hoveredAward &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed top-0 left-0 z-[99999] pointer-events-none transition-transform duration-75 ease-out max-w-sm sm:max-w-md"
            style={{
              transform: `translate3d(${Math.min(Math.max(16, awardCursorPos.x + 20), window.innerWidth - 380)}px, ${Math.min(Math.max(16, awardCursorPos.y - 120), window.innerHeight - 200)}px, 0)`,
            }}
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-brand-cobalt/40 shadow-2xl backdrop-blur-xl space-y-2 animate-in fade-in zoom-in-95 duration-150">
              <span className="text-[10px] font-mono uppercase text-brand-orange font-medium block">
                Honors Recognition
              </span>
              <h4 className="text-sm sm:text-base font-display font-medium text-slate-900 dark:text-white leading-snug">
                {hoveredAward.fullTitle}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                {hoveredAward.description}
              </p>
            </div>
          </div>,
          document.body
        )}

      {/* ──────────────────────────────────────────────────────────
          6. CURVED MARQUEE & CONTACT CTA
      ────────────────────────────────────────────────────────── */}
      <section className="pb-16 sm:pb-20 pt-4 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-white/10 w-full box-border">
        {/* Marquee Header: Scaled curve & text for mobile */}
        <div className="w-full mb-6 sm:mb-8 overflow-hidden">
          <CurvedLoop
            marqueeText="LET'S BUILD SOMETHING EXTRAORDINARY TOGETHER ✦ FULL-STACK DEV & SOFTWARE ENGINEER ✦ BACKEND DEV & INTEGRATION ENGINEER ✦ AI ENGINEER & ML APP DEVELOPER ✦ WEB ARCHITECT & TECHNICAL SEO DEV ✦ SIMON-ESCANO ✦ "
            speed={1.4}
            curveAmount={60} // Reduced on mobile base; let CSS handle scaling
            className="fill-slate-800 dark:fill-white font-display text-xl sm:text-3xl md:text-4xl font-medium uppercase tracking-widest"
          />
        </div>

        {/* Main Card Container */}
        <div className="w-full max-w-3xl mx-auto px-3 sm:px-6 lg:px-8 box-border">
          <div className="w-full max-w-full overflow-hidden rounded-[20px] sm:rounded-[28px] shadow-sm">
            <BorderGlow
              edgeSensitivity={35}
              glowColor="24 95 53"
              borderRadius={24}
              glowRadius={30}
              className="w-full max-w-full"
            >
              <div className="p-5 sm:p-8 md:p-12 text-center space-y-5 sm:space-y-6 w-full max-w-full box-border min-w-0">

                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-slate-900 dark:text-white leading-tight break-words px-1">
                  Have a project or opportunity in mind?
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed break-words px-2">
                  Drop your inquiry or email below to start a direct discussion.
                </p>

                {/* Curved Input Wrapper */}
                <div className="w-full max-w-full sm:max-w-md mx-auto pt-1 sm:pt-2 flex justify-center min-w-0 [&_svg]:drop-shadow-none [&_svg]:overflow-visible [&_filter]:hidden [&_path]:[filter:none]">
                  <div className="w-full bg-transparent">
                    <CurvedInput
                      width="100%"
                      height={50}
                      bend={8}
                      placeholder="Your message or email..."
                      buttonText="Send"
                      onSubmit={handleCurvedSubmit}
                    />
                  </div>
                </div>

                {/* Responsive Footer Links */}
                <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 w-full max-w-full overflow-hidden">
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="hover:text-brand-orange transition-colors flex items-center gap-1.5 max-w-full min-w-0 px-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate block max-w-[260px] sm:max-w-none">{profile.contact.email}</span>
                  </a>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-slate-400/40">•</span>
                    <a
                      href={profile.contact.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-brand-orange transition-colors"
                    >
                      GitHub
                    </a>
                    <span className="text-slate-400/40">•</span>
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

              </div>
            </BorderGlow>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
