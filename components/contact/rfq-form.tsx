"use client"

import { useActionState, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { CheckCircle2, Upload, X, Send, AlertCircle } from "lucide-react"
import { submitRfq, type RfqState } from "@/app/contact/actions"
import { categories as staticCategories, type Category } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const initialState: RfqState = { status: "idle", message: "" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
    >
      {pending ? (
        "Sending..."
      ) : (
        <>
          Send Enquiry
          <Send className="ml-1 h-4 w-4" />
        </>
      )}
    </Button>
  )
}

export function RfqForm({ categories }: { categories?: Category[] } = {}) {
  const cats = categories && categories.length > 0 ? categories : staticCategories
  const [state, formAction] = useActionState(submitRfq, initialState)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold text-foreground">Enquiry sent</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{state.message}</p>
      </div>
    )
  }

  const err = state.errors ?? {}

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <h2 className="font-display text-2xl font-bold text-foreground">Request a quote</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Share your project details and drawings — we&apos;ll get back to you within one business day.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required error={err.name}>
          <Input name="name" placeholder="Your name" aria-invalid={!!err.name} />
        </Field>
        <Field label="Email" required error={err.email}>
          <Input name="email" type="email" placeholder="you@company.com" aria-invalid={!!err.email} />
        </Field>
        <Field label="Phone / WhatsApp">
          <Input name="phone" placeholder="+86 ..." />
        </Field>
        <Field label="Company">
          <Input name="company" placeholder="Company name" />
        </Field>
        <Field label="Product category">
          <select
            name="category"
            defaultValue=""
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Select a category</option>
            {cats.map((c) => (
              <option key={c.slug} value={c.shortName}>
                {c.shortName}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Estimated quantity">
          <Input name="quantity" placeholder="e.g. 200 sets" />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Project details" required error={err.message}>
          <Textarea
            name="message"
            rows={5}
            placeholder="Tell us about sizes, series, colors, glazing, hardware, application and timeline..."
            aria-invalid={!!err.message}
          />
        </Field>
      </div>

      {/* Drawing upload */}
      <div className="mt-5">
        <Label className="text-sm font-medium text-foreground">Attach drawing / spec sheet</Label>
        <input
          ref={fileRef}
          type="file"
          name="drawing"
          accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
        {fileName ? (
          <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/50 px-4 py-3">
            <span className="truncate text-sm font-medium text-foreground">{fileName}</span>
            <button
              type="button"
              onClick={() => {
                if (fileRef.current) fileRef.current.value = ""
                setFileName(null)
              }}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
          >
            <Upload className="h-5 w-5" />
            Click to upload (PDF, DWG, images — max 10MB)
          </button>
        )}
        {err.drawing && <p className="mt-1.5 text-xs text-destructive">{err.drawing}</p>}
      </div>

      {state.status === "error" && state.message && (
        <div className="mt-5 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {state.message}
        </div>
      )}

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  )
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-1.5")}>
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
