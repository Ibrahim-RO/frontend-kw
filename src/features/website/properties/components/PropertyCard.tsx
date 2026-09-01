import Link from 'next/link'
import type { Property } from '../types'
import { formatPrice, getAgentFullName, getPropertyLocation, isRental } from '../lib/format'
import { getOperationLabel } from '../lib/property-options'
import { useAgent } from '../hooks/useAgent'
import { LuxuryRibbon } from '@/src/shared/components/LuxuryRibbon'

export function PropertyCard({ property }: { property: Property }) {
  const { data: agent } = useAgent(property.Agent_ID)

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      {property.Luxury === 1 && <LuxuryRibbon />}
      <Link href={`/propiedades/${property.ID}`} className="relative block aspect-4/3 overflow-hidden bg-neutral-900">
        {property.Photo_URL ? (
          <img
            src={property.Photo_URL}
            alt={property.Title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">Sin foto</div>
        )}
        <span className="absolute top-3.5 left-3.5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-xs font-bold tracking-wide text-white uppercase backdrop-blur-sm">
          {getOperationLabel(property.Property_Operation_ID)}
        </span>
      </Link>

      <div className="p-5">
        <div className="mb-1.5 text-xl font-extrabold text-kw-primary">
          {formatPrice(property.Current_Price, property.Currency)}
          {isRental(property) && <span className="text-xs font-normal text-kw-tertiary">/mes</span>}
        </div>
        <Link href={`/propiedades/${property.ID}`}>
          <h3 className="mb-1.5 line-clamp-2 font-heading text-base leading-tight font-bold text-kw-secondary hover:text-kw-primary">
            {property.Title}
          </h3>
        </Link>
        <p className="mb-3.5 text-xs text-kw-tertiary">{getPropertyLocation(property) || property.Geo_Direccion_Completa}</p>

        <ul className="mb-4 flex flex-wrap gap-2">
          {property.Total_Bed != null && (
            <li className="rounded-md bg-neutral-100 px-2.5 py-1.5 text-xs font-semibold text-neutral-700">
              {property.Total_Bed} Rec
            </li>
          )}
          {property.Total_Bath != null && (
            <li className="rounded-md bg-neutral-100 px-2.5 py-1.5 text-xs font-semibold text-neutral-700">
              {property.Total_Bath} Baños
            </li>
          )}
          {property.Living_Area != null && (
            <li className="rounded-md bg-neutral-100 px-2.5 py-1.5 text-xs font-semibold text-neutral-700">
              {property.Living_Area} m²
            </li>
          )}
        </ul>

        <div className="border-t border-neutral-200 pt-3.5">
          <div className="mb-3">
            <span className="block text-xs tracking-wide text-neutral-400 uppercase">Asesor asignado</span>
            <span className="block text-sm font-bold text-kw-secondary">
              {agent ? getAgentFullName(agent) : 'KW México'}
            </span>
          </div>
          <Link
            href={`/propiedades/${property.ID}`}
            className="block w-full rounded-sm bg-kw-primary px-4 py-2.5 text-center text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-kw-secondary"
          >
            Ver detalles
          </Link>
        </div>
        <p className="mt-3 text-xs text-neutral-400">Clave interna: {property.MLS_Number}</p>
      </div>
    </article>
  )
}
