import { getSupabaseClient, getTenantId } from "@/lib/supabase"
import {
  categories as staticCategories,
  products as staticProducts,
  type Category,
  type Product,
} from "@/lib/products"

function readObj(v: unknown): Record<string, unknown> {
  return !v || typeof v !== "object" || Array.isArray(v) ? {} : (v as Record<string, unknown>)
}

function readStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []
}

function readSpecs(v: unknown): { label: string; value: string }[] {
  // extra_data.specifications can be either an array of {label,value} or a plain object map
  if (Array.isArray(v)) {
    return v
      .map((x) => {
        const o = readObj(x)
        return { label: String(o.label ?? ""), value: String(o.value ?? "") }
      })
      .filter((x) => x.label)
  }
  const obj = readObj(v)
  return Object.entries(obj).map(([label, value]) => ({ label, value: String(value ?? "") }))
}

export async function fetchCategories(): Promise<Category[]> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return staticCategories

  const { data, error } = await supabase
    .from("product_categories")
    .select("slug, name, name_i18n, extra_data, sort_order")
    .eq("tenant_id", tenantId)
    .eq("is_active", true)
    .is("parent_id", null)
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("[products-db] fetchCategories:", error.message)
    return staticCategories
  }

  if (!data || data.length === 0) return staticCategories

  return data.map((row) => {
    const extra = readObj(row.extra_data)
    const fallback = staticCategories.find((c) => c.slug === row.slug)
    return {
      slug: String(row.slug ?? ""),
      name: String(row.name ?? fallback?.name ?? ""),
      shortName: String(extra.shortName ?? fallback?.shortName ?? row.name ?? ""),
      image: String(extra.image ?? fallback?.image ?? "/placeholder.svg"),
      blurb: String(extra.blurb ?? fallback?.blurb ?? ""),
      material: String(extra.material ?? fallback?.material ?? ""),
      highlights: readStringArray(extra.highlights).length
        ? readStringArray(extra.highlights)
        : fallback?.highlights ?? [],
    }
  })
}

export async function fetchProducts(): Promise<Product[]> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return staticProducts

  const { data, error } = await supabase
    .from("products")
    .select("slug, name, image_url, category_slug, description, extra_data, sort_order")
    .eq("tenant_id", tenantId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("[products-db] fetchProducts:", error.message)
    return staticProducts
  }

  if (!data || data.length === 0) return staticProducts

  return data.map((row) => {
    const extra = readObj(row.extra_data)
    const fallback = staticProducts.find((p) => p.slug === row.slug)
    const cover = String(row.image_url ?? fallback?.image ?? "/placeholder.svg")
    const gallery = readStringArray(extra.gallery)
    return {
      slug: String(row.slug ?? ""),
      name: String(row.name ?? fallback?.name ?? ""),
      category: String(row.category_slug ?? fallback?.category ?? ""),
      image: cover,
      images: gallery.length > 0 ? gallery : fallback?.images ?? [cover],
      series: typeof extra.series === "string" ? extra.series : fallback?.series,
      material: String(extra.material ?? fallback?.material ?? ""),
      tagline: String(extra.tagline ?? fallback?.tagline ?? ""),
      description: String(row.description ?? fallback?.description ?? ""),
      applications: readStringArray(extra.applications).length
        ? readStringArray(extra.applications)
        : fallback?.applications ?? [],
      features: readStringArray(extra.features).length
        ? readStringArray(extra.features)
        : fallback?.features ?? [],
      specs: (() => {
        const s = readSpecs(extra.specifications)
        return s.length > 0 ? s : fallback?.specs ?? []
      })(),
    }
  })
}

export function findCategory(list: Category[], slug: string): Category | undefined {
  return list.find((c) => c.slug === slug)
}

export function findProduct(list: Product[], slug: string): Product | undefined {
  return list.find((p) => p.slug === slug)
}

export function filterProductsByCategory(list: Product[], catSlug: string): Product[] {
  return list.filter((p) => p.category === catSlug)
}
