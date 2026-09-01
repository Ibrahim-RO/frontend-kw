import { NextRequest, NextResponse } from 'next/server'
import {
  getUser,
  updateUser,
  deleteUser,
} from '@/src/features/admin/users/dal/users.dal'
import { apiRouteErrorResponse } from '@/src/shared/lib/api-route-error'

type RouteParams = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const data = await getUser(id)
    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const payload = await request.json()
    const data = await updateUser(id, payload)
    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const data = await deleteUser(id)
    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}
