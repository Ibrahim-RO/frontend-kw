export type HomepageSection = { id: string; label: string; visible: boolean; title: string; subtitle?: string; body?: string; imageUrl?: string; imageAlt?: string; buttonLabel?: string; buttonUrl?: string; data?: Record<string, unknown> }
export type HomepageDocument = {
  sections: HomepageSection[]
  seo: { title: string; description: string; canonicalUrl?: string; robots?: string; ogTitle?: string; ogDescription?: string; ogImage?: string; schemaJsonLd?: Record<string, unknown> }
  integrations: { headHtml?: string; bodyStartHtml?: string; bodyEndHtml?: string }
}
export type HomepageSettings = { id: number; draft: HomepageDocument; published: HomepageDocument | null; published_at: string | null; updated_at: string }
