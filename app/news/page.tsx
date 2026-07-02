import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, CalendarDays } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal"
import { listPublishedArticles } from "@/lib/articles-db"

export const revalidate = 60

export const metadata: Metadata = {
  title: "News & Insights",
  description:
    "Product launches, factory tours and industry insights from XIAOZI — Shanghai Xiaozi Metal Doors & Windows.",
}

function formatDate(iso: string | null): string {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ""
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

export default async function NewsListPage() {
  const articles = await listPublishedArticles(50)

  return (
    <>
      <PageHero
        title="News & Insights"
        description="Product launches, factory milestones and industry knowledge from XIAOZI."
        image="/images/factory.png"
        crumbs={[{ label: "News" }]}
      />

      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          {articles.length === 0 ? (
            <Reveal>
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <h2 className="font-display text-xl font-bold text-foreground">No articles yet</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Check back soon — we&apos;re preparing our first stories.
                </p>
              </div>
            </Reveal>
          ) : (
            <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <StaggerItem key={a.id}>
                  <Link
                    href={`/news/${a.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                      {a.featured_image ? (
                        <Image
                          src={a.featured_image}
                          alt={a.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          <span className="text-xs uppercase tracking-wide">XIAOZI</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5 text-accent" />
                        <span>{formatDate(a.published_at ?? a.created_at)}</span>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-bold text-foreground line-clamp-2">{a.title}</h3>
                      {a.excerpt && (
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {a.excerpt}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                        Read article
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>
    </>
  )
}
