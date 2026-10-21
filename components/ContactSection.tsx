
"use client";

import { useState } from "react";

const contactLinks = [
  {
    label: "Email",
    value: "achmatfajri@gmail.com",
    href: "mailto:achmatfajri@gmail.com",
    external: false,
  },
  {
  label: "GitHub",
  value: "github.com/achmatfajrii",
  href: "https://github.com/achmatfajrii",
  external: true,
},
{
  label: "LinkedIn",
  value: "linkedin.com/in/achmatfajri",
  href: "https://www.linkedin.com/in/achmatfajri/",
  external: true,
},
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const email = "achmatfajri@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden border-t border-border bg-background text-foreground"
    >
      {/* DECORATIVE BACKGROUND */}

      <div className="pointer-events-none absolute inset-0">
        {/* Radial purple glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.07] blur-[110px] dark:bg-purple-600/[0.05]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.20] dark:opacity-[0.045]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(168,85,247,0.20) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(168,85,247,0.20) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Horizontal accent */}
        <div className="absolute left-1/2 top-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* MAIN CONTENT */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        {/* MAIN CTA */}

        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.75fr]">
          {/* LEFT CONTENT */}

          <div>
            {/* Eyebrow */}

            <div className="mb-4 flex items-center gap-3 md:mb-8">
              <span className="h-px w-8 bg-primary/70" />

              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Get in touch
              </span>
            </div>

            {/* Heading */}

            <h2 className="max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
              Have a project
              <br />

              <span className="text-muted-foreground/75">
                in mind?
              </span>
            </h2>

            {/* Description */}

            <p className="mt-4 max-w-lg text-xs leading-5 text-muted-foreground md:mt-8 md:leading-7 sm:text-base">
              Whether you have an idea to build, a problem
              to solve, or simply want to talk about technology,
              I&apos;d love to hear from you.
            </p>

            {/* CTA BUTTONS */}

            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
              <a
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-xs font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90"
              >
                Start a conversation

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <button
                type="button"
                onClick={copyEmail}
                aria-live="polite"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-5 py-3 font-mono text-xs text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
              >
                {copied ? "Copied!" : "Copy email"}

                <span className="text-primary/70">
                  {copied ? "✓" : "⌘"}
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT: AVAILABILITY CARD */}

          <div className="flex justify-start lg:justify-end">
            <div className="group relative w-full max-w-sm">
              {/* Hover glow */}

              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-transparent opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

              {/* Card */}

              <div className="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-7 backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/30">
                {/* Decorative circles */}

                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full border border-primary/[0.12]" />

                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full border border-primary/[0.08]" />

                {/* Card header */}

                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Availability
                  </span>

                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-30" />

                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>

                    Open
                  </span>
                </div>

                {/* Card content */}

                <div className="relative mt-16">
                  <p className="text-xs text-muted-foreground">
                    Currently open to
                  </p>

                  <h3 className="mt-2 text-2xl font-medium tracking-tight text-foreground">
                    New opportunities
                  </h3>

                  <p className="mt-4 text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">
                    Fullstack development, frontend
                    engineering, data analysis, and
                    interesting collaborations.
                  </p>
                </div>

                {/* Divider */}

                <div className="my-7 h-px bg-border" />

                {/* Card footer */}

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Let&apos;s talk
                  </span>

                  <a
                    href={`mailto:${email}`}
                    aria-label="Send email"
                    className="group/link flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    <span className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT LINKS */}

        <div className="mt-24 border-t border-border">
          <div className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={
                  link.external
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group flex items-center justify-between py-6 transition-colors duration-300 md:px-7 first:md:pl-0 last:md:pr-0"
              >
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                    {link.label}
                  </p>

                  <p className="mt-2 break-all text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground md:text-sm">
                    {link.value}
                  </p>
                </div>

                <span className="ml-4 shrink-0 text-xs text-muted-foreground/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary md:text-sm">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* FOOTER */}

        <div className="mt-10 flex flex-col gap-4 text-[10px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono">
            © {new Date().getFullYear()} Achmat Fajri
          </span>

          <span className="font-mono uppercase tracking-[0.2em]">
            Built with curiosity &amp; code
          </span>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
