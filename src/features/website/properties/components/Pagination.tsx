import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getPageNumbers } from '../lib/pagination'

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(page, totalPages)

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Paginación">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 text-kw-secondary transition-colors hover:bg-neutral-100 disabled:opacity-40"
        aria-label="Página anterior"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((p, index) =>
        p === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="px-2 text-kw-tertiary">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
              p === page
                ? 'bg-kw-primary text-white'
                : 'border border-neutral-300 text-kw-secondary hover:bg-neutral-100'
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 text-kw-secondary transition-colors hover:bg-neutral-100 disabled:opacity-40"
        aria-label="Página siguiente"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  )
}
