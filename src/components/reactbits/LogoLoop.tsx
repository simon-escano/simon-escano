import React, { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import './LogoLoop.css';

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

export interface LogoItem {
  node?: React.ReactNode;
  src?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  href?: string;
  ariaLabel?: string;
  proficiency?: number;
  category?: 'frontend' | 'backend' | 'game-ai' | string;
  categoryColor?: string;
  role?: string;
}

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
  onLogoHover?: (item: LogoItem) => void;
  onLogoLeave?: () => void;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const toCssLength = (value?: number | string) => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

export const LogoLoop = memo(
  ({
    logos,
    speed = 60,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover = true,
    hoverSpeed,
    fadeOut = true,
    fadeOutColor,
    scaleOnHover = true,
    renderItem,
    onLogoHover,
    onLogoLeave,
    ariaLabel = 'Technology stack',
    className = '',
    style,
  }: LogoLoopProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [seqHeight, setSeqHeight] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return undefined;
      return 0;
    }, [hoverSpeed, pauseOnHover]);

    const isVertical = direction === 'up' || direction === 'down';

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      const directionMultiplier = isVertical
        ? direction === 'up'
          ? 1
          : -1
        : direction === 'left'
          ? 1
          : -1;
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction, isVertical]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceRect = seqRef.current?.getBoundingClientRect();
      const sequenceWidth = sequenceRect?.width ?? 0;
      const sequenceHeight = sequenceRect?.height ?? 0;

      if (isVertical) {
        setSeqHeight(sequenceHeight);
        if (sequenceHeight > 0) {
          const containerHeight = containerRef.current?.clientHeight ?? 0;
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(containerHeight / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM));
        }
      } else {
        setSeqWidth(sequenceWidth);
        if (sequenceWidth > 0) {
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM));
        }
      }
    }, [isVertical]);

    useEffect(() => {
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }, [updateDimensions, logos]);

    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;

      const seqSize = isVertical ? seqHeight : seqWidth;
      let offset = 0;
      let velocity = 0;
      let lastTimestamp: number | null = null;
      let rafId: number | null = null;

      const animate = (timestamp: number) => {
        if (lastTimestamp === null) lastTimestamp = timestamp;
        const deltaTime = Math.max(0, timestamp - lastTimestamp) / 1000;
        lastTimestamp = timestamp;

        const target = isHovered && effectiveHoverSpeed !== undefined ? effectiveHoverSpeed : targetVelocity;
        const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
        velocity += (target - velocity) * easingFactor;

        if (seqSize > 0) {
          offset = (offset + velocity * deltaTime) % seqSize;
          if (offset < 0) offset += seqSize;
          track.style.transform = isVertical
            ? `translate3d(0, ${-offset}px, 0)`
            : `translate3d(${-offset}px, 0, 0)`;
        }

        rafId = requestAnimationFrame(animate);
      };

      rafId = requestAnimationFrame(animate);
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, [targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical]);

    const cssVariables = useMemo(
      () => ({
        '--logoloop-gap': `${gap}px`,
        '--logoloop-logoHeight': `${logoHeight}px`,
        ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor }),
      }),
      [gap, logoHeight, fadeOutColor]
    );

    const rootClassName = useMemo(
      () =>
        [
          'logoloop',
          isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
          fadeOut && 'logoloop--fade',
          scaleOnHover && 'logoloop--scale-hover',
          isHovered && 'logoloop--is-hovered',
          className,
        ]
          .filter(Boolean)
          .join(' '),
      [isVertical, fadeOut, scaleOnHover, isHovered, className]
    );

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
    }, []);

    const renderLogoItem = useCallback(
      (item: LogoItem, key: React.Key) => {
        if (renderItem) {
          return (
            <li
              className="logoloop__item cursor-pointer"
              key={key}
              role="listitem"
              onMouseEnter={() => onLogoHover?.(item)}
              onMouseLeave={() => onLogoLeave?.()}
            >
              {renderItem(item, key)}
            </li>
          );
        }

        const fillPercent =
          typeof item.proficiency === 'number'
            ? Math.min(Math.max((item.proficiency / 10) * 100, 0), 100)
            : 0;

        let fillColor = 'rgba(56, 69, 201, 0.3)';
        let borderColor = 'hover:border-brand-cobalt dark:hover:border-blue-400';

        if (item.category === 'backend') {
          fillColor = 'rgba(249, 115, 22, 0.3)';
          borderColor = 'hover:border-brand-orange';
        } else if (item.category === 'game-ai') {
          fillColor = 'rgba(16, 185, 129, 0.3)';
          borderColor = 'hover:border-emerald-500';
        }

        if (item.categoryColor) {
          fillColor = item.categoryColor;
        }

        const content = item.node ? (
          <span className="logoloop__node">{item.node}</span>
        ) : item.src ? (
          <img src={item.src} alt={item.alt ?? item.title ?? ''} loading="lazy" />
        ) : (
          <span
            className={`relative overflow-hidden inline-flex items-center justify-center font-mono text-xs font-medium px-3.5 py-1.5 rounded-lg bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 shadow-sm transition-all duration-200 ${borderColor}`}
          >
            {fillPercent > 0 && (
              <span
                className="absolute inset-x-0 bottom-0 pointer-events-none transition-all duration-300"
                style={{
                  height: `${fillPercent}%`,
                  backgroundColor: fillColor,
                }}
              />
            )}
            <span className="relative z-10">{item.title}</span>
          </span>
        );

        return (
          <li
            className="logoloop__item cursor-pointer"
            key={key}
            role="listitem"
            onMouseEnter={() => onLogoHover?.(item)}
            onMouseLeave={() => onLogoLeave?.()}
          >
            {item.href ? (
              <a href={item.href} target="_blank" rel="noreferrer noopener" className="logoloop__link">
                {content}
              </a>
            ) : (
              content
            )}
          </li>
        );
      },
      [renderItem, onLogoHover, onLogoLeave]
    );

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="logoloop__list"
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
          </ul>
        )),
      [copyCount, logos, renderLogoItem]
    );

    const containerStyle = useMemo(
      () => ({
        width: isVertical ? undefined : toCssLength(width) ?? '100%',
        ...cssVariables,
        ...style,
      }),
      [width, cssVariables, style, isVertical]
    );

    return (
      <div ref={containerRef} className={rootClassName} style={containerStyle} role="region" aria-label={ariaLabel}>
        <div
          className="logoloop__track"
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
