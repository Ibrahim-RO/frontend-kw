import { NextRequest, NextResponse } from 'next/server'
import { getHomepageSettings, updateHomepage } from '@/src/features/admin/homepage/dal/homepage.dal'
import { apiRouteErrorResponse } from '@/src/shared/lib/api-route-error'
export async function GET() { try { return NextResponse.json(await getHomepageSettings()) } catch (error) { return apiRouteErrorResponse(error) } }
export async function PATCH(request: NextRequest) { try { return NextResponse.json(await updateHomepage(await request.json())) } catch (error) { return apiRouteErrorResponse(error) } }
