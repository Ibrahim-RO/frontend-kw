'use client'

import { useMarketCenters } from '../hooks/useMarketCenters'
import { MarketCentersGrid } from './MarketCentersGrid'

export function MarketCentersPage() {
  const { data, isLoading, isError } = useMarketCenters()

  return (
    <main className="mx-auto mb-16 max-w-7xl px-4 pt-10">
      <h1 className="mb-4 border-l-4 border-kw-primary pl-4 font-heading text-3xl font-bold text-kw-secondary md:text-4xl">
        Centros de Mercado
      </h1>
      <p className="mb-8 max-w-2xl text-kw-tertiary">
        Encuentra el Market Center de Keller Williams México más cercano a ti.
      </p>

      <MarketCentersGrid marketCenters={data?.data ?? []} isLoading={isLoading} isError={isError} />
    </main>
  )
}
