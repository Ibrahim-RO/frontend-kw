const COMBINING_MARKS_RANGE = new RegExp(
  '[' + String.fromCharCode(0x0300) + '-' + String.fromCharCode(0x036f) + ']',
  'g',
)

// El backend compara los filtros de ubicacion sin acentos (confirmado
// contra los 7,205 registros reales: "Querétaro" -> 0 resultados,
// "Queretaro" -> resultados correctos). Los catalogos de ubicacion se
// arman con esta forma para que el value que viaja al filtro siempre
// funcione, mientras el label se muestra tal cual viene de los datos.
export function stripAccents(value: string): string {
  return value.normalize('NFD').replace(COMBINING_MARKS_RANGE, '')
}
