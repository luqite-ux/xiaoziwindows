"use server"

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

  // In production this would forward the enquiry to email / CRM / database.
  // We log a structured summary so the submission is observable in the server logs.
  console.log("[v0] New RFQ submission:", {
    name,
    email,
    phone,
    company,
    category,
    quantity,
    messageLength: message.length,
    drawing: drawing && drawing.size > 0 ? { name: drawing.name, size: drawing.size } : null,
  })

  // Simulate processing latency.
  await new Promise((r) => setTimeout(r, 600))

  return {
    status: "success",
    message: "Thank you! Your enquiry has been received. Our team will reply within one business day.",
  }
}
