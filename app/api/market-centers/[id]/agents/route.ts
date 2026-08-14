import { NextRequest, NextResponse } from 'next/server'
import { listMarketCenterAgents } from '@/src/features/website/properties/dal/market-centers.dal'
import { apiRouteErrorResponse } from '@/src/shared/lib/api-route-error'

type RouteParams = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const offset = Number(request.nextUrl.searchParams.get('offset') ?? 0)
    const data = await listMarketCenterAgents(id, offset)
    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}
