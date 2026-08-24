import React, { useEffect, useRef, useState, useId } from 'react';
import mermaid from 'mermaid';
import { useTheme } from '@/context/ThemeContext';

export interface ArchitectureDiagramProps {
  code: string;
  className?: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ code, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
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
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#60a5fa',
            lineColor: '#f97316',
            secondaryColor: '#131b2e',
            tertiaryColor: '#090d16',
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

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
        <pre>{code}</pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-x-auto flex items-center justify-center p-4 rounded-2xl bg-slate-900/40 border border-white/10 [&_svg]:max-w-full [&_svg]:h-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default ArchitectureDiagram;
