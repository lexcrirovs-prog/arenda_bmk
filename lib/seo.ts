import type { Metadata } from 'next'
import { siteConfig } from '@/content/seo'

interface PageSeoInput {
  title: string
  description?: string
  path?: string
  keywords?: string[]
  ogImage?: string
}

export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  ogImage = siteConfig.ogImage,
}: PageSeoInput): Metadata {
  const fullTitle = title === siteConfig.name ? title : `${title} — ${siteConfig.name}`
  const canonical = `${siteConfig.url}${path}`

  return {
    title: fullTitle,
    description: description ?? siteConfig.description,
    keywords: [...siteConfig.keywords, ...keywords],
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description: description ?? siteConfig.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: 'ru_RU',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description ?? siteConfig.description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    legalName: siteConfig.fullName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.emergencyPhone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RU',
      addressLocality: 'Москва',
      streetAddress: 'ул. Промышленная, д. 1',
    },
    areaServed: { '@type': 'Country', name: 'Russia' },
  }
}
