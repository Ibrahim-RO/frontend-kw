import { useRouter } from 'next/navigation'
import { Mail, Phone } from 'lucide-react'
import type { PropertyAgent } from '../../properties/types'

type Props = {
    agentData: PropertyAgent
}

export default function AgentsCard({ agentData }: Props) {
    const router = useRouter();
    const phone = agentData.Mobile_Phone || agentData.Phone;

    return (
        <div className="h-full flex flex-col justify-between items-center gap-3 border p-5 rounded-lg shadow">
            {agentData.Agent_Photo_url ? (
                <img
                    src={agentData.Agent_Photo_url}
                    alt={`${agentData.First_Name} ${agentData.Last_Name}`}
                    className="size-20 object-cover rounded-full border"
                />
            ) : (
                <div className="flex size-20 items-center justify-center rounded-full border bg-neutral-100 text-xl font-bold text-kw-tertiary">
                    {agentData.First_Name.charAt(0)}{agentData.Last_Name.charAt(0)}
                </div>
            )}
            <div className="text-center space-y-1">
                <p className="font-bold">{agentData.First_Name} {agentData.Last_Name}</p>
                <p className="text-sm text-[#CE011F]">{agentData.Market_Center}</p>
            </div>
            <div className="grid w-full grid-cols-2 gap-2">
                {agentData.Email ? (
                    <a
                        href={`mailto:${agentData.Email}`}
                        className="inline-flex items-center justify-center rounded-lg bg-kw-primary p-2 text-white transition-colors duration-300 hover:bg-red-800"
                        aria-label={`Enviar correo a ${agentData.First_Name} ${agentData.Last_Name}`}
                        title="Enviar correo"
                    >
                        <Mail size={16} aria-hidden="true" />
                    </a>
                ) : (
                    <button type="button" disabled className="inline-flex items-center justify-center rounded-lg bg-neutral-200 p-2 text-neutral-400" aria-label="Correo no disponible" title="Correo no disponible">
                        <Mail size={16} aria-hidden="true" />
                    </button>
                )}
                {phone ? (
                    <a
                        href={`tel:${phone}`}
                        className="inline-flex items-center justify-center rounded-lg border border-kw-primary p-2 text-kw-primary transition-colors duration-300 hover:bg-kw-primary hover:text-white"
                        aria-label={`Llamar a ${agentData.First_Name} ${agentData.Last_Name}`}
                        title="Llamar"
                    >
                        <Phone size={16} aria-hidden="true" />
                    </a>
                ) : (
                    <button type="button" disabled className="inline-flex items-center justify-center rounded-lg bg-neutral-200 p-2 text-neutral-400" aria-label="Teléfono no disponible" title="Teléfono no disponible">
                        <Phone size={16} aria-hidden="true" />
                    </button>
                )}
            </div>
            <button
                onClick={() => router.push(`agentes/${agentData.ID}`)}
                className="w-full border text-sm font-semibold rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
            >
                Ver Perfil
            </button>
        </div>
    )
}
