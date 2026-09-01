import type { Metadata } from 'next'
import { ManagedSection } from '@/src/features/website/components/home/ManagedSection'
import { getPublishedHomepage } from '@/src/features/website/homepage'

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPublishedHomepage()
  return { title: seo.title, description: seo.description, alternates: seo.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined, robots: seo.robots, openGraph: { title: seo.ogTitle || seo.title, description: seo.ogDescription || seo.description, images: seo.ogImage ? [seo.ogImage] : undefined } }
}

export default async function Home() {
  const page = await getPublishedHomepage()
  return <>
    {page.integrations.headHtml && <head dangerouslySetInnerHTML={{ __html: page.integrations.headHtml }}/>} 
    {page.seo.schemaJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(page.seo.schemaJsonLd).replace(/</g, '\\u003c') }}/>} 
    {page.integrations.bodyStartHtml && <div className="contents" dangerouslySetInnerHTML={{ __html: page.integrations.bodyStartHtml }}/>} 
    <main>{page.sections.filter(s => s.visible).map((section,index) => <ManagedSection key={section.id} section={section} index={index}/>)}</main>
    {page.integrations.bodyEndHtml && <div className="contents" dangerouslySetInnerHTML={{ __html: page.integrations.bodyEndHtml }}/>} 
  </>
}
