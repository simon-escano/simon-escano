import React from 'react'
import { Link } from 'react-router-dom'
import { m } from 'motion/react'
import {
  ArrowRight,
  Briefcase,
  Code2,
  Trophy,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import { usePageSEO } from '@/hooks/usePageSEO'
import PageTransition from '@/components/layout/PageTransition'
import ScrollReveal from '@/components/layout/ScrollReveal'
import {
  profile,
  projects,
  featuredProjects,
  projectCount,
  getTechCategories,
  achievements,
  experience,
} from '@/lib/data'

// React Bits Components
import { MoltenMetal } from '@/components/react-bits/backgrounds/MoltenMetal'
import { StrokeText } from '@/components/react-bits/text-animations/StrokeText'
import { GradientText } from '@/components/react-bits/text-animations/GradientText'
import { ScrambledText } from '@/components/react-bits/text-animations/ScrambledText'
import { ShinyText } from '@/components/react-bits/text-animations/ShinyText'
import { CountUp } from '@/components/react-bits/text-animations/CountUp'
import { CurvedLoop } from '@/components/react-bits/text-animations/CurvedLoop'
import { CardSwap } from '@/components/react-bits/components/CardSwap'
import { DriftWall } from '@/components/react-bits/components/DriftWall'
import { LogoLoop } from '@/components/react-bits/components/LogoLoop'
import { AccordionGallery } from '@/components/react-bits/components/AccordionGallery'
import { MagicBento, BentoCard } from '@/components/react-bits/components/MagicBento'
import { BorderGlow } from '@/components/react-bits/components/BorderGlow'
import { Magnet } from '@/components/react-bits/animations/Magnet'
import { SpecularButton } from '@/components/react-bits/components/SpecularButton'
import { Lanyard } from '@/components/react-bits/components/Lanyard'

export default function Home() {
  usePageSEO({
    title: null,
    description: profile.philosophy,
  })

  const techCategories = getTechCategories()

  return (
    <PageTransition>
      {/* ============================================================
          HERO SECTION — Molten Metal Canvas + Stroke Text + Lanyard
          ============================================================ */}
      <section
        id="hero"
        className="relative flex min-h-[92vh] items-center overflow-hidden pt-20"
        aria-label="Hero"
      >
        {/* Molten Metal Shader Canvas strictly for Hero with culling */}
        <MoltenMetal />

        <div className="container-wide relative z-10 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Headline & Bio */}
            <div className="lg:col-span-7">
              {/* Status Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-base-700/80 bg-base-950/80 px-4 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <ShinyText className="font-mono text-xs font-semibold text-emerald-400">
                  ● Available for Full-Stack Roles
                </ShinyText>
              </div>

              {/* Stroke Text Name */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                <StrokeText
                  text="SIMON"
                  strokeColor="rgba(255,255,255,0.7)"
                  strokeWidth={2}
                  hoverFillColor="#3b82f6"
                  className="mr-3"
                />
                <span className="text-white">ESCAÑO</span>
              </h1>

              {/* Role with Gradient Accent */}
              <div className="mt-4 flex items-center gap-3">
                <span className="font-mono text-xl sm:text-2xl font-bold text-base-300">
                  Architecting
                </span>
                <GradientText
                  colors={['#3b82f6', '#f97316', '#60a5fa', '#fb923c', '#3b82f6']}
                  className="font-display text-2xl sm:text-3xl font-extrabold"
                >
                  Full-Stack Systems
                </GradientText>
              </div>

              {/* Tagline / Philosophy with Scrambled Text */}
              <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-base-300">
                <ScrambledText
                  text={profile.philosophy}
                  speed={25}
                  maxIterations={8}
                />
              </p>

              {/* CTAs with Magnet & Specular Physics */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnet magnetStrength={0.3}>
                  <Link to="/contact">
                    <SpecularButton
                      variant="primary"
                      className="px-8 py-4 text-sm font-bold uppercase tracking-wider"
                    >
                      Get in Touch
                      <ArrowRight size={18} />
                    </SpecularButton>
                  </Link>
                </Magnet>

                <Link to="/projects">
                  <SpecularButton
                    variant="outline"
                    className="px-7 py-4 text-sm font-semibold"
                  >
                    Explore Projects
                  </SpecularButton>
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive 3D Lanyard */}
            <div className="hidden lg:flex lg:col-span-5 justify-center items-center">
              <Lanyard
                name={profile.name}
                role={profile.role}
                avatar="/data/images/Escano_Business-Profile-Image_Transparent.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATS BAR — Count Up + Status
          ============================================================ */}
      <section
        id="stats"
        className="border-y border-base-800/80 bg-base-950/70 backdrop-blur-lg"
        aria-label="Statistics"
      >
        <div className="container-wide py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center">
            <div className="text-center">
              <div className="font-display text-4xl sm:text-5xl font-black text-accent-400">
                <CountUp to={projectCount} suffix="+" duration={2} />
              </div>
              <p className="mt-1 font-mono text-xs text-base-400 uppercase tracking-wider">
                Shipped Projects
              </p>
            </div>

            <div className="text-center">
              <div className="font-display text-4xl sm:text-5xl font-black text-primary-400">
                <CountUp to={achievements.length} suffix="+" duration={2.2} />
              </div>
              <p className="mt-1 font-mono text-xs text-base-400 uppercase tracking-wider">
                Awards & Prizes
              </p>
            </div>

            <div className="text-center">
              <div className="font-display text-4xl sm:text-5xl font-black text-emerald-400">
                <CountUp to={techCategories.length} suffix=" Domains" duration={1.8} />
              </div>
              <p className="mt-1 font-mono text-xs text-base-400 uppercase tracking-wider">
                Tech Ecosystem
              </p>
            </div>

            <div className="text-center">
              <div className="font-display text-4xl sm:text-5xl font-black text-white">
                <CountUp to={100} suffix="%" duration={1.5} />
              </div>
              <p className="mt-1 font-mono text-xs text-base-400 uppercase tracking-wider">
                Commitment to Quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Curved Section Divider */}
      <CurvedLoop
        text="FULL-STACK ARCHITECTURE • AI DIAGNOSTICS • WEBGL & GAME ENGINES • ZERO DOWNTIME • "
        speed={25}
      />

      {/* ============================================================
          FEATURED WORK — Card Swap (Top 5 Projects)
          ============================================================ */}
      <section id="featured" className="section-padding relative" aria-label="Featured Work">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-400">
                Showcase
              </span>
              <h2 className="mt-2 text-base-100">
                Featured <GradientText colors={['#3b82f6', '#f97316', '#3b82f6']}>Work</GradientText>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-base-400">
                Interactive deck showcasing top five engineering breakthroughs.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-14">
            <CardSwap cards={featuredProjects} />
          </div>
        </div>
      </section>

      {/* ============================================================
          PROJECT WALL — Drift Wall (Dual Parallax Infinite Drift)
          ============================================================ */}
      <section
        id="project-wall"
        className="section-padding overflow-hidden bg-base-950/50 border-y border-base-800/50"
        aria-label="Project Wall"
      >
        <div className="container-wide mb-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary-400">
                  Continuous Stream
                </span>
                <h2 className="mt-1 text-base-100">Project Wall</h2>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent-400 hover:text-accent-300"
              >
                Browse All In Chroma Grid →
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Dual Parallax Drift Wall */}
        <DriftWall projects={projects} />
      </section>

      {/* ============================================================
          TECH ECOSYSTEM — Categorized Logo Loops with Tooltips
          ============================================================ */}
      <section id="tech-stack" className="section-padding" aria-label="Tech Stack">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-400">
                Tools & Capabilities
              </span>
              <h2 className="mt-2 text-base-100">
                Tech <GradientText colors={['#60a5fa', '#f97316', '#60a5fa']}>Ecosystem</GradientText>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-base-400">
                Hover any technology to inspect proficiency ratings and system roles.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 space-y-6">
            {techCategories.map((cat, idx) => (
              <ScrollReveal key={cat.category} delay={idx * 0.05}>
                <div className="rounded-2xl border border-base-800/50 bg-base-900/30 p-4">
                  <div className="mb-2 px-2 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-base-400">
                      {cat.category}
                    </span>
                    <span className="font-mono text-[11px] text-base-500">
                      {cat.items.length} technologies
                    </span>
                  </div>

                  <LogoLoop
                    items={cat.items}
                    speed={25 + idx * 3}
                    direction={idx % 2 === 0 ? 'left' : 'right'}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          EXPERIENCE & HIGHLIGHTS — Magic Bento + Accordion Gallery
          ============================================================ */}
      <section
        id="highlights"
        className="section-padding bg-base-950/60 border-t border-base-800/60"
        aria-label="Experience and Highlights"
      >
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary-400">
                Recognition & Career
              </span>
              <h2 className="mt-2 text-base-100">
                Experience & <GradientText colors={['#f97316', '#3b82f6', '#f97316']}>Achievements</GradientText>
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            {/* Left 5 cols: Work Experience in BentoCard */}
            <div className="lg:col-span-5">
              <ScrollReveal delay={0.1}>
                <BentoCard
                  spotlightColor="rgba(59, 130, 246, 0.2)"
                  borderColor="rgba(59, 130, 246, 0.4)"
                  className="h-full"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/20 text-primary-400 border border-primary-500/30">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Work Experience</h3>
                        <p className="font-mono text-xs text-base-400">Production Systems</p>
                      </div>
                    </div>

                    {experience.map((exp) => (
                      <div key={exp.id} className="mt-6 border-t border-base-800/80 pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-base-100">{exp.role}</h4>
                            <p className="font-mono text-sm text-accent-400">{exp.company}</p>
                          </div>
                          <span className="rounded-full bg-base-800 px-3 py-1 font-mono text-[11px] text-base-400">
                            {exp.date_range}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-base-500">{exp.location}</p>

                        <ul className="mt-4 space-y-2.5">
                          {exp.contributions.map((c, i) => (
                            <li key={i} className="flex gap-2.5 text-sm text-base-300">
                              <Code2 size={16} className="mt-1 shrink-0 text-accent-500" />
                              <span className="leading-relaxed">{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-base-800/80 pt-4">
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent-400 hover:text-accent-300"
                    >
                      View Full Credentials & Timeline →
                    </Link>
                  </div>
                </BentoCard>
              </ScrollReveal>
            </div>

            {/* Right 7 cols: Accordion Gallery of Top Achievements */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.2}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/20 text-accent-400 border border-accent-500/30">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Award-Winning Solutions</h3>
                    <p className="font-mono text-xs text-base-400">Interactive Accordion Gallery</p>
                  </div>
                </div>

                <AccordionGallery items={achievements.slice(0, 5)} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CALL TO ACTION — Border Glow + Magnet Button
          ============================================================ */}
      <section id="cta" className="section-padding relative" aria-label="Call to Action">
        <div className="container-wide flex justify-center">
          <ScrollReveal>
            <BorderGlow className="max-w-3xl w-full">
              <div className="p-10 sm:p-14 text-center">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent-400">
                  Ready to collaborate
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
                  Let's Build Something <GradientText colors={['#f97316', '#60a5fa', '#f97316']}>Exceptional</GradientText>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-base-300 leading-relaxed">
                  Whether you're looking for a full-stack engineer for scalable web platforms, high-performance algorithms, or interactive graphics, I'm ready to contribute.
                </p>

                <div className="mt-8 flex justify-center">
                  <Magnet magnetStrength={0.4}>
                    <Link to="/contact">
                      <SpecularButton
                        variant="primary"
                        className="px-10 py-4 text-sm font-bold uppercase tracking-wider"
                      >
                        Start A Conversation
                        <ArrowRight size={18} />
                      </SpecularButton>
                    </Link>
                  </Magnet>
                </div>
              </div>
            </BorderGlow>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  )
}
