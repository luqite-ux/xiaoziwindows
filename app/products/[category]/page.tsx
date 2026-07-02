import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { ProductsSidebar } from "@/components/products/products-sidebar"
import { ProductCard } from "@/components/products/product-card"
import { StaggerGroup, Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import {
  fetchCategories,
  fetchProducts,
  findCategory,
  filterProductsByCategory,
} from "@/lib/products-db"

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const cats = await fetchCategories()
  return cats.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const cats = await fetchCategories()
  const cat = findCategory(cats, category)
  if (!cat) return {}
  return {
    title: cat.name,
    description: cat.blurb,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const [categories, products] = await Promise.all([fetchCategories(), fetchProducts()])
  const cat = findCategory(categories, category)
  if (!cat) notFound()

  const items = filterProductsByCategory(products, category)

  return (
    <>
      <PageHero
        title={cat.name}
        description={cat.blurb}
        image={cat.image}
        crumbs={[{ label: "Products", href: "/products" }, { label: cat.shortName }]}
      />

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[300px_1fr]">
          <ProductsSidebar activeCategory={category} categories={categories} products={products} />

          <div>
            <Reveal>
              <div className="rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{cat.material}</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-foreground">Key advantages</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {cat.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm font-medium text-foreground">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <h3 className="mt-10 font-display text-xl font-bold text-foreground">
              {cat.shortName} Series ({items.length})
            </h3>
            <StaggerGroup className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </StaggerGroup>

            <Reveal>
              <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl bg-primary p-8 text-center sm:flex-row sm:text-left">
                <div>
                  <h3 className="font-display text-xl font-bold text-primary-foreground">
                    Need a custom {cat.shortName.toLowerCase()} solution?
                  </h3>
                  <p className="mt-1 text-sm text-primary-foreground/75">
                    Send your drawings and we&apos;ll tailor the right system for your project.
                  </p>
                </div>
                <Button asChild size="lg" className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/contact">
                    Request a Quote
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
