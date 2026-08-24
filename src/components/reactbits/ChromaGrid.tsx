import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export interface ChromaItem {
  id?: string;
  image: string;
  images?: string[];
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
  tags?: string[];
  onClick?: () => void;
}

const FALLBACK_IMAGE = '/images/Escano_Business-Profile-Image_Transparent.png';

const ProjectCollage: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const pics = images.filter(Boolean);
  const extra = Math.max(0, pics.length - 3);
  const shown = pics.slice(0, 3);

  if (shown.length <= 1) {
    return (
      <div className="chroma-img-wrapper">
        <img src={shown[0] || FALLBACK_IMAGE} alt={title} loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`chroma-collage chroma-collage--${shown.length}`}>
      {shown.map((src, i) => (
        <div key={`${src}-${i}`} className="chroma-collage__cell">
          <img src={src} alt="" loading="lazy" />
          {i === shown.length - 1 && extra > 0 && (
            <span className="chroma-collage__more">+{extra}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export interface ChromaGridProps {
  items: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
  onItemClick?: (item: ChromaItem) => void;
}

export const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
  onItemClick,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<((val: string | number) => void) | null>(null);
  const setY = useRef<((val: string | number) => void) | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as (val: string | number) => void;
    setY.current = gsap.quickSetter(el, '--y', 'px') as (val: string | number) => void;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current?.(pos.current.x);
    setY.current?.(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    if (fadeRef.current) {
      gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
    }
  };

  const handleLeave = () => {
    if (fadeRef.current) {
      gsap.to(fadeRef.current, {
        opacity: 1,
        duration: fadeOut,
        overwrite: true,
      });
    }
  };

  const handleCardClick = (item: ChromaItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (onItemClick) {
      onItemClick(item);
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`.trim()}
      style={{
        '--r': `${radius}px`,
      } as React.CSSProperties}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {items.map((c, i) => (
        <article
          key={c.id || i}
          className="chroma-card group cursor-pointer"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c)}
          style={{
            '--card-border': c.borderColor || '#3845c9',
            '--card-gradient': c.gradient || 'linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(9, 13, 22, 0.95) 100%)',
          } as React.CSSProperties}
        >
          <ProjectCollage images={c.images && c.images.length > 0 ? c.images : [c.image]} title={c.title} />
          <footer className="chroma-info">
            <div className="flex items-center justify-between gap-2">
              <h3 className="name group-hover:text-brand-orange transition-colors">{c.title}</h3>
              {c.handle && <span className="text-xs font-mono text-muted-foreground">{c.handle}</span>}
            </div>
            <p className="role">{c.subtitle}</p>
            {c.tags && c.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {c.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-brand-cobalt/15 text-brand-cobalt dark:text-blue-400 border border-brand-cobalt/25"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
