import { getSupabaseClient, getTenantId } from "@/lib/supabase"

export interface ArticleSummary {
  id: string
  slug: string
  title: string
  excerpt: string
  featured_image: string | null
  published_at: string | null
  created_at: string
}

export interface ArticleFull extends ArticleSummary {
  content: string
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
  related_article_ids: string[]
}

type I18n = Record<string, unknown> | null

function pickI18nString(field: I18n, preferred = "en"): string {
  if (!field || typeof field !== "object") return ""
  const obj = field as Record<string, unknown>
  if (typeof obj[preferred] === "string" && obj[preferred]) return obj[preferred] as string
  if (typeof obj.en === "string" && obj.en) return obj.en as string
  if (typeof obj.zh === "string" && obj.zh) return obj.zh as string
  for (const v of Object.values(obj)) {
    if (typeof v === "string" && v) return v
  }
  return ""
}

function siteLang(): string {
  return process.env.NEXT_PUBLIC_DEFAULT_LANG ?? "en"
}

function parseRelatedIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  const out: string[] = []
  const seen = new Set<string>()
  for (const x of raw) {
    if (typeof x !== "string" || !x) continue
    if (seen.has(x)) continue
    seen.add(x)
    out.push(x)
    if (out.length >= 8) break
  }
  return out
}

export async function listPublishedArticles(limit = 50): Promise<ArticleSummary[]> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return []

  const { data, error } = await supabase
    .from("articles")
    .select("id, slug, title, title_i18n, excerpt, excerpt_i18n, featured_image, published_at, created_at")
    .eq("tenant_id", tenantId)
    .eq("is_published", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("[articles-db] listPublishedArticles failed:", error.message)
    return []
  }

  const lang = siteLang()
  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: pickI18nString(row.title_i18n as I18n, lang) || row.title || "(Untitled)",
    excerpt: pickI18nString(row.excerpt_i18n as I18n, lang) || row.excerpt || "",
    featured_image: row.featured_image ?? null,
    published_at: row.published_at,
    created_at: row.created_at,
  }))
}

function pickArticleContent(row: {
  content_i18n: I18n
  content: string | null
  content_en: string | null
}): string {
  const lang = siteLang()
  const fromI18n = pickI18nString(row.content_i18n as I18n, lang).trim()
  if (fromI18n) return fromI18n
  const zh = typeof row.content === "string" ? row.content.trim() : ""
  const en = typeof row.content_en === "string" ? row.content_en.trim() : ""
  if (lang === "en") return en || zh
  return zh || en
}

export async function getArticleBySlug(slug: string): Promise<ArticleFull | null> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return null

  const { data, error } = await supabase
    .from("articles")
    .select(
      "id, slug, title, title_i18n, excerpt, excerpt_i18n, content, content_en, content_i18n, featured_image, published_at, created_at, seo_title, seo_description, seo_keywords, related_article_ids"
    )
    .eq("tenant_id", tenantId)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle()

  if (error) {
    console.error("[articles-db] getArticleBySlug failed:", error.message)
    return null
  }
  if (!data) return null

  const lang = siteLang()
  return {
    id: data.id,
    slug: data.slug,
    title: pickI18nString(data.title_i18n as I18n, lang) || data.title || "(Untitled)",
    excerpt: pickI18nString(data.excerpt_i18n as I18n, lang) || data.excerpt || "",
    content: pickArticleContent(data),
    featured_image: data.featured_image ?? null,
    published_at: data.published_at,
    created_at: data.created_at,
    seo_title: data.seo_title ?? null,
    seo_description: data.seo_description ?? null,
    seo_keywords: data.seo_keywords ?? null,
    related_article_ids: parseRelatedIds(data.related_article_ids),
  }
}

export async function getArticleSummariesByIds(ids: string[]): Promise<ArticleSummary[]> {
  if (!ids.length) return []
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return []

  const { data, error } = await supabase
    .from("articles")
    .select("id, slug, title, title_i18n, excerpt, excerpt_i18n, featured_image, published_at, created_at")
    .eq("tenant_id", tenantId)
    .eq("is_published", true)
    .in("id", ids)

  if (error) {
    console.error("[articles-db] getArticleSummariesByIds failed:", error.message)
    return []
  }

  const lang = siteLang()
  const byId = new Map(
    (data ?? []).map((row) => [
      row.id,
      {
        id: row.id,
        slug: row.slug,
        title: pickI18nString(row.title_i18n as I18n, lang) || row.title || "(Untitled)",
        excerpt: pickI18nString(row.excerpt_i18n as I18n, lang) || row.excerpt || "",
        featured_image: row.featured_image ?? null,
        published_at: row.published_at,
        created_at: row.created_at,
      } satisfies ArticleSummary,
    ]),
  )

  return ids.map((id) => byId.get(id)).filter((x): x is ArticleSummary => Boolean(x))
}
