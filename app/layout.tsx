import type { Metadata } from "next";
import localFont from "next/font/local";

import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const sans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Аренда мобильных котельных и БМК",
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "аренда паровой котельной",
    "мобильная бмк в контейнере",
    "аренда котельной 1 мвт",
    "дизельная котельная 1 мвт цена",
    "аренда мобильной котельной",
    "аренда паровой котельной 1 т/ч",
    "подменная котельная",
    "временное тепло для стройки",
  ],
  openGraph: {
    title: "Аренда БМК — мобильные котельные для тепла и пара без CAPEX",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    locale: "ru_RU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${sans.variable} ${mono.variable} bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
