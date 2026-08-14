import 'server-only'

import { listProperties } from './properties.dal'
import { stripAccents } from '../lib/normalize'
import { PAGE_SIZE } from '../lib/pagination'
import type { LocationOption, LocationsCatalog, Property } from '../types'

const CACHE_TTL_MS = 6 * 60 * 60 * 1000
const FETCH_CONCURRENCY = 12
const COLONIA_KEY_SEPARATOR = '|||'

let cache: { data: LocationsCatalog; fetchedAt: number } | null = null
let refreshing: Promise<LocationsCatalog> | null = null

async function fetchAllProperties(): Promise<Property[]> {
  const first = await listProperties(0)
  const total: number = first.data.Total_Properties
  const properties: Property[] = [...first.data.Properties_Data]

  const remainingInits: number[] = []
  for (let init = PAGE_SIZE; init < total; init += PAGE_SIZE) remainingInits.push(init)

  let cursor = 0
  async function worker() {
    while (cursor < remainingInits.length) {
      const init = remainingInits[cursor++]
      const page = await listProperties(init)
      properties.push(...page.data.Properties_Data)
    }
  }
  await Promise.all(Array.from({ length: FETCH_CONCURRENCY }, worker))

  return properties
}

function sortedOptions(labelByValue: Map<string, string>): LocationOption[] {
  return [...labelByValue.entries()]
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label, 'es'))
}

async function buildCatalog(): Promise<LocationsCatalog> {
  const properties = await fetchAllProperties()

  const estadoLabelByValue = new Map<string, string>()
  const municipioLabelByValueByEstado = new Map<string, Map<string, string>>()
  const coloniaLabelByValueByKey = new Map<string, Map<string, string>>()

  for (const property of properties) {
    const estado = property.Geo_Estado
    const municipio = property.Geo_Municipio
    const colonia = property.Geo_Colonia
    if (!estado) continue

    const estadoValue = stripAccents(estado)
    if (!estadoLabelByValue.has(estadoValue)) estadoLabelByValue.set(estadoValue, estado)

    if (!municipio) continue
    const municipioValue = stripAccents(municipio)
    if (!municipioLabelByValueByEstado.has(estadoValue)) {
      municipioLabelByValueByEstado.set(estadoValue, new Map())
    }
    const municipioMap = municipioLabelByValueByEstado.get(estadoValue)!
    if (!municipioMap.has(municipioValue)) municipioMap.set(municipioValue, municipio)

    if (!colonia) continue
    const coloniaValue = stripAccents(colonia)
    const key = `${estadoValue}${COLONIA_KEY_SEPARATOR}${municipioValue}`
    if (!coloniaLabelByValueByKey.has(key)) coloniaLabelByValueByKey.set(key, new Map())
    const coloniaMap = coloniaLabelByValueByKey.get(key)!
    if (!coloniaMap.has(coloniaValue)) coloniaMap.set(coloniaValue, colonia)
  }

  const municipios: Record<string, LocationOption[]> = {}
  for (const [estadoValue, municipioMap] of municipioLabelByValueByEstado) {
    municipios[estadoValue] = sortedOptions(municipioMap)
  }

  const colonias: Record<string, LocationOption[]> = {}
  for (const [key, coloniaMap] of coloniaLabelByValueByKey) {
    colonias[key] = sortedOptions(coloniaMap)
  }

  return {
    estados: sortedOptions(estadoLabelByValue),
    municipios,
    colonias,
  }
}

function startRefresh() {
  refreshing = buildCatalog()
    .then((data) => {
      cache = { data, fetchedAt: Date.now() }
      refreshing = null
      return data
    })
    .catch((error) => {
      refreshing = null
      throw error
    })
  return refreshing
}

// Recorrer las 7,000+ propiedades para armar el catalogo tarda decenas de
// segundos, asi que nunca hacemos esperar a un usuario real por eso: si ya
// hay algo en cache (aunque este vencido) se devuelve al instante y el
// refresco se dispara en segundo plano para la siguiente vez.
export async function getLocationsCatalog(): Promise<LocationsCatalog> {
  if (!cache) {
    return refreshing ?? startRefresh()
  }

  const isStale = Date.now() - cache.fetchedAt > CACHE_TTL_MS
  if (isStale && !refreshing) startRefresh()

  return cache.data
}
