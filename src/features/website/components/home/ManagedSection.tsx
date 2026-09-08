import type { HomepageSection } from '@/src/features/admin/homepage/types'
import AboutSection from './AboutSection'
import AlliesInfoSection from './AlliesInfoSection'
import AlliesSection from './AlliesSection'
import AwardsSection from './AwardsSection'
import ContactSection from './ContactSection'
import FamilyReunionSection from './FamilyReunionSection'
import FeaturedPropertiesSection from './FeaturedPropertiesSection'
import Hero from './Hero'
import JoinSection from './JoinSection'
import ProspectingCtaSection from './ProspectingCtaSection'
import { sectionData } from '@/src/features/admin/homepage/section-defaults'
import { isEventUrl } from '@/src/features/admin/homepage/events'

export function ManagedSection({ section }: { section: HomepageSection; index?: number }) {
  const content = { ...section, ...sectionData(section.id, section.data), data: sectionData(section.id, section.data) } as HomepageSection
  switch (section.id) {
    case 'events': {
      const text = section.title.trim()
      const href = section.buttonUrl?.trim() ?? ''
      if (!section.visible || !text || !isEventUrl(href)) return null
      return <section id="eventos" aria-label="Eventos" className="bg-kw-primary px-5 py-3 text-center text-white">
        <a href={href} className="break-words text-sm font-medium underline underline-offset-4 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4">{text}</a>
      </section>
    }
    case 'hero': return <Hero content={content}/>
    case 'awards': return <AwardsSection content={content}/>
    case 'properties': return <FeaturedPropertiesSection content={content}/>
    case 'about': return <AboutSection content={content}/>
    case 'join': return <JoinSection content={content}/>
    case 'family': return <FamilyReunionSection content={content}/>
    case 'allies': return <AlliesSection content={content}/>
    case 'allies-info': return <AlliesInfoSection content={content}/>
    case 'prospecting': return <ProspectingCtaSection content={content}/>
    case 'contact': return <ContactSection content={content}/>
    default: return null
  }
}
