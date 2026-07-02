import type { Metadata } from "next"
import Link from "next/link"
import { MessageCircleQuestion, ArrowRight } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/motion/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { faqGroups } from "@/lib/faq"

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about XIAOZI metal doors & windows — products, specifications, MOQ, pricing, samples, production lead time and quality control.",
}

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently asked questions"
        description="Answers to common questions about our products, ordering, samples, lead times and quality. Can't find what you need? Get in touch."
        image="/images/hero-finished.png"
        crumbs={[{ label: "FAQ" }]}
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-12">
            {faqGroups.map((group, gi) => (
              <Reveal key={group.title} delay={gi * 0.03}>
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-accent">
                      <MessageCircleQuestion className="h-5 w-5" />
                    </span>
                    <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">{group.title}</h2>
                  </div>
                  <Accordion type="single" collapsible className="overflow-hidden rounded-xl border border-border bg-card">
                    {group.items.map((item, i) => (
                      <AccordionItem
                        key={item.q}
                        value={`${gi}-${i}`}
                        className="border-border px-5 last:border-b-0"
                      >
                        <AccordionTrigger className="text-left font-display text-base font-semibold text-foreground hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 rounded-2xl border border-border bg-secondary/50 p-8 text-center sm:p-10">
              <h3 className="font-display text-2xl font-bold text-foreground">Still have questions?</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Our team is ready to help with specifications, customization, pricing and lead times for your project.
              </p>
              <Button asChild size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/contact">
                  Contact Our Team
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqGroups.flatMap((g) =>
              g.items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            ),
          }),
        }}
      />
    </>
  )
}
