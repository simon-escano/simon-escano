import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-orange transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Projects</span>
      </Link>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
        Project Case Study: {id}
      </h1>
    </div>
  );
};

export default ProjectDetail;
