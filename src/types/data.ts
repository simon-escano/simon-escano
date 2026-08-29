export interface Profile {
  name: string;
  role: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
  mobile: string;
  philosophy: string;
  hobbies: string[];
}

export interface KeyFeature {
  icon: string;
  text: string;
}

export interface TechItem {
  name: string;
  role: string;
}

export interface MetricItem {
  icon: string;
  text: string;
}

export interface ProjectLink {
  icon: string;
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  one_liner: string;
  contributions: string;
  problem: string;
  goal: string;
  key_features: KeyFeature[];
  architecture_diagram_code: string;
  tech_stack: TechItem[];
  stack_reason: string;
  results: {
    performance: MetricItem;
    scale: MetricItem;
    utility: MetricItem;
  };
  links: ProjectLink[];
  gallery: string[];
  source: string;
  rating?: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  date_range: string;
  contributions: string[];
}

export interface TechSkill {
  title: string;
  proficiency: number;
}

export interface TechCategory {
  icon: string;
  items: TechSkill[];
}

export type TechStackMap = Record<string, TechCategory>;

export interface Achievement {
  id: string;
  title: string;
  description: string;
  verifiable: boolean;
  image?: string;
}

export interface Credential {
  id: string;
  type: string;
  title: string;
  institution: string;
  date: string;
  description?: string;
}

export interface Language {
  title: string;
  proficiency: number;
  level: string;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  experience: Experience[];
  tech: TechStackMap;
  achievements: Achievement[];
  credentials: Credential[];
  languages: Language[];
}
