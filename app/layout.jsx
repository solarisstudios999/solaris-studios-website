import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ExperienceEffects from "@/components/ExperienceEffects";
import { studio } from "@/lib/data";
import "./globals.css";

const siteUrl = "https://solarisstudios.co.in";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Solaris Studios — Brand, Web, and Content Systems",
    template: "%s · Solaris Studios",
  },
  description:
    "Solaris Studios is an independent brand, web, and content studio in Bangalore building clear, considered brand systems for founders.",
  applicationName: "Solaris Studios",
  keywords: [
    "brand identity studio",
    "web design Bangalore",
    "creative studio India",
    "content systems",
    "brand strategy",
    "Next.js website design",
  ],
  authors: [{ name: "Solaris Studios" }],
  creator: "Solaris Studios",
  publisher: "Solaris Studios",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Solaris Studios",
    title: "Solaris Studios — Brand, Web, and Content Systems",
    description:
      "An independent brand, web, and content studio in Bangalore. Clear, considered work for founders and growing teams.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Solaris Studios — Brand, Web, and Content Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solaris Studios — Brand, Web, and Content Systems",
    description:
      "Independent studio in Bangalore. Brand, web, and content systems for founders who want clarity without losing edge.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Design Studio",
};

export const viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: studio.name,
  url: siteUrl,
  logo: `${siteUrl}/assets/logo/solaris-logo.svg`,
  email: studio.email,
  telephone: studio.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: [studio.instagramUrl],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: studio.email,
      url: studio.whatsappHref,
      availableLanguage: ["English", "Hindi", "Kannada"],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <a className="skip-link" href="#main">Skip to content</a>
        <ExperienceEffects />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
