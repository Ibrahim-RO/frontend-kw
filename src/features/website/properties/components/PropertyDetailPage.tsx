'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, MapPin } from 'lucide-react'
import { useProperty } from '../hooks/useProperty'
import { PropertyGallery } from './PropertyGallery'
import { AgentCard } from './AgentCard'
import { formatPrice } from '../lib/format'

const PropertyLocationMap = dynamic(() => import('./PropertyLocationMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-kw-tertiary">
      Cargando mapa...
    </div>
  ),
})

export function PropertyDetailPage({ id }: { id: string }) {
  const router = useRouter()
  const { data, isLoading, isError } = useProperty(id)

  const property = data?.data.Property_Data[0]
  const photos = data?.data.Property_Photos ?? []
  const agent = data?.data.Property_Agent[0]
  const heroPhoto = photos[0]?.Photo_URL ?? property?.Photo_URL

  // El botón de "regresar" de arriba debe volver a donde sea que estaba el
  // usuario (listado de propiedades, o el detalle de un agente si llegó
  // desde ahí), no siempre al listado general.
  const [backLabel, setBackLabel] = useState('Regresar a ver Propiedades')
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    if (!document.referrer) return
    try {
      const referrerUrl = new URL(document.referrer)
      if (referrerUrl.origin !== window.location.origin) return
      setCanGoBack(true)
      if (referrerUrl.pathname.startsWith('/agentes')) {
        setBackLabel('Regresar al Agente')
      }
    } catch {
      // referrer invalido, se queda el link fijo a /propiedades por default
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-kw-tertiary">
        <Loader2 className="mr-2 animate-spin" size={20} /> Cargando propiedad...
      </div>
    )
  }

  if (isError || !property) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-kw-tertiary">
          No se pudo cargar esta propiedad.
        </div>
      </div>
    )
  }

  return (
    <main className="pb-16">
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-4">
        <button
          type="button"
          onClick={() => (canGoBack ? router.back() : router.push('/propiedades'))}
          className="inline-flex items-center gap-2 text-sm font-semibold text-kw-secondary transition-colors hover:text-kw-primary"
        >
          <ArrowLeft size={16} /> {backLabel}
        </button>
      </div>

      {heroPhoto && (
        <div className="aspect-[16/6] w-full overflow-hidden bg-neutral-100 md:aspect-[16/5]">
          <img src={heroPhoto} alt={property.Title} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 pt-10">
        <div className="mb-16 grid grid-cols-1 items-start gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div className="min-w-0">
            <h1 className="mb-2.5 font-heading text-2xl leading-tight font-extrabold tracking-wide text-kw-secondary uppercase md:text-3xl">
              {property.Title}
            </h1>
            <div className="mb-2 text-xl font-extrabold text-kw-secondary">
              {formatPrice(property.Current_Price, property.Currency)}{' '}
              <span className="text-sm font-normal text-kw-tertiary">{property.Currency}</span>
            </div>
            <p className="mb-1.5 flex items-center gap-1.5 text-sm text-kw-tertiary">
              <MapPin size={14} className="shrink-0 text-kw-primary" /> {property.Geo_Direccion_Completa}
            </p>
            <p className="mb-7 font-mono text-xs text-neutral-400">
              Clave interna: {property.MLS_Number} · N.º de listing: {property.Property_Command_ID}
            </p>

            <div className="mb-8">
              <h3 className="mb-2.5 text-sm font-extrabold tracking-wide text-kw-secondary uppercase">
                Descripción
              </h3>
              <p className="text-sm leading-relaxed whitespace-pre-line text-kw-tertiary">{property.Description}</p>
            </div>

            <div className="mb-9 grid grid-cols-1 gap-6 border-t border-neutral-200 pt-6 sm:grid-cols-2">
              <div>
                <h4 className="mb-2 text-xs font-extrabold tracking-wide text-kw-secondary uppercase">
                  Habitaciones
                </h4>
                <p className="text-sm text-kw-tertiary">
                  {property.Total_Bed ?? '—'} Hab | {property.Total_Bath ?? '—'} Baños
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-xs font-extrabold tracking-wide text-kw-secondary uppercase">
                  Terreno y estacionamiento
                </h4>
                <p className="text-sm text-kw-tertiary">
                  {property.Lot_Size_Area ? `${property.Lot_Size_Area} m² de terreno` : 'Terreno no especificado'}
                  {property.Parking_Total != null && ` · ${property.Parking_Total} estacionamiento(s)`}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/propiedades"
                className="rounded-sm border border-neutral-300 px-8 py-4 text-xs font-bold tracking-wider text-kw-secondary uppercase transition-colors hover:border-kw-secondary hover:bg-neutral-50"
              >
                Regresar a ver Propiedades
              </Link>
              <a
                href="#asesor"
                className="rounded-sm bg-kw-primary px-8 py-4 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-kw-secondary"
              >
                Contáctame
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <PropertyGallery property={property} photos={photos} />
          </div>
        </div>

        <div id="asesor" className="grid grid-cols-1 gap-6 border-t border-neutral-200 pt-12 lg:grid-cols-[320px_1fr]">
          {agent ? (
            <AgentCard agent={agent} />
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-7 text-center text-sm text-kw-tertiary">
              Asesor no disponible.
            </div>
          )}
          <div className="min-h-64 min-w-0 overflow-hidden rounded-2xl border border-neutral-200">
            <PropertyLocationMap key={property.ID} property={property} />
          </div>
        </div>
      </div>
    </main>
  )
}
