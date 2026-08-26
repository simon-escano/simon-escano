import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  GraduationCap,
  Globe,
  ArrowRight,
  Code,
  ShieldCheck,
  CheckCircle2,
  Trophy,
  Terminal,
  ExternalLink,
  Sparkles,
  Lock,
  Cpu,
} from 'lucide-react';
import dataService from '@/services/dataService';
import { RatingBars } from '@/components/common/RatingBars';
import {
  ProfileCard,
  SpotlightCard,
  BorderGlow,
  SpecularButton,
  ShinyText,
  CountUp,
  MagicBento,
  TiltedCard,
  DecryptedText,
  DotField,
  CurvedInput,
  CurvedLoop,
} from '@/components/reactbits';

const ABOUT_TITLES = [
  'Full-Stack Dev & Software Engineer',
  'Backend Dev & Integration Engineer',
  'AI Engineer & ML App Developer',
  'Web Architect & Technical SEO Dev',
];

export const About: React.FC = () => {
  const navigate = useNavigate();
  const profile = dataService.getProfile();
  const experience = dataService.getExperience();
  const credentials = dataService.getCredentials();
  const languages = dataService.getLanguages();
  const education = credentials.find((c) => c.type === 'education');

  const handleCurvedSubmit = (val: string) => {
    if (val.trim()) {
      navigate(`/contact?message=${encodeURIComponent(val)}`);
    } else {
      navigate('/contact');
    }
  };

  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % ABOUT_TITLES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Engineering Principles for Bento Grid
  const principles = [
    {
      title: 'Look good and feel good',
      label: 'Design & Interaction',
      description:
        'Clean typography and balanced spacing paired with fluid animations and instant click feedback. If an app looks sloppy or stutters while loading, it instantly feels cheap.',
      tags: ['Intentional layouts', '60fps transitions', 'Instant UI feedback', 'Clean typography'],
      className: 'lg:col-span-2',
      lightBackground: 'linear-gradient(135deg, rgba(56, 69, 201, 0.08) 0%, rgba(96, 165, 250, 0.04) 50%, rgba(255, 255, 255, 0.95) 100%)',
      darkBackground: 'linear-gradient(135deg, rgba(56, 69, 201, 0.22) 0%, rgba(96, 165, 250, 0.10) 50%, rgba(19, 27, 46, 0.85) 100%)',
      borderColor: 'rgba(56, 69, 201, 0.25)',
      borderHoverColor: 'rgba(56, 69, 201, 0.8)',
      glowColor: '56, 69, 201',
      labelColor: 'text-brand-cobalt dark:text-blue-400',
      icon: <Sparkles className="w-5 h-5 text-brand-cobalt dark:text-blue-400" />,
      tagClassName: 'bg-brand-cobalt/10 text-brand-cobalt border border-brand-cobalt/25 dark:bg-brand-cobalt/20 dark:text-blue-300 dark:border-brand-cobalt/35',
    },
    {
      title: 'Built tough',
      label: 'Resilience & Robustness',
      description:
        'Software should never crash when the internet drops or when weird data comes in. Validate data on both ends, catch edge cases early, and make errors fail safely without breaking the whole page.',
      tags: ['Strict type checking', 'Input validation', 'Safe fallback states', 'Offline handling'],
      className: 'lg:col-span-1',
      lightBackground: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(245, 158, 11, 0.04) 50%, rgba(255, 255, 255, 0.95) 100%)',
      darkBackground: 'linear-gradient(135deg, rgba(249, 115, 22, 0.22) 0%, rgba(245, 158, 11, 0.10) 50%, rgba(19, 27, 46, 0.85) 100%)',
      borderColor: 'rgba(249, 115, 22, 0.25)',
      borderHoverColor: 'rgba(249, 115, 22, 0.8)',
      glowColor: '249, 115, 22',
      labelColor: 'text-brand-orange',
      icon: <ShieldCheck className="w-5 h-5 text-brand-orange" />,
      tagClassName: 'bg-brand-orange/10 text-brand-orange border border-brand-orange/25 dark:bg-brand-orange/20 dark:text-orange-300 dark:border-brand-orange/35',
    },
    {
      title: 'Secure without getting in the way',
      label: 'Security & UX',
      description:
        'Protect user data without turning the app into an obstacle course. Authentication, bot defense, and query sanitization should do their job silently in the background.',
      tags: ['Clean auth flows', 'Invisible spam protection', 'Sanitized queries', 'Least privilege access'],
      className: 'lg:col-span-1',
      lightBackground: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(20, 184, 166, 0.04) 50%, rgba(255, 255, 255, 0.95) 100%)',
      darkBackground: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(20, 184, 166, 0.10) 50%, rgba(19, 27, 46, 0.85) 100%)',
      borderColor: 'rgba(16, 185, 129, 0.25)',
      borderHoverColor: 'rgba(16, 185, 129, 0.8)',
      glowColor: '16, 185, 129',
      labelColor: 'text-emerald-600 dark:text-emerald-400',
      icon: <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      tagClassName: 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/25 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/35',
    },
    {
      title: 'Zero bloat, no over-engineering',
      label: 'Simplicity & Maintainability',
      description:
        'Never install heavy packages or write convoluted code for problems with simple solutions. Keep the codebase lean, readable, and easy to maintain.',
      tags: ['Minimal dependencies', 'Strict TypeScript', 'Straightforward APIs', 'Clean structure'],
      className: 'lg:col-span-2',
      lightBackground: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(139, 92, 246, 0.04) 50%, rgba(255, 255, 255, 0.95) 100%)',
      darkBackground: 'linear-gradient(135deg, rgba(168, 85, 247, 0.22) 0%, rgba(139, 92, 246, 0.10) 50%, rgba(19, 27, 46, 0.85) 100%)',
      borderColor: 'rgba(168, 85, 247, 0.25)',
      borderHoverColor: 'rgba(168, 85, 247, 0.8)',
      glowColor: '168, 85, 247',
      labelColor: 'text-purple-600 dark:text-purple-400',
      icon: <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      tagClassName: 'bg-purple-500/10 text-purple-700 border border-purple-500/25 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/35',
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Interactive DotField Shader */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-75 dark:opacity-85">
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

      <div className="relative z-10 max-w-[1280px] mx-auto pt-28 pb-20 px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cobalt/10 border border-brand-cobalt/30 text-brand-cobalt dark:text-blue-400 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5 text-brand-orange" />
              <ShinyText text="About • Systems & Engineering" speed={3} />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-center lg:text-left min-h-[1.25em] flex items-center justify-center lg:justify-start">
              <DecryptedText
                text={ABOUT_TITLES[titleIndex]}
                speed={60}
                maxIterations={16}
                className="font-medium text-slate-900 dark:text-white"
                encryptedClassName="text-brand-orange font-mono"
                animateOn="change"
              />
            </h1>

            {/* Single Merged Cohesive Bio Paragraph */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-center lg:text-left max-w-2xl">
              I am Simon Escaño, a Cum Laude CS graduate from CIT-U with over 20+ built projects and systems. I build fast, reliable applications from the ground up across any stack, ranging from medical informatics and 3D graphics to modern full-stack web products.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 w-full max-w-xl">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-display font-medium text-brand-orange">
                  <CountUp to={20} duration={1.2} />+
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 uppercase">Projects & Builds</div>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-display font-medium text-brand-cobalt dark:text-blue-400">
                  <CountUp to={9} duration={1.2} />
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 uppercase">Major Awards</div>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-display font-medium text-emerald-500">
                  <CountUp to={5} duration={1.2} />+
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 uppercase">Certifications</div>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-display font-medium text-purple-500 dark:text-purple-400">
                  <CountUp to={100} duration={1.2} />%
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 uppercase">Commitment</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <SpecularButton onClick={() => navigate('/contact')}>
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 text-brand-orange" />
              </SpecularButton>

              <Link
                to="/projects"
                className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 text-sm font-medium transition-all shadow-sm"
              >
                Inspect Projects
              </Link>
            </div>
          </div>

          {/* 3D Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="flex w-full max-w-sm sm:max-w-md justify-center">
              <ProfileCard
                name="Simon Escaño"
                title={ABOUT_TITLES[titleIndex]}
                handle="simon-escano"
                status="Open to work"
                iconUrl='/images/icon-pattern.png'
                avatarUrl="/images/Escano_Business-Profile-Image_Transparent.png"
                behindGlowColor="rgba(249, 115, 22, 0.35)"
                behindGlowSize="60%"
                contactText="Let's Talk"
                onContactClick={() => navigate('/contact')}
              />
            </div>
          </div>
        </div>

        {/* Career Experience Timeline */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 text-xs font-mono text-brand-orange tracking-wider font-medium">
            <Briefcase className="size-10" />
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-slate-900 dark:text-white">
              Industry Experience
            </h2>
          </div>


          <div className="space-y-6">
            {experience.map((exp) => (
              <SpotlightCard
                key={exp.id}
                className="p-8 bg-white/80 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-display font-medium text-slate-900 dark:text-white">{exp.role}</h3>
                    <div className="text-brand-orange font-mono text-sm font-medium">{exp.company}</div>
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 w-fit">
                    {exp.date_range} • {exp.location}
                  </div>
                </div>

                <div className="space-y-3">
                  {exp.contributions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Education & Credentials */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Education - max 380px, TiltedCard with Gold/Cum Laude theme */}
          <div className="w-full lg:w-[380px] lg:max-w-[380px] flex-shrink-0 space-y-6">
            <div className="flex items-center gap-4 text-xs font-mono text-amber-500 dark:text-amber-400 tracking-wider font-medium">
              <GraduationCap className="size-10 text-amber-500 dark:text-amber-400" />
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-slate-900 dark:text-white">
                Formal Education
              </h2>
            </div>

            <TiltedCard
              containerHeight="auto"
              containerWidth="100%"
              scaleOnHover={1.03}
              rotateAmplitude={8}
              className="w-full"
              innerClassName="w-full"
            >
              <div className="relative w-full p-7 rounded-2xl bg-gradient-to-br from-amber-500/15 via-yellow-500/10 to-amber-600/20 dark:from-amber-400/20 dark:via-amber-500/10 dark:to-yellow-600/25 border-2 border-amber-400/60 dark:border-amber-400/50 shadow-[0_12px_40px_rgba(245,158,11,0.2)] dark:shadow-[0_16px_45px_rgba(245,158,11,0.25)] backdrop-blur-xl space-y-5 flex flex-col justify-between min-h-[360px] overflow-hidden">
                {/* Ambient Gold Glow Backgrounds */}
                <div className="absolute -right-12 -top-12 w-36 h-36 bg-amber-400/25 dark:bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -left-12 -bottom-12 w-36 h-36 bg-yellow-500/20 dark:bg-yellow-400/20 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/25 dark:bg-amber-400/25 text-amber-900 dark:text-amber-300 border border-amber-500/40 dark:border-amber-400/40 shadow-sm">
                      <Trophy className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                      <span>Cum Laude • 4.59 / 5.0 GWA</span>
                    </span>
                    <span className="text-xs font-mono text-amber-800/80 dark:text-amber-300/80 font-medium">
                      {education?.date}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-2xl font-display font-medium text-slate-900 dark:text-amber-100 leading-snug">
                      {education?.title ?? 'Bachelor of Science in Computer Science'}
                    </h3>
                    <p className="text-sm font-mono text-amber-800 dark:text-amber-300 font-medium">
                      {education?.institution}
                    </p>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                    Specialized in Algorithm Design, State-Driven Game Architectures, Biomedical Signal Processing, and Distributed Cloud Computing.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-amber-400/30 dark:border-amber-400/20 flex items-center justify-between text-[11px] font-mono text-amber-900/90 dark:text-amber-300/90 font-medium">
                  <span>Cebu Institute of Technology</span>
                  <span className="text-amber-600 dark:text-amber-400 font-medium">Class of 2026</span>
                </div>
              </div>
            </TiltedCard>
          </div>

          {/* Certifications & Industry Badges */}
          <div className="w-full lg:flex-1 space-y-6">
            <div className="flex items-center gap-4 text-xs font-mono text-emerald-500 tracking-wider font-medium">
              <ShieldCheck className="size-10 text-emerald-500" />
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-slate-900 dark:text-white">
                Verified Competencies
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {credentials
                .filter((c) => c.type !== 'education')
                .map((cred) => (
                  <div
                    key={cred.id}
                    className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between hover:border-brand-orange/40 transition-colors"
                  >
                    <div>
                      <div className="text-[10px] font-mono uppercase text-brand-orange font-medium">
                        {cred.institution}
                      </div>
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mt-1 leading-snug">{cred.title}</h4>
                    </div>
                    {cred.date && <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-2">{cred.date}</div>}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Spoken & Natural Languages (10-Bar Ratings) */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-xs font-mono text-brand-orange tracking-wider font-medium">
            <Globe className="size-10 text-brand-orange" />
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white">
              Languages
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {languages.map((lang, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-medium text-slate-900 dark:text-white text-lg">{lang.title}</h4>
                  <span className="text-[11px] font-mono text-brand-orange font-medium">
                    {lang.level}
                  </span>
                </div>

                <div className="pt-1">
                  <RatingBars value={lang.proficiency} />
                </div>

                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  Level {lang.proficiency} of 10
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Principles Bento Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-4 text-xs font-mono text-brand-orange tracking-wider font-medium">
              <Code className="size-10 text-brand-cobalt" />
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white">
                Engineering Principles
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Guiding standards embedded in every codebase, pipeline, and architecture.
            </p>
          </div>

          <MagicBento
            cards={principles}
            particleCount={12}
            enableTilt={true}
            enableBorderGlow={true}
          />
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          CURVED MARQUEE & CONTACT CTA
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
          <div className="w-full max-w-full rounded-[20px] sm:rounded-[28px] shadow-sm">
            <BorderGlow
              edgeSensitivity={35}
              glowColor="24 95 53"
              borderRadius={24}
              glowRadius={30}
              className="w-full max-w-full"
            >
              <div className="p-5 sm:p-8 md:p-12 text-center space-y-5 sm:space-y-6 w-full max-w-full box-border min-w-0">

                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-slate-900 dark:text-white leading-tight break-words px-1">
                  Looking to add an engineer to your team?
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed break-words px-2">
                  Drop your inquiry or email below to connect on roles and projects.
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

export default About;
