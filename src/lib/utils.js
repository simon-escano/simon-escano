/**
 * Merge class names — simple utility for conditional classes.
 * Replaces the need for clsx/tailwind-merge in most cases.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
