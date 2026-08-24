import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ExternalLink,
  Zap,
  Layers,
  Shield,
} from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { usePageSEO } from '@/hooks/usePageSEO'
import PageTransition from '@/components/layout/PageTransition'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { getProjectBySlug } from '@/lib/data'

const iconMap = {
  zap: Zap,
  layers: Layers,
  shield: Shield,
  bolt: Zap,
  refresh: Zap,
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  usePageSEO({
    title: project?.title || 'Project Not Found',
    description: project?.one_liner || '',
  })

  if (!project) {
    return (
      <PageTransition>
        <section className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-base-100">404</h1>
            <p className="mt-4 text-base-400">Project not found.</p>
            <Link
              to="/projects"
              className="mt-6 inline-flex items-center gap-2 text-accent-400 hover:text-accent-300"
            >
              <ArrowLeft size={16} />
              Back to Projects
            </Link>
          </div>
        </section>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <article className="section-padding pt-32">
        <div className="container-wide">
          {/* Back Link */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-base-400 transition-colors hover:text-accent-400"
          >
            <ArrowLeft size={16} />
            All Projects
          </Link>

          {/* Header */}
          <ScrollReveal>
            <div className="mt-8">
              <h1 className="text-base-100">{project.title}</h1>
              <p className="mt-2 font-mono text-sm text-accent-400">
                {project.contributions}
              </p>
              <p className="mt-4 max-w-2xl text-lg text-base-300">
                {project.one_liner}
              </p>

              {/* Links */}
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.map(link => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-base-700/50 px-4 py-2 text-sm text-base-200 transition-all hover:border-accent-500/50 hover:text-accent-400"
                  >
                    {link.icon === 'github' ? (
                      <GithubIcon size={16} />
                    ) : (
                      <ExternalLink size={16} />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Gallery */}
          {project.gallery?.length > 0 && (
            <ScrollReveal delay={0.1}>
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl border border-base-800/50 bg-base-900"
                  >
                    <img
                      src={`/data/images/${img.replace('/images/', '')}`}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width={640}
                      height={360}
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* Problem & Goal */}
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl border border-base-800/50 bg-base-900/50 p-8">
                <h2 className="text-lg font-bold text-base-100">The Problem</h2>
                <p className="mt-4 text-base-300">{project.problem}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl border border-base-800/50 bg-base-900/50 p-8">
                <h2 className="text-lg font-bold text-base-100">The Goal</h2>
                <p className="mt-4 text-base-300">{project.goal}</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Key Features */}
          <ScrollReveal delay={0.15}>
            <div className="mt-12">
              <h2 className="text-xl font-bold text-base-100">Key Features</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {project.key_features.map((feature, i) => {
                  const Icon = iconMap[feature.icon] || Zap
                  return (
                    <div
                      key={i}
                      className="rounded-xl border border-base-800/50 bg-base-900/50 p-6"
                    >
                      <Icon size={24} className="text-accent-400" />
                      <p className="mt-3 text-sm text-base-200">
                        {feature.text}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Tech Stack */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12">
              <h2 className="text-xl font-bold text-base-100">Tech Stack</h2>
              <p className="mt-2 text-sm text-base-400">
                {project.stack_reason}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {project.tech_stack.map(tech => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 rounded-lg border border-base-800/50 bg-base-900/50 px-4 py-2.5"
                  >
                    <span className="text-sm font-medium text-base-200">
                      {tech.name}
                    </span>
                    <span className="rounded-full bg-base-800 px-2 py-0.5 font-mono text-xs text-base-500">
                      {tech.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Results */}
          <ScrollReveal delay={0.25}>
            <div className="mt-12">
              <h2 className="text-xl font-bold text-base-100">Results</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {Object.entries(project.results).map(([key, result]) => {
                  const Icon = iconMap[result.icon] || Zap
                  return (
                    <div
                      key={key}
                      className="rounded-xl border border-base-800/50 bg-base-900/50 p-6"
                    >
                      <Icon size={20} className="text-primary-400" />
                      <p className="mt-3 text-sm text-base-300">
                        {result.text}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Back */}
          <div className="mt-16">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-base-400 transition-colors hover:text-accent-400"
            >
              <ArrowLeft size={16} />
              Back to All Projects
            </Link>
          </div>
        </div>
      </article>
    </PageTransition>
  )
}
