import React from 'react'
import {
  GraduationCap,
  Award,
  Globe,
  Code2,
  MapPin,
  Calendar,
  Sparkles,
  BookOpen,
} from 'lucide-react'
import { usePageSEO } from '@/hooks/usePageSEO'
import PageTransition from '@/components/layout/PageTransition'
import ScrollReveal from '@/components/layout/ScrollReveal'
import {
  profile,
  experience,
  credentials,
  achievements,
  languages,
} from '@/lib/data'

import { Lanyard } from '@/components/react-bits/components/Lanyard'
import { GradientText } from '@/components/react-bits/text-animations/GradientText'
import { GlassSurface } from '@/components/react-bits/components/GlassSurface'
import { MagicBento, BentoCard } from '@/components/react-bits/components/MagicBento'
import { SpotlightCard } from '@/components/react-bits/components/SpotlightCard'

export default function About() {
  usePageSEO({
    title: 'About Simon',
    description: `Learn more about ${profile.name} — ${profile.role}. Academic background, industry certifications, research achievements, and software engineering philosophy.`,
  })

  const education = credentials.filter((c) => c.type === 'education')
  const certifications = credentials.filter((c) => c.type === 'certification')

  return (
    <PageTransition>
      <section className="section-padding pt-32 md:pt-40" aria-label="About Simon Escaño">
        <div className="container-wide">
          {/* Hero / Profile Narrative */}
          <div className="grid gap-14 lg:grid-cols-12 items-center">
            {/* Left 5 cols: Interactive 3D Lanyard */}
            <div className="flex justify-center lg:col-span-5">
              <ScrollReveal>
                <Lanyard
                  name={profile.name}
                  role={profile.role}
                  avatar="/data/images/Escano_Business-Profile-Image_Transparent.png"
                />
              </ScrollReveal>
            </div>

            {/* Right 7 cols: Bio & Philosophy */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.1}>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-400">
                  Engineering Profile
                </span>
                <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-white">
                  About <GradientText colors={['#3b82f6', '#f97316', '#3b82f6']}>{profile.name}</GradientText>
                </h1>
                <p className="mt-2 font-mono text-lg font-bold text-primary-400">
                  {profile.role}
                </p>

                <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-base-300">
                  {profile.philosophy}
                </p>

                {/* Location & Quick Meta */}
                <div className="mt-8 flex flex-wrap gap-4 border-y border-base-800/80 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-base-400">
                    <MapPin size={16} className="text-accent-400" />
                    Cebu City, Philippines
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-base-400">
                    <Globe size={16} className="text-primary-400" />
                    {languages.map((l) => l.title).join(' • ')}
                  </div>
                </div>

                {/* Language Proficiencies */}
                <div className="mt-6">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-base-500">
                    Linguistic Capabilities
                  </span>
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {languages.map((lang) => (
                      <div
                        key={lang.title}
                        className="rounded-xl border border-base-800/80 bg-base-900/60 p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-white">
                            {lang.title}
                          </span>
                          <span className="font-mono text-[10px] text-accent-400">
                            {lang.proficiency}/10
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-base-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                            style={{ width: `${lang.proficiency * 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="mt-28">
            <ScrollReveal>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/20 text-primary-400 border border-primary-500/30">
                  <Code2 size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Experience Timeline</h2>
                  <p className="font-mono text-xs text-base-400">Industrial & Engineering Contributions</p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-8 space-y-6">
              {experience.map((exp) => (
                <ScrollReveal key={exp.id} delay={0.1}>
                  <GlassSurface className="p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {exp.role}
                        </h3>
                        <p className="mt-1 font-mono text-sm text-accent-400">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 rounded-full bg-base-950/80 border border-base-800 px-3.5 py-1.5 font-mono text-xs text-base-400">
                        <Calendar size={14} className="text-primary-400" />
                        {exp.date_range}
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-base-500">{exp.location}</p>

                    <ul className="mt-6 space-y-3">
                      {exp.contributions.map((c, i) => (
                        <li key={i} className="flex gap-3 text-sm text-base-300 leading-relaxed">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassSurface>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Credentials — Magic Bento Layout for Education & Certifications */}
          <div className="mt-28">
            <ScrollReveal>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/20 text-accent-400 border border-accent-500/30">
                  <Award size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Credentials & Education</h2>
                  <p className="font-mono text-xs text-base-400">Certifications & Academic Training</p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-8">
              <MagicBento>
                {/* Education Card (2 cols) */}
                {education.map((edu) => (
                  <BentoCard
                    key={edu.id}
                    colSpan="col-span-1 md:col-span-2"
                    spotlightColor="rgba(59, 130, 246, 0.2)"
                    borderColor="rgba(59, 130, 246, 0.4)"
                  >
                    <div className="flex items-center gap-2 text-primary-400">
                      <GraduationCap size={20} />
                      <span className="font-mono text-xs uppercase tracking-wider font-bold">
                        Academic Degree
                      </span>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-xl font-bold text-white">
                        {edu.title}
                      </h3>
                      <p className="mt-1 font-mono text-sm text-accent-400">
                        {edu.institution}
                      </p>
                      <p className="mt-2 font-mono text-xs text-base-500">
                        {edu.date}
                      </p>
                    </div>

                    <p className="mt-4 text-xs text-base-400 leading-relaxed">
                      Comprehensive study of software engineering principles, algorithms, data structures, and computer architecture.
                    </p>
                  </BentoCard>
                ))}

                {/* Certification Cards */}
                {certifications.map((cert) => (
                  <BentoCard
                    key={cert.id}
                    colSpan="col-span-1 md:col-span-1"
                    spotlightColor="rgba(249, 115, 22, 0.18)"
                    borderColor="rgba(249, 115, 22, 0.35)"
                  >
                    <div className="flex items-center justify-between">
                      <Award size={18} className="text-accent-400" />
                      <span className="font-mono text-[10px] text-base-500">
                        {cert.date}
                      </span>
                    </div>

                    <div className="mt-3">
                      <h4 className="font-bold text-white text-sm">
                        {cert.title}
                      </h4>
                      <p className="mt-1 font-mono text-xs text-primary-400">
                        {cert.institution}
                      </p>
                    </div>

                    <p className="mt-3 text-[11px] text-base-500 line-clamp-2">
                      {cert.description}
                    </p>
                  </BentoCard>
                ))}
              </MagicBento>
            </div>
          </div>

          {/* Full Achievements List */}
          <div className="mt-28">
            <ScrollReveal>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Full Achievements & Publications</h2>
                  <p className="font-mono text-xs text-base-400">National Competitions, Hackathons & Research Conferences</p>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((a, i) => (
                <ScrollReveal key={a.id} delay={i * 0.05}>
                  <SpotlightCard className="h-full flex flex-col justify-between p-6">
                    <div>
                      <span className="font-mono text-[10px] text-accent-400">
                        Honors #{i + 1}
                      </span>
                      <h4 className="mt-1 font-bold text-white text-sm">
                        {a.title}
                      </h4>
                      <p className="mt-3 text-xs text-base-400 leading-relaxed">
                        {a.description}
                      </p>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
