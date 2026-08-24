import { Link } from 'react-router-dom'
import { m } from 'motion/react'
import {
  ArrowRight,
  Briefcase,
  Code2,
  Trophy,
  ExternalLink,
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

export default function Home() {
  usePageSEO({
    title: null,
    description: profile.philosophy,
  })

  const techCategories = getTechCategories()

  return (
    <PageTransition>
      {/* ============================================================
          HERO SECTION
          Molten Metal background will be added in Stage 4
          ============================================================ */}
      <section
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Background placeholder — Molten Metal goes here */}
        <div className="absolute inset-0 bg-gradient-to-b from-base-950 via-primary-950/20 to-base-950" />

        <div className="container-wide relative z-10 py-32">
          <div className="max-w-3xl">
            {/* Stroke Text placeholder */}
            <h1 className="font-display text-base-100">
              {profile.name}
            </h1>

            <p className="mt-4 font-mono text-lg text-accent-400">
              {profile.role}
            </p>

            {/* Scrambled Text placeholder */}
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-base-300">
              {profile.philosophy}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-3.5 font-semibold text-white transition-all hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/25"
              >
                Get in Touch
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-base-700 px-8 py-3.5 font-semibold text-base-200 transition-all hover:border-base-500 hover:bg-base-800/50"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATS BAR
          Count Up + Shiny Text will be added in Stage 4
          ============================================================ */}
      <section
        id="stats"
        className="border-y border-base-800/50 bg-base-900/50"
        aria-label="Statistics"
      >
        <div className="container-wide py-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <span className="font-display text-4xl font-bold text-accent-400">
                {projectCount}+
              </span>
              <p className="mt-1 text-sm text-base-400">Shipped Projects</p>
            </div>
            <div className="h-8 w-px bg-base-700/50" />
            <div className="text-center">
              <span className="font-display text-4xl font-bold text-primary-400">
                {achievements.length}+
              </span>
              <p className="mt-1 text-sm text-base-400">Awards & Publications</p>
            </div>
            <div className="h-8 w-px bg-base-700/50" />
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-400" />
              <span className="font-mono text-sm text-green-400">
                Available for Hire
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED WORK — Card Swap (Top 5)
          Card Swap component will replace this in Stage 4
          ============================================================ */}
      <section id="featured" className="section-padding" aria-label="Featured Work">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-base-100">
                Featured <span className="text-accent-400">Work</span>
              </h2>
              <p className="mt-4 text-base-400">
                My top projects showcasing full-stack expertise
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.1}>
                <Link
                  to={`/projects/${project.id}`}
                  className="group block overflow-hidden rounded-2xl border border-base-800/50 bg-base-900/50 transition-all hover:border-primary-700/50 hover:shadow-xl hover:shadow-primary-950/20"
                >
                  {/* Project Image */}
                  {project.gallery?.[0] && (
                    <div className="aspect-video overflow-hidden bg-base-800">
                      <img
                        src={`/data/images/${project.gallery[0].replace('/images/', '')}`}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        width={640}
                        height={360}
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-base-100">
                      {project.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-accent-400">
                      {project.contributions}
                    </p>
                    <p className="mt-3 line-clamp-2 text-sm text-base-400">
                      {project.one_liner}
                    </p>

                    {/* Tech Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech_stack.slice(0, 4).map(tech => (
                        <span
                          key={tech.name}
                          className="rounded-full bg-base-800 px-2.5 py-0.5 font-mono text-xs text-base-300"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent-400 transition-colors hover:text-accent-300"
            >
              View All Projects
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          PROJECT WALL — Drift Wall preview
          Drift Wall component will replace this in Stage 4
          ============================================================ */}
      <section
        id="project-wall"
        className="section-padding overflow-hidden bg-base-900/30"
        aria-label="Project Wall"
      >
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="text-center text-base-100">
              All <span className="text-primary-400">Projects</span>
            </h2>
          </ScrollReveal>

          {/* Simple scrolling preview — Drift Wall replaces this */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.05}>
                <Link
                  to={`/projects/${project.id}`}
                  className="group block rounded-xl border border-base-800/30 bg-base-900/50 p-4 transition-all hover:border-primary-700/50"
                >
                  <h4 className="font-semibold text-base-200 group-hover:text-accent-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-xs text-base-500">
                    {project.one_liner}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          TECH ECOSYSTEM — Logo Loop rows
          Logo Loop component will replace these in Stage 4
          ============================================================ */}
      <section id="tech-stack" className="section-padding" aria-label="Tech Stack">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-base-100">
                Tech <span className="text-primary-400">Ecosystem</span>
              </h2>
              <p className="mt-4 text-base-400">
                Technologies I work with across {techCategories.length} domains
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 space-y-10">
            {techCategories.map((cat, catIndex) => (
              <ScrollReveal key={cat.category} delay={catIndex * 0.1}>
                <div>
                  <h3 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-base-500">
                    {cat.category}
                  </h3>

                  {/* Logo Loop placeholder — horizontal scroll row */}
                  <div className="flex flex-wrap gap-3">
                    {cat.items.map(item => (
                      <div
                        key={item.title}
                        className="group relative flex items-center gap-2 rounded-lg border border-base-800/50 bg-base-900/50 px-4 py-2.5 transition-all hover:border-primary-700/50"
                      >
                        <span className="text-sm font-medium text-base-200">
                          {item.title}
                        </span>

                        {/* Proficiency bar */}
                        <div className="h-1 w-12 overflow-hidden rounded-full bg-base-800">
                          <div
                            className="h-full rounded-full bg-accent-500 transition-all"
                            style={{ width: `${item.proficiency * 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          EXPERIENCE & HIGHLIGHTS
          Magic Bento + Accordion Gallery will be added in Stage 4
          ============================================================ */}
      <section
        id="highlights"
        className="section-padding bg-base-900/30"
        aria-label="Experience and Highlights"
      >
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-base-100">
                Experience & <span className="text-accent-400">Highlights</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Experience */}
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl border border-base-800/50 bg-base-900/50 p-8">
                <div className="flex items-center gap-3">
                  <Briefcase size={20} className="text-primary-400" />
                  <h3 className="text-lg font-bold text-base-100">Experience</h3>
                </div>

                {experience.map(exp => (
                  <div key={exp.id} className="mt-6">
                    <h4 className="font-semibold text-base-100">{exp.role}</h4>
                    <p className="mt-1 font-mono text-sm text-accent-400">
                      {exp.company}
                    </p>
                    <p className="mt-1 text-xs text-base-500">
                      {exp.location} · {exp.date_range}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {exp.contributions.map((c, i) => (
                        <li key={i} className="flex gap-2 text-sm text-base-300">
                          <Code2 size={14} className="mt-1 flex-shrink-0 text-primary-500" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Achievements */}
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl border border-base-800/50 bg-base-900/50 p-8">
                <div className="flex items-center gap-3">
                  <Trophy size={20} className="text-accent-400" />
                  <h3 className="text-lg font-bold text-base-100">Achievements</h3>
                </div>

                <div className="mt-6 space-y-4">
                  {achievements.slice(0, 5).map(achievement => (
                    <div
                      key={achievement.id}
                      className="border-l-2 border-accent-500/30 pl-4"
                    >
                      <h4 className="text-sm font-semibold text-base-100">
                        {achievement.title}
                      </h4>
                      <p className="mt-1 text-xs text-base-400">
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                  {achievements.length > 5 && (
                    <p className="pl-4 text-xs text-base-500">
                      + {achievements.length - 5} more awards
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA SECTION
          ============================================================ */}
      <section id="cta" className="section-padding" aria-label="Call to Action">
        <div className="container-wide text-center">
          <ScrollReveal>
            <h2 className="text-base-100">
              Let's Build Something <span className="text-accent-400">Great</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base-400">
              I'm currently available for new opportunities. Let's connect and build something impactful together.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-500 px-10 py-4 text-lg font-semibold text-white transition-all hover:bg-accent-600 hover:shadow-xl hover:shadow-accent-500/25"
            >
              Get in Touch
              <ArrowRight size={20} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  )
}
