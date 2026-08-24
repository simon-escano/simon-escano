import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import Logo from '@/components/Logo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border bg-slate-100/70 dark:bg-slate-950/80 backdrop-blur-md pt-16 pb-12 overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-brand-cobalt/60 to-transparent" />
      <div className="absolute top-0 left-1/3 w-1/4 h-24 bg-brand-cobalt/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-border/60">
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <Logo className="w-8 h-8 group-hover:scale-105 transition-transform" />
              <span className="font-display font-semibold text-xl tracking-tight text-foreground">
                simon-escano
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Full-Stack Developer crafting robust, high-performance software solutions across AI diagnostics, gamified systems, and enterprise data management.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-500 dark:text-emerald-400 font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open to work</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-brand-orange transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-brand-orange transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-orange transition-colors">
                  About & Credentials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-orange transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Connect & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/simon-escano"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-full bg-slate-200/60 dark:bg-slate-900 border border-slate-300/40 dark:border-slate-800 text-muted-foreground hover:text-foreground hover:scale-110 hover:border-brand-cobalt transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/simon-escano/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-full bg-slate-200/60 dark:bg-slate-900 border border-slate-300/40 dark:border-slate-800 text-muted-foreground hover:text-foreground hover:scale-110 hover:border-brand-cobalt transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:escanosimonlyster@gmail.com"
                aria-label="Send Email"
                className="p-2.5 rounded-full bg-slate-200/60 dark:bg-slate-900 border border-slate-300/40 dark:border-slate-800 text-muted-foreground hover:text-foreground hover:scale-110 hover:border-brand-orange transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs font-mono text-muted-foreground pt-1">
              escanosimonlyster@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} simon-escano. Designed & built with precision.</p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px]">
              Vite • React • Tailwind • Motion
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-1 hover:text-brand-orange transition-colors focus:outline-none"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
