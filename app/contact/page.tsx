import type { Metadata } from "next"
import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { RfqForm } from "@/components/contact/rfq-form"
import { Reveal } from "@/components/motion/reveal"
import { site } from "@/lib/site"
import { fetchCategories } from "@/lib/products-db"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description:
    "Contact Shanghai Xiaozi Metal Doors & Windows Co., Ltd. Request a quote, send your drawings, or reach our team in Baoshan District, Shanghai.",
}

const details = [
  { icon: MapPin, label: "Address", value: site.address },
  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Clock, label: "Business hours", value: "Mon – Sat, 9:00 – 18:00 (GMT+8)" },
]

export default async function ContactPage() {
  const categories = await fetchCategories()
  return (
    <>
      <PageHero
        title="Let's build your project together"
        description="Send us your requirements and drawings. Our team responds to every enquiry within one business day."
        image="/images/hero-installation.png"
        crumbs={[{ label: "Contact" }]}
      />

      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1.4fr]">
          {/* Info column */}
          <Reveal>
            <div className="space-y-6">
              <div className="rounded-2xl bg-primary p-7 text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-accent" />
                  <h2 className="font-display text-lg font-bold">{site.legalName}</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">{site.description}</p>
              </div>

              <div className="space-y-3">
                {details.map((d) => (
                  <div key={d.label} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent">
                      <d.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{d.label}</p>
                      {d.href ? (
                        <a
                          href={d.href}
                          className="notranslate mt-0.5 block text-sm font-medium text-foreground hover:text-accent"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm font-medium text-foreground">{d.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form column */}
          <Reveal delay={0.1}>
            <RfqForm categories={categories} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
