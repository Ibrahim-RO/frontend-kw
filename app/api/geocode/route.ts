import { NextRequest, NextResponse } from 'next/server'
import { geocodeLocation } from '@/src/features/website/properties/dal/geocode.dal'
import { apiRouteErrorResponse } from '@/src/shared/lib/api-route-error'

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams
    const data = await geocodeLocation({
      street: params.get('street') ?? undefined,
      city: params.get('city') ?? undefined,
      state: params.get('state') ?? undefined,
      postalcode: params.get('postalcode') ?? undefined,
    })
    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}
