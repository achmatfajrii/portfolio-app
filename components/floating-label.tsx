import type { LucideIcon } from "lucide-react";

interface FloatingLabelProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  delay?: string;
}

export function FloatingLabel({ icon: Icon, title, description, className, delay = "0s" }: FloatingLabelProps) {
  return (
    <div
      className={`animate-float flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-4 py-3 shadow-xl backdrop-blur-xl ${className ?? ""}`}
      style={{ animationDelay: delay }}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#A855F7]/20 text-[#A855F7]">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-semibold leading-tight">{title}</p>
        <p className="text-xs leading-tight text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}