"use client"

import { motion } from "framer-motion"
import { stats } from "@/lib/site"
import { CountUp } from "@/components/motion/count-up"

export function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-primary py-16">
      <div className="absolute inset-0 steel-sheen opacity-[0.06]" aria-hidden />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <CountUp
                value={stat.value}
                className="block font-display text-3xl font-extrabold text-accent sm:text-4xl"
              />
              <p className="mt-2 text-sm font-medium text-primary-foreground/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
