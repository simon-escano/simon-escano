import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SpotlightCard } from './SpotlightCard'
import { TiltedCard } from './TiltedCard'

export function ChromaGrid({ projects = [], className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {projects.map((project, index) => (
        <TiltedCard
          key={project.id}
          maxTilt={8}
          scaleOnHover={1.02}
          className="h-full"
        >
          <SpotlightCard
            className="group flex h-full flex-col justify-between border-base-800/70 bg-base-900/70 p-0 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10"
            spotlightColor="rgba(59, 130, 246, 0.18)"
            borderColor="rgba(249, 115, 22, 0.35)"
          >
            {/* Top Media Preview */}
            {project.gallery?.[0] && (
              <div className="relative aspect-video w-full overflow-hidden bg-base-950">
                <img
                  src={`/data/images/${project.gallery[0].replace('/images/', '')}`}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-transparent to-transparent" />
                
                <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-base-950/80 border border-white/10 text-base-300 backdrop-blur-md transition-colors group-hover:text-accent-400">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            )}

            {/* Card Content */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-accent-400">
                    {project.title}
                  </h3>
                </div>

                <p className="mt-1 font-mono text-xs text-primary-400">
                  {project.contributions}
                </p>

                <p className="mt-3 line-clamp-2 text-sm text-base-400">
                  {project.one_liner}
                </p>
              </div>

              {/* Tech Stack Footer */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-base-800/60 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech_stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech.name}
                      className="rounded-full bg-base-800/80 px-2.5 py-0.5 font-mono text-[10px] text-base-300"
                    >
                      {tech.name}
                    </span>
                  ))}
                  {project.tech_stack.length > 3 && (
                    <span className="rounded-full bg-base-800/80 px-2 py-0.5 font-mono text-[10px] text-base-500">
                      +{project.tech_stack.length - 3}
                    </span>
                  )}
                </div>

                <Link
                  to={`/projects/${project.id}`}
                  className="font-mono text-xs font-semibold text-accent-400 hover:text-accent-300"
                >
                  Details →
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </TiltedCard>
      ))}
    </div>
  )
}
