import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { Product } from "@/lib/products"
import { StaggerItem } from "@/components/motion/reveal"

export function ProductCard({ product }: { product: Product }) {
  return (
    <StaggerItem className="h-full">
      <Link
        href={`/products/${product.category}/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {product.series && (
            <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur">
              {product.series}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">{product.material}</p>
          <h3 className="mt-1.5 font-display text-lg font-bold text-foreground">{product.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.tagline}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
            View details
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </StaggerItem>
  )
}
