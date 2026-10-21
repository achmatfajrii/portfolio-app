"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import "./CardNav.css";

export type CardNavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type CardNavItem = {
  label: string;
  description: string;
  links: CardNavLink[];
};

type CardNavProps = {
  logo: ReactNode;
  logoAlt?: string;
  logoHref?: string;
  items: CardNavItem[];
  actions?: ReactNode;
  cta?: { label: string; href: string };
  ariaLabel?: string;
  className?: string;
};

export default function CardNav({
  logo,
  logoAlt = "Home",
  logoHref = "#home",
  items,
  actions,
  cta,
  ariaLabel = "Mobile navigation",
  className = "",
}: CardNavProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentId = "mobile-card-nav-content";

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && rootRef.current?.contains(target)) return;
      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <div ref={rootRef} className={`card-nav ${className}`.trim()}>
      <nav
        className={`card-nav__panel ${open ? "is-open" : ""}`}
        aria-label={ariaLabel}
        data-open={open ? "true" : "false"}
      >
        <div className="card-nav__bar">
          <button
            type="button"
            className="card-nav__menu"
            aria-expanded={open}
            aria-controls={contentId}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((current) => !current)}
          >
            <span className={`card-nav__burger ${open ? "is-open" : ""}`} aria-hidden="true">
              {open ? <X size={17} strokeWidth={1.8} /> : <Menu size={17} strokeWidth={1.8} />}
            </span>
            <span className="card-nav__menu-label">{open ? "Close" : "Menu"}</span>
          </button>

          <a href={logoHref} className="card-nav__logo" aria-label={logoAlt} onClick={closeMenu}>
            {logo}
          </a>

          <div className="card-nav__right">
            {actions && <div className="card-nav__actions">{actions}</div>}
            {cta && (
              <a href={cta.href} className="card-nav__cta" onClick={closeMenu}>
                {cta.label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div
          id={contentId}
          className="card-nav__content"
          aria-hidden={!open}
          style={{
            maxHeight: open ? "min(70svh, 560px)" : "0px",
            overflowY: open ? "auto" : "hidden",
          }}
        >
          <div className="card-nav__cards">
            {items.map((item, index) => (
              <article
                key={item.label}
                className="card-nav__card"
                style={{ "--card-index": index } as CSSProperties}
              >
                <div className="card-nav__card-top">
                  <span className="card-nav__card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight size={15} aria-hidden="true" className="card-nav__card-icon" />
                </div>

                <h2 className="card-nav__card-title">{item.label}</h2>
                <p className="card-nav__card-description">{item.description}</p>

                <ul className="card-nav__links">
                  {item.links.map((link) => (
                    <li key={`${item.label}-${link.label}`}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        tabIndex={open ? 0 : -1}
                        className="card-nav__link"
                        onClick={closeMenu}
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="card-nav__footer">
            <span className="card-nav__footer-note">Explore the portfolio</span>
            <span className="card-nav__footer-mark">AF/</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
