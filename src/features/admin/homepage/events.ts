import type { HomepageSection } from './types'

export function withEventsFirst(sections: HomepageSection[]): HomepageSection[] {
  const events = sections.find((section) => section.id === 'events') ?? {
    id: 'events', label: 'Eventos', visible: false, title: '', buttonUrl: '',
  }
  return [events, ...sections.filter((section) => section.id !== 'events')]
}

export function isEventUrl(value: string): boolean {
  if (/^\/(?!\/)/.test(value) && !/[\\\s]/.test(value)) return true
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}
