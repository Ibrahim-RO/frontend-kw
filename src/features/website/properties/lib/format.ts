import type { Property, PropertyAgent } from '../types'

export function formatPrice(price: number, currency: string = 'MXN') {
  const formatted = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price)

  return formatted
}

export function isRental(property: Property) {
  return property.Property_Operation_ID === 1
}

export function getPropertyLocation(property: Property) {
  return [property.Colony, property.City, property.State].filter(Boolean).join(', ')
}

export function getAgentFullName(agent: PropertyAgent) {
  return [agent.First_Name, agent.Last_Name].filter(Boolean).join(' ')
}
