'use client'

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { searchLocationSuggestions, type GeocodeResult } from '../api/geocode.client'

type LocationAutocompleteBarProps = {
  placeholder?: string
  className?: string
  /** Si viene, el <form> navega ahí de forma nativa cuando el usuario da Enter sin elegir una sugerencia. */
  formAction?: string
  onSelectResult: (result: GeocodeResult) => void
  /** Si viene, se usa en vez de dejar que el <form> navegue de forma nativa. */
  onSubmitText?: (text: string) => void
  /** 'lg' = pill oscuro del Hero. 'sm' = card blanca para usarse dentro de una página con fondo claro. */
  size?: 'lg' | 'sm'
}

export function LocationAutocompleteBar({
  placeholder = 'Busca por calle, colonia, municipio o estado...',
  className,
  formAction,
  onSelectResult,
  onSubmitText,
  size = 'lg',
}: LocationAutocompleteBarProps) {
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

  const selectResult = (result: GeocodeResult) => {
    setQuery(result.display_name)
    setIsOpen(false)
    onSelectResult(result)
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
      selectResult(suggestions[activeIndex])
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!onSubmitText) return
    event.preventDefault()
    if (query.trim()) onSubmitText(query.trim())
  }

  const showDropdown = isOpen && debouncedQuery.length >= 3 && (suggestions.length > 0 || isFetching)

  const isLarge = size === 'lg'

  return (
    <form
      action={formAction}
      method={formAction ? 'get' : undefined}
      onSubmit={handleSubmit}
      className={`mx-auto flex flex-col gap-3 shadow-2xl sm:flex-row sm:items-center ${
        isLarge
          ? 'max-w-5xl rounded-3xl bg-kw-secondary/90 p-3 shadow-black/25 backdrop-blur-md sm:rounded-full'
          : 'max-w-none rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm sm:rounded-full'
      } ${className ?? ''}`}
      role="search"
    >
      <div ref={containerRef} className="relative min-w-0 flex-1">
        <label htmlFor={`location-search-${size}`} className="sr-only">
          Buscar propiedades por ubicación
        </label>
        <div className={`flex min-w-0 items-center gap-3 ${isLarge ? 'px-3 sm:px-4' : 'px-3'}`}>
          <Search
            className={`shrink-0 ${isLarge ? 'text-white/60' : 'text-kw-tertiary'}`}
            size={isLarge ? 26 : 20}
            aria-hidden="true"
          />
          <input
            id={`location-search-${size}`}
            name="ubicacion"
            type="search"
            required
            autoComplete="off"
            placeholder={placeholder}
            className={`min-w-0 flex-1 bg-transparent outline-none ${
              isLarge
                ? 'py-4 text-base text-white placeholder:text-white/55 sm:text-lg'
                : 'py-3 text-sm text-kw-secondary placeholder:text-kw-tertiary'
            }`}
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
                  onClick={() => selectResult(result)}
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
        className={`shrink-0 rounded-full bg-kw-primary font-bold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 ${
          isLarge
            ? 'px-9 py-4 text-base focus-visible:outline-white sm:px-12'
            : 'px-6 py-3 text-sm focus-visible:outline-kw-primary'
        }`}
      >
        Buscar
      </button>
    </form>
  )
}
