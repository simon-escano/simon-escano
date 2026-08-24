import portfolioData from '../../data/data.json'

export const data = portfolioData

export const profile = data.profile
export const projects = data.projects
export const experience = data.experience
export const tech = data.tech
export const achievements = data.achievements
export const credentials = data.credentials
export const languages = data.languages

// Top 5 featured projects (for Card Swap)
export const featuredProjectIds = [
  'solution-9',  // PixCell
  'solution-8',  // Sprout
  'solution-7',  // AutoPBI
  'solution-0',  // Night Shift at Freddy's
  'solution-5',  // TekNotes
]

export const featuredProjects = featuredProjectIds
  .map(id => projects.find(p => p.id === id))
  .filter(Boolean)

// Get project by slug (id)
export function getProjectBySlug(slug) {
  return projects.find(p => p.id === slug)
}

// Get all tech categories as array
export function getTechCategories() {
  return Object.entries(tech).map(([category, data]) => ({
    category,
    icon: data.icon,
    items: data.items,
  }))
}

// Total project count
export const projectCount = projects.length
