export type FaqItem = { q: string; a: string }
export type FaqGroup = { title: string; items: FaqItem[] }

export const faqGroups: FaqGroup[] = [
  {
    title: "Products & Specifications",
    items: [
      {
        q: "What specifications / series do you offer?",
        a: "Our core series are 55, 60, 70 and 90 (the number indicates the frame depth in mm). For enclosed home balconies we recommend the 70 series; for general interior partitions the 55 or 60 series; and for large-span commercial applications the 90 series.",
      },
      {
        q: "Do you support custom sizes / materials / colors / processes?",
        a: "Yes — we offer full-dimension customization across every category. We can produce irregular and large-span sizes beyond standard limits to suit any scenario. Materials include aluminum (6063-T5), thermal-break aluminum (with PA66 nylon strip), cold-rolled steel, and 304/316/316L stainless steel. We can also match popular colors and finishes to suit residential or commercial design styles.",
      },
      {
        q: "Can you provide samples?",
        a: "Yes. We offer free shipping of standard small samples. For custom samples we charge only a basic tooling fee, which can be refunded after a bulk order is placed.",
      },
      {
        q: "Do you have a technical datasheet / test report?",
        a: "We can provide a complete product technical datasheet, and third-party test reports on request to meet the export compliance requirements of different countries.",
      },
      {
        q: "Which industries or applications are your products suitable for?",
        a: "We cover seven core industries: residential real estate, commercial real estate, industrial manufacturing, healthcare, hospitality & tourism, municipal engineering and coastal construction — meeting each sector's quality, functional and compliance requirements.",
      },
      {
        q: "Do you support OEM / ODM?",
        a: "Yes. Based on your brand requirements and design, we provide a one-stop service from development and sampling to mass production, helping you build your own branded product line.",
      },
      {
        q: "What is the service life / performance advantage?",
        a: "All products go through multiple quality-inspection processes. Hardware, sealing strips and other components use premium materials that resist ageing and wear, lowering maintenance cost and extending service life while performing reliably in outdoor, high-temperature and high-humidity environments.",
      },
    ],
  },
  {
    title: "MOQ & Pricing",
    items: [
      {
        q: "What is the minimum order quantity (MOQ)?",
        a: "MOQ depends on the product type and customization requirements. Please contact us with your project details and we will confirm the most suitable minimum order for you.",
      },
      {
        q: "Is pricing tiered?",
        a: "Yes, we offer tiered pricing — the larger the order quantity, the better the unit price. Exact pricing is calculated individually based on order quantity and specification requirements.",
      },
      {
        q: "Does the quote include packaging, shipping or taxes?",
        a: "Quotes include standard neutral packaging by default, but exclude international freight and taxes. If you require specific packaging or shipping arrangements, we can quote on FOB / CIF / EXW trade terms as needed.",
      },
      {
        q: "Do you offer long-term cooperation pricing / volume discounts?",
        a: "Yes. We provide dedicated pricing policies for long-term partners. For stable bulk orders we offer tiered discounts and price protection to safeguard your cost advantage.",
      },
      {
        q: "Will prices fluctuate with raw materials or exchange rates?",
        a: "Prices may adjust slightly with raw-material costs and exchange rates. We communicate any changes in advance, and once an order is confirmed the price remains stable and will not be changed arbitrarily.",
      },
    ],
  },
  {
    title: "Samples & Prototyping",
    items: [
      {
        q: "Can you send samples?",
        a: "Yes. Standard small samples can be shipped free of charge (freight collect), and custom samples can be arranged according to your requirements.",
      },
      {
        q: "Are samples chargeable? Are they refundable?",
        a: "Standard small samples are free. Custom prototyping requires a tooling fee, which can be deducted from the order value or refunded once you confirm a bulk order.",
      },
      {
        q: "What is the sample lead time?",
        a: "Sample lead time depends on the destination country and the complexity of the customization. We will confirm a precise timeline when you enquire.",
      },
      {
        q: "Can custom products be prototyped for confirmation first?",
        a: "Yes. All custom products are prototyped for your confirmation first; bulk production only begins after you approve the sample, ensuring the finished goods match your expectations.",
      },
      {
        q: "Will samples match the bulk order?",
        a: "We strictly control consistency between samples and bulk production. Mass production uses your approved sample as the standard, with quality control throughout.",
      },
    ],
  },
  {
    title: "Production & Lead Time",
    items: [
      {
        q: "What is the production cycle after ordering?",
        a: "The production cycle depends on order quantity. After confirming your order details we will provide a precise production schedule.",
      },
      {
        q: "Is bulk lead time stable?",
        a: "Yes. We have a mature production-scheduling system and multiple automated lines to ensure on-time delivery — our delivery rate has been above 98% since we began operations.",
      },
      {
        q: "Will lead times extend during peak season?",
        a: "During peak season we forecast demand in advance and stock raw materials and capacity to protect lead times. In special cases minor adjustments may be needed, which we will communicate and coordinate with you beforehand.",
      },
      {
        q: "Do you support rush production?",
        a: "Yes. For urgent orders we can prioritize production by adjusting the schedule; the exact lead time is discussed individually based on the order.",
      },
      {
        q: "Can you provide progress updates during production?",
        a: "Yes. We provide regular production-progress updates, and on request can share photos / videos of the production process so you can follow your order at any time.",
      },
    ],
  },
  {
    title: "Quality & Inspection",
    items: [
      {
        q: "Do you have a quality-control process?",
        a: "Yes — we operate a complete full-process inspection system with dedicated quality checks at every stage to ensure consistent, compliant quality.",
      },
      {
        q: "How are quality issues handled?",
        a: "If a quality issue arises due to our production, we communicate with you immediately and provide solutions such as replacement, re-supply or discount compensation depending on the situation, protecting your interests.",
      },
    ],
  },
]
