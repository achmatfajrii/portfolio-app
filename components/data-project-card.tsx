import { Badge } from "@/components/ui/badge";

interface DataProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  insights: string[];
  repoHref?: string;
}

export function DataProjectCard({ title, description, tech, insights, repoHref }: DataProjectCardProps) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-card p-6">
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <ul className="mt-4 space-y-1.5">
        {insights.map((insight) => (
          <li key={insight} className="flex gap-2 text-sm text-muted-foreground">
            <span className="text-primary">→</span>
            <span>{insight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {tech.map((t) => (
          <Badge key={t} variant="outline">
            {t}
          </Badge>
        ))}
      </div>

      {repoHref && (
        <a
          href={repoHref}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block text-sm text-primary hover:underline"
        >
          Lihat notebook & SQL ↗
        </a>
      )}
    </div>
  );
}