// Tamaño de pagina que ve el usuario. El backend siempre regresa
// BACKEND_PAGE_SIZE (30) registros por llamada sin importar el offset, asi
// que cada llamada al backend alcanza para varias paginas de PAGE_SIZE
// (30/10 = 3 paginas por llamada) — ver getBackendOffset/getPageSlice.
export const PAGE_SIZE = 10
export const BACKEND_PAGE_SIZE = 30
const PAGES_PER_BACKEND_CHUNK = BACKEND_PAGE_SIZE / PAGE_SIZE

// Offset que hay que pedirle al backend para cubrir esta pagina (reutiliza
// el mismo bloque de 30 para las PAGES_PER_BACKEND_CHUNK paginas que caen
// dentro de el, en vez de pedir un bloque nuevo por cada pagina de 10).
export function getBackendOffset(page: number): number {
  return Math.floor((page - 1) / PAGES_PER_BACKEND_CHUNK) * BACKEND_PAGE_SIZE
}

// Una vez que se tiene el bloque de 30 (pedido con getBackendOffset), este
// es el recorte [start, end) dentro de ese bloque que corresponde a esta
// pagina.
export function getPageSlice(page: number): [number, number] {
  const indexInChunk = (page - 1) % PAGES_PER_BACKEND_CHUNK
  const start = indexInChunk * PAGE_SIZE
  return [start, start + PAGE_SIZE]
}

export function getTotalPages(total: number) {
  return Math.max(1, Math.ceil(total / PAGE_SIZE))
}

export function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [1]
  const window = 1

  if (current - window > 2) pages.push('ellipsis')

  for (let p = Math.max(2, current - window); p <= Math.min(total - 1, current + window); p++) {
    pages.push(p)
  }

  if (current + window < total - 1) pages.push('ellipsis')
  if (total > 1) pages.push(total)

  return pages
}
