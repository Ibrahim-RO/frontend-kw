import AgentDetailPage from '@/src/features/website/components/agents/AgentDetailPage'
import { getAgentById } from '@/src/features/website/services/agentById'

export default async function Page({ params }: PageProps<'/agentes/[id]'>) {
    const { id } = await params
    const response = await getAgentById(id)

    return <AgentDetailPage response={response} />
}
