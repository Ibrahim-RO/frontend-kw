'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useProperties } from '../hooks/useProperties'
import { usePropertiesSearch } from '../hooks/usePropertiesSearch'
import { usePolygonSearch, MAX_POLYGON_PROPERTIES } from '../hooks/usePolygonSearch'
import { PropertyFilters } from './PropertyFilters'
import { PropertiesGrid } from './PropertiesGrid'
import { Pagination } from './Pagination'
import { getTotalPages, getPageSlice, PAGE_SIZE } from '../lib/pagination'
import { geocodeAddress } from '../api/geocode.client'
import { boundsFromGeocodeResult } from '../lib/geocode-bounds'
import type { LatLngPoint } from '../lib/geometry'
import { mexicoBounds, emptyFilters, type MapBounds, type PropertiesFilters, type Property } from '../types'

const PropertiesMap = dynamic(() => import('./PropertiesMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-kw-tertiary">
      Cargando mapa...
    </div>
  ),
})

type SearchMode = 'polygon' | 'filters' | 'default'

export function PropertiesListPage() {
  const [filters, setFilters] = useState<PropertiesFilters | null>(null)
  const [bounds, setBounds] = useState<MapBounds>(mexicoBounds)
  const [flyTo, setFlyTo] = useState<MapBounds | null>(null)
  const [polygon, setPolygon] = useState<LatLngPoint[] | null>(null)
  const [page, setPage] = useState(1)

  const mode: SearchMode = polygon !== null ? 'polygon' : filters !== null ? 'filters' : 'default'
  const fallbackSignature = useRef<string | null>(null)
  const geocodeMutation = useMutation({ mutationFn: geocodeAddress })

  const defaultQuery = useProperties(page)
  const searchQuery = usePropertiesSearch(bounds, filters ?? emptyFilters, page, mode === 'filters')
  const polygonQuery = usePolygonSearch(polygon, filters ?? emptyFilters)

  // Si la búsqueda por zona no arroja resultados, geocodificamos el texto
  // ingresado (calle/colonia/municipio/estado/CP) y recentramos el mapa en
  // el lugar más cercano que sí exista, en vez de dejar la lista vacía.
  useEffect(() => {
    if (mode !== 'filters' || !filters || !searchQuery.data) return
    if (searchQuery.data.data.Total_Properties > 0) return

    const hasLocationText =
      filters.Filter_Estado ||
      filters.Filter_Municipio ||
      filters.Filter_Colonia ||
      filters.Filter_Calle ||
      filters.Filter_Codigo_Postal

    if (!hasLocationText) return

    const signature = JSON.stringify(filters)
    if (fallbackSignature.current === signature) return
    fallbackSignature.current = signature

    geocodeMutation.mutate(
      {
        street: [filters.Filter_Calle, filters.Filter_Colonia].filter(Boolean).join(', ') || undefined,
        city: filters.Filter_Municipio,
        state: filters.Filter_Estado,
        postalcode: filters.Filter_Codigo_Postal,
      },
      {
        onSuccess: (result) => {
          if (!result) {
            toast.error('No pudimos encontrar esa zona. Verifica el nombre e intenta de nuevo.')
            return
          }
          const nextBounds = boundsFromGeocodeResult(result)
          setBounds(nextBounds)
          setFlyTo(nextBounds)
          setFilters((prev) =>
            prev && {
              ...prev,
              Filter_Estado: null,
              Filter_Municipio: null,
              Filter_Colonia: null,
              Filter_Calle: null,
              Filter_Codigo_Postal: null,
            },
          )
          setPage(1)
          toast.info(`No encontramos esa zona exacta. Mostrando propiedades cerca de "${result.display_name}".`)
        },
        onError: () => {
          toast.error('No pudimos buscar esa zona. Intenta de nuevo.')
        },
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, filters, searchQuery.data])

  let properties: Property[]
  let totalCount = 0
  let isLoading = false
  let isError = false

  if (mode === 'polygon') {
    // Aca "all" ya es el arreglo completo filtrado por poligono, no un
    // bloque del backend, asi que se recorta directo con PAGE_SIZE.
    const all = polygonQuery.data?.properties ?? []
    properties = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    totalCount = all.length
    isLoading = polygonQuery.isLoading
    isError = polygonQuery.isError
  } else if (mode === 'filters') {
    const [start, end] = getPageSlice(page)
    properties = (searchQuery.data?.data.Properties_Data ?? []).slice(start, end)
    totalCount = searchQuery.data?.data.Total_Properties ?? 0
    isLoading = searchQuery.isLoading
    isError = searchQuery.isError
  } else {
    const [start, end] = getPageSlice(page)
    properties = (defaultQuery.data?.data.Properties_Data ?? []).slice(start, end)
    totalCount = defaultQuery.data?.data.Total_Properties ?? 0
    isLoading = defaultQuery.isLoading
    isError = defaultQuery.isError
  }

  const totalPages = getTotalPages(totalCount)

  const handleSearch = (newFilters: PropertiesFilters) => {
    setFilters(newFilters)
    setPolygon(null)
    setPage(1)
  }

  const handleClear = () => {
    setFilters(null)
    setPolygon(null)
    setPage(1)
  }

  const handlePolygonComplete = (points: LatLngPoint[]) => {
    setPolygon(points)
    setPage(1)
  }

  const handleClearPolygon = () => {
    setPolygon(null)
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

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="w-full lg:w-64 lg:shrink-0">
          <div className="lg:sticky lg:top-28">
            <PropertyFilters onSearch={handleSearch} onClear={handleClear} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <p className="mb-5 text-sm font-semibold text-kw-tertiary">
            {isLoading
              ? 'Buscando propiedades...'
              : `${totalCount} ${totalCount === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}`}
          </p>

          {mode === 'polygon' && (
            <p className="mb-4 text-sm text-kw-tertiary">
              Mostrando propiedades dentro de la zona marcada en el mapa.
              {polygonQuery.data?.truncated &&
                ` El área es muy grande, se muestran solo las primeras ${MAX_POLYGON_PROPERTIES} propiedades encontradas — dibuja una zona más chica para ver todo.`}
            </p>
          )}

          <div className="relative flex flex-col gap-8 xl:flex-row">
            <div className="@container w-full xl:w-3/5">
              <PropertiesGrid properties={properties} isLoading={isLoading} isError={isError} />
              <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>

            <div className="z-10 w-full xl:w-2/5">
              <div className="sticky top-28 h-[calc(100vh-10rem)] overflow-hidden rounded-3xl border border-neutral-200 shadow-xl">
                <PropertiesMap
                  properties={properties}
                  onBoundsChange={setBounds}
                  onPolygonComplete={handlePolygonComplete}
                  flyTo={flyTo}
                  polygonActive={mode === 'polygon'}
                  onClearPolygon={handleClearPolygon}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
