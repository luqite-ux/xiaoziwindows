import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react"
import { navLinks, site } from "@/lib/site"
import { categories } from "@/lib/products"

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="inline-flex rounded-lg bg-white px-3 py-2">
              <Image
                src="/xiaozi-logo.webp"
                alt={`${site.name} ${site.tagline}`}
                width={120}
                height={120}
                className="h-12 w-auto"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
              Manufacturer of 6063-T5 aluminum alloy windows and doors — casement, sliding and louver windows plus
              aluminum casement doors for residential, commercial and industrial projects worldwide.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground">Products</h3>
            <ul className="mt-4 space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="flex items-center gap-1 text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                    {cat.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground">Contact</h3>
            <ul className="mt-4 space-y-3.5 text-sm text-primary-foreground/70">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{site.address}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-accent notranslate">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${site.email}`} className="hover:text-accent notranslate">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-primary-foreground/60 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} <span className="notranslate">{site.legalName}</span>. All rights
            reserved.
          </p>
          <p>Established {site.founded} · Baoshan District, Shanghai</p>
        </div>
      </div>
    </footer>
  )
}
