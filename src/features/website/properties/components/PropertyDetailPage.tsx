'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowLeft, Bath, BedDouble, Building2, CarFront, Loader2, Mail, MapPin, Phone, Ruler, User } from 'lucide-react'
import { useProperty } from '../hooks/useProperty'
import { PropertyGallery } from './PropertyGallery'
import { formatPrice, getAgentFullName, isRental } from '../lib/format'
import { getOperationLabel } from '../lib/property-options'
import type { PropertyAgent } from '../types'
import { useRouter } from 'next/navigation'

const PropertyLocationMap = dynamic(() => import('./PropertyLocationMap'), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-sm text-kw-tertiary">Cargando mapa...</div>,
})

function PropertyAgentCard({ agent }: { agent: PropertyAgent }) {
  const fullName = getAgentFullName(agent)
  const phone = agent.Mobile_Phone || agent.Phone

  return (
    <aside className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
      <div className="h-2 bg-kw-primary" />
      <div className="p-7 text-center">
        {agent.Agent_Photo_url ? (
          <img src={agent.Agent_Photo_url} alt={fullName} className="mx-auto size-20 rounded-full border-4 border-white object-cover shadow-lg" />
        ) : (
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-neutral-100 text-neutral-400"><User size={30} /></div>
        )}
        <h2 className="mt-4 font-heading text-xl font-extrabold text-kw-secondary">{fullName}</h2>
        <p className="mt-1 text-xs font-bold uppercase tracking-wider text-kw-primary">{agent.Market_Center || 'Asesor inmobiliario KW'}</p>
        <div className="mt-6 flex flex-col gap-3">
          {agent.Email && <a href={`mailto:${agent.Email}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-kw-primary px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-red-800"><Mail size={16} /> Contactar agente</a>}
          {phone && <a href={`tel:${phone}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-5 py-3.5 text-sm font-bold text-kw-secondary transition-colors hover:border-kw-primary hover:text-kw-primary"><Phone size={16} /> {phone}</a>}
        </div>
      </div>
    </aside>
  )
}

export function PropertyDetailPage({ id }: { id: string }) {
  const router = useRouter();
  const { data, isLoading, isError } = useProperty(id)
  const property = data?.data.Property_Data[0]
  const photos = data?.data.Property_Photos ?? []
  const agent = data?.data.Property_Agent[0]

  if (isLoading) return <div className="flex items-center justify-center py-32 text-kw-tertiary"><Loader2 className="mr-2 animate-spin" size={20} /> Cargando propiedad...</div>
  if (isError || !property) return <div className="mx-auto max-w-7xl px-5 py-24"><div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-kw-tertiary">No se pudo cargar esta propiedad.</div></div>

  const area = property.Living_Area || property.Lot_Size_Area
  const location = property.Geo_Direccion_Completa || [property.City, property.State].filter(Boolean).join(', ')
  const parking = property.Parking_Total ?? (property.Has_Parking || property.Has_Garage ? 1 : 0)

  return (
    <main className="bg-neutral-50 pb-20">
      <div className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm font-semibold text-kw-tertiary transition-colors hover:text-kw-primary"><ArrowLeft size={17} /> Volver al Agente</button>

        <div className="mt-7 grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <div className="min-w-0 space-y-7">
            <PropertyGallery property={property} photos={photos} />

            <section className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-9">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-kw-primary" />
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h1 className="font-heading text-2xl font-extrabold leading-tight text-kw-secondary md:text-3xl">{property.Title}</h1>
                  <p className="mt-2 flex items-start gap-1.5 text-sm text-kw-tertiary"><MapPin className="mt-0.5 shrink-0 text-kw-primary" size={16} />{location}</p>
                </div>
                <span className="w-fit shrink-0 rounded-full bg-kw-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-kw-primary">{getOperationLabel(property.Property_Operation_ID)}</span>
              </div>

              <p className="mt-6 text-3xl font-black text-kw-primary">{formatPrice(property.Current_Price, property.Currency)}<span className="ml-1.5 text-xs font-semibold text-kw-tertiary">{property.Currency}{isRental(property) ? ' / mes' : ''}</span></p>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-neutral-200 py-5 sm:grid-cols-4">
                <Stat icon={<BedDouble size={18} />} label="Recámaras" value={property.Total_Bed ?? '—'} />
                <Stat icon={<Bath size={18} />} label="Baños" value={property.Total_Bath ?? '—'} />
                <Stat icon={<Ruler size={18} />} label="Superficie" value={area ? `${area} m²` : '—'} />
                <Stat icon={property.Has_Parking || property.Has_Garage ? <CarFront size={18} /> : <Building2 size={18} />} label="Estacionamiento" value={parking} />
              </dl>

              <div className="mt-7">
                <h2 className="font-heading text-lg font-extrabold text-kw-secondary">Descripción de la propiedad</h2>
                <p className="mt-4 text-sm leading-7 whitespace-pre-line text-kw-tertiary">{property.Description}</p>
              </div>
              <p className="mt-7 border-t border-neutral-200 pt-4 text-xs text-neutral-400">Clave interna: {property.MLS_Number} · N.º de listing: {property.Property_Command_ID}</p>
            </section>
          </div>

          <div className="space-y-5 lg:sticky lg:top-28">
            {agent ? <PropertyAgentCard agent={agent} /> : <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-center text-sm text-kw-tertiary">Asesor no disponible.</div>}
            <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm" aria-label="Ubicación de la propiedad">
              <div className="h-80 lg:h-72"><PropertyLocationMap key={property.ID} property={property} /></div>
              <div className="flex items-start gap-2 border-t border-neutral-200 p-4 text-xs leading-relaxed text-kw-tertiary"><MapPin className="mt-0.5 shrink-0 text-kw-primary" size={15} />{location}</div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  return <div className="flex items-center gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-kw-primary/10 text-kw-primary">{icon}</span><div className="min-w-0"><dt className="text-[10px] font-bold uppercase tracking-wider text-kw-tertiary">{label}</dt><dd className="font-bold text-kw-secondary">{value}</dd></div></div>
}
