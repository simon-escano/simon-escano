import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground">
          About <span className="text-brand-cobalt dark:text-blue-400">Simon Escaño</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Full-Stack Developer, Computer Science Researcher, and Software Architect based in Cebu, Philippines.
        </p>
      </div>
    </div>
  );
};

export default About;
