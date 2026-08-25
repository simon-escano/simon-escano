import rawData from '@/data/data.json';
import {
  PortfolioData,
  Profile,
  Project,
  Experience,
  TechStackMap,
  Achievement,
  Credential,
  Language,
} from '@/types/data';

const data: PortfolioData = rawData as unknown as PortfolioData;

export const dataService = {
  getProfile: (): Profile => data.profile,
  
  getProjects: (): Project[] => data.projects,
  
  getProjectById: (id: string): Project | undefined => {
    return data.projects.find(p => p.id === id || p.title.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase());
  },
  
  getTopProjects: (count: number = 5): Project[] => {
    return data.projects.slice(0, count);
  },
  
  getExperience: (): Experience[] => data.experience,
  
  getTechStack: (): TechStackMap => data.tech,
  
  getAchievements: (): Achievement[] => data.achievements,
  
  getCredentials: (): Credential[] => data.credentials,
  
  getLanguages: (): Language[] => data.languages,
};

export default dataService;
