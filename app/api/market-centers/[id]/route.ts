import { NextRequest, NextResponse } from 'next/server'
import { getMarketCenter } from '@/src/features/website/properties/dal/market-centers.dal'
import { apiRouteErrorResponse } from '@/src/shared/lib/api-route-error'

type RouteParams = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const data = await getMarketCenter(id)
    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}
