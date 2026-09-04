import { NextRequest, NextResponse } from 'next/server'
import { adminApi } from '@/src/shared/lib/admin-api'
import { apiRouteErrorResponse } from '@/src/shared/lib/api-route-error'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image')
    if (!(image instanceof File)) {
      return NextResponse.json({ message: 'No se recibió una imagen' }, { status: 400 })
    }
    const upstream = new FormData()
    upstream.set('image', image, image.name)
    const { data } = await adminApi.post<{ url: string; filename: string }>('/admin/blog/images', upstream)
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}
