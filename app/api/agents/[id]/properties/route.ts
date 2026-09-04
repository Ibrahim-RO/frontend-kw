import { NextRequest, NextResponse } from 'next/server'
import { getAgentById } from '@/src/features/website/services/agentById'
import { apiRouteErrorResponse } from '@/src/shared/lib/api-route-error'

type RouteParams = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const data = await getAgentById(id)
    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}
