import type { LucideIcon } from "lucide-react";

interface FloatingLabelProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  delay?: string;
}

export function FloatingLabel({
  icon: Icon,
  title,
  description,
  className,
  delay = "0s",
}: FloatingLabelProps) {
  return (
    <div
      className={`
        animate-float flex items-center gap-3
        rounded-2xl
        border border-[hsl(var(--primary)/0.22)]
        bg-accent text-foreground
        px-4 py-3
        shadow-xl backdrop-blur-xl
        transition-colors duration-200
        ${className ?? ""}
      `}
      style={{ animationDelay: delay }}
    >
      <div
        className="
          flex h-9 w-9 shrink-0 items-center justify-center
          rounded-full
          bg-[hsl(var(--primary)/0.12)]
          text-primary
        "
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>

      <div>
        <p className="text-sm font-semibold leading-tight text-foreground">
          {title}
        </p>

        <p className="text-xs leading-tight text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}