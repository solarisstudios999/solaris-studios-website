import { Bricolage_Grotesque } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ExperienceEffects from "@/components/ExperienceEffects";
/* Both are cookieless, so neither needs a consent banner - which is the
   reason they are here rather than Google Analytics. The site has no banner
   and sells its own Lighthouse score; GA4 would have required the first and
   dented the second. Speed Insights earns its place specifically because the
   studio publishes measured performance numbers as a selling point, and a
   number from one run in October is not a claim that stays true by itself. */
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { studio } from "@/lib/data";
import "./globals.css";

/* Display face only. Body stays on Satoshi, which is already self-hosted in
   globals.css - so this adds one font to the page rather than two. */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz"],
});

const siteUrl = "https://solarisstudios.co.in";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Solaris Studios - Brand, Web, and Content Systems",
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
    "AI-native studio",
    "Claude",
  ],
  authors: [{ name: "Solaris Studios" }],
  creator: "Solaris Studios",
  publisher: "Solaris Studios",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Solaris Studios",
    title: "Solaris Studios - Brand, Web, and Content Systems",
    description:
      "An independent brand, web, and content studio in Bangalore. Clear, considered work for founders and growing teams.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Solaris Studios - Brand, Web, and Content Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solaris Studios - Brand, Web, and Content Systems",
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
    <html lang="en" className={display.variable}>
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
