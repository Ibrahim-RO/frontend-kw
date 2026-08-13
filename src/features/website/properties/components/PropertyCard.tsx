import Link from 'next/link'
import { Bath, Bed, MapPin } from 'lucide-react'
import type { Property } from '../types'
import { formatPrice, getPropertyLocation, isRental } from '../lib/format'
import { getOperationLabel } from '../lib/property-options'

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/propiedades/${property.ID}`}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:border-kw-primary/50 hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden bg-neutral-100">
        {property.Photo_URL ? (
          <img
            src={property.Photo_URL}
            alt={property.Title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-kw-tertiary">
            Sin foto
          </div>
        )}
        <div className="absolute top-3 right-3 rounded-full bg-kw-primary px-3 py-1 text-xs font-bold text-white shadow-md">
          {getOperationLabel(property.Property_Operation_ID)}
        </div>
      </div>

      <div className="p-4 md:p-5">
        <h3 className="mb-2 line-clamp-1 font-heading text-lg font-bold text-kw-secondary">
          {property.Title}
        </h3>
        <p className="mb-4 flex items-center text-xs text-kw-tertiary md:text-sm">
          <MapPin className="mr-1.5 text-kw-primary" size={14} />
          {getPropertyLocation(property)}
        </p>
        <div className="flex items-center justify-between border-t border-neutral-200 pt-3">
          <div className="text-lg font-bold text-kw-primary md:text-xl">
            {formatPrice(property.Current_Price, property.Currency)}
            {isRental(property) && <span className="text-xs font-normal text-kw-tertiary">/mes</span>}
          </div>
          <div className="flex gap-2.5 text-xs text-kw-tertiary">
            {property.Total_Bed != null && (
              <span className="flex items-center gap-1">
                <Bed size={14} /> {property.Total_Bed}
              </span>
            )}
            {property.Total_Bath != null && (
              <span className="flex items-center gap-1">
                <Bath size={14} /> {property.Total_Bath}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
