import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Grid,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  Zap,
} from 'lucide-react';
import dataService from '@/services/dataService';
import { Project } from '@/types/data';
import {
  ChromaGrid,
  SpotlightCard,
  GradientText,
  ShinyText,
  SpecularButton,
} from '@/components/reactbits';

const CATEGORIES = [
  { id: 'all', label: 'All Projects (10)' },
  { id: 'game', label: 'Game Dev' },
  { id: 'ai-health', label: 'AI & Diagnostics' },
  { id: 'cloud-tools', label: 'Cloud & Developer Tools' },
  { id: 'fullstack', label: 'Full-Stack Apps' },
];

const mapProjectToCategory = (project: Project): string[] => {
  const cats: string[] = ['all'];
  const title = project.title.toLowerCase();
  const tech = project.tech_stack.map((t) => t.name.toLowerCase()).join(' ');

  if (title.includes('freddy') || tech.includes('swing') || tech.includes('awt')) {
    cats.push('game');
  }
  if (
    title.includes('seizuki') ||
    title.includes('pixcell') ||
    title.includes('mnist') ||
    tech.includes('fastapi') ||
    tech.includes('python')
  ) {
    cats.push('ai-health');
  }
  if (
    title.includes('dittobase') ||
    title.includes('autopbi') ||
    title.includes('teknotes') ||
    tech.includes('c#') ||
    tech.includes('powershell')
  ) {
    cats.push('cloud-tools');
  }
  if (
    title.includes('pawductive') ||
    title.includes('fasaar') ||
    title.includes('sprout') ||
    tech.includes('react') ||
    tech.includes('next')
  ) {
    cats.push('fullstack');
  }

  return cats;
};

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const allProjects = dataService.getProjects();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'chroma'>('cards');

  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || mapProjectToCategory(p).includes(selectedCategory);

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.one_liner.toLowerCase().includes(q) ||
        p.tech_stack.some((t) => t.name.toLowerCase().includes(q)) ||
        p.contributions.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [allProjects, selectedCategory, searchQuery]);

  // ChromaGrid items for chroma view
  const chromaItems = filteredProjects.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.one_liner,
    image: p.gallery[0] || '/images/Escano_Business-Profile-Image_Transparent.png',
    url: `/projects/${p.id}`,
    tags: p.tech_stack.slice(0, 3).map((t) => t.name),
  }));

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cobalt/10 border border-brand-cobalt/30 text-blue-400 text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-brand-orange" />
            <ShinyText text="Architectural Portfolio • 10 Systems" speed={3} />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Crafted <GradientText colors={['#3845C9', '#60a5fa', '#f97316']}>Engineering Projects</GradientText>
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Explore 10 production-grade solutions across low-level retro game architecture, biomedical AI diagnostics,
            vector database engines, and cross-platform desktop automation.
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, stack, or domain..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-800/80 border border-slate-700 focus:border-brand-cobalt focus:outline-none text-white placeholder-slate-400 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-cobalt text-white font-semibold shadow-md shadow-brand-cobalt/20'
                    : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-slate-800/60 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                viewMode === 'cards' ? 'bg-slate-700 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('chroma')}
              className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                viewMode === 'chroma' ? 'bg-slate-700 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <span>Chroma</span>
            </button>
          </div>
        </div>

        {/* Projects Render Area */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-white/10 space-y-4">
            <Filter className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-xl font-display font-bold text-white">No projects found</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              No projects match your current search query or filter. Try clearing filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-full text-xs font-mono bg-brand-cobalt text-white hover:bg-brand-cobalt/80 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'chroma' ? (
          <div className="bg-slate-900/20 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <ChromaGrid
              items={chromaItems}
              radius={350}
              onItemClick={(item) => navigate(item.url || `/projects/${item.id}`)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <SpotlightCard
                key={project.id}
                className="group flex flex-col justify-between h-full bg-slate-900/60 border-white/10 hover:border-brand-cobalt/50 transition-all duration-300"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-5 bg-slate-950/80 border border-white/5">
                    <img
                      src={project.gallery[0] || '/images/Escano_Business-Profile-Image_Transparent.png'}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900/90 border border-white/20 text-brand-orange backdrop-blur-md font-semibold">
                      {project.contributions.split('&')[0]?.trim() || 'Lead'}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-brand-orange transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {project.one_liner}
                  </p>

                  {/* Key Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tech_stack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                          tech.role === 'Primary'
                            ? 'bg-brand-cobalt/20 border-brand-cobalt/40 text-blue-300'
                            : 'bg-white/5 border-white/10 text-slate-400'
                        }`}
                      >
                        {tech.name}
                      </span>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400">
                        +{project.tech_stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Zap className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Case Study</span>
                  </div>

                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-brand-cobalt dark:text-blue-400 group-hover:text-brand-orange group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Read Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}

        {/* Bottom Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-900/40 border border-brand-cobalt/30 text-center space-y-4 backdrop-blur-md">
          <h3 className="text-2xl font-display font-bold text-white">
            Need an engineered solution customized for your stack?
          </h3>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Simon is actively open to high-impact software engineering roles, hackathons, and technical consulting.
          </p>
          <div className="pt-2 flex justify-center">
            <SpecularButton onClick={() => navigate('/contact')}>
              <span>Discuss an Engineering Role</span>
              <ArrowRight className="w-4 h-4 text-brand-orange" />
            </SpecularButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
