import 'server-only'
import { adminApi } from '@/src/shared/lib/admin-api'
import type { HomepageDocument, HomepageSettings } from '../types'

export async function getHomepageSettings() { return (await adminApi.get<HomepageSettings>('/admin/homepage')).data }
export async function updateHomepage(payload: HomepageDocument) { return (await adminApi.patch<HomepageSettings>('/admin/homepage', payload)).data }
export async function publishHomepage(payload: HomepageDocument) { return (await adminApi.post<HomepageSettings>('/admin/homepage/publish', payload)).data }
