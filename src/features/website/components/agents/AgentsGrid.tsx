import React from 'react'
import type { PropertyAgent } from '../../properties/types'
import AgentsCard from './AgentsCard'

type Props = {
    agentsData: PropertyAgent[]
}

export default function AgentsGrid({ agentsData }: Props) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5'>
            {agentsData.map(item => (
                <AgentsCard key={item.ID} agentData={item}/>
            ))}
        </div>
    )
}
