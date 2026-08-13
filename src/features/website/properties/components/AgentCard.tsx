import { Mail, Phone } from 'lucide-react'
import type { PropertyAgent } from '../types'
import { getAgentFullName } from '../lib/format'

export function AgentCard({ agent }: { agent: PropertyAgent }) {
  const fullName = getAgentFullName(agent)

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl">
      <div className="flex flex-col items-center">
        {agent.Agent_Photo_url ? (
          <img
            src={agent.Agent_Photo_url}
            alt={fullName}
            className="mb-4 h-24 w-24 rounded-full border-4 border-neutral-100 object-cover shadow-xl"
          />
        ) : (
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-neutral-100 bg-neutral-100 text-2xl font-bold text-kw-tertiary shadow-xl">
            {fullName.charAt(0)}
          </div>
        )}
        <h3 className="mb-1 font-heading text-xl font-bold text-kw-secondary">{fullName}</h3>
        <p className="mb-6 text-sm font-medium text-kw-primary">
          Asesor Inmobiliario KW{agent.Market_Center ? ` · ${agent.Market_Center}` : ''}
        </p>

        {agent.Email && (
          <a
            href={`mailto:${agent.Email}`}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-kw-primary py-3 text-center font-bold text-white shadow-lg transition-all hover:bg-kw-primary/90"
          >
            <Mail size={16} /> Contactar Agente
          </a>
        )}

        {(agent.Phone || agent.Mobile_Phone) && (
          <a
            href={`tel:${agent.Phone ?? agent.Mobile_Phone}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 py-3 text-center font-bold text-kw-secondary transition-all hover:bg-neutral-100"
          >
            <Phone size={16} /> {agent.Phone ?? agent.Mobile_Phone}
          </a>
        )}
      </div>
    </div>
  )
}
