import axios from 'axios'
import type { LocationsCatalog } from '../types'

const locationsClient = axios.create({ baseURL: '/api/properties/locations' })

export async function fetchLocationsCatalog() {
  const { data } = await locationsClient.get<LocationsCatalog>('')
  return data
}
