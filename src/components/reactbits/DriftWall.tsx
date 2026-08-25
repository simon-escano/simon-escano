import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './DriftWall.css';

export interface DriftTileItem {
  image: string;
  title?: string;
  href?: string;
  internalPath?: string;
  onClick?: () => void;
}

export interface DriftWallProps {
  items: DriftTileItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: 'up' | 'down';
  variance?: number;
  parallax?: number;
  pauseOnHover?: boolean;
  lift?: number;
  fade?: number;
  dim?: number;
  grayscale?: boolean;
  overlayColor?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Optional custom tile renderer. Receives item, isActive flag, and tile ID. */
  renderTile?: (item: DriftTileItem, isActive: boolean) => React.ReactNode;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const columnFactor = (index: number, variance: number) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

export const DriftWall: React.FC<DriftWallProps> = ({
  items,
  columns = 5,
  tileWidth = 240,
  tileHeight = 180,
  gap = 16,
  radius = 14,
  tilt = 14,
  turn = -12,
  roll = 0,
  perspective = 1200,
  depth = 100,
  speed = 36,
  direction = 'up',
  variance = 0.45,
  parallax = 0.6,
  pauseOnHover = false,
  lift = 54,
  fade = 0.6,
  dim = 0.55,
  grayscale = false,
  overlayColor = '#060010',
  className = '',
  style,
  renderTile: customRenderTile,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const hoveredColRef = useRef<number>(-1);
  const wallHoveredRef = useRef<boolean>(false);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pointerDampedRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastTsRef = useRef<number | null>(null);

  const [containerDimensions, setContainerDimensions] = useState({ width: 1200, height: 600 });
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setContainerDimensions({ width, height });
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Compute responsive columns and tile size
  const effectiveColumns = useMemo(() => {
    if (containerDimensions.width < 540) return Math.min(columns, 2);
    if (containerDimensions.width < 800) return Math.min(columns, 3);
    if (containerDimensions.width < 1100) return Math.min(columns, 4);
    return columns;
  }, [columns, containerDimensions.width]);

  const effectiveTileWidth = useMemo(() => {
    if (containerDimensions.width < 540) {
      return Math.max(160, Math.min(tileWidth, Math.floor((containerDimensions.width * 0.95) / effectiveColumns - gap)));
    }
    if (containerDimensions.width < 800) {
      return Math.max(190, Math.min(tileWidth, Math.floor((containerDimensions.width * 0.95) / effectiveColumns - gap)));
    }
    return tileWidth;
  }, [tileWidth, containerDimensions.width, effectiveColumns, gap]);

  const effectiveTileHeight = useMemo(() => {
    const ratio = tileHeight / tileWidth;
    return Math.max(185, Math.round(effectiveTileWidth * ratio));
  }, [effectiveTileWidth, tileHeight, tileWidth]);

  const columnItems = useMemo(() => {
    const cols: DriftTileItem[][] = Array.from({ length: effectiveColumns }, () => []);
    items.forEach((item, i) => cols[i % effectiveColumns].push(item));
    return cols.map((col) => (col.length ? col : items.slice(0, 1)));
  }, [items, effectiveColumns]);

  const columnMeta = useMemo(() => {
    const unit = effectiveTileHeight + gap;
    return columnItems.map((col) => {
      const copyHeight = Math.max(unit, col.length * unit);
      const copies = Math.max(2, Math.ceil((containerDimensions.height * 1.8) / copyHeight) + 1);
      return { copyHeight, copies };
    });
  }, [columnItems, effectiveTileHeight, gap, containerDimensions.height]);

  const baseVelocities = useMemo(() => {
    const dirSign = direction === 'up' ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

  // Keep references for animation loop so RAF never stutters on prop updates
  const baseVelocitiesRef = useRef(baseVelocities);
  baseVelocitiesRef.current = baseVelocities;

  const columnMetaRef = useRef(columnMeta);
  columnMetaRef.current = columnMeta;

  const configRef = useRef({
    pauseOnHover,
    parallax,
    reduced,
    tilt,
    turn,
    roll,
    depth,
  });
  configRef.current = {
    pauseOnHover,
    parallax,
    reduced,
    tilt,
    turn,
    roll,
    depth,
  };

  // Initialize or preserve offsets without jumping
  useEffect(() => {
    const currentOffsets = offsetsRef.current;
    offsetsRef.current = columnMeta.map((meta, c) => {
      if (currentOffsets[c] !== undefined) {
        return ((currentOffsets[c] % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
      }
      return meta.copyHeight * ((c * 0.37) % 1);
    });

    const currentVels = velocitiesRef.current;
    velocitiesRef.current = columnItems.map((_, c) => currentVels[c] || 0);
  }, [columnMeta, columnItems]);

  const applyPlaneTransform = useCallback(
    (px: number, py: number) => {
      const plane = planeRef.current;
      if (!plane) return;
      const cfg = configRef.current;
      plane.style.transform =
        `translate(-50%, -50%) scale(1.15) ` +
        `rotateX(${cfg.tilt + py}deg) rotateY(${cfg.turn + px}deg) rotateZ(${cfg.roll}deg) ` +
        `translateZ(${-cfg.depth}px)`;
    },
    []
  );

  useEffect(() => {
    let active = true;

    const animate = (ts: number) => {
      if (!active) return;
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0.001, (ts - lastTsRef.current) / 1000));
      lastTsRef.current = ts;

      const cfg = configRef.current;
      const maxTilt = cfg.parallax * 8;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damp = 1 - Math.exp(-dt / 0.12);
      pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      const metas = columnMetaRef.current;
      const vels = baseVelocitiesRef.current;

      if (!cfg.reduced) {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const meta = metas[c];
          if (!meta) continue;
          const paused = wallHoveredRef.current && cfg.pauseOnHover;
          const factor = paused || hoveredColRef.current === c ? 0 : 1;
          const target = (vels[c] || 0) * factor;

          const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
          velocitiesRef.current[c] = (velocitiesRef.current[c] || 0) + (target - (velocitiesRef.current[c] || 0)) * ease;

          let next = (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
          next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
          offsetsRef.current[c] = next;

          const el = trackRefs.current[c];
          if (el) el.style.transform = `translate3d(0, ${-next}px, 0)`;
        }
      } else {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const el = trackRefs.current[c];
          const meta = metas[c];
          if (el && meta) el.style.transform = `translate3d(0, ${-(offsetsRef.current[c] ?? 0)}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [applyPlaneTransform]);

  const activate = useCallback((id: string, index: number) => {
    activeIdRef.current = id;
    hoveredColRef.current = index;
    setActiveId(id);
  }, []);

  const release = useCallback(() => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (configRef.current.parallax > 0 && !configRef.current.reduced) {
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        };
      }
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const tile = hit && hit.closest ? (hit.closest('[data-tile-id]') as HTMLElement) : null;
      if (!tile) return;
      const id = tile.dataset.tileId;
      if (!id || id === activeIdRef.current) return;
      activeIdRef.current = id;
      hoveredColRef.current = Number(tile.dataset.col);
      setActiveId(id);
    },
    []
  );

  const handlePointerLeaveWall = useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const cssVars = useMemo(
    () =>
      ({
        '--dw-tile-w': `${effectiveTileWidth}px`,
        '--dw-tile-h': `${effectiveTileHeight}px`,
        '--dw-gap': `${gap}px`,
        '--dw-radius': `${radius}px`,
        '--dw-perspective': `${perspective}px`,
        '--dw-lift': `${lift}px`,
        '--dw-dim': dim,
        '--dw-gray': grayscale ? 1 : 0,
        '--dw-overlay': overlayColor,
        '--dw-edge': `${Math.max(0, (1 - fade) * 100)}%`,
        ...style,
      }) as React.CSSProperties,
    [effectiveTileWidth, effectiveTileHeight, gap, radius, perspective, lift, dim, grayscale, overlayColor, fade, style]
  );

  const renderTileDefault = (item: DriftTileItem, id: string, colIndex: number) => {
    const isActive = activeId === id;

    const commonProps = {
      className: `drift-wall__tile group${isActive ? ' is-active' : ''}`,
      'data-tile-id': id,
      'data-col': colIndex,
      onFocus: () => activate(id, colIndex),
      onBlur: release,
    };

    if (customRenderTile) {
      const customContent = customRenderTile(item, isActive);
      if (item.internalPath) {
        return (
          <Link key={id} to={item.internalPath} {...commonProps}>
            <span className="drift-wall__inner">
              {customContent}
              <span className="drift-wall__overlay" aria-hidden="true" />
            </span>
          </Link>
        );
      }
      return (
        <div key={id} tabIndex={0} role="button" aria-label={item.title ?? 'tile'} {...commonProps}>
          <span className="drift-wall__inner">
            {customContent}
            <span className="drift-wall__overlay" aria-hidden="true" />
          </span>
        </div>
      );
    }

    const inner = (
      <span className="drift-wall__inner">
        <img src={item.image} alt={item.title ?? ''} loading="lazy" decoding="async" draggable={false} />
        <span className="drift-wall__overlay" aria-hidden="true" />
        {item.title && (
          <span className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-slate-950/80 rounded text-[11px] font-mono text-white truncate opacity-0 group-hover:opacity-100 transition-opacity z-10">
            {item.title}
          </span>
        )}
      </span>
    );

    if (item.internalPath) {
      return (
        <Link key={id} to={item.internalPath} {...commonProps}>
          {inner}
        </Link>
      );
    }

    if (item.href) {
      return (
        <a key={id} href={item.href} target="_blank" rel="noreferrer noopener" {...commonProps}>
          {inner}
        </a>
      );
    }

    return (
      <div key={id} tabIndex={0} role="button" aria-label={item.title ?? 'tile'} {...commonProps}>
        {inner}
      </div>
    );
  };

  const rootClass = ['drift-wall', reduced ? 'drift-wall--reduced' : '', customRenderTile ? 'drift-wall--custom' : '', className].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      role="group"
      aria-label="Drifting wall of projects"
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((col, c) => {
          const meta = columnMeta[c];
          const copies = Array.from({ length: meta.copies });
          return (
            <div className="drift-wall__col" key={`col-${c}`}>
              <div className="drift-wall__track" ref={(el) => (trackRefs.current[c] = el)}>
                {copies.map((_, copyIndex) =>
                  col.map((item, itemIndex) => renderTileDefault(item, `${c}-${copyIndex}-${itemIndex}`, c))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriftWall;
