import type { LucideIcon } from "lucide-react";

export function SectionTitle({
  icon: Icon,
  kicker,
  title,
  inverted = false,
}: {
  icon: LucideIcon;
  kicker: string;
  title: string;
  inverted?: boolean;
}) {
  return (
    <div>
      <p className={`flex items-center gap-2 text-sm font-medium ${inverted ? "text-surface/65" : "text-muted"}`}>
        <Icon className="size-4" aria-hidden="true" />
        {kicker}
      </p>
      <h2 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{title}</h2>
    </div>
  );
}
