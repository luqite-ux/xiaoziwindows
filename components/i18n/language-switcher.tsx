"use client"

import { useEffect, useState } from "react"
import { Globe, Check, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "zh-CN", label: "简体中文" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "ru", label: "Русский" },
  { code: "ar", label: "العربية" },
  { code: "pt", label: "Português" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "it", label: "Italiano" },
  { code: "tr", label: "Türkçe" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "th", label: "ไทย" },
  { code: "id", label: "Bahasa Indonesia" },
]

function readCurrentLang(): string {
  if (typeof document === "undefined") return "en"
  const match = document.cookie.match(/googtrans=\/[^/]*\/([^;]+)/)
  return match ? decodeURIComponent(match[1]) : "en"
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const [current, setCurrent] = useState("en")

  useEffect(() => {
    setCurrent(readCurrentLang())
  }, [])

  const setLanguage = (code: string) => {
    // Persist the choice via the googtrans cookie so it survives navigation.
    const host = window.location.hostname
    const domains = ["", host, `.${host}`]
    for (const d of domains) {
      document.cookie = `googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${d ? `;domain=${d}` : ""}`
    }
    if (code !== "en") {
      const value = `/en/${code}`
      for (const d of domains) {
        document.cookie = `googtrans=${value};path=/${d ? `;domain=${d}` : ""}`
      }
    }
    setCurrent(code)

    // Drive the Google Translate <select> directly for an instant, reload-free
    // translation. Retry briefly in case the hidden widget is still loading.
    let attempts = 0
    const apply = () => {
      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo")
      if (combo) {
        combo.value = code === "en" ? "" : code
        combo.dispatchEvent(new Event("change"))
        // Restoring to English needs a reload to fully undo the DOM rewrite.
        if (code === "en") window.location.reload()
        return
      }
      if (attempts++ < 20) {
        setTimeout(apply, 250)
      } else {
        // Widget never appeared — fall back to a reload (cookie is already set).
        window.location.reload()
      }
    }
    apply()
  }

  const activeLabel = LANGUAGES.find((l) => l.code === current)?.label ?? "English"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-primary-foreground/90 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          className,
        )}
        aria-label="Select language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline notranslate">{activeLabel}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-80 w-48 overflow-y-auto">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onSelect={() => setLanguage(lang.code)}
            className="notranslate flex items-center justify-between"
          >
            <span>{lang.label}</span>
            {current === lang.code && <Check className="h-4 w-4 text-accent" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
