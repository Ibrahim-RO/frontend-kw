import { Search } from 'lucide-react'

export function SearchBar() {
  return (
    <div className="relative hidden w-full max-w-sm sm:block">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        placeholder="Buscar..."
        className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
      />
    </div>
  )
}
