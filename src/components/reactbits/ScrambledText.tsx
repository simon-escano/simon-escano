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
  const [chars, setChars] = useState<{ original: string; current: string; active: boolean; isSpace: boolean }[]>([]);
  const timeoutRefs = useRef<(number | null)[]>([]);

  useEffect(() => {
    setChars(
      text.split('').map((char) => ({
        original: char,
        current: char,
        active: false,
        isSpace: char === ' ' || char === '\n',
      }))
    );
    timeoutRefs.current = new Array(text.length).fill(null);
  }, [text]);

  const scrambleChar = useCallback(
    (index: number) => {
      if (text[index] === ' ' || text[index] === '\n') return;
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
            if (next[index]) next[index] = { original, current: original, active: false, isSpace: false };
            return next;
          });
          return;
        }

        const randChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        setChars((prev) => {
          const next = [...prev];
          if (next[index]) next[index] = { original, current: randChar, active: true, isSpace: false };
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
    const spans = root.querySelectorAll<HTMLSpanElement>('.scrambled-char:not(.scrambled-char--space)');

    spans.forEach((span) => {
      const idx = Number(span.dataset.idx);
      if (isNaN(idx)) return;
      const rect = span.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

      if (dist < radius) {
        scrambleChar(idx);
      }
    });
  };

  // Group chars into words for word-level wrapping (break on spaces only, not mid-character)
  type IndexedChar = (typeof chars)[number] & { idx: number };
  const wordGroups = React.useMemo(() => {
    const groups: { chars: IndexedChar[]; isSpace: boolean }[] = [];
    let currentWord: IndexedChar[] = [];

    chars.forEach((c, i) => {
      if (c.isSpace) {
        if (currentWord.length > 0) {
          groups.push({ chars: currentWord, isSpace: false });
          currentWord = [];
        }
        groups.push({ chars: [{ ...c, idx: i }], isSpace: true });
      } else {
        currentWord.push({ ...c, idx: i });
      }
    });
    if (currentWord.length > 0) {
      groups.push({ chars: currentWord, isSpace: false });
    }
    return groups;
  }, [chars]);

  return (
    <div
      ref={rootRef}
      onPointerMove={handlePointerMove}
      className={`scrambled-text-block ${className}`.trim()}
      style={style}
    >
      <p>
        {wordGroups.map((group, gi) => {
          if (group.isSpace) {
            return (
              <span key={`space-${group.chars[0].idx}`} className="scrambled-char--space">
                {' '}
              </span>
            );
          }

          return (
            <span key={`word-${gi}`} className="scrambled-word">
              {group.chars.map((c) => (
                <span
                  key={c.idx}
                  data-idx={c.idx}
                  className={`scrambled-char ${c.active ? 'scrambled-char--active' : ''}`}
                  onMouseEnter={() => scrambleChar(c.idx)}
                >
                  {c.current}
                </span>
              ))}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default ScrambledText;
