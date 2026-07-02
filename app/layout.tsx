import type React from "react"
import type { Metadata, Viewport } from "next"
import { Manrope, Inter } from "next/font/google"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { GoogleTranslate } from "@/components/i18n/google-translate"
import { site } from "@/lib/site"
import { fetchCategories, fetchProducts } from "@/lib/products-db"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "aluminum windows",
    "aluminum doors",
    "aluminum casement window",
    "aluminum sliding window",
    "aluminum louver window",
    "aluminum casement door",
    "6063-T5 aluminum",
    "China windows manufacturer",
    "Shanghai doors and windows",
    "OEM windows factory",
    "window door supplier",
    site.name,
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  icons: {
    icon: "/xiaozi-favicon.webp",
    apple: "/xiaozi-favicon.webp",
  },
  openGraph: {
    type: "website",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    siteName: site.name,
    images: [{ url: "/images/hero-finished.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/images/hero-finished.png"],
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#1b2a4a",
  width: "device-width",
  initialScale: 1,
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [categories, products] = await Promise.all([fetchCategories(), fetchProducts()])

  return (
    <html lang="en" className={`bg-background ${manrope.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <GoogleTranslate />
        </Suspense>
        <SiteHeader categories={categories} products={products} />
        <main className="min-h-screen">{children}</main>
        <SiteFooter categories={categories} />
        <Analytics />
      </body>
    </html>
  )
}
