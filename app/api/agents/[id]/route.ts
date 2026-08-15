import { NextResponse } from 'next/server'
import { getAgent } from '@/src/features/website/properties/dal/agent.dal'
import { apiRouteErrorResponse } from '@/src/shared/lib/api-route-error'

type RouteParams = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const data = await getAgent(id)
    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}
