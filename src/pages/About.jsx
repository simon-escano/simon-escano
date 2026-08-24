import { GraduationCap, Award, Globe, Code2, MapPin, Calendar } from 'lucide-react'
import { usePageSEO } from '@/hooks/usePageSEO'
import PageTransition from '@/components/layout/PageTransition'
import ScrollReveal from '@/components/layout/ScrollReveal'
import {
  profile,
  experience,
  credentials,
  achievements,
  languages,
  getTechCategories,
} from '@/lib/data'

export default function About() {
  usePageSEO({
    title: 'About',
    description: `Learn more about ${profile.name} — ${profile.role}. Education, certifications, achievements, and skills.`,
  })

  const techCategories = getTechCategories()

  const education = credentials.filter(c => c.type === 'education')
  const certifications = credentials.filter(c => c.type === 'certification')

  return (
    <PageTransition>
      <section className="section-padding pt-32" aria-label="About">
        <div className="container-wide">
          {/* Hero / Narrative */}
          <ScrollReveal>
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Profile Image — Lanyard replaces this in Stage 4 */}
              <div className="flex justify-center lg:col-span-2">
                <div className="relative">
                  <div className="h-80 w-64 overflow-hidden rounded-2xl border border-base-800/50 bg-base-900">
                    <img
                      src="/data/images/Escano_Business-Profile-Image_Transparent.png"
                      alt={`${profile.name} profile photo`}
                      className="h-full w-full object-cover object-top"
                      width={256}
                      height={320}
                    />
                  </div>

                  {/* Status badge */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-base-700 bg-base-900 px-4 py-2 shadow-xl">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                      <span className="font-mono text-xs text-green-400">
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="lg:col-span-3">
                <h1 className="text-base-100">{profile.name}</h1>
                <p className="mt-2 font-mono text-lg text-accent-400">
                  {profile.role}
                </p>
                <p className="mt-6 max-w-2xl leading-relaxed text-base-300">
                  {profile.philosophy}
                </p>

                {/* Quick Info */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-base-400">
                    <MapPin size={16} />
                    Cebu City, Philippines
                  </div>
                  <div className="flex items-center gap-2 text-sm text-base-400">
                    <Globe size={16} />
                    {languages.map(l => l.title).join(', ')}
                  </div>
                </div>

                {/* Language Proficiencies */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {languages.map(lang => (
                    <div
                      key={lang.title}
                      className="flex items-center gap-2 rounded-lg border border-base-800/50 bg-base-900/50 px-3 py-1.5"
                    >
                      <span className="text-sm text-base-200">{lang.title}</span>
                      <div className="h-1 w-8 overflow-hidden rounded-full bg-base-800">
                        <div
                          className="h-full rounded-full bg-primary-500"
                          style={{ width: `${lang.proficiency * 10}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Experience Timeline */}
          <ScrollReveal delay={0.1}>
            <div className="mt-24">
              <h2 className="text-base-100">
                <Code2 className="mb-1 mr-2 inline-block text-primary-400" size={24} />
                Experience
              </h2>

              <div className="mt-8 space-y-6">
                {experience.map(exp => (
                  <div
                    key={exp.id}
                    className="rounded-2xl border border-base-800/50 bg-base-900/50 p-8"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-base-100">
                          {exp.role}
                        </h3>
                        <p className="font-mono text-sm text-accent-400">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-base-500">
                        <Calendar size={14} />
                        {exp.date_range}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-base-500">
                      {exp.location}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {exp.contributions.map((c, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-sm text-base-300"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-500" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Education */}
          <ScrollReveal delay={0.15}>
            <div className="mt-16">
              <h2 className="text-base-100">
                <GraduationCap className="mb-1 mr-2 inline-block text-primary-400" size={24} />
                Education
              </h2>

              <div className="mt-8 space-y-4">
                {education.map(edu => (
                  <div
                    key={edu.id}
                    className="rounded-xl border border-base-800/50 bg-base-900/50 p-6"
                  >
                    <h3 className="font-semibold text-base-100">{edu.title}</h3>
                    <p className="mt-1 text-sm text-accent-400">
                      {edu.institution}
                    </p>
                    <p className="mt-1 text-xs text-base-500">{edu.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Certifications */}
          <ScrollReveal delay={0.2}>
            <div className="mt-16">
              <h2 className="text-base-100">
                <Award className="mb-1 mr-2 inline-block text-accent-400" size={24} />
                Certifications
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {certifications.map(cert => (
                  <div
                    key={cert.id}
                    className="rounded-xl border border-base-800/50 bg-base-900/50 p-6"
                  >
                    <h4 className="text-sm font-semibold text-base-100">
                      {cert.title}
                    </h4>
                    <p className="mt-2 text-xs text-primary-400">
                      {cert.institution}
                    </p>
                    <p className="mt-1 text-xs text-base-500">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Achievements */}
          <ScrollReveal delay={0.25}>
            <div className="mt-16">
              <h2 className="text-base-100">
                <Award className="mb-1 mr-2 inline-block text-accent-400" size={24} />
                Achievements
              </h2>

              <div className="mt-8 space-y-4">
                {achievements.map(a => (
                  <div
                    key={a.id}
                    className="border-l-2 border-accent-500/30 pl-6 py-3"
                  >
                    <h4 className="font-semibold text-base-100 text-sm">
                      {a.title}
                    </h4>
                    <p className="mt-1 text-xs text-base-400">
                      {a.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  )
}
