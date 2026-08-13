export const operationOptions = [
  { value: '*', label: 'Todos' },
  { value: '1', label: 'Renta' },
  { value: '2', label: 'Venta' },
] as const

export const operationLabels: Record<number, string> = {
  1: 'Renta',
  2: 'Venta',
}

export const typeOptions = [
  { value: '*', label: 'Todos' },
  { value: '1', label: 'Apartamento' },
  { value: '4', label: 'Condominio' },
  { value: '5', label: 'Estacionamiento Escriturado' },
  { value: '6', label: 'Dúplex' },
  { value: '13', label: 'Rancho' },
  { value: '14', label: 'Casa Familiar Adosada' },
  { value: '15', label: 'Casa Familiar Independiente' },
  { value: '18', label: 'Casa Adosada' },
  { value: '20', label: 'Agricultura' },
  { value: '21', label: 'Negocio' },
  { value: '22', label: 'Hotel-Motel' },
  { value: '23', label: 'Industrial' },
  { value: '25', label: 'Multifamiliar' },
  { value: '26', label: 'Oficina' },
  { value: '27', label: 'Comercial' },
  { value: '28', label: 'Terreno sin Construcción' },
  { value: '29', label: 'Almacén' },
  { value: '31', label: 'Casa Vacacional' },
  { value: '32', label: 'Otro' },
] as const

export const typeLabels: Record<number, string> = Object.fromEntries(
  typeOptions
    .filter((option) => option.value !== '*')
    .map((option) => [Number(option.value), option.label]),
)

export function getOperationLabel(operationId: number) {
  return operationLabels[operationId] ?? 'Propiedad'
}

export function getTypeLabel(typeId: number) {
  return typeLabels[typeId] ?? 'Propiedad'
}
