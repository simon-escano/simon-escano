import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons'
import { profile } from '@/lib/data'

const socialLinks = [
  {
    icon: GithubIcon,
    href: profile.contact.github,
    label: 'GitHub',
  },
  {
    icon: LinkedinIcon,
    href: profile.contact.linkedin,
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: `mailto:${profile.contact.email}`,
    label: 'Email',
  },
]

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-base-800/50 bg-base-950/50">
      <div className="container-wide section-padding">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-display text-xl font-bold tracking-tight text-base-100"
            >
              Simon Escaño
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-base-400">
              Full-Stack Developer crafting robust, user-centric solutions across diverse domains.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-base-400">
              Pages
            </h4>
            <ul className="mt-4 flex flex-col gap-2">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-base-300 transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-base-400">
              Connect
            </h4>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-base-700/50 text-base-400 transition-all hover:border-accent-500/50 hover:text-accent-400"
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-base-800/50 pt-6 text-center">
          <p className="text-xs text-base-500">
            © {currentYear} Simon Escaño. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
