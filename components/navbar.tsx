
'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      aria-label="Main navigation"
      className={`
        fixed left-1/2 top-6 z-[999]
        w-11/12 max-w-sm
        -translate-x-1/2
        overflow-hidden
        border border-border
        shadow-[0_8px_32px_rgba(168,85,247,0.10)]
        backdrop-blur-xl
        transition-[border-radius,background-color,border-color]
        duration-300
        md:top-6 md:w-1/2 md:max-w-none
        lg:top-8
        ${isMenuOpen ? 'rounded-3xl' : 'rounded-full'}
      `}
      style={{
        backgroundColor: 'hsl(var(--card) / 0.84)',
      }}
    >
      <div className="flex h-12 items-center justify-between px-4">
        <a
          href="#home"
          aria-label="Achmat Fajri — Home"
          className="
            rounded-md font-mono text-sm font-semibold
            tracking-tight text-foreground
            transition-colors duration-200
            hover:text-primary
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-ring
          "
        >
          AF/
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                rounded-full px-3 py-2
                font-mono text-xs uppercase tracking-wide
                text-muted-foreground
                transition-colors duration-200
                hover:bg-accent hover:text-accent-foreground
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-ring
              "
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            variant="outline"
            size="sm"
            className="
              rounded-full border-border
              bg-background/70
              transition-colors duration-200
              hover:border-primary/40
            "
          >
            Resume
          </Button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="
              inline-flex h-8 w-8 items-center justify-center
              rounded-full border border-border
              bg-background/70 text-muted-foreground
              transition-colors duration-200
              hover:bg-accent hover:text-accent-foreground
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-ring
              md:hidden
            "
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="
            flex flex-col gap-1
            border-t border-border
            px-3 py-3
            md:hidden
          "
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="
                rounded-xl px-4 py-3
                font-mono text-xs uppercase tracking-wide
                text-muted-foreground
                transition-colors duration-200
                hover:bg-accent hover:text-accent-foreground
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-ring
              "
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
