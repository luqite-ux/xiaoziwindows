"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Package, Boxes, Truck } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const images = [
  "/images/warehouse/01.webp",
  "/images/warehouse/02.webp",
  "/images/warehouse/04.webp",
  "/images/warehouse/05.webp",
  "/images/warehouse/06.webp",
]

const facts = [
  { icon: Boxes, label: "Profile & finished-goods stock kept on hand" },
  { icon: Package, label: "Protective packing for safe ocean freight" },
  { icon: Truck, label: "Organized loading for faster dispatch" },
]

// Bento layout: one large hero image plus four single cells form a clean
// 2-row rectangle on the 4-column grid (no trailing whitespace).
const spans = ["sm:col-span-2 sm:row-span-2", "", "", "", ""]

export function WarehouseGallery() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Warehouse & Capacity"
          title="Stocked, packed and ready to ship"
          description="Our Shanghai warehouse holds raw aluminum profiles and finished window and door frames — enabling stable lead times and carefully protected export packing."
        />

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease: "easeOut" }}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-secondary ${spans[i] ?? ""}`}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`XIAOZI warehouse and inventory ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30" />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </span>
              <p className="text-sm leading-snug text-foreground">{f.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
