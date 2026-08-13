import { NextRequest, NextResponse } from 'next/server'
import { listProperties } from '@/src/features/website/properties/dal/properties.dal'
import { apiRouteErrorResponse } from '@/src/shared/lib/api-route-error'

export async function GET(request: NextRequest) {
  try {
    const init = request.nextUrl.searchParams.get('init')
    const data = await listProperties(init ? Number(init) : 0)
    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}
