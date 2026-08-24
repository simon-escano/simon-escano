import { useEffect } from 'react'

/**
 * Sets document title and meta description for SEO.
 * Call in each page component.
 */
export function usePageSEO({ title, description }) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} — Simon Escaño`
      : 'Simon Escaño — Full-Stack Developer'

    document.title = fullTitle

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc && description) {
      metaDesc.setAttribute('content', description)
    }

    // Update OG title
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle)
    }

    // Update OG description
    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc && description) {
      ogDesc.setAttribute('content', description)
    }
  }, [title, description])
}
