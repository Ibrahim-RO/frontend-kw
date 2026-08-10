import 'server-only'

import { isAxiosError } from 'axios'
import { NextResponse } from 'next/server'

export function apiRouteErrorResponse(error: unknown) {
  if (isAxiosError(error)) {
    return NextResponse.json(
      error.response?.data ?? {
        success: false,
        message: 'Error al conectar con el backend',
      },
      { status: error.response?.status ?? 502 },
    )
  }

  return NextResponse.json(
    { success: false, message: 'Error inesperado' },
    { status: 500 },
  )
}
