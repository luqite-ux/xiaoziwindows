import { getSupabaseClient, getTenantId } from "@/lib/supabase"

export type InquiryPayload = {
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
}

export async function submitInquiry(payload: InquiryPayload): Promise<{ ok: boolean; error?: string }> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) {
    return { ok: false, error: "Service not configured, please contact admin." }
  }
  const { error } = await supabase.from("inquiries").insert({
    tenant_id: tenantId,
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone?.trim() || null,
    company: payload.company?.trim() || null,
    subject: payload.subject?.trim() || null,
    message: payload.message.trim(),
  })
  if (error) {
    console.error("[submitInquiry]", error)
    return { ok: false, error: error.message || "Submission failed, please try again." }
  }
  return { ok: true }
}
