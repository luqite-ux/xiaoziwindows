import { SectionHeading } from "@/components/section-heading"
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal"

const steps = [
  { num: "01", title: "Inquiry & Consultation", text: "Share your drawings, dimensions and performance requirements with our engineering team." },
  { num: "02", title: "Design & Quotation", text: "We propose the right system and provide a detailed, transparent quotation." },
  { num: "03", title: "Custom Production", text: "Your order is fabricated to spec in our production base under strict quality control." },
  { num: "04", title: "Delivery & Installation", text: "Export-ready packaging, on-time delivery and professional on-site installation." },
]

export function ProcessSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="How We Work"
          title="A clear path from drawing to installation"
          description="Our one-stop process keeps every stage accountable to a single, experienced partner."
        />

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <StaggerItem key={step.num}>
              <div className="relative h-full rounded-xl border border-border bg-card p-6">
                <span className="font-display text-5xl font-extrabold text-secondary">{step.num}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                <div className="absolute right-6 top-7 h-1.5 w-10 rounded-full bg-accent" />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
