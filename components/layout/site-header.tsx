"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { navLinks, site } from "@/lib/site"
import { categories, getProductsByCategory } from "@/lib/products"
import { LanguageSwitcher } from "@/components/i18n/language-switcher"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      {/* Top contact bar */}
      <div className="hidden bg-primary text-primary-foreground lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <p className="text-primary-foreground/80">{site.address}</p>
          <div className="flex items-center gap-4">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-accent">
              <Phone className="h-3.5 w-3.5" />
              <span className="notranslate">{site.phone}</span>
            </a>
            <span className="text-primary-foreground/30">|</span>
            <a href={`mailto:${site.email}`} className="hover:text-accent notranslate">
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          scrolled
            ? "border-border bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80"
            : "border-transparent bg-background",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={site.name}>
            <Image
              src="/xiaozi-logo.webp"
              alt={`${site.name} ${site.tagline}`}
              width={120}
              height={120}
              className="h-11 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
              if (link.href === "/products") {
                return (
                  <div
                    key={link.href}
                    className="group relative"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <Link
                      href="/products"
                      className={cn(
                        "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        active ? "text-accent" : "text-foreground/80 hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                    <MegaMenu open={productsOpen} />
                  </div>
                )
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-accent" : "text-foreground/80 hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <LanguageSwitcherWrapper />
            </div>
            <Button asChild className="hidden bg-accent text-accent-foreground hover:bg-accent/90 sm:inline-flex">
              <Link href="/contact">Get a Quote</Link>
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} pathname={pathname} />
    </>
  )
}

function LanguageSwitcherWrapper() {
  // The switcher styles assume a dark background; wrap with a neutral chip on light header.
  return (
    <div className="rounded-md bg-primary [&_*]:text-primary-foreground/90">
      <LanguageSwitcher />
    </div>
  )
}

function MegaMenu({ open }: { open: boolean }) {
  return (
    <div
      className={cn(
        "absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3 transition-all duration-200",
        open ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1",
      )}
    >
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl">
        <div className="grid grid-cols-2 gap-3 p-4">
          {categories.map((cat) => (
            <div key={cat.slug} className="rounded-lg p-2">
              <Link
                href={`/products/${cat.slug}`}
                className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-secondary">
                  <Image src={cat.image || "/placeholder.svg"} alt={cat.shortName} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    {cat.shortName}
                    <ChevronRight className="h-3.5 w-3.5 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{cat.material}</p>
                </div>
              </Link>
              <ul className="mt-1 space-y-0.5 border-l border-border pl-3 ml-4">
                {getProductsByCategory(cat.slug).map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${cat.slug}/${p.slug}`}
                      className="block rounded px-2 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link
          href="/products"
          className="flex items-center justify-between border-t border-border bg-secondary/50 px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary"
        >
          View all product categories
          <ChevronRight className="h-4 w-4 text-accent" />
        </Link>
      </div>
    </div>
  )
}

function MobileNav({ open, pathname }: { open: boolean; pathname: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 top-[var(--header-h,0)] z-40 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-foreground/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <nav
        className={cn(
          "absolute right-0 top-0 h-full w-[82%] max-w-sm overflow-y-auto bg-background shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col gap-1 p-5 pt-20">
          {navLinks.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  active ? "bg-secondary text-accent" : "text-foreground hover:bg-secondary",
                )}
              >
                {link.label}
              </Link>
            )
          })}

          <div className="mt-2 border-t border-border pt-3">
            <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Product Categories
            </p>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-foreground/80 hover:bg-secondary"
              >
                <ChevronRight className="h-4 w-4 text-accent" />
                {cat.shortName}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
            <div className="rounded-md bg-primary px-1 py-1 [&_*]:text-primary-foreground/90">
              <LanguageSwitcher />
            </div>
            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">Get a Quote</Link>
            </Button>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 text-sm font-medium text-foreground"
            >
              <Phone className="h-4 w-4 text-accent" />
              <span className="notranslate">{site.phone}</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}
