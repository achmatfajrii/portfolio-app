export function Footer() {
  return (
    <footer className="relative w-full bg-[#A855F7] text-white">
      <div className="container flex h-[56px] items-center justify-between gap-6 py-5">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold tracking-tight">
            AF/
          </span>

          <span className="hidden h-4 w-px bg-white/30 sm:block" />

          <span className="hidden text-xs text-white/70 sm:block">
            Fullstack Developer
          </span>
        </div>

        {/* Copyright */}
        <p className="text-center font-mono text-[10px] uppercase tracking-wider text-white/60">
          © {new Date().getFullYear()} Achmat Fajri
        </p>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/achmatfajrii"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-wider text-white/70 transition-colors hover:text-white"
          >
            GitHub
          </a>

          <a
            href="#contact"
            className="font-mono text-[10px] uppercase tracking-wider text-white/70 transition-colors hover:text-white"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}