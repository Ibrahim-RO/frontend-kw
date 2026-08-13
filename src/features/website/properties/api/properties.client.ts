import axios from 'axios'
import type {
  PropertiesListResponse,
  PropertiesSearchPayload,
  PropertyDetailResponse,
} from '../types'

const propertiesClient = axios.create({ baseURL: '/api/properties' })

export async function fetchProperties(init: number) {
  const { data } = await propertiesClient.get<PropertiesListResponse>('', {
    params: { init },
  })
  return data
}

export async function fetchPropertyDetail(id: number | string) {
  const { data } = await propertiesClient.get<PropertyDetailResponse>(`/${id}`)
  return data
}

export async function searchProperties(payload: PropertiesSearchPayload) {
  const { data } = await propertiesClient.post<PropertiesListResponse>('/search', payload)
  return data
}
