import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  demoHref?: string;
  repoHref?: string;
}

export function ProjectCard({
  title,
  description,
  tech,
  demoHref,
  repoHref,
}: ProjectCardProps) {
  return (
    <div className="group relative rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50">
      <span className="pointer-events-none absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
      <span className="pointer-events-none absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-transparent transition-colors duration-300 group-hover:border-primary" />

      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tech.map((t) => (
          <Badge key={t} variant="outline">
            {t}
          </Badge>
        ))}
      </div>

      <div className="mt-5 flex gap-4 text-sm">
        {demoHref && (
          <a
            href={demoHref}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            Live demo ↗
          </a>
        )}
        {repoHref && (
          <a
            href={repoHref}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            Source ↗
          </a>
        )}
      </div>
    </div>
  );
}
