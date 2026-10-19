'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  // { href: '#data', label: 'Data' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed left-1/2 top-6 z-[999] w-11/12 max-w-sm -translate-x-1/2 rounded-full border border-white/10 bg-transparent shadow-[0_0_30px_rgba(168,85,247,0.08)] backdrop-blur md:w-1/2 md:max-w-none lg:top-8">
      <div className="flex h-12 items-center justify-between px-4">
        <span className="font-mono text-sm font-medium">AF/</span>

        <div className="hidden items-center gap-6 font-mono text-xs uppercase tracking-wide text-muted-foreground md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground">{l.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* <ThemeToggle /> */}
          <Button className="rounded-full" variant="outline" size="sm">Resume</Button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Buka menu navigasi"
            aria-expanded={isMenuOpen}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 md:hidden"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-4 font-mono text-xs uppercase tracking-wide text-muted-foreground md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setIsMenuOpen(false)} className="hover:text-foreground">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}