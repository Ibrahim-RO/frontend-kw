'use client'

import { useQueryClient } from '@tanstack/react-query'
import { logoutAction } from '../actions/logout.action'

// El QueryClient es un singleton en memoria del navegador (ver
// ProviderReactQuery.tsx) que no sabe qué usuario está logueado — sin este
// clear(), cerrar sesión y entrar con otra cuenta seguía mostrando datos
// cacheados (perfil, listas) de la sesión anterior hasta que el staleTime
// de cada query expirara.
export function useLogout() {
  const queryClient = useQueryClient()

  return () => {
    queryClient.clear()
    void logoutAction()
  }
}
