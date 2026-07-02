"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: any
  }
}

// Loads the Google Translate widget once (hidden) so our custom language
// switcher can drive it via the `googtrans` cookie + select element.
export function GoogleTranslate() {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return
      // eslint-disable-next-line no-new
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,zh-CN,es,fr,de,ru,ar,pt,ja,ko,it,tr,vi,th,id",
          autoDisplay: false,
        },
        "google_translate_element",
      )
    }

    const script = document.createElement("script")
    script.id = "google-translate-script"
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    script.async = true
    document.body.appendChild(script)
  }, [])

  return <div id="google_translate_element" aria-hidden="true" />
}
