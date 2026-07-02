import Link from "next/link"
import { Home, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-background px-6">
      <div className="text-center">
        <p className="font-display text-7xl font-extrabold text-secondary">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-foreground">Page not found</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/">
              <Home className="mr-1 h-4 w-4" />
              Back Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">
              Browse Products
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
