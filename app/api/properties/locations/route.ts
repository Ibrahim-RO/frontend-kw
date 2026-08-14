import { NextResponse } from 'next/server'
import { getLocationsCatalog } from '@/src/features/website/properties/dal/locations.dal'
import { apiRouteErrorResponse } from '@/src/shared/lib/api-route-error'

export async function GET() {
  try {
    const data = await getLocationsCatalog()
    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}
