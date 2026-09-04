'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Loader2, Search, UserRound } from 'lucide-react'
import { useAgents } from '../hooks/useAgents'
import { getAgentFullName } from '../lib/format'
import type { PropertyAgent } from '../types'

type AgentSearchComboboxProps = {
  value: PropertyAgent | null
  onSelect: (agent: PropertyAgent) => void
  placeholder?: string
  className?: string
}

export function AgentSearchCombobox({ value, onSelect, placeholder, className }: AgentSearchComboboxProps) {
  const [query, setQuery] = useState(value ? getAgentFullName(value) : '')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastSelectedId = useRef(value?.ID ?? null)

  useEffect(() => {
    if (value && value.ID !== lastSelectedId.current) {
      setQuery(getAgentFullName(value))
      lastSelectedId.current = value.ID
    }
  }, [value])

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim()), 350)
    return () => clearTimeout(timeout)
  }, [query])

  const searchEnabled = isOpen && debouncedQuery.length >= 2
  const { data, isFetching } = useAgents(1, undefined, debouncedQuery, searchEnabled)
  const results = data?.data.Agents_Data ?? []

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectAgent = (agent: PropertyAgent) => {
    lastSelectedId.current = agent.ID
    setQuery(getAgentFullName(agent))
    setIsOpen(false)
    setActiveIndex(-1)
    onSelect(agent)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => (current - 1 + results.length) % results.length)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      selectAgent(results[activeIndex])
    }
  }

  const showDropdown = isOpen && debouncedQuery.length >= 2 && (results.length > 0 || isFetching)

  return (
    <div ref={containerRef} className={`relative min-w-0 ${className ?? ''}`}>
      <div className="flex h-12 min-w-56 items-center gap-2 rounded-sm border border-neutral-300 bg-white px-3 focus-within:border-kw-primary">
        <Search size={15} className="shrink-0 text-kw-tertiary" aria-hidden="true" />
        <input
          type="search"
          autoComplete="off"
          value={query}
          placeholder={placeholder ?? 'Buscar agente por nombre...'}
          aria-label="Buscar agente por nombre para la ficha en PDF"
          className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-kw-secondary uppercase outline-none placeholder:normal-case placeholder:font-normal placeholder:text-kw-tertiary"
          onChange={(event) => {
            setQuery(event.target.value)
            setIsOpen(true)
            setActiveIndex(-1)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {isFetching && <Loader2 size={14} className="shrink-0 animate-spin text-kw-tertiary" />}
      </div>

      {showDropdown && (
        <ul className="absolute inset-x-0 top-full z-20 mt-1.5 max-h-72 overflow-y-auto rounded-lg border border-neutral-200 bg-white py-1.5 shadow-xl">
          {results.length === 0 && isFetching && (
            <li className="px-4 py-3 text-sm text-kw-tertiary">Buscando...</li>
          )}
          {results.map((agent, index) => (
            <li key={agent.ID}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectAgent(agent)}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-neutral-100 ${
                  index === activeIndex ? 'bg-neutral-100' : ''
                }`}
              >
                {agent.Agent_Photo_url ? (
                  <img src={agent.Agent_Photo_url} alt="" className="size-8 shrink-0 rounded-full object-cover" />
                ) : (
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                    <UserRound size={15} />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-kw-secondary">
                    {getAgentFullName(agent)}
                  </span>
                  {agent.Market_Center && (
                    <span className="block truncate text-xs text-kw-tertiary">{agent.Market_Center}</span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
