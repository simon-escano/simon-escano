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
} from '@/components/reactbits';

const ABOUT_TITLES = [
  'Full-Stack Dev & Software Engineer',
  'Backend Dev & Integration Engineer',
  'AI Engineer & ML App Developer',
  'Web Architect & Technical SEO Dev',
];

export const About: React.FC = () => {
  const navigate = useNavigate();
  const experience = dataService.getExperience();
  const credentials = dataService.getCredentials();
  const languages = dataService.getLanguages();
  const education = credentials.find((c) => c.type === 'education');

  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % ABOUT_TITLES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Punchy, simplified principles for Bento Grid
  const principles = [
    {
      title: 'Architectural Rigor',
      label: 'Core Philosophy',
      description:
        'Zero debt architecture. Strict separation of concerns, modular state machines, and high maintainability from day zero.',
      tags: ['Clean Architecture', 'Type Safety', 'Modularity'],
      className: 'lg:col-span-2',
    },
    {
      title: 'Obsessive Speed',
      label: 'Performance',
      description:
        'Zero tolerance for unnecessary re-renders, sluggish frame rates, or bloated payloads. Every millisecond counts.',
      tags: ['WebGL', 'A* Pathfinding', 'Sub-Second'],
      className: 'lg:col-span-1',
    },
    {
      title: 'Resilient Design',
      label: 'Reliability',
      description:
        'Offline-first synchronization, graceful degradation, and fault-tolerant cloud backends built for high availability.',
      tags: ['Distributed Systems', 'Fault Tolerance', 'CI/CD'],
      className: 'lg:col-span-1',
    },
    {
      title: 'Cross-Modal Innovation',
      label: 'Pioneering Work',
      description:
        'Bridging machine learning, real-time computer vision, hardware sensors, and intuitive web interfaces into cohesive products.',
      tags: ['Computer Vision', 'Applied AI', 'IoT'],
      className: 'lg:col-span-2',
    },
  ];

  return (
    <div className="relative min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground overflow-hidden">
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

      <div className="relative z-10 max-w-[1280px] mx-auto space-y-20">
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
              I am Simon Escaño, a Cum Laude CS graduate from CIT-U. I build fast, reliable applications from the ground up across any stack, ranging from complex research systems in medical informatics and 3D graphics to modern full-stack web products.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2 w-full max-w-lg">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-display font-medium text-brand-orange">
                  <CountUp to={9} duration={1.2} />
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 uppercase">Major Awards</div>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-display font-medium text-brand-cobalt dark:text-blue-400">
                  <CountUp to={5} duration={1.2} />+
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 uppercase">Certifications</div>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-display font-medium text-emerald-500">
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
            cards={principles.map((p) => ({
              title: p.title,
              description: p.description,
              label: p.label,
              tags: p.tags,
              className: p.className,
            }))}
            particleCount={10}
            glowColor="56, 69, 201"
            enableTilt={true}
            enableBorderGlow={true}
          />
        </div>

        {/* Direct Contact Callout */}
        <BorderGlow
          edgeSensitivity={30}
          glowColor="235 70 60"
          borderRadius={24}
        >
          <div className="p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-slate-900 dark:text-white">
                Ready to collaborate with simon-escano?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                Open for full-stack engineering roles, game development projects, and innovative technical collaborations.
              </p>
            </div>

            <div className="flex-shrink-0">
              <SpecularButton size="lg" onClick={() => navigate('/contact')}>
                <span>Send a Direct Message</span>
                <ArrowRight className="w-4 h-4 text-brand-orange" />
              </SpecularButton>
            </div>
          </div>
        </BorderGlow>
      </div>
    </div>
  );
};

export default About;
