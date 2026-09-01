import Link from 'next/link'
import type { Property } from '@/src/features/website/properties/types'
import { formatPrice, getPropertyLocation, isRental } from '@/src/features/website/properties/lib/format'
import { LuxuryRibbon } from '@/src/shared/components/LuxuryRibbon'

export function NearbyPropertyCard({ property }: { property: Property }) {
  const specs = [
    property.Total_Bed != null ? `${property.Total_Bed} rec` : null,
    property.Total_Bath != null ? `${property.Total_Bath} baños` : null,
    property.Living_Area != null ? `${property.Living_Area} m²` : null,
  ].filter(Boolean)

  return (
    <article className="relative w-44 shrink-0 snap-start overflow-hidden rounded-xl border border-neutral-200 bg-white p-3 shadow-md transition-shadow hover:shadow-lg sm:w-48">
      {property.Luxury === 1 && <LuxuryRibbon size="sm" />}
      <Link
        href={`/propiedades/${property.ID}`}
        className="block aspect-4/3 overflow-hidden rounded-lg bg-neutral-900"
      >
        {property.Photo_URL ? (
          <img
            src={property.Photo_URL}
            alt={property.Title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">Sin foto</div>
        )}
      </Link>

      <p className="mt-2.5 text-sm font-bold text-kw-secondary">
        {formatPrice(property.Current_Price, property.Currency)}
        {isRental(property) && <span className="text-[10px] font-normal text-kw-tertiary">/mes</span>}
      </p>
      <p className="mt-1 text-[11px] leading-tight font-semibold text-kw-primary">
        {specs.join(' | ')}{' '}
        <Link href={`/propiedades/${property.ID}`} className="underline hover:text-kw-secondary">
          (detalles)
        </Link>
      </p>
      <p className="mt-1 truncate text-[11px] text-kw-tertiary">
        {getPropertyLocation(property) || property.Geo_Direccion_Completa}
      </p>
    </article>
  )
}
