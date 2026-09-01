import { NextRequest, NextResponse } from 'next/server'
import { getMyProfile, updateMyProfile } from '@/src/features/admin/profile/dal/profile.dal'
import { apiRouteErrorResponse } from '@/src/shared/lib/api-route-error'

export async function GET() {
  try {
    const data = await getMyProfile()
    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const payload = await request.json()
    const data = await updateMyProfile(payload)
    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}
