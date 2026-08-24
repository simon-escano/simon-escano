import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { m } from 'motion/react'
import { Search, Filter } from 'lucide-react'
import { usePageSEO } from '@/hooks/usePageSEO'
import PageTransition from '@/components/layout/PageTransition'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { projects } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Projects() {
  usePageSEO({
    title: 'Projects',
    description: `Explore ${projects.length}+ projects spanning full-stack development, game architecture, AI/ML, and more.`,
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  // Extract unique tech categories from all projects
  const filters = useMemo(() => {
    const techSet = new Set()
    projects.forEach(p => {
      p.tech_stack.forEach(t => {
        if (t.role === 'Primary') techSet.add(t.name)
      })
    })
    return ['All', ...Array.from(techSet).sort()]
  }, [])

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.one_liner.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter =
        activeFilter === 'All' ||
        project.tech_stack.some(t => t.name === activeFilter)

      return matchesSearch && matchesFilter
    })
  }, [searchQuery, activeFilter])

  return (
    <PageTransition>
      <section className="section-padding pt-32" aria-label="Projects">
        <div className="container-wide">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center">
              <h1 className="text-base-100">
                My <span className="text-accent-400">Projects</span>
              </h1>
              <p className="mt-4 text-lg text-base-400">
                {projects.length}+ projects across full-stack, AI, and game development
              </p>
            </div>
          </ScrollReveal>

          {/* Search + Filters */}
          <ScrollReveal delay={0.1}>
            <div className="mt-12 space-y-6">
              {/* Search Bar */}
              <div className="relative mx-auto max-w-md">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-base-500"
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-base-700/50 bg-base-900/50 py-3 pl-12 pr-4 text-sm text-base-200 placeholder:text-base-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                  id="project-search"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-2">
                {filters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      'rounded-full px-4 py-1.5 text-xs font-medium transition-all',
                      activeFilter === filter
                        ? 'bg-accent-500 text-white'
                        : 'border border-base-700/50 text-base-400 hover:border-base-500 hover:text-base-200'
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Projects Grid — Chroma Grid will replace this in Stage 4 */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.05}>
                <Link
                  to={`/projects/${project.id}`}
                  className="group block overflow-hidden rounded-2xl border border-base-800/50 bg-base-900/50 transition-all hover:border-primary-700/50 hover:shadow-xl hover:shadow-primary-950/20"
                >
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
                    <h3 className="text-lg font-bold text-base-100 group-hover:text-accent-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-primary-400">
                      {project.contributions}
                    </p>
                    <p className="mt-3 line-clamp-2 text-sm text-base-400">
                      {project.one_liner}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech_stack.slice(0, 3).map(tech => (
                        <span
                          key={tech.name}
                          className="rounded-full bg-base-800 px-2.5 py-0.5 font-mono text-xs text-base-300"
                        >
                          {tech.name}
                        </span>
                      ))}
                      {project.tech_stack.length > 3 && (
                        <span className="rounded-full bg-base-800 px-2.5 py-0.5 font-mono text-xs text-base-500">
                          +{project.tech_stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="mt-12 text-center">
              <p className="text-base-400">
                No projects match your search. Try a different filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
