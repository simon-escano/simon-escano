import React from 'react';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground">
          Let's <span className="text-brand-orange">Connect</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Have a project in mind or an engineering opportunity? Feel free to reach out directly.
        </p>
      </div>
    </div>
  );
};

export default Contact;
