const DIACRITICS_PATTERN = new RegExp('[̀-ͯ]', 'g')

function slugifyHeading(value: string): string {
  return value
    .normalize('NFD')
    .replace(DIACRITICS_PATTERN, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function excerpt(html: string, length = 160): string {
  const text = stripHtml(html)
  if (text.length <= length) return text
  return `${text.slice(0, length).replace(/\s+\S*$/, '')}...`
}

export function readingTime(html: string): number {
  const words = stripHtml(html).split(' ').filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export type TocItem = { id: string; text: string }

export function withHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = []
  const used = new Set<string>()

  const withIds = html.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/g, (match, attrs = '', inner: string) => {
    const text = stripHtml(inner)
    if (!text) return match

    let id = slugifyHeading(text) || `seccion-${toc.length + 1}`
    while (used.has(id)) id = `${id}-${toc.length + 1}`
    used.add(id)
    toc.push({ id, text })

    return `<h2${attrs ?? ''} id="${id}">${inner}</h2>`
  })

  return { html: withIds, toc }
}

export function formatBlogDate(value: string): string {
  return new Date(value).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
}
