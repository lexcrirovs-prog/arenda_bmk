import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SkipToContent } from '@/components/common/SkipToContent'
import { buildMetadata, organizationJsonLd } from '@/lib/seo'
import { siteConfig } from '@/content/seo'

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — аренда мобильных котельных 24/7`,
  description: siteConfig.description,
  path: '/',
})

export const viewport: Viewport = {
  themeColor: '#1A2B3C',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <SkipToContent />
        <Header />
        <main id="main" className="min-h-[60vh]">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </body>
    </html>
  )
}
