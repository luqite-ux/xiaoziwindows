"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Cog } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

type Equipment = {
  src: string
  name: string
  desc: string
}

const equipment: Equipment[] = [
  {
    src: "/images/equipment/double-head-precision-cutting-saw.webp",
    name: "Double-Head Precision Cutting Saw",
    desc: "Cuts aluminum profiles to length at exact 45° and 90° angles for tight, gap-free joints.",
  },
  {
    src: "/images/equipment/aluminum-window-corner-crimping-machine.webp",
    name: "Corner Crimping Machine",
    desc: "Mechanically crimps window and door corners for high-strength, weather-tight frames.",
  },
  {
    src: "/images/equipment/hydraulic-punching-machine-for-aluminum.webp",
    name: "Hydraulic Punching Machine",
    desc: "Punches drainage slots, lock holes and hardware cut-outs with repeatable accuracy.",
  },
  {
    src: "/images/equipment/aluminum-profile-end-milling-machine.webp",
    name: "End Milling Machine",
    desc: "Mills profile ends for mullion and transom connections on multi-pane assemblies.",
  },
  {
    src: "/images/equipment/single-axis-copy-routing-machine.webp",
    name: "Copy Routing Machine",
    desc: "Routes handle and lock recesses precisely along the profile face.",
  },
  {
    src: "/images/equipment/bench-drill-press.webp",
    name: "Bench Drill Press",
    desc: "Drills pilot and fixing holes for hinges, brackets and hardware fittings.",
  },
]

export function EquipmentShowcase() {
  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Production Equipment"
          title="An in-house line built for precision"
          description="From cutting to crimping, every aluminum window and door is fabricated on dedicated machinery — giving us full control over tolerances, quality and lead times."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-5">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent">
                    <Cog className="h-4 w-4" />
                  </span>
                  <h3 className="text-pretty text-base font-semibold leading-snug text-foreground">{item.name}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
