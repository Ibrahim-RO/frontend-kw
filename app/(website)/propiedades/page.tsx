import { PropertiesListPage } from '@/src/features/website/properties/components/PropertiesListPage'
import type { MapBounds } from '@/src/features/website/properties/types'

// n/s/e/w vienen del buscador inteligente del Hero, que ya geocodifico la
// direccion elegida — asi evitamos un segundo viaje a Nominatim aca.
function parseBounds(n: unknown, s: unknown, e: unknown, w: unknown): MapBounds | null {
  if (typeof n !== 'string' || typeof s !== 'string' || typeof e !== 'string' || typeof w !== 'string') return null

  const [north, south, east, west] = [Number(n), Number(s), Number(e), Number(w)]
  if ([north, south, east, west].some((value) => Number.isNaN(value))) return null

  return {
    TopLeft_Latitude: north,
    TopLeft_Longitude: west,
    BottomRigth_Latitude: south,
    BottomRigth_Longitude: east,
  }
}

export default async function Page({ searchParams }: PageProps<'/propiedades'>) {
  const { ubicacion, n, s, e, w } = await searchParams
  const initialLocation = typeof ubicacion === 'string' ? ubicacion.trim() : ''
  const initialBounds = parseBounds(n, s, e, w)

  return <PropertiesListPage initialLocation={initialLocation} initialBounds={initialBounds} />
}
