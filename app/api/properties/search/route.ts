import { NextRequest, NextResponse } from 'next/server'
import { searchProperties } from '@/src/features/website/properties/dal/properties.dal'
import { apiRouteErrorResponse } from '@/src/shared/lib/api-route-error'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const data = await searchProperties(payload)
    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}
