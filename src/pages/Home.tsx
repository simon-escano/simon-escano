import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Code,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
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

  // Global mouse move tracker for smooth floating card placement
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (hoveredSkill) {
        setSkillCursorPos({ x: e.clientX, y: e.clientY });
      }
      if (hoveredAward) {
        setAwardCursorPos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [hoveredSkill, hoveredAward]);

  const awardImageMap: Record<number, string> = {
    0: '/images/Seizuki/2026-05-09 11.02.47 simon-escano.github.io 6355e147fac0.png',
    1: '/images/PixCell/2026-05-09 10.59.35 simon-escano.github.io 8baadfd5dc66.png',
    2: '/images/Seizuki/2026-05-09 11.03.15 simon-escano.github.io 882e1e6561d1.png',
    3: '/images/Sprout/2026-05-09 11.07.19 simon-escano.github.io 3cce6bc86a24.png',
    4: '/images/Seizuki/2026-05-09 11.03.44 simon-escano.github.io ae874d570b61.png',
    5: '/images/Fashion MNIST Classifier/2026-05-09 11.04.14 simon-escano.github.io eea8a264a938.png',
    6: '/images/PixCell/2026-05-09 11.00.08 simon-escano.github.io dd8c2c1a5db4.png',
    7: '/images/PixCell/2026-05-09 11.00.41 simon-escano.github.io 3b867c29668d.png',
    8: '/images/Fasaar/2026-05-09 11.05.35 simon-escano.github.io 07252277d33d.png',
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
      <section className="relative min-h-[72vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
          {/* Left Column: Responsive Text Alignment */}
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
                <span>Explore Projects</span>
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
                status="Open to work"
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
          2. IMPACT METRICS BAR (Focused 3-card layout without project counts)
      ────────────────────────────────────────────────────────── */}
      <section id="stats" className="py-12 border-y border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <SpotlightCard className="text-center p-6 bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-display font-semibold text-brand-orange">
                <CountUp to={9} duration={1.5} />
                <span>🏆</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Hackathon Championships
              </p>
            </SpotlightCard>

            <SpotlightCard className="text-center p-6 bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-display font-semibold text-brand-cobalt dark:text-blue-400">
                <CountUp to={5} duration={1.5} />
                <span>+</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Industry Certifications
              </p>
            </SpotlightCard>

            <SpotlightCard className="text-center p-6 bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-display font-semibold text-emerald-500">
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
          3. FLAGSHIP SHOWCASE (Full 1280px Max-Width CardSwap)
      ────────────────────────────────────────────────────────── */}
      <section id="featured" className="py-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              Flagship <GradientText colors={['#3845C9', '#60a5fa', '#f97316']}>Projects</GradientText>
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

        {/* Full-width CardSwap with soft-edge vertical blur masks */}
        <div className="relative overflow-visible min-h-[480px] py-6 flex justify-center">
          {/* Top and Bottom soft blur gradient overlays */}
          <div className="absolute inset-x-0 -top-4 h-12 bg-gradient-to-b from-background to-transparent pointer-events-none z-20 backdrop-blur-[1px]" />
          <div className="absolute inset-x-0 -bottom-4 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none z-20 backdrop-blur-[1px]" />

          <CardSwap width="100%" height={430} cardDistance={32} verticalDistance={22}>
            {topProjects.map((p) => (
              <Card
                key={p.id}
                className="p-6 sm:p-8 flex flex-col justify-between cursor-pointer group select-none overflow-hidden h-full"
                onClick={() => navigate(`/projects/${p.id}`)}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center h-full">
                  {/* Left Column: Project Screenshot Preview */}
                  <div className="md:col-span-6 relative aspect-[16/10] md:h-full w-full rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-200 dark:border-white/10 shadow-inner flex items-center justify-center">
                    <img
                      src={p.gallery[0] || '/images/Escano_Business-Profile-Image_Transparent.png'}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-lg text-[11px] font-mono bg-slate-900/90 text-brand-orange border border-white/10 font-semibold backdrop-blur-md shadow-md">
                      {p.contributions.split('&')[0]?.trim() || 'Architecture'}
                    </span>
                  </div>

                  {/* Right Column: Information & Stack Tags */}
                  <div className="md:col-span-6 flex flex-col justify-between h-full py-1 space-y-4">
                    <div className="space-y-2.5">
                      <div className="inline-flex items-center gap-2 text-[11px] font-mono text-brand-cobalt dark:text-blue-400 font-semibold uppercase tracking-wider">
                        <span>Featured Solution</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-semibold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors leading-tight">
                        {p.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {p.one_liner}
                      </p>
                    </div>

                    <div className="space-y-4 pt-3 border-t border-slate-200 dark:border-white/10">
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech_stack.slice(0, 4).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-medium"
                          >
                            {t.name}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          Production Architecture
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-brand-cobalt dark:text-blue-400 group-hover:text-brand-orange group-hover:translate-x-1 transition-all">
                          <span>Inspect Project</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. TECH PROFICIENCY (Slower Loops + Cursor-Following Hover Card)
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
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
              <div className="text-[11px] font-mono uppercase tracking-wider text-brand-cobalt dark:text-blue-400 mb-2 px-2 font-semibold">
                Frontend & UI Architecture
              </div>
              <LogoLoop
                logos={frontendSkills.map((item) => ({
                  title: item.title,
                  proficiency: item.proficiency,
                }))}
                speed={18}
                direction="left"
                gap={24}
                scaleOnHover={true}
                onLogoHover={handleSkillHover}
                onLogoLeave={() => setHoveredSkill(null)}
              />
            </div>

            {/* Backend Row */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-brand-orange mb-2 px-2 font-semibold">
                Backend, Cloud & Microservices
              </div>
              <LogoLoop
                logos={backendSkills.map((item) => ({
                  title: item.title,
                  proficiency: item.proficiency,
                }))}
                speed={18}
                direction="right"
                gap={24}
                scaleOnHover={true}
                onLogoHover={handleSkillHover}
                onLogoLeave={() => setHoveredSkill(null)}
              />
            </div>

            {/* Game Dev, AI & Database Row */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-500 mb-2 px-2 font-semibold">
                Game Physics, AI Diagnostics & Storage
              </div>
              <LogoLoop
                logos={gameAiSkills.map((item) => ({
                  title: item.title,
                  proficiency: item.proficiency,
                }))}
                speed={15}
                direction="left"
                gap={24}
                scaleOnHover={true}
                onLogoHover={handleSkillHover}
                onLogoLeave={() => setHoveredSkill(null)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Skill Proficiency Card (Anchored near cursor) */}
      {hoveredSkill && (
        <div
          className="fixed z-50 pointer-events-none transition-transform duration-75 ease-out"
          style={{
            left: Math.min(Math.max(16, skillCursorPos.x + 16), window.innerWidth - 250),
            top: Math.min(Math.max(16, skillCursorPos.y - 52), window.innerHeight - 80),
          }}
        >
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-brand-cobalt/40 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
            <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
              {hoveredSkill.title}
            </span>
            <RatingBars value={hoveredSkill.proficiency} />
            <span className="text-xs font-mono text-brand-orange font-semibold">
              {hoveredSkill.proficiency}/10
            </span>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          5. ACHIEVEMENTS & AWARDS (Two Rows Accordion + Floating Card)
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-slate-200 dark:border-white/10 bg-slate-100/40 dark:bg-slate-950/70">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Championships & <span className="text-brand-orange">Awards</span>
            </h2>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
              National and international hackathons, competitions, and peer-reviewed conference publications.
            </p>
          </div>

          {/* Row 1 Accordion Gallery */}
          <div className="flex flex-col space-y-2">
            <AccordionGallery
              items={awardsRow1}
              height={260}
              accentColor="#f97316"
              expandRatio={0.45}
              onItemHover={(idx) => {
                const item = awardsRow1[idx];
                if (item) setHoveredAward(item);
              }}
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
            />
          </div>
        </div>
      </section>

      {/* Floating Award Details Card (Anchored near cursor) */}
      {hoveredAward && (
        <div
          className="fixed z-50 pointer-events-none transition-transform duration-75 ease-out max-w-sm sm:max-w-md"
          style={{
            left: Math.min(Math.max(16, awardCursorPos.x + 20), window.innerWidth - 380),
            top: Math.min(Math.max(16, awardCursorPos.y - 120), window.innerHeight - 200),
          }}
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-brand-cobalt/40 shadow-2xl backdrop-blur-xl space-y-2 animate-in fade-in zoom-in-95 duration-150">
            <span className="text-[10px] font-mono uppercase text-brand-orange font-semibold block">
              Honors Recognition
            </span>
            <h4 className="text-sm sm:text-base font-display font-semibold text-slate-900 dark:text-white leading-snug">
              {hoveredAward.fullTitle}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
              {hoveredAward.description}
            </p>
          </div>
        </div>
      )}

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
