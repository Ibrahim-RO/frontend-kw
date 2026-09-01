import { Crown } from 'lucide-react'
import { cn } from '@/lib/utils'

type LuxuryRibbonProps = {
  className?: string
}

// Cintillo diagonal para tarjetas de propiedades/agentes con distintivo
// Luxury en el API. El contenedor padre debe tener `relative overflow-hidden`
// para que la esquina se recorte como listón, en vez de salirse de la tarjeta.
export function LuxuryRibbon({ className }: LuxuryRibbonProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute top-5 -right-11 z-20 w-40 rotate-45 bg-kw-secondary py-1 text-center shadow-md',
        className,
      )}
    >
      <span className="flex items-center justify-center gap-1 text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
        <Crown className="size-3" />
        Luxury
      </span>
    </div>
  )
}
