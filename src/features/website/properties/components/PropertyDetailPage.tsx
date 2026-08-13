'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, Bath, Bed, Car, Loader2, MapPin, Ruler } from 'lucide-react'
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
  const { data, isLoading, isError } = useProperty(id)

  const property = data?.data.Property_Data[0]
  const photos = data?.data.Property_Photos ?? []
  const agent = data?.data.Property_Agent[0]

  return (
    <main className="mx-auto mb-16 max-w-7xl px-4 pt-10">
      <Link
        href="/propiedades"
        className="mb-8 inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-kw-secondary transition-colors hover:bg-neutral-100"
      >
        <ArrowLeft size={16} className="mr-2" /> Volver a Propiedades
      </Link>

      {isLoading && (
        <div className="flex items-center justify-center py-24 text-kw-tertiary">
          <Loader2 className="mr-2 animate-spin" size={20} /> Cargando propiedad...
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-kw-tertiary">
          No se pudo cargar esta propiedad.
        </div>
      )}

      {property && (
        <section className="flex flex-col gap-8 lg:flex-row">
          <div className="flex w-full flex-col gap-6 lg:w-2/3">
            <PropertyGallery property={property} photos={photos} />

            <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl md:p-10">
              <div className="absolute top-0 left-0 h-1 w-full bg-kw-primary" />

              <h1 className="mb-2 font-heading text-3xl font-bold text-kw-secondary md:text-4xl">
                {property.Title}
              </h1>
              <p className="mb-6 flex items-center text-lg text-kw-tertiary">
                <MapPin className="mr-2 text-kw-primary" size={20} /> {property.Geo_Direccion_Completa}
              </p>

              <div className="mb-8 text-3xl font-bold text-kw-primary">
                {formatPrice(property.Current_Price, property.Currency)}{' '}
                <span className="text-sm font-normal text-kw-tertiary">{property.Currency}</span>
              </div>

              <div className="mb-8 grid grid-cols-2 gap-4 border-y border-neutral-200 py-6 md:grid-cols-4">
                {property.Total_Bed != null && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50">
                      <Bed className="text-kw-primary" size={18} />
                    </div>
                    <div>
                      <div className="text-xs tracking-wider text-kw-tertiary uppercase">Recámaras</div>
                      <div className="text-lg font-bold text-kw-secondary">{property.Total_Bed}</div>
                    </div>
                  </div>
                )}
                {property.Total_Bath != null && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50">
                      <Bath className="text-kw-primary" size={18} />
                    </div>
                    <div>
                      <div className="text-xs tracking-wider text-kw-tertiary uppercase">Baños</div>
                      <div className="text-lg font-bold text-kw-secondary">{property.Total_Bath}</div>
                    </div>
                  </div>
                )}
                {property.Living_Area != null && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50">
                      <Ruler className="text-kw-primary" size={18} />
                    </div>
                    <div>
                      <div className="text-xs tracking-wider text-kw-tertiary uppercase">Construcción</div>
                      <div className="text-lg font-bold text-kw-secondary">{property.Living_Area} m²</div>
                    </div>
                  </div>
                )}
                {property.Parking_Total != null && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50">
                      <Car className="text-kw-primary" size={18} />
                    </div>
                    <div>
                      <div className="text-xs tracking-wider text-kw-tertiary uppercase">Garaje</div>
                      <div className="text-lg font-bold text-kw-secondary">{property.Parking_Total}</div>
                    </div>
                  </div>
                )}
              </div>

              <h3 className="mb-4 font-heading text-xl font-bold text-kw-secondary">
                Descripción de la Propiedad
              </h3>
              <div className="space-y-4 leading-relaxed whitespace-pre-line text-kw-tertiary">
                {property.Description}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="sticky top-28 flex flex-col gap-6">
              {agent && <AgentCard agent={agent} />}

              <div className="h-[300px] overflow-hidden rounded-3xl border border-neutral-200 shadow-xl">
                <PropertyLocationMap property={property} />
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
