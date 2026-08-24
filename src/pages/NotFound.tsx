import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-display text-8xl font-black text-brand-orange">404</h1>
      <p className="font-display text-2xl font-bold text-foreground mt-4">Page Not Found</p>
      <p className="text-muted-foreground mt-2 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-cobalt text-white text-sm font-medium hover:bg-brand-cobalt/90 transition-transform hover:scale-105"
      >
        <Home className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
