import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { ProductsSidebar } from "@/components/products/products-sidebar"
import { ProductCard } from "@/components/products/product-card"
import { StaggerGroup, Reveal } from "@/components/motion/reveal"
import { fetchCategories, fetchProducts, filterProductsByCategory } from "@/lib/products-db"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse XIAOZI's aluminum alloy windows and doors — casement, sliding and louver windows plus aluminum casement doors, all fully customizable in size, color, glazing and hardware.",
}

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([fetchCategories(), fetchProducts()])

  return (
    <>
      <PageHero
        title="Aluminum windows & doors for every project"
        description="Casement, sliding and louver windows plus aluminum casement doors — fully customizable in size, color, glazing and hardware to match your specifications."
        image="/images/products/aluminum-casement-window/01.webp"
        crumbs={[{ label: "Products" }]}
      />

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[300px_1fr]">
          <ProductsSidebar categories={categories} products={products} />

          <div className="space-y-16">
            {categories.map((cat) => {
              const items = filterProductsByCategory(products, cat.slug)
              return (
                <div key={cat.slug} id={cat.slug} className="scroll-mt-28">
                  <Reveal>
                    <div className="overflow-hidden rounded-2xl border border-border bg-card">
                      <div className="grid gap-6 p-6 sm:grid-cols-[200px_1fr] sm:items-center">
                        <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary sm:aspect-auto sm:h-40">
                          <Image
                            src={cat.image || "/placeholder.svg"}
                            alt={cat.shortName}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-accent">{cat.material}</p>
                          <h2 className="mt-1 font-display text-2xl font-bold text-foreground">{cat.name}</h2>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cat.blurb}</p>
                          <Link
                            href={`/products/${cat.slug}`}
                            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-accent"
                          >
                            View category
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  <StaggerGroup className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map((product) => (
                      <ProductCard key={product.slug} product={product} />
                    ))}
                  </StaggerGroup>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
