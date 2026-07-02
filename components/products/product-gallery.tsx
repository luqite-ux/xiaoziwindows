"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)
  const pics = images.length ? images : ["/placeholder.svg"]

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-border bg-secondary shadow-sm">
        <div className="relative aspect-[4/3]">
          <Image
            src={pics[active] || "/placeholder.svg"}
            alt={alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      {pics.length > 1 && (
        <div className="mt-4 flex gap-3">
          {pics.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${alt} view ${i + 1}`}
              className={cn(
                "relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                active === i ? "border-accent" : "border-border hover:border-muted-foreground",
              )}
            >
              <Image src={src || "/placeholder.svg"} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
