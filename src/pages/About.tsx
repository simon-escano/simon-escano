import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  GraduationCap,
  Globe,
  ArrowRight,
  Code,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import dataService from '@/services/dataService';
import { RatingBars } from '@/components/common/RatingBars';
import {
  ProfileCard,
  SpotlightCard,
  BorderGlow,
  SpecularButton,
  GradientText,
  ShinyText,
  CountUp,
  MagicBento,
} from '@/components/reactbits';

export const About: React.FC = () => {
  const navigate = useNavigate();
  const profile = dataService.getProfile();
  const experience = dataService.getExperience();
  const credentials = dataService.getCredentials();
  const languages = dataService.getLanguages();
  const education = credentials.find((c) => c.type === 'education');

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
      title: 'Tactile Aesthetics',
      label: 'UI/UX Craft',
      description:
        'Interfaces must be vibrant, tactile, accessible, and joyful to operate with motion physics.',
      tags: ['Motion Physics', 'Responsive', 'Polished'],
      className: 'lg:col-span-1',
    },
    {
      title: 'Rapid Prototyping',
      label: 'Competitive Edge',
      description:
        'Thriving under high-pressure competitive environments, shipping 9 award-winning national and international prototypes.',
      tags: ['9x Champion', 'Agile Execution', 'Leadership'],
      className: 'lg:col-span-2',
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-[1280px] mx-auto space-y-20">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cobalt/10 border border-brand-cobalt/30 text-brand-cobalt dark:text-blue-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <ShinyText text="About • Software Architect & Innovator" speed={3} />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              Driven by <GradientText colors={['#3845C9', '#60a5fa', '#f97316']}>Rigorous Engineering</GradientText> & Creative Vision
            </h1>

            {/* Single Merged Cohesive Bio Paragraph */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              I am Simon Escaño, a full-stack engineer, computer science researcher, and 9-time hackathon champion graduating Cum Laude with a 4.59 / 5.0 GWA from Cebu Institute of Technology - University. I bridge complex backend architectures and low-level game mechanics with intuitive, high-performance web systems — with work spanning Scopus-indexed medical informatics research, photogrammetry streaming engines, and automated enterprise workflows.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-display font-semibold text-brand-orange">
                  <CountUp to={10} duration={1.2} />+
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 uppercase">Shipped Projects</div>
              </div>

              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-display font-semibold text-brand-cobalt dark:text-blue-400">
                  <CountUp to={9} duration={1.2} />
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 uppercase">Major Awards</div>
              </div>

              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-display font-semibold text-emerald-500">
                  <CountUp to={100} duration={1.2} />%
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 uppercase">Commitment</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
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
            <div className="w-full max-w-sm sm:max-w-md">
              <ProfileCard
                name="Simon Escaño"
                title={profile.role}
                handle="simon-escano"
                status="Open for Work"
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
          <div className="flex items-center gap-2 text-xs font-mono text-brand-orange uppercase tracking-wider font-semibold">
            <Briefcase className="w-4 h-4" />
            <span>Professional Career</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">
            Industry Experience
          </h2>

          <div className="space-y-6">
            {experience.map((exp) => (
              <SpotlightCard
                key={exp.id}
                className="p-8 bg-white/80 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-display font-semibold text-slate-900 dark:text-white">{exp.role}</h3>
                    <div className="text-brand-orange font-mono text-sm font-semibold">{exp.company}</div>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-cobalt dark:text-blue-400 uppercase tracking-wider font-semibold">
              <GraduationCap className="w-4 h-4 text-brand-orange" />
              <span>Academic Foundation</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
              Formal Education
            </h2>

            <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
              <div className="text-xs font-mono text-brand-orange font-semibold">{education?.date}</div>
              <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white">
                {education?.title ?? 'Bachelor of Science in Computer Science'}
              </h3>
              {education?.description && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                  {education.description}
                </div>
              )}
              <p className="text-sm text-slate-700 dark:text-slate-300 pt-1">
                {education?.institution}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                Specialized in Algorithm Design, State-Driven Game Architectures, Biomedical Signal Processing, and Distributed Cloud Computing.
              </p>
            </div>
          </div>

          {/* Certifications & Industry Badges */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-wider font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Competencies</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
              Certifications & Badges
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {credentials
                .filter((c) => c.type !== 'education')
                .map((cred) => (
                  <div
                    key={cred.id}
                    className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-mono uppercase text-brand-orange font-semibold">
                        {cred.institution}
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mt-1 leading-snug">{cred.title}</h4>
                    </div>
                    {cred.date && <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-2">{cred.date}</div>}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Spoken & Natural Languages (10-Bar Ratings) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-orange uppercase tracking-wider font-semibold">
            <Globe className="w-4 h-4" />
            <span>Communication & Languages</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
            Languages
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {languages.map((lang, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-semibold text-slate-900 dark:text-white text-lg">{lang.title}</h4>
                  <span className="text-[11px] font-mono text-brand-orange font-semibold">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-cobalt/10 border border-brand-cobalt/30 text-brand-cobalt dark:text-blue-400 text-xs font-mono">
              <Code className="w-3.5 h-3.5 text-brand-orange" />
              <span>Core Philosophy</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">
              Engineering Principles
            </h2>
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
          backgroundColor="rgba(19, 27, 46, 0.85)"
          borderRadius={24}
        >
          <div className="p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white">
                Ready to collaborate with simon-escano?
              </h3>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
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
