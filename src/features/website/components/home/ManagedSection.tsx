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

export function ManagedSection({ section }: { section: HomepageSection; index?: number }) {
  const content = { ...section, ...sectionData(section.id, section.data), data: sectionData(section.id, section.data) } as HomepageSection
  switch (section.id) {
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
