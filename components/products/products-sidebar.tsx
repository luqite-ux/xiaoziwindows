"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Package } from "lucide-react"
import { useState } from "react"
import {
  categories as staticCategories,
  products as staticProducts,
  type Category,
  type Product,
} from "@/lib/products"
import { cn } from "@/lib/utils"

type Props = {
  activeCategory?: string
  categories?: Category[]
  products?: Product[]
}

export function ProductsSidebar({ activeCategory, categories, products }: Props) {
  const pathname = usePathname()
  const cats = categories && categories.length > 0 ? categories : staticCategories
  const prods = products && products.length > 0 ? products : staticProducts
  const [open, setOpen] = useState<string | null>(activeCategory ?? cats[0]?.slug ?? null)

  return (
    <aside className="lg:sticky lg:top-28">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border bg-primary px-5 py-4 text-primary-foreground">
          <Package className="h-5 w-5 text-accent" />
          <h2 className="font-display text-base font-bold">Product Categories</h2>
        </div>
        <nav className="p-2">
          {cats.map((cat) => {
            const items = prods.filter((p) => p.category === cat.slug)
            const isOpen = open === cat.slug
            const catActive = activeCategory === cat.slug
            return (
              <div key={cat.slug} className="border-b border-border/60 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : cat.slug)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-md px-3 py-3 text-left text-sm font-semibold transition-colors",
                    catActive ? "text-accent" : "text-foreground hover:bg-secondary",
                  )}
                  aria-expanded={isOpen}
                >
                  <span>{cat.shortName}</span>
                  <ChevronDown
                    className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-0.5 pb-2 pl-3">
                      <li>
                        <Link
                          href={`/products/${cat.slug}`}
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm transition-colors",
                            pathname === `/products/${cat.slug}`
                              ? "bg-secondary font-medium text-accent"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                          )}
                        >
                          All {cat.shortName}
                        </Link>
                      </li>
                      {items.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/products/${cat.slug}/${p.slug}`}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm transition-colors",
                              pathname === `/products/${cat.slug}/${p.slug}`
                                ? "bg-secondary font-medium text-accent"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                            )}
                          >
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
