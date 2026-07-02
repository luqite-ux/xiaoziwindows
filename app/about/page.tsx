import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Building2, Target, Gem, ArrowRight, CheckCircle2 } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal"
import { StatsBand } from "@/components/home/stats-band"
import { EquipmentShowcase } from "@/components/about/equipment-showcase"
import { WarehouseGallery } from "@/components/about/warehouse-gallery"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Shanghai Xiaozi Metal Doors & Windows Co., Ltd. — a one-stop manufacturer of 6063-T5 aluminum alloy windows and doors based in Baoshan District, Shanghai.",
}

const industries = [
  "Residential housing",
  "Commercial buildings",
  "Hotels & hospitality",
  "Hospitals & healthcare",
  "Factories & warehouses",
  "Schools & institutions",
  "Coastal & marine projects",
]

const values = [
  {
    icon: Target,
    title: "Quality First",
    text: "Premium base materials and disciplined quality control on every order ensure dependable, long-lasting products.",
  },
  {
    icon: Gem,
    title: "Customer Focus",
    text: "We listen, advise and tailor every solution to the real needs of each project and client.",
  },
  {
    icon: Building2,
    title: "Integrity & Reliability",
    text: "On-time delivery and transparent communication build the long-term partnerships we value.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="One partner for metal doors & windows"
        description="From R&D and custom production to delivery and installation, XIAOZI delivers complete door & window solutions under one roof."
        image="/images/factory.png"
        crumbs={[{ label: "About" }]}
      />

      {/* Company profile */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-lg">
                <Image
                  src="/images/hero-manufacturing.png"
                  alt="XIAOZI production base in Shanghai"
                  width={800}
                  height={640}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading
                align="left"
                eyebrow="Company Profile"
                title="Shanghai Xiaozi Metal Doors & Windows Co., Ltd."
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Established in {site.founded}, XIAOZI is a professional manufacturer specializing in 6063-T5 aluminum
                  alloy windows and doors — casement, sliding and louver windows plus aluminum casement doors. We operate
                  an integrated business covering research & development, custom production, sales, delivery and on-site
                  installation.
                </p>
                <p>
                  Headquartered in Baoshan District, Shanghai, our production base is equipped for precision fabrication
                  at scale, serving residential, commercial and industrial projects across China and overseas markets.
                </p>
                <p>
                  With a registered capital of {site.registeredCapital}, we are committed to delivering products that
                  balance performance, durability and value — backed by responsive, professional service.
                </p>
              </div>
              <Button asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/contact">
                  Work With Us
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <StatsBand />

      {/* Production equipment */}
      <EquipmentShowcase />

      {/* Warehouse & capacity */}
      <WarehouseGallery />

      {/* Mission / Vision */}
      <section className="bg-secondary/40 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Built on quality, service and integrity"
            description="Our values guide every quotation, every production run and every installation."
          />
          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-accent">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Industries served */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Markets We Serve"
                title="Trusted across diverse industries"
                description="Our door and window systems are specified for projects of every scale and environment."
              />
              <StaggerGroup className="mt-8 grid gap-3 sm:grid-cols-2">
                {industries.map((ind) => (
                  <StaggerItem key={ind}>
                    <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm font-medium text-foreground">{ind}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-lg">
                <Image
                  src="/images/hero-installation.png"
                  alt="Installation of XIAOZI metal windows on a construction site"
                  width={800}
                  height={640}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
