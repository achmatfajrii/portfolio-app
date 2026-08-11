import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { ProjectsSection } from "@/components/projects-section";
import { ThemeToggle } from "@/components/theme-toggle";

const skillGroups = [
  { label: "Frontend", skills: ["React", "Vue"] },
  { label: "Backend", skills: ["Node.js"] },
  { label: "Database", skills: ["SQL", "DBeaver"] },
  { label: "Tools", skills: ["Git", "Docker", "Canva"] },
];

// TODO Fase 3+: ganti tech/label per proyek sesuai stack asli tiap project

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <span className="font-mono text-sm font-medium">AF/</span>
          <div className="hidden gap-6 font-mono text-xs uppercase tracking-wide text-muted-foreground md:flex">
            <a href="#about" className="hover:text-foreground">About</a>
            <a href="#projects" className="hover:text-foreground">Projects</a>
            <a href="#skills" className="hover:text-foreground">Skills</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm">Resume</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-grid relative flex min-h-[85vh] flex-col items-center justify-center gap-6 border-b border-border px-6 text-center">
        <p
          className="animate-fade-up font-mono text-xs uppercase tracking-widest text-primary"
          style={{ animationDelay: "0ms" }}
        >
          // Fullstack Developer
        </p>
        <h1
          className="animate-fade-up font-display text-5xl font-semibold tracking-tight sm:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          Achmat Fajri
        </h1>
        <p
          className="animate-fade-up max-w-xl text-lg leading-relaxed text-muted-foreground"
          style={{ animationDelay: "160ms" }}
        >
          Membangun aplikasi web yang cepat dan reliable dengan React, Vue, dan
          Node.js — dari sisi antarmuka sampai ke database.
        </p>
        <div
          className="animate-fade-up flex gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Button asChild>
            <a href="#projects">View projects</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#contact">Contact me</a>
          </Button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="container py-24">
        <SectionHeading index="01" eyebrow="About" title="About me" />
        <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
          <div className="space-y-4 text-muted-foreground">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
          <div className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill} variant="accent">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       <ProjectsSection />

      {/* Skills */}
      <section id="skills" className="container py-24">
        <SectionHeading index="03" eyebrow="Skills" title="Toolbox" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="rounded-lg border border-border bg-card p-5"
            >
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border bg-card/40 py-24">
        <div className="container flex flex-col items-center gap-6 text-center">
          <SectionHeading index="04" eyebrow="Contact" title="Let's build something" />
          <p className="max-w-md text-muted-foreground">
            Terbuka untuk peluang fullstack, frontend, maupun backend. Cara
            paling cepat menghubungi saya lewat email atau GitHub.
          </p>
          <div className="flex gap-3">
            <Button asChild>
              <a href="mailto:achmatfajri@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Email me
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/achmatfajrii" target="_blank" rel="noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="container flex items-center justify-between border-t border-border py-6 text-xs text-muted-foreground">
        <span>&copy; 2026 Achmat Fajri</span>
        <div className="flex gap-4">
          <a href="https://github.com/achmatfajrii" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github className="h-4 w-4 hover:text-foreground" />
          </a>
          <a href="mailto:achmatfajri@gmail.com" aria-label="Email">
            <Mail className="h-4 w-4 hover:text-foreground" />
          </a>
        </div>
      </footer>
    </main>
  );
}
