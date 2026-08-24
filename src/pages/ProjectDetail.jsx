import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ExternalLink,
  Zap,
  Layers,
  Shield,
  CheckCircle2,
} from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { usePageSEO } from '@/hooks/usePageSEO'
import PageTransition from '@/components/layout/PageTransition'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { getProjectBySlug } from '@/lib/data'
import { GradientText } from '@/components/react-bits/text-animations/GradientText'
import { GlassSurface } from '@/components/react-bits/components/GlassSurface'
import { LogoLoop } from '@/components/react-bits/components/LogoLoop'
import { SpecularButton } from '@/components/react-bits/components/SpecularButton'
import { TiltedCard } from '@/components/react-bits/components/TiltedCard'

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
        <section className="flex min-h-[70vh] items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">404</h1>
            <p className="mt-4 text-base-400">Project record not found.</p>
            <Link
              to="/projects"
              className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent-400 hover:text-accent-300"
            >
              <ArrowLeft size={16} />
              Return to Catalog
            </Link>
          </div>
        </section>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <article className="section-padding pt-32 md:pt-40">
        <div className="container-wide">
          {/* Back Navigation */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-base-400 transition-colors hover:text-accent-400"
          >
            <ArrowLeft size={14} />
            Back to Projects Gallery
          </Link>

          {/* Header Section */}
          <ScrollReveal>
            <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-base-800/80 pb-10">
              <div className="max-w-3xl">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-400">
                  Case Study
                </span>
                <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold text-white">
                  {project.title}
                </h1>
                <p className="mt-3 font-mono text-sm text-primary-400">
                  {project.contributions}
                </p>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-base-300">
                  {project.one_liner}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 shrink-0">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SpecularButton
                      variant={link.label.toLowerCase().includes('live') || link.label.toLowerCase().includes('demo') ? 'primary' : 'outline'}
                      className="px-5 py-3 text-xs uppercase font-mono tracking-wider"
                    >
                      {link.icon === 'github' ? (
                        <GithubIcon size={16} />
                      ) : (
                        <ExternalLink size={16} />
                      )}
                      {link.label}
                    </SpecularButton>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Gallery Media Previews */}
          {project.gallery?.length > 0 && (
            <ScrollReveal delay={0.1}>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((img, i) => (
                  <TiltedCard key={i} maxTilt={6} scaleOnHover={1.02}>
                    <div className="overflow-hidden rounded-2xl border border-base-800 bg-base-950 shadow-xl">
                      <img
                        src={`/data/images/${img.replace('/images/', '')}`}
                        alt={`${project.title} preview ${i + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </TiltedCard>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* Problem & Goal Breakdown with GlassSurface */}
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <ScrollReveal delay={0.1}>
              <GlassSurface className="p-8 h-full">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary-400">
                  Challenge
                </span>
                <h2 className="mt-2 text-2xl font-bold text-white">The Problem</h2>
                <p className="mt-4 leading-relaxed text-base-300">
                  {project.problem}
                </p>
              </GlassSurface>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <GlassSurface className="p-8 h-full">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-400">
                  Objective
                </span>
                <h2 className="mt-2 text-2xl font-bold text-white">The Architectural Goal</h2>
                <p className="mt-4 leading-relaxed text-base-300">
                  {project.goal}
                </p>
              </GlassSurface>
            </ScrollReveal>
          </div>

          {/* Key Features */}
          <ScrollReveal delay={0.15}>
            <div className="mt-16">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-400">
                Core Innovations
              </span>
              <h2 className="mt-2 text-2xl font-bold text-white">Key Features</h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {project.key_features.map((feature, i) => {
                  const Icon = iconMap[feature.icon] || Zap
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-base-800/80 bg-base-900/60 p-6 backdrop-blur-md"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/20 text-accent-400 border border-accent-500/30">
                        <Icon size={20} />
                      </div>
                      <p className="mt-4 font-semibold text-white text-sm leading-relaxed">
                        {feature.text}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Tech Stack Loop */}
          <ScrollReveal delay={0.2}>
            <div className="mt-16 rounded-2xl border border-base-800/80 bg-base-900/40 p-8 backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary-400">
                    Technology Choices
                  </span>
                  <h2 className="mt-1 text-2xl font-bold text-white">Tech Stack Rationale</h2>
                </div>
              </div>

              <p className="mt-3 text-sm text-base-300 leading-relaxed max-w-3xl">
                {project.stack_reason}
              </p>

              <div className="mt-6">
                <LogoLoop items={project.tech_stack} speed={20} />
              </div>
            </div>
          </ScrollReveal>

          {/* Quantifiable Results */}
          <ScrollReveal delay={0.25}>
            <div className="mt-16">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
                Impact & Metrics
              </span>
              <h2 className="mt-2 text-2xl font-bold text-white">System Outcomes</h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {Object.entries(project.results).map(([key, result]) => {
                  const Icon = iconMap[result.icon] || Zap
                  return (
                    <GlassSurface key={key} className="p-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                        <span className="font-mono text-xs uppercase tracking-wider text-base-400">
                          {key}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-base-200">
                        {result.text}
                      </p>
                    </GlassSurface>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Footer Navigation */}
          <div className="mt-20 border-t border-base-800/80 pt-8 flex items-center justify-between">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono text-sm text-accent-400 hover:text-accent-300"
            >
              <ArrowLeft size={16} />
              Back to Catalog
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-mono text-sm text-base-400 hover:text-white"
            >
              Have a question about this architecture? Contact me →
            </Link>
          </div>
        </div>
      </article>
    </PageTransition>
  )
}
