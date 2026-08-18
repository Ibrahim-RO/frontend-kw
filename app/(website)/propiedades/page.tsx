import { PropertiesListPage } from '@/src/features/website/properties/components/PropertiesListPage'

export default async function Page({ searchParams }: PageProps<'/propiedades'>) {
  const { ubicacion } = await searchParams
  const initialLocation = typeof ubicacion === 'string' ? ubicacion.trim() : ''

  return <PropertiesListPage initialLocation={initialLocation} />
}
