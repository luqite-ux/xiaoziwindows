"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

type CountUpProps = {
  /** Full display string, e.g. "12,000㎡", "150,000㎡+", "98%+", "7" */
  value: string
  /** Animation duration in ms */
  duration?: number
  className?: string
}

/**
 * Parses a stat string into a leading prefix, the numeric portion (which gets
 * animated from 0 on scroll-into-view) and a trailing suffix, then renders the
 * number with thousands separators while counting up.
 */
export function CountUp({ value, duration = 2000, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [display, setDisplay] = useState(0)

  // Split the string into: prefix · number · suffix
  const match = value.match(/([^\d]*)([\d,]+(?:\.\d+)?)(.*)/s)
  const prefix = match?.[1] ?? ""
  const numericStr = match?.[2] ?? ""
  const suffix = match?.[3] ?? ""
  const target = Number.parseFloat(numericStr.replace(/,/g, ""))
  const hasNumber = !Number.isNaN(target)
  const useGrouping = numericStr.includes(",")
  const decimals = numericStr.includes(".") ? numericStr.split(".")[1].length : 0

  useEffect(() => {
    if (!inView || !hasNumber) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutExpo for a snappy, decelerating count
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(target * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
      else setDisplay(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, hasNumber, target, duration])

  if (!hasNumber) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
