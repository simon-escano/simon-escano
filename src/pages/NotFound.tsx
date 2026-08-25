import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home as HomeIcon, Layers, Mail } from 'lucide-react';
import { StrokeText, SpecularButton, BorderGlow } from '@/components/reactbits';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-xl w-full space-y-8">
        <BorderGlow
          edgeSensitivity={35}
          glowColor="24 95 53"
          borderRadius={32}
        >
          <div className="p-8 sm:p-12 space-y-6 text-center">
            <div className="w-full flex justify-center">
              <StrokeText
                text="404"
                strokeColor="#3845C9"
                fillColor="#f97316"
                fontSize={120}
                strokeWidth={2}
                drawDuration={1.4}
              />
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white">
              Page Not Found
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              The requested coordinate or URL does not exist in this portfolio.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <SpecularButton size="md" onClick={() => navigate('/')}>
                <HomeIcon className="w-4 h-4" />
                <span>Return to Home</span>
              </SpecularButton>

              <Link
                to="/projects"
                className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-brand-orange" />
                <span>Browse Projects</span>
              </Link>

              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-brand-cobalt dark:text-blue-400" />
                <span>Contact</span>
              </Link>
            </div>
          </div>
        </BorderGlow>
      </div>
    </div>
  );
};

export default NotFound;
