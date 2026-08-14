'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import { useMarketCenter } from '../hooks/useMarketCenter'
import { AGENTS_PAGE_SIZE, useMarketCenterAgents } from '../hooks/useMarketCenterAgents'
import { AgentCard } from './AgentCard'
import { Pagination } from './Pagination'

export function MarketCenterDetailPage({ id }: { id: string }) {
  const { data, isLoading, isError } = useMarketCenter(id)
  const marketCenter = data?.data[0]

  const [page, setPage] = useState(1)
  useEffect(() => {
    setPage(1)
  }, [id])

  const agentsQuery = useMarketCenterAgents(id, page)
  const agents = agentsQuery.data?.data.Agents_Data ?? []
  const totalAgents = agentsQuery.data?.data.Total_Agents ?? 0
  const totalPages = Math.max(1, Math.ceil(totalAgents / AGENTS_PAGE_SIZE))

  return (
    <main className="mx-auto mb-16 max-w-7xl px-4 pt-10">
      <Link
        href="/centros-de-mercado"
        className="mb-8 inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-kw-secondary transition-colors hover:bg-neutral-100"
      >
        <ArrowLeft size={16} className="mr-2" /> Volver a Centros de Mercado
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
                <p className="mb-6 flex items-center text-lg text-kw-tertiary">
                  <MapPin className="mr-2 shrink-0 text-kw-primary" size={20} />
                  {marketCenter.Street}, {marketCenter.Municipality}, {marketCenter.State}
                  {marketCenter.Postal_Code ? `, ${marketCenter.Postal_Code}` : ''}
                </p>

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
            <h2 className="mb-6 border-l-4 border-kw-primary pl-4 font-heading text-2xl font-bold text-kw-secondary">
              Agentes ({totalAgents})
            </h2>

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
          </section>
        </>
      )}
    </main>
  )
}
