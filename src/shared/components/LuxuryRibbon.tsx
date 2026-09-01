import { Crown } from 'lucide-react'
import { cn } from '@/lib/utils'

type LuxuryRibbonProps = {
  className?: string
  size?: 'md' | 'sm'
}

// Cintillo diagonal para tarjetas de propiedades/agentes con distintivo
// Luxury en el API. El contenedor padre debe tener `relative overflow-hidden`
// para que la esquina se recorte como listón, en vez de salirse de la tarjeta.
// `size="sm"` es para tarjetas chicas (ej. el carrusel del home), donde la
// variante normal se ve desproporcionada.
export function LuxuryRibbon({ className, size = 'md' }: LuxuryRibbonProps) {
  const isSmall = size === 'sm'

  return (
    <div
      className={cn(
        'pointer-events-none absolute rotate-45 bg-kw-secondary text-center shadow-md',
        isSmall ? 'top-3 -right-7 z-20 w-24 py-0.5' : 'top-5 -right-11 z-20 w-40 py-1',
        className,
      )}
    >
      <span
        className={cn(
          'flex items-center justify-center font-bold text-[#D4AF37] uppercase',
          isSmall ? 'gap-0.5 text-[7px] tracking-[0.1em]' : 'gap-1 text-[10px] tracking-[0.2em]',
        )}
      >
        <Crown className={isSmall ? 'size-2' : 'size-3'} />
        Luxury
      </span>
    </div>
  )
}
