import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Logo from '@/components/Logo';
import ThemeToggle from './ThemeToggle';
import { DecryptedText, StaggeredMenu } from '@/components/reactbits';
import dataService from '@/services/dataService';

const NAV_TITLES = [
  'Full-Stack Dev & Software Engineer',
  'Backend Dev & Integration Engineer',
  'AI Engineer & ML App Developer',
  'Web Architect & Technical SEO Dev',
];

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const profile = dataService.getProfile();
  const [scrolled, setScrolled] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % NAV_TITLES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Projects', ariaLabel: 'Explore verified engineering work', link: '/projects' },
    { label: 'About', ariaLabel: 'Learn about Simon Escaño', link: '/about' },
    { label: 'Contact', ariaLabel: 'Get in touch directly', link: '/contact' },
  ];

  const socialItems = [
    { label: 'GitHub', link: profile.contact.github },
    { label: 'LinkedIn', link: profile.contact.linkedin },
    { label: 'Email', link: `mailto:${profile.contact.email}` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div
        className={`pointer-events-auto mx-auto transition-all duration-500 ease-out ${scrolled
          ? 'mt-3 w-[calc(100%-1.5rem)] max-w-[1280px] rounded-full bg-background/80 dark:bg-slate-950/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-900/10 p-2 pl-4 sm:pl-6 min-[925px]:pr-4'
          : 'mt-0 w-full max-w-none rounded-none bg-transparent border border-transparent shadow-none py-5 px-4 sm:px-6 lg:px-8'
          }`}
      >
        <div className={scrolled ? '' : 'max-w-[1280px] mx-auto'}>
          <div className="flex items-center justify-between">
            <NavLink
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg z-20"
            >
              <div className="transition-transform duration-300 group-hover:scale-105">
                <Logo className="w-8 h-8 drop-shadow-sm" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-medium text-lg tracking-tight text-foreground group-hover:text-brand-orange transition-colors">
                  simon-escano
                </span>
                <span className="text-[10px] font-mono tracking-wider text-muted-foreground min-h-[14px]">
                  <DecryptedText
                    text={NAV_TITLES[titleIndex]}
                    speed={55}
                    maxIterations={12}
                    className="text-muted-foreground"
                    encryptedClassName="text-brand-orange font-mono"
                    animateOn="change"
                  />
                </span>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav
              className={`hidden min-[925px]:flex items-center transition-all duration-300 ${scrolled
                ? 'gap-5 bg-transparent border-none p-0 shadow-none'
                : 'gap-1 bg-slate-100/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 p-1.5 rounded-full shadow-inner'
                }`}
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    scrolled
                      ? `text-xs font-mono font-medium transition-colors ${isActive
                        ? 'text-brand-orange font-medium'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`
                      : `relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${isActive
                        ? 'bg-brand-cobalt text-white shadow-sm font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                      }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="hidden min-[925px]:flex items-center gap-3">
              <ThemeToggle />
              <NavLink
                to="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium tracking-wider text-white bg-gradient-to-r from-brand-orange to-brand-ember rounded-full shadow-md shadow-brand-orange/20 hover:shadow-lg hover:shadow-brand-orange/30 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </NavLink>
            </div>

            {/* Mobile Navigation with StaggeredMenu */}
            <div className="flex items-center gap-2 min-[925px]:hidden mr-1 sm:mr-2">
              <ThemeToggle />
              <StaggeredMenu
                position="right"
                items={menuItems}
                socialItems={socialItems}
                displaySocials={true}
                displayItemNumbering={true}
                colors={['#3845C9', '#60a5fa', '#f97316']}
                accentColor="#f97316"
                isFixed={true}
                onItemClick={(item) => {
                  if (item.link.startsWith('/')) {
                    navigate(item.link);
                  } else {
                    window.open(item.link, '_blank');
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
