'use client'

import { useMemo, useState } from 'react'
import { FileDown, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useMarketCenterAgents } from '../hooks/useMarketCenterAgents'
import { getAgentFullName } from '../lib/format'
import type { Property, PropertyAgent } from '../types'

type PropertyPdfButtonProps = {
  property: Property
  heroPhoto: string | null
  defaultAgent: PropertyAgent | null
}

export function PropertyPdfButton({ property, heroPhoto, defaultAgent }: PropertyPdfButtonProps) {
  const { data } = useMarketCenterAgents(property.Market_Center_ID, 1)
  const agents = data?.data.Agents_Data ?? []

  // La propiedad puede traer un asesor asignado que no venga en la primera
  // página de agentes del Market Center — si pasa, lo agregamos igual a la
  // lista para que siga preseleccionado por default.
  const selectableAgents = useMemo(() => {
    if (!defaultAgent) return agents
    if (agents.some((agent) => agent.ID === defaultAgent.ID)) return agents
    return [defaultAgent, ...agents]
  }, [agents, defaultAgent])

  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(defaultAgent?.ID ?? null)
  const [isGenerating, setIsGenerating] = useState(false)

  const selectedAgent = selectableAgents.find((agent) => agent.ID === selectedAgentId) ?? defaultAgent ?? null

  const handleDownload = async () => {
    setIsGenerating(true)
    try {
      const [{ pdf }, { PropertyPdfDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./PropertyPdfDocument'),
      ])
      const blob = await pdf(
        <PropertyPdfDocument property={property} heroPhoto={heroPhoto} agent={selectedAgent} />,
      ).toBlob()

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `ficha-${property.MLS_Number || property.ID}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch {
      toast.error('No se pudo generar la ficha en PDF. Intenta de nuevo.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {selectableAgents.length > 1 && (
        <select
          value={selectedAgentId ?? ''}
          onChange={(event) => setSelectedAgentId(Number(event.target.value))}
          className="h-12 rounded-sm border border-neutral-300 px-3 text-xs font-semibold text-kw-secondary uppercase outline-none focus:border-kw-primary"
          aria-label="Elegir agente para la ficha en PDF"
        >
          {selectableAgents.map((agent) => (
            <option key={agent.ID} value={agent.ID}>
              {getAgentFullName(agent)}
            </option>
          ))}
        </select>
      )}

      <button
        type="button"
        onClick={handleDownload}
        disabled={isGenerating}
        className="inline-flex items-center gap-2 rounded-sm border border-neutral-300 px-8 py-4 text-xs font-bold tracking-wider text-kw-secondary uppercase transition-colors hover:border-kw-secondary hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} />}
        Descargar ficha PDF
      </button>
    </div>
  )
}
