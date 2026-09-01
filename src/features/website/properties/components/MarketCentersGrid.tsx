import { Loader2 } from 'lucide-react'
import type { MarketCenter } from '../types'
import { MarketCenterCard } from './MarketCenterCard'

type MarketCentersGridProps = {
  marketCenters: MarketCenter[]
  isLoading: boolean
  isError: boolean
}

export function MarketCentersGrid({ marketCenters, isLoading, isError }: MarketCentersGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-kw-tertiary">
        <Loader2 className="mr-2 animate-spin" size={20} /> Cargando Market Centers...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-kw-tertiary">
        No se pudieron cargar los Market Centers. Intenta de nuevo más tarde.
      </div>
    )
  }

  if (marketCenters.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-kw-tertiary">
        No se encontraron Market Centers.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {marketCenters.map((marketCenter) => (
        <MarketCenterCard key={marketCenter.ID} marketCenter={marketCenter} />
      ))}
    </div>
  )
}
