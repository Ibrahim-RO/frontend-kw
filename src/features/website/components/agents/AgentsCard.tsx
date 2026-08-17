import { useRouter } from 'next/navigation'
import type { PropertyAgent } from '../../properties/types'

type Props = {
    agentData: PropertyAgent
}

export default function AgentsCard({ agentData }: Props) {
    const router = useRouter();

    return (
        <div className="h-full max-h-64 flex flex-col justify-between items-center gap-3 border p-5 rounded-lg shadow">
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
            <button
                onClick={() => router.push(`agentes/${agentData.ID}`)}
                className="w-full border text-sm font-semibold rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
            >
                Ver Perfil
            </button>
        </div>
    )
}
