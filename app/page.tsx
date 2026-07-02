import { HeroCarousel } from "@/components/home/hero-carousel"
import { StatsBand } from "@/components/home/stats-band"
import { CategoryShowcase } from "@/components/home/category-showcase"
import { WhyUs } from "@/components/home/why-us"
import { ProcessSection } from "@/components/home/process-section"
import { CtaSection } from "@/components/home/cta-section"
import { site } from "@/lib/site"

export const revalidate = 60

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <StatsBand />
      <CategoryShowcase />
      <WhyUs />
      <ProcessSection />
      <CtaSection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.legalName,
            url: site.url,
            telephone: site.phone,
            email: site.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: site.address,
              addressRegion: "Shanghai",
              addressCountry: "CN",
            },
            description: site.description,
          }),
        }}
      />
    </>
  )
}
