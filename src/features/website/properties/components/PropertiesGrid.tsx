import { Loader2 } from 'lucide-react'
import type { Property } from '../types'
import { PropertyCard } from './PropertyCard'

type PropertiesGridProps = {
  properties: Property[]
  isLoading: boolean
  isError: boolean
}

export function PropertiesGrid({ properties, isLoading, isError }: PropertiesGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-kw-tertiary">
        <Loader2 className="mr-2 animate-spin" size={20} /> Cargando propiedades...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-kw-tertiary">
        No se pudieron cargar las propiedades. Intenta de nuevo más tarde.
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-kw-tertiary">
        No se encontraron propiedades con estos filtros.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 @lg:grid-cols-2">
      {properties.map((property) => (
        <PropertyCard key={property.ID} property={property} />
      ))}
    </div>
  )
}
