import React, { useRef, useState } from 'react';
import { m, useMotionValue, useSpring } from 'motion/react';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export interface TiltedCardProps {
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  className?: string;
  innerClassName?: string;
  children?: React.ReactNode;
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '320px',
  containerWidth = '100%',
  imageHeight = '100%',
  imageWidth = '100%',
  scaleOnHover = 1.05,
  rotateAmplitude = 12,
  showTooltip = false,
  overlayContent = null,
  displayOverlayContent = false,
  className = '',
  innerClassName = '',
  children,
}) => {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawScale = useMotionValue(1);

  const rotateX = useSpring(rawRotateX, springValues);
  const rotateY = useSpring(rawRotateY, springValues);
  const scale = useSpring(rawScale, springValues);
  const opacity = useSpring(0);
  const rawRotateFigcaption = useMotionValue(0);
  const rotateFigcaption = useSpring(rawRotateFigcaption, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const halfWidth = rect.width / 2 || 1;
    const halfHeight = rect.height / 2 || 1;

    const offsetX = e.clientX - rect.left - halfWidth;
    const offsetY = e.clientY - rect.top - halfHeight;

    const normX = Math.max(-1, Math.min(1, offsetX / halfWidth));
    const normY = Math.max(-1, Math.min(1, offsetY / halfHeight));

    const rotationX = normY * -rotateAmplitude;
    const rotationY = normX * rotateAmplitude;

    rawRotateX.set(rotationX);
    rawRotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rawRotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    rawScale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    rawScale.set(1);
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawRotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className={`relative w-full flex items-center justify-center rounded-2xl ${className}`}
      style={{
        height: containerHeight,
        width: containerWidth,
        perspective: '1000px',
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <m.div
        className={`relative w-full h-full rounded-2xl ${innerClassName}`}
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
      >
        {imageSrc && (
          <m.img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-cover rounded-2xl will-change-transform"
            loading="lazy"
          />
        )}

        {children}

        {displayOverlayContent && overlayContent && (
          <m.div
            className="absolute inset-0 z-10 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            style={{ transform: 'translateZ(30px)' }}
          >
            {overlayContent}
          </m.div>
        )}
      </m.div>

      {showTooltip && captionText && (
        <m.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-md bg-slate-900/90 border border-white/20 px-2.5 py-1 text-xs font-mono text-white shadow-xl z-20"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </m.figcaption>
      )}
    </figure>
  );
};

export default TiltedCard;
