import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

type Crumb = { label: string; href?: string }

export function PageHero({
  title,
  description,
  image = "/images/factory.png",
  crumbs = [],
}: {
  title: string
  description?: string
  image?: string
  crumbs?: Crumb[]
}) {
  return (
    <section className="relative overflow-hidden bg-primary">
      <Image src={image || "/placeholder.svg"} alt="" fill className="object-cover opacity-25" sizes="100vw" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/55" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-primary-foreground/60">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-accent">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-primary-foreground/90">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight text-primary-foreground text-balance sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
