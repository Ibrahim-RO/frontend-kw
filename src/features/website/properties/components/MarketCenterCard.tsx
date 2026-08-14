import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import type { MarketCenter } from '../types'

export function MarketCenterCard({ marketCenter }: { marketCenter: MarketCenter }) {
  return (
    <Link
      href={`/centros-de-mercado/${marketCenter.ID}`}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:border-kw-primary/50 hover:shadow-lg"
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-neutral-100">
        {marketCenter.Logo_Url_One ? (
          <img
            src={marketCenter.Logo_Url_One}
            alt={marketCenter.Market_Center}
            className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-kw-tertiary">
            Sin logo
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="mb-2 font-heading text-lg font-bold text-kw-secondary">
          {marketCenter.Market_Center}
        </h3>
        <p className="mb-4 flex items-start gap-1.5 text-sm text-kw-tertiary">
          <MapPin className="mt-0.5 shrink-0 text-kw-primary" size={14} />
          <span>
            {marketCenter.Municipality}, {marketCenter.State}
          </span>
        </p>

        <div className="flex flex-col gap-2 border-t border-neutral-200 pt-3 text-sm">
          {marketCenter.Phone && (
            <span className="flex items-center gap-2 text-kw-secondary">
              <Phone className="text-kw-primary" size={14} /> {marketCenter.Phone}
            </span>
          )}
          {marketCenter.Email && (
            <span className="flex items-center gap-2 text-kw-secondary">
              <Mail className="text-kw-primary" size={14} /> {marketCenter.Email}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
