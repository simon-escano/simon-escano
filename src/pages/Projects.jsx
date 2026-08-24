import React, { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { usePageSEO } from '@/hooks/usePageSEO'
import PageTransition from '@/components/layout/PageTransition'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { projects } from '@/lib/data'
import { cn } from '@/lib/utils'
import { GradientText } from '@/components/react-bits/text-animations/GradientText'
import { ChromaGrid } from '@/components/react-bits/components/ChromaGrid'

export default function Projects() {
  usePageSEO({
    title: 'Projects Gallery',
    description: `Explore ${projects.length}+ projects spanning full-stack web applications, game engines, AI classifiers, and cloud automation.`,
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  // Extract unique tech tags from all projects
  const filters = useMemo(() => {
    const techSet = new Set()
    projects.forEach((p) => {
      p.tech_stack.forEach((t) => {
        if (t.role === 'Primary') techSet.add(t.name)
      })
    })
    return ['All', ...Array.from(techSet).sort()]
  }, [])

  // Filter projects based on query and active filter
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.one_liner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech_stack.some((t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase())
        )

      const matchesFilter =
        activeFilter === 'All' ||
        project.tech_stack.some((t) => t.name === activeFilter)

      return matchesSearch && matchesFilter
    })
  }, [searchQuery, activeFilter])

  return (
    <PageTransition>
      <section className="section-padding pt-32 md:pt-40" aria-label="Projects Gallery">
        <div className="container-wide">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-400">
                Portfolio Catalog
              </span>
              <h1 className="mt-2 text-base-100">
                Engineered <GradientText colors={['#3b82f6', '#f97316', '#3b82f6']}>Solutions</GradientText>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-base-300">
                Explore {projects.length}+ production applications, research prototypes, and interactive systems.
              </p>
            </div>
          </ScrollReveal>

          {/* Search + Filters */}
          <ScrollReveal delay={0.1}>
            <div className="mt-12 space-y-6">
              {/* Search Bar */}
              <div className="relative mx-auto max-w-lg">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-base-500"
                />
                <input
                  type="text"
                  placeholder="Search by name, technology, or domain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-base-800 bg-base-900/80 py-3.5 pl-12 pr-4 text-sm text-base-100 placeholder:text-base-500 backdrop-blur-md focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 transition-all"
                  id="project-search"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      'rounded-full px-4 py-2 text-xs font-mono font-medium transition-all duration-200 cursor-pointer',
                      activeFilter === filter
                        ? 'bg-accent-500 text-white shadow-md shadow-accent-500/20 scale-105'
                        : 'border border-base-800 bg-base-900/40 text-base-400 hover:border-base-700 hover:text-white'
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Chroma Grid Filterable Showcase */}
          <div className="mt-14">
            <ChromaGrid projects={filteredProjects} />
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="mt-16 text-center py-12 rounded-3xl border border-base-800/60 bg-base-900/40">
              <p className="text-base-400 font-mono text-sm">
                No matching projects found for "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveFilter('All')
                }}
                className="mt-4 text-xs font-mono text-accent-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
