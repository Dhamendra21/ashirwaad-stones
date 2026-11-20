import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata = {
  title: "Ashirwaad Stone — Premier Architectural Surfaces",
  description: "A premier showroom specializing in Italian & exotic marbles, architectural granite, large-format porcelain slabs, designer wall cladding, and luxury sanitaryware.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/assets/brand/logo-icon.png", sizes: "any" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeGoodsStore",
  "name": "Ashirwaad Stone",
  "alternateName": "Ashirwad Stone",
  "image": "https://ashirwaadstone.com/assets/brand/logo-nav-dark.png",
  "telephone": "+91-9479272520",
  "sameAs": [
    "https://www.instagram.com/ashirwad_stone/"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Supela, Kripal Nagar",
    "addressLocality": "Bhilai",
    "addressRegion": "Chhattisgarh",
    "postalCode": "490023",
    "addressCountry": "IN"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:00",
      "closes": "20:00"
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
