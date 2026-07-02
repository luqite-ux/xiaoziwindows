import Image from "next/image"
import { Factory, ShieldCheck, Settings2, Truck, Ruler, Headphones } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { StaggerGroup, StaggerItem, Reveal } from "@/components/motion/reveal"

const features = [
  {
    icon: Factory,
    title: "In-house Manufacturing",
    text: "A 12,000㎡ production base with CNC equipment gives us full control over quality and lead times.",
  },
  {
    icon: Ruler,
    title: "Full Customization",
    text: "Sizes, colors, glazing, hardware and series tailored precisely to your drawings and specifications.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Compliance",
    text: "Premium base materials and strict QC across every batch for consistent, reliable performance.",
  },
  {
    icon: Settings2,
    title: "One-stop Engineering",
    text: "R&D, production, sales and installation handled in-house — a single accountable partner.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    text: "Export-ready packaging and dependable logistics keep your project on schedule.",
  },
  {
    icon: Headphones,
    title: "Responsive Support",
    text: "A dedicated team supports you from inquiry and quotation through after-sales service.",
  },
]

export function WhyUs() {
  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-lg">
              <Image
                src="/images/factory.png"
                alt="XIAOZI metal doors and windows production base"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Why XIAOZI"
              title="A manufacturing partner built for demanding projects"
              description="We combine engineering capability, full customization and a complete in-house service chain so you get the right product, on time, every time."
            />
          </div>
        </div>

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-accent">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
