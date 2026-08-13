'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { useProperties } from '../hooks/useProperties'
import { usePropertiesSearch } from '../hooks/usePropertiesSearch'
import { PropertyFilters } from './PropertyFilters'
import { PropertiesGrid } from './PropertiesGrid'
import { Pagination } from './Pagination'
import { getTotalPages } from '../lib/pagination'
import { mexicoBounds, type MapBounds, type PropertiesFilters } from '../types'

const PropertiesMap = dynamic(() => import('./PropertiesMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-kw-tertiary">
      Cargando mapa...
    </div>
  ),
})

export function PropertiesListPage() {
  const [filters, setFilters] = useState<PropertiesFilters | null>(null)
  const [bounds, setBounds] = useState<MapBounds>(mexicoBounds)
  const [page, setPage] = useState(1)

  const defaultQuery = useProperties(page)
  const searchQuery = usePropertiesSearch(
    bounds,
    filters ?? ({} as PropertiesFilters),
    page,
    filters !== null,
  )

  const activeQuery = filters !== null ? searchQuery : defaultQuery

  const properties = useMemo(
    () => activeQuery.data?.data.Properties_Data ?? [],
    [activeQuery.data],
  )
  const totalPages = getTotalPages(activeQuery.data?.data.Total_Properties ?? 0)

  const handleSearch = (newFilters: PropertiesFilters) => {
    setFilters(newFilters)
    setPage(1)
  }

  const handleClear = () => {
    setFilters(null)
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="mx-auto mb-16 max-w-7xl px-4 pt-10">
      <h1 className="mb-8 border-l-4 border-kw-primary pl-4 font-heading text-3xl font-bold text-kw-secondary md:text-4xl">
        Propiedades Destacadas
      </h1>

      <PropertyFilters onSearch={handleSearch} onClear={handleClear} />

      <div className="relative flex flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <PropertiesGrid
            properties={properties}
            isLoading={activeQuery.isLoading}
            isError={activeQuery.isError}
          />
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>

        <div className="z-10 w-full lg:w-1/3">
          <div className="sticky top-28 h-[calc(100vh-10rem)] overflow-hidden rounded-3xl border border-neutral-200 shadow-xl">
            <PropertiesMap properties={properties} onBoundsChange={setBounds} />
          </div>
        </div>
      </div>
    </main>
  )
}
