import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { fetchCategories } from "@/lib/products-db"
import { SectionHeading } from "@/components/section-heading"
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal"

export async function CategoryShowcase() {
  const categories = await fetchCategories()
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Product Range"
          title="Aluminum windows & doors, endless configurations"
          description="Casement, sliding and louver windows plus aluminum casement doors — each built from 6063-T5 aluminum and fully customizable in size, color, glazing and hardware."
        />

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2">
          {categories.map((cat) => (
            <StaggerItem key={cat.slug}>
              <Link
                href={`/products/${cat.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={cat.image || "/placeholder.svg"}
                    alt={cat.shortName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">{cat.material}</p>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-foreground">{cat.shortName}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{cat.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                    View products
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
