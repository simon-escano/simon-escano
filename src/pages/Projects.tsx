import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  ArrowRight,
} from 'lucide-react';
import dataService from '@/services/dataService';
import { Project } from '@/types/data';
import {
  ChromaGrid,
  GradientText,
  SpecularButton,
} from '@/components/reactbits';

const CATEGORIES = [
  { id: 'all', label: 'All' },
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
    images: p.gallery,
    url: `/projects/${p.id}`,
    tags: p.tech_stack.slice(0, 3).map((t) => t.name),
  }));

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
            Built by <GradientText colors={['#3845C9', '#60a5fa', '#f97316']}>simon-escano</GradientText>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Production-grade solutions across low-level retro game architecture, biomedical AI diagnostics,
            vector database engines, and cross-platform desktop automation.
          </p>
        </div>

        {/* Filter and Search Controls (Cleanly Centered & Aligned) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, stack, or domain..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-brand-cobalt focus:outline-none text-slate-900 dark:text-white placeholder-slate-400 transition-colors"
            />
          </div>

          {/* Category Tabs (Cleanly Centered, Scrollbar Hidden) */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 w-full md:flex-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${selectedCategory === cat.id
                  ? 'bg-brand-cobalt text-white font-medium shadow-md shadow-brand-cobalt/20'
                  : 'bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Chroma Grid View */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white/60 dark:bg-slate-900/30 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
            <Filter className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-xl font-display font-medium text-slate-900 dark:text-white">No projects found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
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
        ) : (
          <ChromaGrid
            items={chromaItems}
            radius={350}
            onItemClick={(item) => navigate(item.url || `/projects/${item.id}`)}
          />
        )}

        {/* Bottom Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-white/80 dark:bg-slate-900/40 border border-brand-cobalt/30 text-center space-y-4 shadow-sm backdrop-blur-md">
          <h3 className="text-2xl font-display font-medium text-slate-900 dark:text-white">
            Need an engineered solution customized for your stack?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
            simon-escano is actively open to high-impact software engineering roles, hackathons, and technical consulting.
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
