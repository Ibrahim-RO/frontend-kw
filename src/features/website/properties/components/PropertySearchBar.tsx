'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { searchLocationSuggestions, type GeocodeResult } from '../api/geocode.client'
import { boundsFromGeocodeResult } from '../lib/geocode-bounds'

export function PropertySearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim()), 400)
    return () => clearTimeout(timeout)
  }, [query])

  const { data: suggestions = [], isFetching } = useQuery({
    queryKey: ['location-suggestions', debouncedQuery],
    queryFn: () => searchLocationSuggestions(debouncedQuery),
    enabled: debouncedQuery.length >= 3,
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const goToResult = (result: GeocodeResult) => {
    const bounds = boundsFromGeocodeResult(result)
    const params = new URLSearchParams({
      ubicacion: result.display_name,
      n: String(bounds.TopLeft_Latitude),
      s: String(bounds.BottomRigth_Latitude),
      e: String(bounds.BottomRigth_Longitude),
      w: String(bounds.TopLeft_Longitude),
    })
    setQuery(result.display_name)
    setIsOpen(false)
    router.push(`/propiedades?${params.toString()}`)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => (current - 1 + suggestions.length) % suggestions.length)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      goToResult(suggestions[activeIndex])
    }
  }

  const showDropdown = isOpen && debouncedQuery.length >= 3 && (suggestions.length > 0 || isFetching)

  return (
    <form
      action="/propiedades"
      method="get"
      className="mx-auto mt-10 flex max-w-5xl flex-col gap-3 rounded-3xl bg-kw-secondary/90 p-3 shadow-2xl shadow-black/25 backdrop-blur-md sm:flex-row sm:items-center sm:rounded-full"
      role="search"
    >
      <div ref={containerRef} className="relative min-w-0 flex-1">
        <label htmlFor="hero-property-search" className="sr-only">
          Buscar propiedades por ubicación
        </label>
        <div className="flex min-w-0 items-center gap-3 px-3 sm:px-4">
          <Search className="shrink-0 text-white/60" size={26} aria-hidden="true" />
          <input
            id="hero-property-search"
            name="ubicacion"
            type="search"
            required
            autoComplete="off"
            placeholder="Busca por calle, colonia, municipio o estado..."
            className="min-w-0 flex-1 bg-transparent py-4 text-base text-white outline-none placeholder:text-white/55 sm:text-lg"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setIsOpen(true)
              setActiveIndex(-1)
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {showDropdown && (
          <ul className="absolute inset-x-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-neutral-200 bg-white py-2 text-left shadow-2xl">
            {isFetching && suggestions.length === 0 && (
              <li className="px-4 py-3 text-sm text-kw-tertiary">Buscando...</li>
            )}
            {suggestions.map((result, index) => (
              <li key={`${result.lat}-${result.lon}`}>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => goToResult(result)}
                  className={`block w-full px-4 py-2.5 text-left text-sm text-kw-secondary hover:bg-neutral-100 ${
                    index === activeIndex ? 'bg-neutral-100' : ''
                  }`}
                >
                  {result.display_name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        className="shrink-0 rounded-full bg-kw-primary px-9 py-4 text-base font-bold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-12"
      >
        Buscar
      </button>
    </form>
  )
}
