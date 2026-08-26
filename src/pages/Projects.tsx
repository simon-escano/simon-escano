import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  ExternalLink,
  Github,
} from 'lucide-react';
import dataService from '@/services/dataService';
import { Project } from '@/types/data';
import {
  ChromaGrid,
  GradientText,
  DotField,
  BorderGlow,
  CurvedInput,
  CurvedLoop,
} from '@/components/reactbits';
import type { ChromaItem } from '@/components/reactbits';

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
  const profile = dataService.getProfile();
  const allProjects = dataService.getProjects();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCurvedSubmit = (val: string) => {
    if (val.trim()) {
      navigate(`/contact?message=${encodeURIComponent(val)}`);
    } else {
      navigate('/contact');
    }
  };

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
  const chromaItems: ChromaItem[] = [
    ...filteredProjects.map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: p.one_liner,
      image: p.gallery[0] || '/images/Escano_Business-Profile-Image_Transparent.png',
      images: p.gallery,
      url: `/projects/${p.id}`,
      tags: p.tech_stack.slice(0, 3).map((t) => t.name),
    })),
    {
      id: 'more-projects-github',
      title: 'More projects on',
      subtitle: 'Explore 20+ additional repositories, low-level experiments, and builds.',
      url: profile.contact.github || 'https://github.com/simon-escano',
      borderColor: '#f97316',
      customCard: (
        <div className="flex flex-col h-full justify-between">
          <div className="chroma-img-wrapper relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-[14px] overflow-hidden border border-white/5 group-hover:border-brand-orange/40 transition-colors text-center select-none">
            <div className="absolute w-32 h-32 rounded-full bg-brand-orange/20 blur-2xl pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/10 flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 group-hover:bg-brand-orange/20 transition-all duration-300">
              <Github className="w-7 h-7 text-white group-hover:text-brand-orange transition-colors" />
            </div>
            <span className="text-xs font-mono font-medium text-slate-200 uppercase tracking-widest">
              20+ Repositories & Builds
            </span>
            <span className="text-[11px] font-mono text-slate-400 mt-1">
              Algorithms • Full-Stack • AI Models • CLI Tools
            </span>
          </div>

          <footer className="chroma-info">
            <div className="space-y-1">
              <h3 className="name group-hover:text-brand-orange transition-colors">
                More projects on
              </h3>
              <p className="role text-slate-500 dark:text-slate-400 text-xs">
                Explore open-source systems, utilities, and research codebases.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={profile.contact.github || 'https://github.com/simon-escano'}
                target="_blank"
                rel="noreferrer noopener"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-brand-orange dark:hover:bg-brand-orange dark:hover:text-white text-xs font-mono font-medium transition-all shadow-sm group-hover:scale-[1.02]"
              >
                <Github className="w-4 h-4 flex-shrink-0" />
                <span>simon-escano</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 ml-0.5" />
              </a>
            </div>
          </footer>
        </div>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Interactive DotField Shader */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-75 dark:opacity-85">
          <DotField
            dotRadius={1.5}
            dotSpacing={16}
            bulgeStrength={65}
            glowRadius={160}
            gradientFrom="rgba(56, 69, 201, 0.45)"
            gradientTo="rgba(249, 115, 22, 0.35)"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto pt-28 pb-20 px-4 sm:px-6 lg:px-8 space-y-12">
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
      </div>

      {/* ──────────────────────────────────────────────────────────
          CURVED MARQUEE & CONTACT CTA
      ────────────────────────────────────────────────────────── */}
      <section className="pb-16 sm:pb-20 pt-4 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-white/10 w-full box-border">
        {/* Marquee Header: Scaled curve & text for mobile */}
        <div className="w-full mb-6 sm:mb-8 overflow-hidden">
          <CurvedLoop
            marqueeText="LET'S BUILD SOMETHING EXTRAORDINARY TOGETHER ✦ FULL-STACK DEV & SOFTWARE ENGINEER ✦ BACKEND DEV & INTEGRATION ENGINEER ✦ AI ENGINEER & ML APP DEVELOPER ✦ WEB ARCHITECT & TECHNICAL SEO DEV ✦ SIMON-ESCANO ✦ "
            speed={1.4}
            curveAmount={60} // Reduced on mobile base; let CSS handle scaling
            className="fill-slate-800 dark:fill-white font-display text-xl sm:text-3xl md:text-4xl font-medium uppercase tracking-widest"
          />
        </div>

        {/* Main Card Container */}
        <div className="w-full max-w-3xl mx-auto px-3 sm:px-6 lg:px-8 box-border">
          <div className="w-full max-w-full rounded-[20px] sm:rounded-[28px] shadow-sm">
            <BorderGlow
              edgeSensitivity={35}
              glowColor="24 95 53"
              borderRadius={24}
              glowRadius={30}
              className="w-full max-w-full"
            >
              <div className="p-5 sm:p-8 md:p-12 text-center space-y-5 sm:space-y-6 w-full max-w-full box-border min-w-0">

                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-slate-900 dark:text-white leading-tight break-words px-1">
                  Interested in building something like this?
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed break-words px-2">
                  Drop your inquiry or email below to discuss architecture and builds.
                </p>

                {/* Curved Input Wrapper */}
                <div className="w-full max-w-full sm:max-w-md mx-auto pt-1 sm:pt-2 flex justify-center min-w-0 [&_svg]:drop-shadow-none [&_svg]:overflow-visible [&_filter]:hidden [&_path]:[filter:none]">
                  <div className="w-full bg-transparent">
                    <CurvedInput
                      width="100%"
                      height={50}
                      bend={8}
                      placeholder="Your message or email..."
                      buttonText="Send"
                      onSubmit={handleCurvedSubmit}
                    />
                  </div>
                </div>

                {/* Responsive Footer Links */}
                <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 w-full max-w-full overflow-hidden">
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="hover:text-brand-orange transition-colors flex items-center gap-1.5 max-w-full min-w-0 px-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate block max-w-[260px] sm:max-w-none">{profile.contact.email}</span>
                  </a>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-slate-400/40">•</span>
                    <a
                      href={profile.contact.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-brand-orange transition-colors"
                    >
                      GitHub
                    </a>
                    <span className="text-slate-400/40">•</span>
                    <a
                      href={profile.contact.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-brand-orange transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>

              </div>
            </BorderGlow>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
