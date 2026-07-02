import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: "center" | "left"
  className?: string
  light?: boolean
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-widest",
            light ? "text-accent" : "text-accent",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl",
          light ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-pretty",
            light ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
