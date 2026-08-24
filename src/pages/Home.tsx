import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Placeholder Hero for Stage 1 */}
        <section className="py-20 flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cobalt/10 border border-brand-cobalt/30 text-brand-cobalt dark:text-blue-400 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
            </span>
            <span>Available for Hire • Full-Stack Developer</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl text-foreground">
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cobalt via-blue-500 to-brand-orange">robust, user-centric</span> software systems.
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Simon Escaño is a software architect and full-stack engineer driving innovation across diverse domains from AI diagnostics to gamified productivity and secure cloud pipelines.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-cobalt text-white font-medium text-sm hover:bg-brand-cobalt/90 shadow-lg shadow-brand-cobalt/20 transition-all hover:scale-105"
            >
              <Rocket className="w-4 h-4" />
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-border text-foreground font-medium text-sm hover:border-brand-orange transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-brand-orange" />
              <span>Get in Touch</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
