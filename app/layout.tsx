import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stylesbyclaire.vercel.app/"),
  title: {
    default: "Stylesbyclaire",
    template: "Stylesbyclaire | %s",
  },
  authors: [
    {
      name: "Stylesbyclaire",
      url: "https://stylesbyclaire.vercel.app/",
    },
  ],
  description:
    "Stylesbyclaire is a luxury hair braiding brand offering elegant protective hairstyles, service pricing, appointment booking, and a smooth beauty experience for students, busy professionals, kids, parents, and luxury beauty clients.",
  keywords: [
    "Stylesbyclaire",
    "Hair braiding",
    "Braids",
    "Protective hairstyles",
    "Knotless braids",
    "Box braids",
    "Cornrows",
    "Stitch braids",
    "Goddess braids",
    "Boho braids",
    "Kids braids",
    "Hair services",
    "Beauty booking",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://stylesbyclaire.vercel.app/",
    siteName: "Stylesbyclaire",
    title: "Stylesbyclaire",
    description:
      "Book luxury hair braiding services with Stylesbyclaire. Explore protective hairstyles, pricing, service details, and appointment options in one elegant experience.",
    images: [
      {
        url: "https://stylesbyclaire.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Stylesbyclaire Hair Braiding Website Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stylesbyclaire",
    description:
      "Luxury hair braiding services, protective styles, pricing, and appointment booking by Stylesbyclaire.",
    creator: "@stylesbyclaire",
    images: ["https://stylesbyclaire.vercel.app/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  applicationName: "Stylesbyclaire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
