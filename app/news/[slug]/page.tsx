import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CalendarDays } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { getArticleBySlug, getArticleSummariesByIds } from "@/lib/articles-db"

export const revalidate = 60
export const dynamicParams = true

// Article content is rich-text HTML edited in huanqiu-admin; kept as-is on the frontend.
// Admin sanitizes on write; if that assumption changes, add DOMPurify here.

function formatDate(iso: string | null): string {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ""
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt || undefined,
    keywords: article.seo_keywords || undefined,
    openGraph: article.featured_image ? { images: [{ url: article.featured_image }] } : undefined,
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const related = article.related_article_ids.length
    ? await getArticleSummariesByIds(article.related_article_ids)
    : []

  return (
    <>
      <PageHero
        title={article.title}
        description={article.excerpt || undefined}
        image={article.featured_image || "/images/factory.png"}
        crumbs={[{ label: "News", href: "/news" }, { label: article.title }]}
      />

      <article className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-accent" />
              <span>{formatDate(article.published_at ?? article.created_at)}</span>
            </div>

            {article.featured_image && (
              <div className="mt-6 relative aspect-[16/9] overflow-hidden rounded-2xl bg-secondary">
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 768px"
                  priority
                />
              </div>
            )}

            {article.content ? (
              <div
                className="article-content mt-8 text-base leading-relaxed text-foreground/90 [&_h1]:mt-8 [&_h1]:font-display [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-foreground [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-foreground [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-2 [&_a]:text-accent [&_a]:underline [&_img]:mt-6 [&_img]:rounded-xl [&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_code]:rounded [&_code]:bg-secondary [&_code]:px-1 [&_code]:py-0.5"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <p className="mt-8 text-muted-foreground">This article has no content yet.</p>
            )}
          </Reveal>

          <Reveal>
            <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-2xl bg-primary p-8 text-center sm:flex-row sm:text-left">
              <div>
                <h3 className="font-display text-xl font-bold text-primary-foreground">
                  Interested in our products?
                </h3>
                <p className="mt-1 text-sm text-primary-foreground/75">
                  Send your project drawings and we&apos;ll tailor the right aluminum system for you.
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

        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-6xl px-6">
            <h2 className="font-display text-2xl font-bold text-foreground">Related articles</h2>
            <StaggerGroup className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <StaggerItem key={r.id}>
                  <Link
                    href={`/news/${r.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                      {r.featured_image && (
                        <Image
                          src={r.featured_image}
                          alt={r.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-lg font-bold text-foreground line-clamp-2">{r.title}</h3>
                      {r.excerpt && (
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {r.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        )}
      </article>
    </>
  )
}
