import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getPageNumbers } from '@/src/shared/lib/pagination'

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(page, totalPages)

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Paginación">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-40"
        aria-label="Página anterior"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((p, index) =>
        p === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="px-1 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors',
              p === page
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-foreground hover:bg-accent hover:text-accent-foreground',
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-40"
        aria-label="Página siguiente"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
