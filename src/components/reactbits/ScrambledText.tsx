import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ScrambledText.css';

export interface ScrambledTextProps {
  children: string;
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrambledText: React.FC<ScrambledTextProps> = ({
  children,
  radius = 60,
  duration = 600,
  scrambleChars = '!<>-_\\/[]{}—=+*^?#________',
  className = '',
  style = {},
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const text = String(children);
  const [chars, setChars] = useState<{ original: string; current: string; active: boolean }[]>([]);
  const timeoutRefs = useRef<(number | null)[]>([]);

  useEffect(() => {
    setChars(
      text.split('').map((char) => ({
        original: char,
        current: char,
        active: false,
      }))
    );
    timeoutRefs.current = new Array(text.length).fill(null);
  }, [text]);

  const scrambleChar = useCallback(
    (index: number) => {
      if (text[index] === ' ') return;
      const original = text[index];
      let iterations = 0;
      const maxIterations = 6;

      if (timeoutRefs.current[index]) {
        window.clearTimeout(timeoutRefs.current[index]!);
      }

      const step = () => {
        if (iterations >= maxIterations) {
          setChars((prev) => {
            const next = [...prev];
            if (next[index]) next[index] = { original, current: original, active: false };
            return next;
          });
          return;
        }

        const randChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        setChars((prev) => {
          const next = [...prev];
          if (next[index]) next[index] = { original, current: randChar, active: true };
          return next;
        });

        iterations++;
        timeoutRefs.current[index] = window.setTimeout(step, duration / maxIterations);
      };

      step();
    },
    [text, scrambleChars, duration]
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (!root) return;
    const spans = root.querySelectorAll<HTMLSpanElement>('.scrambled-char');

    spans.forEach((span, idx) => {
      const rect = span.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

      if (dist < radius) {
        scrambleChar(idx);
      }
    });
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handlePointerMove}
      className={`scrambled-text-block ${className}`.trim()}
      style={style}
    >
      <p>
        {chars.map((c, i) => (
          <span
            key={i}
            className={`scrambled-char ${c.active ? 'scrambled-char--active' : ''}`}
            onMouseEnter={() => scrambleChar(i)}
          >
            {c.current}
          </span>
        ))}
      </p>
    </div>
  );
};

export default ScrambledText;
