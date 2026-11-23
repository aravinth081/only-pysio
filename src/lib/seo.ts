import { siteContent } from "@/data/content";

/**
 * Generates Google-compliant schema.org JSON-LD structured data for MedicalBusiness / Physiotherapy.
 * Improves rich snippet ranking and localized search visibility.
 */
export function generateMedicalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Physiotherapy",
    name: siteContent.brand.name,
    description: siteContent.brand.description,
    image: "https://onlyphysio.com/images/hero-physio.jpg",
    logo: "https://onlyphysio.com/images/logo.jpg",
    url: "https://onlyphysio.com",
    telephone: siteContent.contact.phone,
    email: siteContent.contact.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteContent.contact.address.line1}, ${siteContent.contact.address.line2}`,
      addressLocality: siteContent.contact.address.city,
      addressRegion: siteContent.contact.address.state,
      postalCode: siteContent.contact.address.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "12.9279",
      longitude: "77.6271",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Bengaluru, Karnataka",
      },
    ],
    medicalSpecialty: [
      "Physiotherapy",
      "Orthopedic",
      "Neurological",
      "SportsMedicine",
      "Geriatric",
      "Pediatric",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Physiotherapy Treatments & Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Homecare Physiotherapy Consultation",
            description: "Licensed senior physiotherapist bedside evaluation and manual therapy session.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Post-Surgery Rehabilitation (TKR/THR/Spine)",
            description: "Guided recovery protocol for joint replacement and spinal decompression.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Physio Equipment Rental & Sales",
            description: "Sanitized CPM machines, hospital beds, wheelchairs, and electrotherapy devices.",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "850",
      bestRating: "5",
      worstRating: "1",
    },
  };
}
