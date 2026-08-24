import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import Logo from '@/components/Logo';
import ThemeToggle from './ThemeToggle';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-background/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-border shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand / Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg"
          >
            <div className="transition-transform duration-300 group-hover:scale-105">
              <Logo className="w-8 h-8 drop-shadow-sm" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-lg tracking-tight text-foreground group-hover:text-brand-orange transition-colors">
                simon-escano
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">
                Full-Stack Architect
              </span>
            </div>
          </NavLink>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 p-1.5 rounded-full shadow-inner">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-cobalt text-white shadow-sm font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Controls: Theme Toggle + Contact Magnet Button */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange to-brand-ember rounded-full shadow-md shadow-brand-orange/20 hover:shadow-lg hover:shadow-brand-orange/30 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-background/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-border animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-cobalt text-white font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-2">
              <NavLink
                to="/contact"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange to-brand-ember rounded-xl shadow-md shadow-brand-orange/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get in Touch</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
