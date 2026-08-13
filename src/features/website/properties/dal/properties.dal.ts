import 'server-only'

import { propertiesApi } from '@/src/shared/lib/properties-api'

export async function listProperties(init: number) {
  const { data } = await propertiesApi.get('/Listed_Properties_Info', {
    params: { Properties_Listing_Init: init },
  })
  return data
}

export async function searchProperties(payload: unknown) {
  const { data } = await propertiesApi.post('/Coordinates_Properties_Info', payload)
  return data
}

export async function getProperty(id: string) {
  const { data } = await propertiesApi.get('/Single_Property_Info', {
    params: { PropertyID: id },
  })
  return data
}
