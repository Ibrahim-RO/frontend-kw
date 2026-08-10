import { NextRequest, NextResponse } from 'next/server'
import { listBlogPosts, createBlogPost } from '@/src/features/admin/blog/dal/blog.dal'
import { apiRouteErrorResponse } from '@/src/shared/lib/api-route-error'

export async function GET(request: NextRequest) {
  try {
    const page = request.nextUrl.searchParams.get('page')
    const limit = request.nextUrl.searchParams.get('limit')

    const data = await listBlogPosts({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    })

    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const data = await createBlogPost(payload)
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}
