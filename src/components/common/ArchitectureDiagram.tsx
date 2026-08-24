import React, { useEffect, useRef, useState, useId } from 'react';
import mermaid from 'mermaid';
import { ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export interface ArchitectureDiagramProps {
  code: string;
  className?: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ code, className = '' }) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const { theme } = useTheme();

  useEffect(() => {
    let active = true;

    const renderDiagram = async () => {
      try {
        setError(null);
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'default',
          securityLevel: 'loose',
          themeVariables: {
            darkMode: theme === 'dark',
            background: 'transparent',
            primaryColor: '#3845C9',
            primaryTextColor: theme === 'dark' ? '#ffffff' : '#0f172a',
            primaryBorderColor: '#60a5fa',
            lineColor: '#f97316',
            secondaryColor: theme === 'dark' ? '#131b2e' : '#f1f5f9',
            tertiaryColor: theme === 'dark' ? '#090d16' : '#ffffff',
          },
          fontFamily: '"Funnel Display", Inter, sans-serif',
        });

        const id = `mermaid-diag-${uid}-${Date.now()}`;
        const { svg } = await mermaid.render(id, code);
        if (active) {
          setSvgContent(svg);
        }
      } catch (err: any) {
        if (active) {
          console.warn('Mermaid render issue:', err);
          setError('Could not render interactive diagram directly. Showing structured schema.');
        }
      }
    };

    renderDiagram();

    return () => {
      active = false;
    };
  }, [code, theme, uid]);

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.2, 2.5));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-slate-900/60 dark:bg-slate-950/80 border border-slate-700 text-xs font-mono text-slate-300 overflow-x-auto">
        <pre>{code}</pre>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm backdrop-blur-md">
      {/* Floating Toolbar Controls */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-slate-900/80 dark:bg-slate-800/90 text-white p-1 rounded-xl shadow-lg border border-white/10 backdrop-blur-md">
        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4 text-brand-orange" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4 text-brand-orange" />
        </button>
        <button
          onClick={handleReset}
          className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4 text-blue-400" />
        </button>
        <div className="flex items-center gap-1 px-1.5 text-[10px] font-mono text-slate-300 border-l border-white/10">
          <Move className="w-3 h-3 text-slate-400" />
          <span>Pan</span>
        </div>
      </div>

      {/* Pan & Zoom Canvas Area */}
      <div
        className={`min-h-[360px] p-6 flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden ${className}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
          }}
          className="w-full flex items-center justify-center [&_svg]:max-w-full [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
