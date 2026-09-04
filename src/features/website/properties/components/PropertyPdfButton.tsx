'use client'

import { useState } from 'react'
import { FileDown, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { AgentSearchCombobox } from './AgentSearchCombobox'
import type { Property, PropertyAgent } from '../types'

type PropertyPdfButtonProps = {
  property: Property
  heroPhoto: string | null
  defaultAgent: PropertyAgent | null
}

export function PropertyPdfButton({ property, heroPhoto, defaultAgent }: PropertyPdfButtonProps) {
  const [selectedAgent, setSelectedAgent] = useState<PropertyAgent | null>(defaultAgent)
  const [isGenerating, setIsGenerating] = useState(false)

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
      <AgentSearchCombobox value={selectedAgent} onSelect={setSelectedAgent} />

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
