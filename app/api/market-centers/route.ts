import { NextResponse } from 'next/server'
import { listMarketCenters } from '@/src/features/website/properties/dal/market-centers.dal'
import { apiRouteErrorResponse } from '@/src/shared/lib/api-route-error'

export async function GET() {
  try {
    const data = await listMarketCenters()
    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}
