import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  Zap,
  CheckCircle2,
  Code2,
  Sparkles,
  GitBranch,
} from 'lucide-react';
import dataService from '@/services/dataService';
import { ArchitectureDiagram } from '@/components/common/ArchitectureDiagram';
import {
  SpotlightCard,
  TiltedCard,
} from '@/components/reactbits';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const allProjects = dataService.getProjects();

  const project = id ? dataService.getProjectById(id) : undefined;

  const currentIndex = allProjects.findIndex((p) => p.id === project?.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center space-y-4">
        <h1 className="text-3xl font-display font-semibold text-slate-900 dark:text-white">Project Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-md">
          The requested project could not be found.
        </p>
        <Link
          to="/projects"
          className="px-6 py-2.5 rounded-full bg-brand-cobalt text-white text-sm font-medium hover:bg-brand-cobalt/80 transition-colors"
        >
          Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Top Breadcrumb & Actions */}
        <div className="flex items-center justify-between">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-brand-orange transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex items-center gap-2">
            {project.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-brand-orange text-slate-800 dark:text-slate-200 transition-colors shadow-sm"
              >
                {link.icon === 'github' ? (
                  <Github className="w-3.5 h-3.5" />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5 text-brand-orange" />
                )}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Hero Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cobalt/10 border border-brand-cobalt/30 text-brand-cobalt dark:text-blue-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>Role: {project.contributions}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {project.one_liner}
          </p>
        </div>

        {/* Gallery Showcase */}
        <div className="space-y-4">
          <div className="rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 p-2 sm:p-4 backdrop-blur-md shadow-sm">
            <TiltedCard
              imageSrc={project.gallery[activeImageIndex] || project.gallery[0] || '/images/Escano_Business-Profile-Image_Transparent.png'}
              altText={project.title}
              containerHeight="420px"
              containerWidth="100%"
              rotateAmplitude={6}
              scaleOnHover={1.02}
            />
          </div>

          {/* Thumbnail Strip */}
          {project.gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {project.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden border transition-all flex-shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-brand-orange ring-2 ring-brand-orange/40 scale-105'
                      : 'border-slate-300 dark:border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Problem vs Goal Split (Clean Space-Saving Headers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpotlightCard className="p-6 sm:p-8 bg-white/80 dark:bg-slate-900/50 border-red-500/30 dark:border-red-500/20 shadow-sm">
            <h3 className="text-xl font-display font-semibold text-red-600 dark:text-red-400 mb-2">
              The Challenge
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6 sm:p-8 bg-white/80 dark:bg-slate-900/50 border-brand-cobalt/30 shadow-sm">
            <h3 className="text-xl font-display font-semibold text-brand-cobalt dark:text-blue-400 mb-2">
              The Goal
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.goal}
            </p>
          </SpotlightCard>
        </div>

        {/* Key Features */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-orange uppercase tracking-wider font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Core Capabilities & Innovation</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.key_features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-cobalt/10 dark:bg-brand-cobalt/20 border border-brand-cobalt/30 flex items-center justify-center text-brand-orange font-mono font-semibold">
                  0{idx + 1}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">{feat.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Architecture Diagram (Pan & Zoom) */}
        {project.architecture_diagram_code && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-cobalt dark:text-blue-400 uppercase tracking-wider font-semibold">
              <GitBranch className="w-4 h-4 text-brand-orange" />
              <span>System Topology</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
              Architecture & Data Flow
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              Interactive topological diagram. Use controls or click and drag to pan around, zoom in, and inspect relationships.
            </p>

            <ArchitectureDiagram code={project.architecture_diagram_code} />
          </div>
        )}

        {/* Tech Stack & Justification */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-orange uppercase tracking-wider font-semibold">
            <Code2 className="w-4 h-4" />
            <span>Tech Stack Matrix</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
            Technology Decisions
          </h2>

          <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
              "{project.stack_reason}"
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
              {project.tech_stack.map((tech, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-white/5 flex flex-col justify-between"
                >
                  <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white">{tech.name}</span>
                  <span
                    className={`text-[10px] font-mono mt-1 ${
                      tech.role === 'Primary'
                        ? 'text-brand-orange font-semibold'
                        : tech.role === 'Supporting'
                        ? 'text-brand-cobalt dark:text-blue-400'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {tech.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quantified Results */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-wider font-semibold">
            <Zap className="w-4 h-4" />
            <span>Outcome & Benchmarks</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
            Measured Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpotlightCard className="p-6 bg-white/80 dark:bg-slate-900/40 border-slate-200 dark:border-white/10 shadow-sm">
              <span className="text-xs font-mono uppercase text-brand-orange font-semibold">
                Performance
              </span>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {project.results.performance.text}
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6 bg-white/80 dark:bg-slate-900/40 border-slate-200 dark:border-white/10 shadow-sm">
              <span className="text-xs font-mono uppercase text-brand-cobalt dark:text-blue-400 font-semibold">Scale</span>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {project.results.scale.text}
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6 bg-white/80 dark:bg-slate-900/40 border-slate-200 dark:border-white/10 shadow-sm">
              <span className="text-xs font-mono uppercase text-emerald-500 font-semibold">
                Utility & Correctness
              </span>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {project.results.utility.text}
              </p>
            </SpotlightCard>
          </div>
        </div>

        {/* Minimal Previous / Next Project Navigation (No Stroke / Box Background) */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-4">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-brand-orange transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-[10px] font-mono uppercase block text-slate-400">Previous</span>
                <span className="text-sm font-display font-semibold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors">
                  {prevProject.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject && (
            <Link
              to={`/projects/${nextProject.id}`}
              className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-brand-orange transition-colors text-right ml-auto"
            >
              <div>
                <span className="text-[10px] font-mono uppercase block text-slate-400">Next</span>
                <span className="text-sm font-display font-semibold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
