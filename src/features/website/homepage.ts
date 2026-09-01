import type { HomepageDocument } from '@/src/features/admin/homepage/types'
const fallback: HomepageDocument = { sections: [], seo: { title: 'Keller Williams México', description: 'Bienes raíces y oportunidades.' }, integrations: {} }
export async function getPublishedHomepage(): Promise<HomepageDocument> {
  try {
    const base = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL
    if (!base) return fallback
    const response = await fetch(`${base}/homepage`, { next: { revalidate: 60, tags: ['homepage'] } })
    return response.ok ? response.json() : fallback
  } catch { return fallback }
}
