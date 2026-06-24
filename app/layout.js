import { Lora, Outfit } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  "https://just-site.win";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-editorial",
});

export const metadata = {
  metadataBase: new URL(
    siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`
  ),
  title: "Michael Pashchenko | UI/UX Designer & Web Developer",
  description:
    "Portfolio of Michael Pashchenko, UI/UX Designer and Web Developer creating modern websites, product interfaces, and responsive digital experiences.",
  keywords: [
    "Michael Pashchenko",
    "UI/UX Designer",
    "Web Developer",
    "Portfolio",
    "Figma",
    "Next.js",
    "Frontend",
    "Website Designer",
  ],
  authors: [{ name: "Michael Pashchenko" }],
  creator: "Michael Pashchenko",
  publisher: "Michael Pashchenko",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Michael Pashchenko | UI/UX Designer & Web Developer",
    description:
      "Portfolio showcasing UI/UX design, web development, selected work, and contact information for Michael Pashchenko.",
    url: "/",
    siteName: "Michael Pashchenko Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/me.png",
        width: 1154,
        height: 1280,
        alt: "Michael Pashchenko",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Pashchenko | UI/UX Designer & Web Developer",
    description:
      "Portfolio of Michael Pashchenko with selected projects, experience, and contact details.",
    images: ["/images/me.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
