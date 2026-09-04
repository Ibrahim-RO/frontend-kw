'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Building2, Loader2, Mail, MapPin, Phone, Users } from 'lucide-react'
import { useMarketCenter } from '../hooks/useMarketCenter'
import { AGENTS_PAGE_SIZE, useMarketCenterAgents } from '../hooks/useMarketCenterAgents'
import { useMarketCenterProperties } from '../hooks/useMarketCenterProperties'
import { AgentCard } from './AgentCard'
import { PropertyCard } from './PropertyCard'
import { Pagination } from './Pagination'

const PROPERTIES_PAGE_SIZE = 12

export function MarketCenterDetailPage({ id }: { id: string }) {
  const { data, isLoading, isError } = useMarketCenter(id)
  const marketCenter = data?.data[0]

  const [tab, setTab] = useState<'agentes' | 'propiedades'>('agentes')
  const [page, setPage] = useState(1)
  const [propertiesPage, setPropertiesPage] = useState(1)
  useEffect(() => {
    setTab('agentes')
    setPage(1)
    setPropertiesPage(1)
  }, [id])

  const agentsQuery = useMarketCenterAgents(id, page)
  const agents = agentsQuery.data?.data.Agents_Data ?? []
  const totalAgents = agentsQuery.data?.data.Total_Agents ?? 0
  const totalPages = Math.max(1, Math.ceil(totalAgents / AGENTS_PAGE_SIZE))

  const propertiesQuery = useMarketCenterProperties(id, tab === 'propiedades')
  const allProperties = propertiesQuery.data?.properties ?? []
  const totalProperties = allProperties.length
  const totalPropertiesPages = Math.max(1, Math.ceil(totalProperties / PROPERTIES_PAGE_SIZE))
  const properties = allProperties.slice(
    (propertiesPage - 1) * PROPERTIES_PAGE_SIZE,
    propertiesPage * PROPERTIES_PAGE_SIZE,
  )

  return (
    <main className="mx-auto mb-16 max-w-7xl px-4 pt-10">
      <Link
        href="/centros-de-mercado"
        className="mb-8 inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-kw-secondary transition-colors hover:bg-neutral-100"
      >
        <ArrowLeft size={16} className="mr-2" /> Volver a Market Centers
      </Link>

      {isLoading && (
        <div className="flex items-center justify-center py-24 text-kw-tertiary">
          <Loader2 className="mr-2 animate-spin" size={20} /> Cargando Market Center...
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-kw-tertiary">
          No se pudo cargar este Market Center.
        </div>
      )}

      {marketCenter && (
        <>
          <section className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl md:p-10">
            <div className="absolute top-0 left-0 h-1 w-full bg-kw-primary" />

            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              {marketCenter.Logo_Url_One && (
                <img
                  src={marketCenter.Logo_Url_One}
                  alt={marketCenter.Market_Center}
                  className="h-28 w-28 shrink-0 rounded-2xl border border-neutral-200 object-contain p-3"
                />
              )}

              <div className="min-w-0 flex-1">
                <h1 className="mb-2 font-heading text-3xl font-bold text-kw-secondary md:text-4xl">
                  {marketCenter.Market_Center}
                </h1>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    [marketCenter.Street, marketCenter.Municipality, marketCenter.State, marketCenter.Postal_Code, 'México']
                      .filter(Boolean)
                      .join(', '),
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Abrir en Google Maps para navegación"
                  className="mb-6 flex items-center text-lg text-kw-tertiary transition-colors hover:text-kw-primary hover:underline"
                >
                  <MapPin className="mr-2 shrink-0 text-kw-primary" size={20} />
                  {marketCenter.Street}, {marketCenter.Municipality}, {marketCenter.State}
                  {marketCenter.Postal_Code ? `, ${marketCenter.Postal_Code}` : ''}
                </a>

                <div className="mb-8 flex flex-wrap gap-4">
                  {marketCenter.Phone && (
                    <a
                      href={`tel:${marketCenter.Phone}`}
                      className="flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2.5 font-semibold text-kw-secondary transition-colors hover:bg-neutral-100"
                    >
                      <Phone size={16} className="text-kw-primary" /> {marketCenter.Phone}
                    </a>
                  )}
                  {marketCenter.Email && (
                    <a
                      href={`mailto:${marketCenter.Email}`}
                      className="flex items-center gap-2 rounded-xl bg-kw-primary px-4 py-2.5 font-semibold text-white transition-colors hover:bg-kw-primary/90"
                    >
                      <Mail size={16} /> {marketCenter.Email}
                    </a>
                  )}
                </div>

                {marketCenter.Description && (
                  <div className="space-y-4 leading-relaxed whitespace-pre-line text-kw-tertiary">
                    {marketCenter.Description}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="mt-10">
            <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-neutral-200">
              <button
                type="button"
                onClick={() => setTab('agentes')}
                className={`flex items-center gap-2 border-b-2 px-1 pb-3 font-heading text-lg font-bold transition-colors ${
                  tab === 'agentes'
                    ? 'border-kw-primary text-kw-secondary'
                    : 'border-transparent text-kw-tertiary hover:text-kw-secondary'
                }`}
              >
                <Users size={18} /> Agentes ({totalAgents})
              </button>
              <button
                type="button"
                onClick={() => setTab('propiedades')}
                className={`flex items-center gap-2 border-b-2 px-1 pb-3 font-heading text-lg font-bold transition-colors ${
                  tab === 'propiedades'
                    ? 'border-kw-primary text-kw-secondary'
                    : 'border-transparent text-kw-tertiary hover:text-kw-secondary'
                }`}
              >
                <Building2 size={18} />
                Propiedades{propertiesQuery.data ? ` (${totalProperties})` : ''}
              </button>
            </div>

            {tab === 'agentes' && (
              <>
                {agentsQuery.isLoading && (
                  <div className="flex items-center justify-center py-16 text-kw-tertiary">
                    <Loader2 className="mr-2 animate-spin" size={20} /> Cargando agentes...
                  </div>
                )}

                {agentsQuery.isError && (
                  <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-kw-tertiary">
                    No se pudieron cargar los agentes.
                  </div>
                )}

                {!agentsQuery.isLoading && !agentsQuery.isError && agents.length === 0 && (
                  <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-kw-tertiary">
                    Este Market Center todavía no tiene agentes listados.
                  </div>
                )}

                {agents.length > 0 && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {agents.map((agent) => (
                      <AgentCard key={agent.ID} agent={agent} />
                    ))}
                  </div>
                )}

                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </>
            )}

            {tab === 'propiedades' && (
              <>
                {propertiesQuery.isLoading && (
                  <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-kw-tertiary">
                    <Loader2 className="animate-spin" size={20} />
                    Cargando propiedades del Market Center, esto puede tardar unos segundos...
                  </div>
                )}

                {propertiesQuery.isError && (
                  <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-kw-tertiary">
                    No se pudieron cargar las propiedades.
                  </div>
                )}

                {!propertiesQuery.isLoading && !propertiesQuery.isError && properties.length === 0 && (
                  <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-kw-tertiary">
                    Este Market Center todavía no tiene propiedades publicadas.
                  </div>
                )}

                {properties.length > 0 && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => (
                      <PropertyCard key={property.ID} property={property} />
                    ))}
                  </div>
                )}

                <Pagination page={propertiesPage} totalPages={totalPropertiesPages} onPageChange={setPropertiesPage} />
              </>
            )}
          </section>
        </>
      )}
    </main>
  )
}
