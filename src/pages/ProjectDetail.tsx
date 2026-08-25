import React, { useEffect, useState, useRef } from 'react';
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
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import dataService from '@/services/dataService';
import { ArchitectureDiagram } from '@/components/common/ArchitectureDiagram';
import { SpotlightCard } from '@/components/reactbits';
import { ImageWithSkeleton } from '@/components/common/ImageWithSkeleton';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const allProjects = dataService.getProjects();

  const project = id ? dataService.getProjectById(id) : undefined;

  const currentIndex = allProjects.findIndex((p) => p.id === project?.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fullscreen Lightbox Pan & Zoom States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
    setIsLightboxOpen(false);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  }, [id]);

  // Handle keyboard shortcuts in Lightbox
  useEffect(() => {
    if (!isLightboxOpen || !project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : project.gallery.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev < project.gallery.length - 1 ? prev + 1 : 0));
      } else if (e.key === '+' || e.key === '=') {
        setZoomScale((prev) => Math.min(prev + 0.25, 4));
      } else if (e.key === '-') {
        setZoomScale((prev) => Math.max(prev - 0.25, 0.5));
      } else if (e.key === '0') {
        setZoomScale(1);
        setPanPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, project]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <h1 className="text-2xl font-display font-medium">Project Not Found</h1>
        <p className="text-sm text-slate-500 max-w-md">
          The requested coordinate or project slug does not exist in the registry.
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

  const activeImageSrc =
    project.gallery[activeImageIndex] ||
    project.gallery[0] ||
    '/images/Escano_Business-Profile-Image_Transparent.png';

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale > 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX - panPosition.x, y: e.clientY - panPosition.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomScale > 1) {
      setPanPosition({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoomScale((prev) => Math.min(prev + 0.15, 4));
    } else {
      setZoomScale((prev) => Math.max(prev - 0.15, 0.5));
    }
  };

  const resetZoomPan = () => {
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-[1280px] mx-auto space-y-16">
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

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-slate-900 dark:text-white">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {project.one_liner}
          </p>
        </div>

        {/* ──────────────────────────────────────────────────────────
            Gallery Showcase (Main Image Top on Mobile, Thumbnails Bottom)
        ────────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* Main Image with Click-to-Zoom (Top on Mobile, Col-9 on Desktop) */}
          <div className="w-full order-1 lg:order-2 lg:col-span-9 relative rounded-2xl overflow-hidden bg-slate-950/40 border border-slate-200 dark:border-white/10 group shadow-md flex items-center justify-center min-h-[240px] sm:min-h-[340px] max-h-[580px]">
            <div
              onClick={() => {
                resetZoomPan();
                setIsLightboxOpen(true);
              }}
              className="w-full h-full max-h-[580px] flex items-center justify-center cursor-zoom-in group-hover:scale-[1.01] transition-transform duration-300"
            >
              <ImageWithSkeleton
                src={activeImageSrc}
                alt={project.title}
                className="w-full h-full max-h-[580px] object-contain"
              />
            </div>

            {/* Click to Zoom Overlay Badge */}
            <button
              onClick={() => {
                resetZoomPan();
                setIsLightboxOpen(true);
              }}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono bg-slate-900/90 hover:bg-slate-900 text-white border border-white/15 backdrop-blur-md transition-all shadow-lg hover:scale-105 z-20"
            >
              <Maximize2 className="w-3.5 h-3.5 text-brand-orange" />
              <span>Full Screen Pan & Zoom</span>
            </button>
          </div>

          {/* Thumbnails Row on Mobile (Horizontal Scroll), Column on Desktop */}
          <div className="w-full order-2 lg:order-1 lg:col-span-3 flex flex-row lg:flex-col gap-2.5 sm:gap-3 overflow-x-auto lg:overflow-y-auto max-h-[580px] pb-2 lg:pb-0 scrollbar-thin">
            {project.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`group relative rounded-xl overflow-hidden border text-left transition-all flex-shrink-0 w-24 sm:w-32 lg:w-full aspect-[16/10] bg-slate-950/40 ${activeImageIndex === idx
                    ? 'border-brand-orange ring-2 ring-brand-orange/40 shadow-md scale-[1.02]'
                    : 'border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100 hover:border-slate-400 dark:hover:border-white/30'
                  }`}
              >
                <ImageWithSkeleton
                  src={img}
                  alt={`${project.title} view ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-1 left-1 sm:bottom-1.5 sm:left-1.5 px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono bg-black/75 text-white backdrop-blur-sm z-20">
                  View {idx + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            Problem vs Goal Split
        ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpotlightCard className="p-6 sm:p-8 bg-white/80 dark:bg-slate-900/50 border-red-500/30 dark:border-red-500/20 shadow-sm">
            <h3 className="text-xl font-display font-medium text-red-600 dark:text-red-400 mb-2">
              The Challenge
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6 sm:p-8 bg-white/80 dark:bg-slate-900/50 border-brand-cobalt/30 shadow-sm">
            <h3 className="text-xl font-display font-medium text-brand-cobalt dark:text-blue-400 mb-2">
              The Goal
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.goal}
            </p>
          </SpotlightCard>
        </div>

        {/* Key Features */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-orange uppercase tracking-wider font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Core Capabilities & Innovation</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.key_features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 shadow-sm space-y-2 hover:border-brand-orange/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-cobalt/10 text-brand-cobalt dark:text-blue-400 flex items-center justify-center font-mono font-medium text-sm mb-3">
                  {idx + 1}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {feat.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* System Architecture Diagram (Pan & Zoom Interactive) */}
        {project.architecture_diagram_code && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-cobalt dark:text-blue-400 uppercase tracking-wider font-medium">
                <GitBranch className="w-4 h-4 text-brand-orange" />
                <span>Structural System Design</span>
              </div>
            </div>

            <ArchitectureDiagram
              code={project.architecture_diagram_code}
            />
          </div>
        )}

        {/* Tech Stack Matrix */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-wider font-medium">
            <Code2 className="w-4 h-4" />
            <span>Technology Matrix & Roles</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white">
            Tech Stack
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.tech_stack.map((t, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 shadow-sm space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">
                    {t.name}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Results & Metrics */}
        <div className="p-8 rounded-3xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-orange uppercase tracking-wider font-medium">
            <Zap className="w-4 h-4" />
            <span>Production Impact</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white">
            Measured Results & Outcomes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            {[project.results.performance, project.results.scale, project.results.utility].map((r, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 space-y-1">
                <div className="text-xs font-mono uppercase text-brand-orange font-medium">
                  {r.icon}
                </div>
                <div className="font-medium text-sm text-slate-900 dark:text-white">{r.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Next / Previous Project Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-slate-200 dark:border-white/10">
          <Link
            to={`/projects/${prevProject.id}`}
            className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 hover:border-brand-cobalt transition-all group flex flex-col justify-between"
          >
            <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              <span>Previous Project</span>
            </div>
            <div className="font-display text-lg font-medium text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors mt-2">
              {prevProject.title}
            </div>
          </Link>

          <Link
            to={`/projects/${nextProject.id}`}
            className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 hover:border-brand-cobalt transition-all group flex flex-col justify-between text-right"
          >
            <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center justify-end gap-1">
              <span>Next Project</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-display text-lg font-medium text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors mt-2">
              {nextProject.title}
            </div>
          </Link>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          Interactive Fullscreen Lightbox Modal (Zoom + Pan)
      ────────────────────────────────────────────────────────── */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200"
          onWheel={handleWheel}
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between text-white z-20 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg font-medium">{project.title}</span>
              <span className="text-xs font-mono text-white/60">
                ({activeImageIndex + 1} / {project.gallery.length})
              </span>
            </div>

            {/* Toolbar Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomScale((prev) => Math.min(prev + 0.25, 4))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomScale((prev) => Math.max(prev - 0.25, 0.5))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={resetZoomPan}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Reset View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-colors ml-2"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Image Viewport */}
          <div
            className={`relative flex-1 flex items-center justify-center overflow-hidden ${zoomScale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
              }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={activeImageSrc}
              alt={project.title}
              style={{
                transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomScale})`,
                transition: isDragging ? 'none' : 'transform 0.15s ease-out',
              }}
              className="max-h-[82vh] max-w-[92vw] object-contain pointer-events-none select-none rounded-lg"
              draggable={false}
            />

            {/* Left/Right Carousel Nav Arrows */}
            {project.gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : project.gallery.length - 1));
                    resetZoomPan();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev < project.gallery.length - 1 ? prev + 1 : 0));
                    resetZoomPan();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Carousel */}
          {project.gallery.length > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-white/10 z-20 overflow-x-auto">
              {project.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    resetZoomPan();
                  }}
                  className={`w-16 h-11 rounded-lg overflow-hidden border transition-all flex-shrink-0 ${activeImageIndex === idx
                      ? 'border-brand-orange ring-2 ring-brand-orange/40 scale-105'
                      : 'border-white/20 opacity-50 hover:opacity-100'
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
