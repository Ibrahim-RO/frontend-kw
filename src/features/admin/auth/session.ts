import 'server-only'

import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'kw_admin_session'

type JwtPayload = {
  exp?: number
  [key: string]: unknown
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.')
    if (!payload) return null

    return JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8'),
    ) as JwtPayload
  } catch {
    return null
  }
}

export async function createSession(token: string) {
  const payload = decodeJwtPayload(token)
  const expires = payload?.exp ? new Date(payload.exp * 1000) : undefined
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires,
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
