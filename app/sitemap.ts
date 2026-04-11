import type { MetadataRoute } from 'next'
import { siteConfig } from '@/content/seo'
import { products } from '@/content/products'
import { cases } from '@/content/cases'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const now = new Date()

  const staticRoutes = [
    '',
    '/catalog',
    '/calculator',
    '/cases',
    '/services',
    '/about',
    '/contact',
    '/compare',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  const productRoutes = products.map((p) => ({
    url: `${base}/catalog/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const caseRoutes = cases.map((c) => ({
    url: `${base}/cases/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...productRoutes, ...caseRoutes]
}
