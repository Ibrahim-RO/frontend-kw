import type { PropertiesFiltersFormValues } from '../schemas/properties-filters.schema'
import type { PropertiesFilters } from '../types'

function toStringOrNull(value: string) {
  const trimmed = value.trim()
  return trimmed === '' ? null : trimmed
}

export function toPropertiesFilters(form: PropertiesFiltersFormValues): PropertiesFilters {
  return {
    Filter_Operation: form.Filter_Operation,
    Filter_Type: form.Filter_Type,
    Filter_Min_Price: form.Filter_Min_Price,
    Filter_Max_Price: form.Filter_Max_Price,
    Filter_Estado: toStringOrNull(form.Filter_Estado),
    Filter_Municipio: toStringOrNull(form.Filter_Municipio),
    Filter_Colonia: toStringOrNull(form.Filter_Colonia),
    Filter_Calle: toStringOrNull(form.Filter_Calle),
    Filter_Codigo_Postal: toStringOrNull(form.Filter_Codigo_Postal),
    Filter_Bed: toStringOrNull(form.Filter_Bed),
    Filter_Bath: toStringOrNull(form.Filter_Bath),
    Filter_Year: toStringOrNull(form.Filter_Year),
    Filter_Min_Living_Area: toStringOrNull(form.Filter_Min_Living_Area),
    Filter_Max_Living_Area: toStringOrNull(form.Filter_Max_Living_Area),
    Filter_Min_Lot_Area: toStringOrNull(form.Filter_Min_Lot_Area),
    Filter_Max_Lot_Area: toStringOrNull(form.Filter_Max_Lot_Area),
  }
}
