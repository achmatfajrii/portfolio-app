'use client';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import CardNav, { type CardNavItem } from '@/components/react-bits/CardNav';

const desktopLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#data', label: 'Data' },
  { href: '#contact', label: 'Contact' },
];

const mobileItems: CardNavItem[] = [
  {
    label: 'About',
    description: 'A little about my background and how I approach development.',
    links: [
      { label: 'Introduction', href: '#about-introduction' },
      { label: 'Background', href: '#about-background' },
      { label: 'Approach', href: '#about-approach' },
      { label: 'Learning', href: '#about-learning' },
      { label: 'Looking for', href: '#about-looking-for' },
    ],
  },
  {
    label: 'Projects',
    description: 'Selected work, experiments, and things I have built.',
    links: [
      { label: 'View projects', href: '#projects' },
      { label: 'Skills & stack', href: '#skills' },
    ],
  },
  {
    label: 'Data Lab',
    description: 'Learning to turn good questions into meaningful insights.',
    links: [{ label: 'Explore Data Lab', href: '#data' }],
  },
  {
    label: 'Contact',
    description: 'Have an idea, an opportunity, or want to collaborate?',
    links: [{ label: 'Get in touch', href: '#contact' }],
  },
];

export function Navbar() {
  return (
    <>
      {/* MOBILE: CardNav-inspired expanding card menu */}
      <div className="md:hidden">
        <CardNav
        logo={<span>AF/</span>}
        logoAlt="Achmat Fajri — Home"
        logoHref="#home"
        ariaLabel="Mobile navigation"
        items={mobileItems}
        actions={<ThemeToggle />}
        cta={{ label: "Let's talk", href: '#contact' }}
        />
      </div>

      {/* DESKTOP: keep the existing navbar design */}
      <nav
        aria-label="Main navigation"
        className="fixed left-1/2 top-6 z-[999] hidden w-1/2 -translate-x-1/2 overflow-hidden rounded-full border border-border shadow-[0_8px_32px_rgba(168,85,247,0.10)] backdrop-blur-xl transition-[background-color,border-color] duration-300 md:block lg:top-8"
        style={{
          backgroundColor: 'hsl(var(--card) / 0.84)',
        }}
      >
        <div className="flex h-12 items-center justify-between px-4">
          <a
            href="#home"
            aria-label="Achmat Fajri — Home"
            className="rounded-md font-mono text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            AF/
          </a>

          <div className="flex items-center gap-1">
            {desktopLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="/assets/profile/achmat-fajri-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-full border border-border bg-background/70 px-3 text-sm transition-colors duration-200 hover:border-primary/40"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
