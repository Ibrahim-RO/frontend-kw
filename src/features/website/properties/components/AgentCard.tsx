import Link from 'next/link'
import { Mail, Phone, User } from 'lucide-react'
import type { PropertyAgent } from '../types'
import { getAgentFullName } from '../lib/format'
import { LuxuryRibbon } from '@/src/shared/components/LuxuryRibbon'

export function AgentCard({ agent }: { agent: PropertyAgent }) {
  const fullName = getAgentFullName(agent)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-7 text-center">
      {agent.Luxury === 1 && <LuxuryRibbon />}
      <Link href={`/agentes/${agent.ID}`} className="group block">
        {agent.Agent_Photo_url ? (
          <img
            src={agent.Agent_Photo_url}
            alt={fullName}
            className="mx-auto mb-4 h-16 w-16 rounded-full object-cover transition-opacity group-hover:opacity-80"
          />
        ) : (
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-200 text-neutral-400 transition-opacity group-hover:opacity-80">
            <User size={26} />
          </div>
        )}

        <h4 className="mb-0.5 font-heading text-base font-extrabold text-kw-secondary group-hover:text-kw-primary">
          {fullName}
        </h4>
      </Link>
      <p className="mb-3.5 text-xs font-extrabold tracking-wide text-kw-primary uppercase">
        {agent.Market_Center ?? 'KW México'}
      </p>

      {agent.City && <p className="mb-2 text-sm text-kw-tertiary capitalize">{agent.City}</p>}

      <div className="flex flex-col gap-2">
        {agent.Email && (
          <a
            href={`mailto:${agent.Email}`}
            className="flex items-center justify-center gap-2 rounded-sm bg-kw-primary py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-kw-secondary"
          >
            <Mail size={14} /> Enviar correo
          </a>
        )}
        {(agent.Phone || agent.Mobile_Phone) && (
          <a
            href={`tel:${agent.Phone ?? agent.Mobile_Phone}`}
            className="flex items-center justify-center gap-2 rounded-sm border border-neutral-300 py-3 text-xs font-bold tracking-wider text-kw-secondary uppercase transition-colors hover:bg-neutral-100"
          >
            <Phone size={14} /> {agent.Phone ?? agent.Mobile_Phone}
          </a>
        )}
      </div>
    </div>
  )
}
