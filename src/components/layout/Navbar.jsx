import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { m } from 'motion/react'
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState('system')

  // Track scroll for glass effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Theme management
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored) setTheme(stored)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const root = document.documentElement

    if (theme === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }
  }, [theme])

  function cycleTheme() {
    setTheme(prev => {
      if (prev === 'system') return 'dark'
      if (prev === 'dark') return 'light'
      return 'system'
    })
  }

  const ThemeIcon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass shadow-lg shadow-black/5'
          : 'bg-transparent'
      )}
    >
      <nav className="container-wide flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 font-display text-xl font-bold tracking-tight"
          aria-label="Simon Escaño — Home"
        >
          <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
            <rect width="29.8095" height="28.9998" rx="7" fill="#3845C9" />
            <path
              d="M13.834 11.4336L8.14177 12.3412V11.2619C8.14177 10.666 8.62173 10.1065 9.21372 10.012L20.5958 8.19754C21.1878 8.10307 21.6677 8.50982 21.6677 9.10569V10.1847L15.9758 11.0919V17.5678L23.8095 16.3188V14.163L18.1176 15.0706V12.9064L23.8095 11.9992V8.73605C23.7952 6.99201 22.4065 5.79722 20.6789 6.02865L9.13019 7.86985C7.41176 8.18768 6.02885 9.80893 6 11.5474V14.8383L11.6923 13.9307V16.0949L6 17.0025V19.1583L13.834 17.9094V11.4336Z"
              fill="white"
            />
            <path
              d="M23.6259 18.5056C23.1847 19.8323 21.9945 20.9215 20.5954 21.1445L9.21408 22.959C7.81496 23.182 6.62476 22.472 6.18362 21.2863L23.6259 18.5056Z"
              fill="white"
            />
          </svg>
          <span className="hidden sm:inline">Simon Escaño</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => {
            const isActive = location.pathname === link.href ||
              (link.href !== '/' && location.pathname.startsWith(link.href))

            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'relative rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-accent-500'
                    : 'text-base-400 hover:text-base-200'
                )}
              >
                {link.label}
                {isActive && (
                  <m.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-accent-500"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            )
          })}

          {/* Theme Toggle */}
          <button
            onClick={cycleTheme}
            className="ml-2 rounded-lg p-2 text-base-400 transition-colors hover:text-base-200"
            aria-label={`Current theme: ${theme}. Click to change.`}
          >
            <ThemeIcon size={18} />
          </button>

          {/* CTA */}
          <Link
            to="/contact"
            className="ml-3 rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/25"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={cycleTheme}
            className="rounded-lg p-2 text-base-400"
            aria-label={`Current theme: ${theme}`}
          >
            <ThemeIcon size={18} />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-base-400"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <m.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="glass border-t border-white/10 md:hidden"
        >
          <div className="container-wide flex flex-col gap-1 py-4">
            {navLinks.map(link => {
              const isActive = location.pathname === link.href

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-950/50 text-accent-500'
                      : 'text-base-300 hover:bg-base-800/50'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              to="/contact"
              className="mt-2 rounded-full bg-accent-500 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Get in Touch
            </Link>
          </div>
        </m.div>
      )}
    </header>
  )
}
