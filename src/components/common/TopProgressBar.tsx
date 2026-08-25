import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { m, AnimatePresence } from 'motion/react';

export const TopProgressBar: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ scaleX: 0, opacity: 1, originX: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-brand-orange via-brand-cobalt to-emerald-400 z-[9999] pointer-events-none shadow-[0_0_8px_rgba(249,115,22,0.6)]"
        />
      )}
    </AnimatePresence>
  );
};

export default TopProgressBar;
