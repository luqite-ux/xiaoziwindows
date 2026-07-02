import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { site } from "@/lib/site"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-24">
      <Image
        src="/images/hero-manufacturing.png"
        alt=""
        fill
        className="object-cover opacity-20"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-primary/70" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-primary-foreground text-balance sm:text-4xl">
            Ready to start your doors & windows project?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/75">
            Send us your drawings or requirements and our team will recommend the right system and provide a detailed
            quotation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">
                Request a Quote
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                <Phone className="mr-1 h-4 w-4" />
                <span className="notranslate">{site.phone}</span>
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
