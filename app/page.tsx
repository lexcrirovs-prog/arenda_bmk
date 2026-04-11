import { Hero } from '@/components/sections/Hero'
import { ValueProps } from '@/components/sections/ValueProps'
import { BentoCatalog } from '@/components/sections/BentoCatalog'
import { CalculatorTeaser } from '@/components/sections/CalculatorTeaser'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { CaseStudiesGrid } from '@/components/sections/CaseStudiesGrid'
import { CertificationsBadges } from '@/components/sections/CertificationsBadges'
import { CtaEmergency } from '@/components/sections/CtaEmergency'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <BentoCatalog />
      <CalculatorTeaser />
      <ProcessTimeline />
      <CaseStudiesGrid />
      <CertificationsBadges />
      <CtaEmergency />
    </>
  )
}
