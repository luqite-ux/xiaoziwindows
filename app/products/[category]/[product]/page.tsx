import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Check, ArrowRight, Building2, Layers } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { ProductCard } from "@/components/products/product-card"
import { ProductGallery } from "@/components/products/product-gallery"
import { Reveal, StaggerGroup } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import {
  fetchCategories,
  fetchProducts,
  findCategory,
  findProduct,
  filterProductsByCategory,
} from "@/lib/products-db"
import { site } from "@/lib/site"

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const prods = await fetchProducts()
  return prods.map((p) => ({ category: p.category, product: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}): Promise<Metadata> {
  const { product } = await params
  const prods = await fetchProducts()
  const p = findProduct(prods, product)
  if (!p) return {}
  return {
    title: p.name,
    description: p.description,
    openGraph: { images: [{ url: p.image }] },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}) {
  const { category, product } = await params
  const [categories, products] = await Promise.all([fetchCategories(), fetchProducts()])
  const p = findProduct(products, product)
  const cat = findCategory(categories, category)
  if (!p || !cat || p.category !== category) notFound()

  const related = filterProductsByCategory(products, category).filter((r) => r.slug !== p.slug).slice(0, 3)

  return (
    <>
      <PageHero
        title={p.name}
        description={p.tagline}
        image={p.image}
        crumbs={[
          { label: "Products", href: "/products" },
          { label: cat.shortName, href: `/products/${cat.slug}` },
          { label: p.name },
        ]}
      />

      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <ProductGallery images={p.images} alt={p.name} />
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                    <Layers className="h-3.5 w-3.5 text-accent" />
                    {p.material}
                  </span>
                  {p.series && (
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      {p.series}
                    </span>
                  )}
                </div>
                <h2 className="mt-4 font-display text-3xl font-bold text-foreground">{p.name}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{p.description}</p>

                <h3 className="mt-8 font-display text-lg font-bold text-foreground">Key features</h3>
                <ul className="mt-4 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/contact">
                      Request a Quote
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="notranslate">
                      {site.phone}
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Specifications */}
          <Reveal>
            <div className="mt-14 overflow-hidden rounded-2xl border border-border">
              <div className="flex items-center gap-2 bg-primary px-6 py-4 text-primary-foreground">
                <Building2 className="h-5 w-5 text-accent" />
                <h3 className="font-display text-lg font-bold">Specifications</h3>
              </div>
              <dl className="divide-y divide-border bg-card sm:grid sm:grid-cols-2 sm:divide-y-0">
                {p.specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex items-center justify-between gap-4 px-6 py-4 sm:border-b sm:border-border ${
                      i % 2 === 0 ? "sm:border-r" : ""
                    }`}
                  >
                    <dt className="text-sm font-medium text-muted-foreground">{spec.label}</dt>
                    <dd className="text-sm font-semibold text-foreground text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Applications */}
          <Reveal>
            <div className="mt-10">
              <h3 className="font-display text-lg font-bold text-foreground">Typical applications</h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {p.applications.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-secondary/40 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-2xl font-bold text-foreground">More from {cat.shortName}</h2>
            <StaggerGroup className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProductCard key={r.slug} product={r} />
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.description,
            image: p.image,
            material: p.material,
            brand: { "@type": "Brand", name: site.name },
            manufacturer: { "@type": "Organization", name: site.legalName },
          }),
        }}
      />
    </>
  )
}
