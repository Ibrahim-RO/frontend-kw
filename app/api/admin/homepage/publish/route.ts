import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { publishHomepage } from '@/src/features/admin/homepage/dal/homepage.dal'
import { apiRouteErrorResponse } from '@/src/shared/lib/api-route-error'
export async function POST(request: NextRequest) {
  try {
    const data = await publishHomepage(await request.json())
    revalidatePath('/')
    return NextResponse.json(data)
  } catch (error) {
    return apiRouteErrorResponse(error)
  }
}
