import 'server-only'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decodeJwtPayload, SESSION_COOKIE } from '../session'

export const getSession = cache(async () => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token) return null

  const payload = decodeJwtPayload(token)
  const isExpired = !payload?.exp || payload.exp * 1000 <= Date.now()
  if (isExpired) return null

  return { token, payload }
})

export const verifySession = cache(async () => {
  const session = await getSession()
  if (!session) redirect('/admin')

  return session
})
