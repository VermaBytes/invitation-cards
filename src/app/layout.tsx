import type { Metadata, Viewport } from "next";
import "./globals.css";
import { wedding } from "@/data/wedding";

const title = `${wedding.bride.name} एवं ${wedding.groom.name} का शुभ विवाह निमंत्रण`;
const description = `${wedding.bride.name} एवं ${wedding.groom.name} के शुभ विवाह में सादर आमंत्रित हैं। विवाह समारोह की तिथि, समय, स्थान एवं अन्य जानकारी यहाँ देखें।`;

export const metadata: Metadata = {
  title,
  description,
  ...(wedding.siteUrl
    ? {
        metadataBase: new URL(wedding.siteUrl),
        alternates: { canonical: wedding.siteUrl },
      }
    : {}),
  openGraph: {
    title,
    description,
    locale: "hi_IN",
    type: "website",
    ...(wedding.siteUrl ? { url: wedding.siteUrl } : {}),
  },
  twitter: { card: "summary", title, description },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#3d101b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
