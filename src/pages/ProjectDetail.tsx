import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  Zap,
  CheckCircle2,
  Code2,
  GitBranch,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  GitPullRequest,
  Play,
  Gamepad2,
  Figma,
  FileText,
} from 'lucide-react';
import dataService from '@/services/dataService';
import { ArchitectureDiagram } from '@/components/common/ArchitectureDiagram';
import { DotField } from '@/components/reactbits';
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

  // Lock body scroll when Lightbox is open to prevent page interference
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  // Handle keyboard shortcuts in Lightbox
  useEffect(() => {
    if (!isLightboxOpen || !project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : project.gallery.length - 1));
        resetZoomPan();
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev < project.gallery.length - 1 ? prev + 1 : 0));
        resetZoomPan();
      } else if (e.key === '+' || e.key === '=') {
        setZoomScale((prev) => Math.min(prev + 0.3, 4));
      } else if (e.key === '-') {
        setZoomScale((prev) => {
          const next = Math.max(prev - 0.3, 1);
          if (next === 1) setPanPosition({ x: 0, y: 0 });
          return next;
        });
      } else if (e.key === '0') {
        resetZoomPan();
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

  const resetZoomPan = () => {
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoomScale > 1) {
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX - panPosition.x, y: e.clientY - panPosition.y };
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging && zoomScale > 1) {
      setPanPosition({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch { }
      setIsDragging(false);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoomScale((prev) => {
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      const next = Math.min(Math.max(prev + delta, 1), 4);
      if (next === 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleDoubleClick = () => {
    if (zoomScale > 1) {
      resetZoomPan();
    } else {
      setZoomScale(2.5);
    }
  };

  return (
    <div className="relative min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground overflow-hidden">
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

      <div className="relative z-10 max-w-[1280px] mx-auto space-y-16">
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
            {project.links.map((link, idx) => {
              const iconKey = (link.icon || '').toLowerCase();
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-brand-orange text-slate-800 dark:text-slate-200 transition-all hover:scale-105 shadow-sm"
                >
                  {iconKey === 'github' || iconKey === 'repo' ? (
                    <Github className="w-3.5 h-3.5" />
                  ) : iconKey === 'gamepad' || iconKey === 'itch' ? (
                    <Gamepad2 className="w-3.5 h-3.5 text-pink-500" />
                  ) : iconKey === 'play' || iconKey === 'video' || iconKey === 'demo' || iconKey === 'youtube' ? (
                    <Play className="w-3.5 h-3.5 text-red-500 fill-current" />
                  ) : iconKey === 'figma' || iconKey === 'prototype' ? (
                    <Figma className="w-3.5 h-3.5 text-purple-500" />
                  ) : iconKey === 'file-text' || iconKey === 'docs' ? (
                    <FileText className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <ExternalLink className="w-3.5 h-3.5 text-brand-orange" />
                  )}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Hero Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cobalt/10 border border-brand-cobalt/30 text-brand-cobalt dark:text-blue-400 text-xs font-mono">
            <GitPullRequest className="w-3.5 h-3.5 text-brand-orange" />
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
          <div className="w-full order-2 lg:order-1 lg:col-span-3 flex flex-row lg:flex-col gap-2.5 sm:gap-3 overflow-x-auto lg:overflow-y-auto max-h-[580px] p-1.5 scrollbar-thin">
            {project.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`group relative rounded-xl overflow-hidden border-2 text-left transition-all flex-shrink-0 w-24 sm:w-32 lg:w-full aspect-[16/10] bg-slate-950/40 ${activeImageIndex === idx
                  ? 'border-brand-orange shadow-lg scale-[1.01] z-10'
                  : 'border-slate-200/90 dark:border-white/10 opacity-70 hover:opacity-100 hover:border-slate-400 dark:hover:border-white/30'
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
            Problem vs Goal Split (Connected Achieved Flow with ->)
        ────────────────────────────────────────────────────────── */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm bg-white/80 dark:bg-slate-900/50 backdrop-blur-md">
          {/* The Challenge */}
          <div className="p-6 sm:p-8 md:border-r border-b md:border-b-0 border-slate-200 dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono font-medium mb-3">
                The Challenge
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>
          </div>

          {/* Achieving Flow Arrow Indicator */}
          <div className="border border-slate-200 dark:border-white/10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-background dark:bg-background/white text-white shadow-lg z-20">
            <ArrowRight className="w-4 h-4 text-brand-cobalt" />
          </div>

          {/* The Goal */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-cobalt/10 border border-brand-cobalt/20 text-brand-cobalt dark:text-blue-400 text-xs font-mono font-medium mb-3">
                The Goal & Solution
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.goal}
              </p>
            </div>
          </div>
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

        {/* Tech Stack Grouped by Category (Primary in Blue, Supporting in Green, etc.) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-wider font-medium">
            <Code2 className="w-4 h-4" />
            <span>Technology Matrix & Roles</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white">
            Tech Stack
          </h2>

          <div className="space-y-6 pt-1">
            {Object.entries(
              project.tech_stack.reduce((acc, tech) => {
                const role = tech.role || 'Other';
                if (!acc[role]) acc[role] = [];
                acc[role].push(tech);
                return acc;
              }, {} as Record<string, typeof project.tech_stack>)
            ).map(([role, items]) => {
              const normalized = role.toLowerCase().trim();
              let headerColor = 'text-brand-cobalt dark:text-blue-400';
              let badgeBorder = 'hover:border-brand-cobalt dark:hover:border-blue-400';
              let fillColor = 'rgba(56, 69, 201, 0.15)';
              let dotColor = 'bg-brand-cobalt dark:bg-blue-400';

              if (normalized.includes('support') || normalized.includes('second')) {
                headerColor = 'text-emerald-600 dark:text-emerald-400';
                badgeBorder = 'hover:border-emerald-500';
                fillColor = 'rgba(16, 185, 129, 0.15)';
                dotColor = 'bg-emerald-500';
              } else if (normalized.includes('infra') || normalized.includes('devops') || normalized.includes('cloud') || normalized.includes('platform')) {
                headerColor = 'text-brand-orange dark:text-orange-400';
                badgeBorder = 'hover:border-brand-orange';
                fillColor = 'rgba(249, 115, 22, 0.15)';
                dotColor = 'bg-brand-orange';
              } else if (normalized.includes('database') || normalized.includes('storage') || normalized.includes('data')) {
                headerColor = 'text-purple-600 dark:text-purple-400';
                badgeBorder = 'hover:border-purple-500';
                fillColor = 'rgba(168, 85, 247, 0.15)';
                dotColor = 'bg-purple-500';
              }

              return (
                <div key={role} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                    <span className={`text-xs font-mono uppercase tracking-wider font-semibold ${headerColor}`}>
                      {role}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                      ({items.length})
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {items.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`relative overflow-hidden inline-flex items-center justify-center font-mono text-xs font-medium px-4 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md backdrop-blur-md cursor-default ${badgeBorder}`}
                      >
                        <span
                          className="absolute inset-x-0 bottom-0 pointer-events-none transition-all"
                          style={{
                            height: '100%',
                            backgroundColor: fillColor,
                          }}
                        />
                        <span className="relative z-10">{tech.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Results & Metrics */}
        <div className="p-8 rounded-3xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
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

        {/* Next / Previous Project Navigation (Clean text/arrow links without bg/stroke/padding) */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-white/10 gap-4">
          <Link
            to={`/projects/${prevProject.id}`}
            className="group flex flex-col items-start transition-all"
          >
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 group-hover:text-brand-orange transition-colors uppercase flex items-center gap-1.5 font-medium">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Previous Project</span>
            </div>
            <div className="font-display text-base sm:text-lg font-medium text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors mt-1">
              {prevProject.title}
            </div>
          </Link>

          <Link
            to={`/projects/${nextProject.id}`}
            className="group flex flex-col items-end text-right transition-all"
          >
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 group-hover:text-brand-orange transition-colors uppercase flex items-center justify-end gap-1.5 font-medium">
              <span>Next Project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-display text-base sm:text-lg font-medium text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors mt-1">
              {nextProject.title}
            </div>
          </Link>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          Interactive Fullscreen Lightbox Modal (Portal to body, Zoom + Pan)
      ────────────────────────────────────────────────────────── */}
      {isLightboxOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between select-none animate-in fade-in duration-200"
            onWheel={handleWheel}
          >
            {/* Top Control Bar */}
            <div className="flex items-center justify-between text-white z-30 px-4 sm:px-6 py-3.5 border-b border-white/10 bg-black/60 backdrop-blur-md gap-3">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="font-display text-sm sm:text-base font-medium truncate max-w-[180px] sm:max-w-md">
                  {project.title}
                </span>
                <span className="text-xs font-mono text-white/50 flex-shrink-0">
                  [{activeImageIndex + 1}/{project.gallery.length}]
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded bg-white/10 text-[11px] font-mono text-brand-orange">
                  {Math.round(zoomScale * 100)}%
                </span>
              </div>

              {/* Toolbar Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                <button
                  onClick={() => setZoomScale((prev) => Math.min(prev + 0.3, 4))}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Zoom In (+)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setZoomScale((prev) => {
                      const next = Math.max(prev - 0.3, 1);
                      if (next === 1) setPanPosition({ x: 0, y: 0 });
                      return next;
                    })
                  }
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={resetZoomPan}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Reset View (0)"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-colors ml-1 sm:ml-2"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Image Viewport with Pointer Drag Capture & Double Tap Zoom */}
            <div
              className={`relative flex-1 flex items-center justify-center overflow-hidden touch-none ${zoomScale > 1
                  ? isDragging
                    ? 'cursor-grabbing'
                    : 'cursor-grab'
                  : 'cursor-zoom-in'
                }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onDoubleClick={handleDoubleClick}
            >
              <img
                src={activeImageSrc}
                alt={project.title}
                style={{
                  transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomScale})`,
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                }}
                className="max-h-[72vh] sm:max-h-[80vh] max-w-[92vw] object-contain pointer-events-none select-none rounded-xl shadow-2xl"
                draggable={false}
              />

              {/* Left/Right Floating Carousel Navigation */}
              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) =>
                        prev > 0 ? prev - 1 : project.gallery.length - 1
                      );
                      resetZoomPan();
                    }}
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-lg transition-all shadow-xl hover:scale-105 z-30"
                    title="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) =>
                        prev < project.gallery.length - 1 ? prev + 1 : 0
                      );
                      resetZoomPan();
                    }}
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-lg transition-all shadow-xl hover:scale-105 z-30"
                    title="Next Image"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnails Carousel Strip */}
            {project.gallery.length > 1 && (
              <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-white/10 bg-black/60 backdrop-blur-md z-30 overflow-x-auto max-w-full flex-shrink-0">
                {project.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImageIndex(idx);
                      resetZoomPan();
                    }}
                    className={`w-14 sm:w-16 h-10 sm:h-11 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${activeImageIndex === idx
                        ? 'border-brand-orange ring-2 ring-brand-orange/40 scale-105 shadow-md'
                        : 'border-white/20 opacity-50 hover:opacity-100'
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

export default ProjectDetail;
