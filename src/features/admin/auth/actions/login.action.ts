'use server'

import { loginForm } from '../schemas'
import { createSession } from '../session'

type LoginResponse = Record<string, unknown>

function extractToken(data: LoginResponse) {
  const token = data.accessToken ?? data.access_token ?? data.token ?? data.jwt
  return typeof token === 'string' ? token : null
}

export async function loginAction(input: unknown) {
  const parsed = loginForm.safeParse(input)
  if (!parsed.success) {
    return { success: false as const, message: 'Datos de acceso inválidos' }
  }

  const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    return { success: false as const, message: 'API_URL no está configurada' }
  }

  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed.data),
      cache: 'no-store',
    })

    if (!response.ok) {
      return { success: false as const, message: 'Credenciales incorrectas' }
    }

    const data = (await response.json()) as LoginResponse
    const token = extractToken(data)
    if (!token) {
      return { success: false as const, message: 'El backend no devolvió un JWT' }
    }

    await createSession(token)
    return { success: true as const }
  } catch {
    return { success: false as const, message: 'No se pudo conectar con el backend' }
  }
}
