"use server"

import { submitInquiry } from "@/lib/submit-inquiry"

export type RfqState = {
  status: "idle" | "success" | "error"
  message: string
  errors?: Record<string, string>
}

const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10MB

export async function submitRfq(_prev: RfqState, formData: FormData): Promise<RfqState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const company = String(formData.get("company") ?? "").trim()
  const category = String(formData.get("category") ?? "").trim()
  const quantity = String(formData.get("quantity") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()
  const drawing = formData.get("drawing") as File | null

  const errors: Record<string, string> = {}

  if (name.length < 2) errors.name = "Please enter your name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address."
  if (message.length < 10) errors.message = "Please tell us a little more about your project (10+ characters)."
  if (drawing && drawing.size > 0 && drawing.size > MAX_FILE_BYTES) {
    errors.drawing = "File is too large. Maximum size is 10MB."
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please correct the highlighted fields.", errors }
  }

  const drawingNote =
    drawing && drawing.size > 0
      ? `\n\n[Attached drawing: ${drawing.name} (${(drawing.size / 1024).toFixed(1)} KB) — please reply to this email to receive the file directly.]`
      : ""

  const bodyLines: string[] = []
  if (company) bodyLines.push(`Company: ${company}`)
  if (phone) bodyLines.push(`Phone: ${phone}`)
  if (category) bodyLines.push(`Interested in: ${category}`)
  if (quantity) bodyLines.push(`Quantity: ${quantity}`)
  bodyLines.push("")
  bodyLines.push(message)

  const result = await submitInquiry({
    name,
    email,
    phone: phone || undefined,
    company: company || undefined,
    subject: category ? `RFQ: ${category}` : "RFQ",
    message: bodyLines.join("\n") + drawingNote,
  })

  if (!result.ok) {
    return {
      status: "error",
      message: result.error || "Sorry, we couldn't submit your enquiry. Please try again or email us directly.",
    }
  }

  return {
    status: "success",
    message: "Thank you! Your enquiry has been received. Our team will reply within one business day.",
  }
}
