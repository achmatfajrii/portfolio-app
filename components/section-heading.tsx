interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
}

export function SectionHeading({ index, eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex items-baseline gap-3">
      <span className="font-mono text-sm text-primary">// {index}</span>
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
    </div>
  );
}
