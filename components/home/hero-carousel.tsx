"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image: "/images/products/aluminum-casement-window/01.webp",
    eyebrow: "Aluminum Doors & Windows Manufacturer",
    title: "Engineering daylight, security and comfort",
    text: "6063-T5 aluminum casement, sliding and louver windows plus aluminum doors — designed, manufactured and installed under one roof in Shanghai.",
    primary: { label: "Explore Products", href: "/products" },
    secondary: { label: "Request a Quote", href: "/contact" },
  },
  {
    image: "/images/hero-manufacturing.png",
    eyebrow: "In-house Production Base",
    title: "Precision fabrication you can rely on",
    text: "A 12,000㎡ production base with CNC machining and strict QC delivers consistent quality at scale, project after project.",
    primary: { label: "About Our Factory", href: "/about" },
    secondary: { label: "Get a Quote", href: "/contact" },
  },
  {
    image: "/images/hero-installation.png",
    eyebrow: "One-stop Engineering Service",
    title: "From drawing to installation",
    text: "R&D, custom production, sales, delivery and on-site installation — a complete solution for residential, commercial and industrial projects.",
    primary: { label: "Our Services", href: "/about" },
    secondary: { label: "Contact Us", href: "/contact" },
  },
]

export function HeroCarousel() {
  const [index, setIndex] = useState(0)

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    const id = setInterval(next, 6500)
    return () => clearInterval(id)
  }, [next])

  const slide = slides[index]

  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden bg-primary">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1 }, scale: { duration: 7, ease: "linear" } }}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
                {slide.eyebrow}
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-primary-foreground text-balance sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
                {slide.text}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href={slide.primary.href}>
                    {slide.primary.label}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href={slide.secondary.href}>{slide.secondary.label}</Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-2 rounded-full bg-primary-foreground/40 transition-all"
              style={{ width: i === index ? 28 : 8, backgroundColor: i === index ? "var(--accent)" : undefined }}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}
