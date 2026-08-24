import React from 'react';

export const Projects: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center py-12 space-y-4">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground">
          Engineered <span className="text-brand-orange">Works & Solutions</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore production-ready systems, full-stack web platforms, AI tools, and game architectures.
        </p>
      </div>
    </div>
  );
};

export default Projects;
