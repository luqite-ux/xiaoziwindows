export type Product = {
  slug: string
  name: string
  category: string
  image: string
  images: string[]
  tagline: string
  description: string
  material: string
  series?: string
  applications: string[]
  features: string[]
  specs: { label: string; value: string }[]
}

export type Category = {
  slug: string
  name: string
  shortName: string
  image: string
  blurb: string
  material: string
  highlights: string[]
}

export const categories: Category[] = [
  {
    slug: "aluminum-windows",
    name: "Aluminum Alloy Windows",
    shortName: "Aluminum Windows",
    image: "/images/products/aluminum-casement-window/thumb.webp",
    material: "6063-T5 Aluminum",
    blurb:
      "Casement, sliding and louver windows built from 6063-T5 aluminum — lightweight, watertight and fully customizable in size, color, glazing and hardware.",
    highlights: ["6063-T5 base alloy", "Watertight sealing", "Smooth hardware", "Fully customizable"],
  },
  {
    slug: "aluminum-doors",
    name: "Aluminum Alloy Doors",
    shortName: "Aluminum Doors",
    image: "/images/products/aluminum-casement-door/thumb.webp",
    material: "6063-T5 Aluminum",
    blurb:
      "Aluminum casement doors with slim sightlines and large glass panels — secure multi-point locking, durable finishes and made-to-measure dimensions.",
    highlights: ["6063-T5 base alloy", "Slim sightlines", "Multi-point locking", "Made to measure"],
  },
]

export const products: Product[] = [
  // Aluminum Windows
  {
    slug: "aluminum-casement-window",
    name: "Aluminum Casement Window",
    category: "aluminum-windows",
    image: "/images/products/aluminum-casement-window/01.webp",
    images: ["/images/products/aluminum-casement-window/01.webp", "/images/products/aluminum-casement-window/02.webp"],
    series: "60 / 70 Series",
    material: "6063-T5 Aluminum Alloy",
    tagline: "Wide opening, maximum ventilation",
    description:
      "An outward-opening aluminum casement window delivering excellent ventilation and an airtight seal when closed. The 6063-T5 frame stays light yet rigid, while multi-point locking and stainless friction stays provide secure, long-lasting performance for homes and commercial facades.",
    applications: ["Residential housing", "Villas", "Office buildings", "Retail facades"],
    features: [
      "6063-T5 aluminum extrusion for strength and low weight",
      "Outward opening with multi-point locking",
      "Stainless-steel friction stays",
      "Triple weather sealing with EPDM gaskets",
      "Custom RAL colors and glazing options",
    ],
    specs: [
      { label: "Series", value: "60 / 70 Series" },
      { label: "Base material", value: "6063-T5 aluminum" },
      { label: "Glass", value: "Tempered / laminated / double" },
      { label: "Opening", value: "Outward casement" },
      { label: "Customization", value: "Size, color, hardware, glazing" },
    ],
  },
  {
    slug: "aluminum-sliding-window",
    name: "Aluminum Sliding Window",
    category: "aluminum-windows",
    image: "/images/products/aluminum-sliding-window/01.webp",
    images: ["/images/products/aluminum-sliding-window/01.webp", "/images/products/aluminum-sliding-window/02.webp"],
    series: "55 / 60 Series",
    material: "6063-T5 Aluminum Alloy",
    tagline: "Smooth-gliding, space-saving daylight",
    description:
      "A reliable aluminum sliding window with smooth dual-track operation, slim sightlines and a watertight design. The 6063-T5 frame keeps the unit light yet rigid, making it a cost-effective choice for apartments, balconies and commercial fit-outs.",
    applications: ["Residential apartments", "Enclosed balconies", "Commercial fit-outs", "Interior partitions"],
    features: [
      "6063-T5 aluminum extrusion for strength and low weight",
      "Dual-track smooth sliding hardware",
      "EPDM sealing strips for weather tightness",
      "Customizable colors and glazing options",
    ],
    specs: [
      { label: "Series", value: "55 / 60 Series" },
      { label: "Base material", value: "6063-T5 aluminum" },
      { label: "Glass", value: "Single / double / tempered" },
      { label: "Opening", value: "Horizontal sliding" },
      { label: "Customization", value: "Size, color, glazing" },
    ],
  },
  {
    slug: "aluminum-louver-window",
    name: "Aluminum Louver Window",
    category: "aluminum-windows",
    image: "/images/products/aluminum-louver-window/01.webp",
    images: ["/images/products/aluminum-louver-window/01.webp"],
    series: "Louver Series",
    material: "6063-T5 Aluminum Alloy",
    tagline: "Adjustable airflow with privacy",
    description:
      "An aluminum louver window with adjustable blades that control ventilation and light while maintaining privacy. Built from corrosion-resistant 6063-T5 aluminum, it suits bathrooms, kitchens, plant rooms and ventilated facades.",
    applications: ["Bathrooms & kitchens", "Plant & equipment rooms", "Ventilated facades", "Stairwells"],
    features: [
      "Adjustable aluminum louver blades",
      "6063-T5 corrosion-resistant frame",
      "Optional fixed or operable configuration",
      "Insect screen and rain-resistant options",
    ],
    specs: [
      { label: "Series", value: "Louver Series" },
      { label: "Base material", value: "6063-T5 aluminum" },
      { label: "Blade", value: "Aluminum / glass louver" },
      { label: "Opening", value: "Adjustable louver" },
      { label: "Customization", value: "Size, color, blade type" },
    ],
  },
  // Aluminum Doors
  {
    slug: "aluminum-casement-door",
    name: "Aluminum Casement Door",
    category: "aluminum-doors",
    image: "/images/products/aluminum-casement-door/01.webp",
    images: ["/images/products/aluminum-casement-door/01.webp"],
    series: "70 Series",
    material: "6063-T5 Aluminum Alloy",
    tagline: "Slim frames, expansive glass",
    description:
      "An aluminum casement door combining slim sightlines with large glass panels for bright, elegant entrances. The 6063-T5 frame and multi-point locking deliver security and durability for residential and commercial use.",
    applications: ["Living rooms & balconies", "Villas", "Restaurants & cafes", "Showrooms"],
    features: [
      "6063-T5 aluminum frame with slim sightlines",
      "Large glass panels for maximum daylight",
      "Multi-point locking for security",
      "Triple weather sealing",
      "Custom dimensions, colors and glazing",
    ],
    specs: [
      { label: "Series", value: "70 Series" },
      { label: "Base material", value: "6063-T5 aluminum" },
      { label: "Glass", value: "Tempered / laminated / double" },
      { label: "Opening", value: "Inward / outward casement" },
      { label: "Customization", value: "Size, color, hardware, glazing" },
    ],
  },
]

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.category === slug)
}
