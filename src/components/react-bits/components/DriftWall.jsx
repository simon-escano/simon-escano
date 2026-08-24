import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export function DriftWall({ projects = [], className = '' }) {
  // Repeat projects 3 times for a dense wall effect per tips
  const repeatedProjects = [...projects, ...projects, ...projects]

  // Split into 2 opposing horizontal scrolling tracks
  const row1 = repeatedProjects.slice(0, Math.ceil(repeatedProjects.length / 2))
  const row2 = repeatedProjects.slice(Math.ceil(repeatedProjects.length / 2))

  return (
    <div className={`relative w-full overflow-hidden py-10 select-none ${className}`}>
      {/* Side Vignettes */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-base-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-base-950 to-transparent" />

      {/* Row 1: Leftward drift */}
      <div className="flex w-fit gap-6 hover:[animation-play-state:paused]" style={{ animation: 'marquee 45s linear infinite' }}>
        {row1.map((p, idx) => (
          <Link
            key={`row1-${idx}-${p.id}`}
            to={`/projects/${p.id}`}
            className="group relative flex h-48 w-80 shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-base-800/60 bg-base-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-primary-500/60 hover:bg-base-850/80 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1"
          >
            {p.gallery?.[0] && (
              <img
                src={`/data/images/${p.gallery[0].replace('/images/', '')}`}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-cover opacity-20 transition-opacity duration-300 group-hover:opacity-35"
                loading="lazy"
              />
            )}

            <div className="relative z-10 flex items-start justify-between">
              <span className="rounded-full bg-base-950/80 border border-white/10 px-2.5 py-0.5 font-mono text-[10px] text-accent-400">
                {p.tech_stack[0]?.name || 'Full-Stack'}
              </span>
              <ArrowUpRight size={16} className="text-base-500 transition-colors group-hover:text-accent-400" />
            </div>

            <div className="relative z-10">
              <h4 className="font-display font-bold text-white group-hover:text-accent-400 transition-colors">
                {p.title}
              </h4>
              <p className="mt-1 line-clamp-2 text-xs text-base-400">
                {p.one_liner}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Row 2: Rightward drift */}
      <div className="mt-6 flex w-fit gap-6 hover:[animation-play-state:paused]" style={{ animation: 'marquee-reverse 50s linear infinite' }}>
        {row2.map((p, idx) => (
          <Link
            key={`row2-${idx}-${p.id}`}
            to={`/projects/${p.id}`}
            className="group relative flex h-48 w-80 shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-base-800/60 bg-base-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-accent-500/60 hover:bg-base-850/80 hover:shadow-xl hover:shadow-accent-500/10 hover:-translate-y-1"
          >
            {p.gallery?.[0] && (
              <img
                src={`/data/images/${p.gallery[0].replace('/images/', '')}`}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-cover opacity-20 transition-opacity duration-300 group-hover:opacity-35"
                loading="lazy"
              />
            )}

            <div className="relative z-10 flex items-start justify-between">
              <span className="rounded-full bg-base-950/80 border border-white/10 px-2.5 py-0.5 font-mono text-[10px] text-primary-400">
                {p.tech_stack[0]?.name || 'Full-Stack'}
              </span>
              <ArrowUpRight size={16} className="text-base-500 transition-colors group-hover:text-accent-400" />
            </div>

            <div className="relative z-10">
              <h4 className="font-display font-bold text-white group-hover:text-accent-400 transition-colors">
                {p.title}
              </h4>
              <p className="mt-1 line-clamp-2 text-xs text-base-400">
                {p.one_liner}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
