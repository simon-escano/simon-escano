import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Terminal,
  Mail,
} from 'lucide-react';
import {
  DotField,
  GradientText,
  SpecularButton,
  BorderGlow,
} from '@/components/reactbits';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-background text-foreground overflow-hidden">
      {/* Background Interactive DotField Shader */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-75 dark:opacity-85">
          <DotField
            dotRadius={1.5}
            dotSpacing={16}
            bulgeStrength={65}
            glowRadius={160}
            gradientFrom="rgba(56, 69, 201, 0.45)"
            gradientTo="rgba(249, 115, 22, 0.35)"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-auto">
        <BorderGlow
          edgeSensitivity={35}
          glowColor="24 95 53"
          borderRadius={28}
          glowRadius={30}
          className="w-full"
        >
          <div className="p-8 sm:p-12 md:p-14 text-center space-y-6 flex flex-col items-center justify-center">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cobalt/10 border border-brand-cobalt/30 text-brand-cobalt dark:text-blue-400 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5 text-brand-orange" />
              <span>Status 404 • Coordinate Not Found</span>
            </div>

            {/* Big Gradient 404 */}
            <h1 className="font-display text-7xl sm:text-8xl md:text-9xl font-medium tracking-tight select-none">
              <GradientText colors={['#3845C9', '#60a5fa', '#f97316']}>404</GradientText>
            </h1>

            {/* Heading & Subtext */}
            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white leading-tight">
                Page Not Found
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                The requested URL or system coordinate does not exist in this registry.
              </p>
            </div>

            {/* Action Buttons Matching Website Theme */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <SpecularButton onClick={() => navigate('/')}>
                <span>Return to Home</span>
                <ArrowRight className="w-4 h-4 text-brand-orange" />
              </SpecularButton>

              <Link
                to="/projects"
                className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 text-sm font-medium transition-all shadow-sm inline-flex items-center gap-2"
              >
                <ArrowUpRight className="w-4 h-4 text-brand-orange" />
                <span>Explore Projects</span>
              </Link>
            </div>

            {/* Direct Contact Alternative Link */}
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-brand-orange transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>
                  Need assistance? Contact{' '}
                  <span className="font-display font-medium text-slate-900 dark:text-white">
                    simon-escano
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </BorderGlow>
      </div>
    </div>
  );
};

export default NotFound;
