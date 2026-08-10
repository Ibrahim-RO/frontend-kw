import { cn } from '@/lib/utils'
import type { BlogStatus } from '../types'

const STATUS_LABEL: Record<BlogStatus, string> = {
  borrador: 'Borrador',
  publicado: 'Publicado',
  eliminado: 'Eliminado',
}

const STATUS_CLASSNAME: Record<BlogStatus, string> = {
  borrador: 'bg-muted text-muted-foreground',
  publicado: 'bg-primary/10 text-primary',
  eliminado: 'bg-destructive/10 text-destructive',
}

export function BlogStatusBadge({ status }: { status: BlogStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        STATUS_CLASSNAME[status],
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}
