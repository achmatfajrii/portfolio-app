"use client";

import { useState } from "react";

const contactLinks = [
  {
    label: "Email",
    value: "achmatfajrii@gmail.com",
    href: "mailto:achmatfajrii@gmail.com",
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
    href: "https://www.linkedin.com/",
    external: true,
  },
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const email = "achmatfajrii@gmail.com";

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
      className="relative w-full overflow-hidden border-t border-white/[0.06] bg-[#0D0B12]"
    >
      {/* ===================================================== */}
      {/* DECORATIVE BACKGROUND                                 */}
      {/* ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* radial glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/[0.05] blur-[120px]" />

        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.5) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.5) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* horizontal fading line */}
        <div className="absolute left-1/2 top-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      {/* ===================================================== */}
      {/* CONTENT                                                */}
      {/* ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        {/* ================================================= */}
        {/* MAIN CTA                                           */}
        {/* ================================================= */}

        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.75fr]">
          {/* LEFT */}
          <div>
            {/* small eyebrow */}
            <div className="mb-4 md:mb-8 flex items-center gap-3">
              <span className="h-px w-8 bg-purple-500/70" />

              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                Get in touch
              </span>
            </div>

            {/* heading */}
            <h2 className="max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Have a project
              <br />

              <span className="text-white/35">
                in mind?
              </span>
            </h2>

            {/* description */}
            <p className="mt-4 md:mt-8 max-w-lg text-xs leading-5 md:leading-7 text-white/45 sm:text-base">
              Whether you have an idea to build, a problem
              to solve, or simply want to talk about technology,
              I&apos;d love to hear from you.
            </p>

            {/* CTA */}
            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-medium text-black transition-all duration-300 hover:bg-purple-400 hover:text-white"
              >
                Start a conversation

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 font-mono text-xs text-white/50 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/[0.05] hover:text-white"
              >
                {copied ? "Copied!" : "Copy email"}

                <span className="text-white/30">
                  {copied ? "✓" : "⌘"}
                </span>
              </button>
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT — AVAILABILITY CARD                         */}
          {/* ================================================= */}

          <div className="flex justify-start lg:justify-end">
            <div className="group relative w-full max-w-sm">
              {/* subtle glow */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-transparent opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#121017]/80 p-7 backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:border-purple-500/20">
                {/* decorative circle */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full border border-purple-500/[0.08]" />

                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full border border-purple-500/[0.06]" />

                {/* top */}
                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
                    Availability
                  </span>

                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-white/40">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-40" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400" />
                    </span>

                    Open
                  </span>
                </div>

                {/* title */}
                <div className="relative mt-16">
                  <p className="text-xs text-white/30">
                    Currently open to
                  </p>

                  <h3 className="mt-2 text-2xl font-medium tracking-tight text-white">
                    New opportunities
                  </h3>

                  <p className="mt-4 text-xs md:text-sm leading-5 md:leading-6 text-white/40">
                    Fullstack development, frontend
                    engineering, data analysis, and
                    interesting collaborations.
                  </p>
                </div>

                {/* divider */}
                <div className="my-7 h-px bg-white/[0.06]" />

                {/* bottom */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/25">
                    Let&apos;s talk
                  </span>

                  <a
                    href={`mailto:${email}`}
                    className="group/link flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-purple-300"
                    aria-label="Send email"
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

        {/* ================================================= */}
        {/* CONTACT LINKS                                      */}
        {/* ================================================= */}

        <div className="mt-24 border-t border-white/[0.06]">
          <div className="grid divide-y divide-white/[0.06] md:grid-cols-3 md:divide-x md:divide-y-0">
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
                className="group flex items-center justify-between py-6 md:px-7 first:md:pl-0 last:md:pr-0"
              >
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
                    {link.label}
                  </p>

                  <p className="mt-2 text-xs md:text-sm text-white/55 transition-colors duration-300 group-hover:text-white">
                    {link.value}
                  </p>
                </div>

                <span className="text-xs md:text-sm text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-purple-400">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ================================================= */}
        {/* FOOTER                                            */}
        {/* ================================================= */}

        <div className="mt-10 flex flex-col gap-4 text-[10px] text-white/20 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono">
            © {new Date().getFullYear()} Achmat Fajri
          </span>

          <span className="font-mono uppercase tracking-[0.2em]">
            Built with curiosity & code
          </span>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;