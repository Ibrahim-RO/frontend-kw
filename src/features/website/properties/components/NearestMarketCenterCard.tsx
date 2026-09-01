import Link from 'next/link'
import { ArrowRight, MapPin, Navigation } from 'lucide-react'
import type { MarketCenter } from '../types'

type NearestMarketCenterCardProps = {
  marketCenter: MarketCenter
  distanceKm: number
}

// Tarjeta destacada, separada del grid, para el Market Center más cercano a
// la ubicación del usuario. Mismo borde/fondo claro que MarketCenterCard
// (sitio normal, no colores del panel) — se distingue del grid por tamaño,
// layout horizontal y el badge, no por el color del borde ni un fondo oscuro.
export function NearestMarketCenterCard({ marketCenter, distanceKm }: NearestMarketCenterCardProps) {
  const formattedDistance = distanceKm < 10 ? distanceKm.toFixed(1) : Math.round(distanceKm).toString()

  return (
    <Link
      href={`/centros-de-mercado/${marketCenter.ID}`}
      className="group relative mb-10 flex flex-col gap-6 overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-lg transition-all duration-300 hover:border-kw-primary/50 hover:shadow-2xl sm:flex-row sm:items-center md:p-10"
    >
      {marketCenter.Logo_Url_One && (
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white p-3 sm:h-28 sm:w-28">
          <img
            src={marketCenter.Logo_Url_One}
            alt={marketCenter.Market_Center}
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-kw-primary px-3 py-1 text-[11px] font-extrabold tracking-[0.12em] text-white uppercase">
          <Navigation size={12} /> Más cercano a ti
        </span>
        <h2 className="font-heading text-2xl font-bold text-kw-secondary sm:text-3xl">
          {marketCenter.Market_Center}
        </h2>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-kw-tertiary">
          <span className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0 text-kw-primary" />
            {marketCenter.Municipality}, {marketCenter.State}
          </span>
          <span className="rounded-full bg-kw-primary/10 px-2.5 py-0.5 text-xs font-semibold text-kw-primary">
            a {formattedDistance} km de ti
          </span>
        </p>
      </div>

      <div className="flex shrink-0 items-center self-start sm:self-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-kw-primary px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-kw-primary/90">
          Ver Market Center <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  )
}
