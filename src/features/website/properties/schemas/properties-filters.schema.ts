import { z } from 'zod'

export const propertiesFiltersForm = z.object({
  Filter_Operation: z.enum(['*', '1', '2']),
  Filter_Type: z.string(),
  Filter_Min_Price: z.string(),
  Filter_Max_Price: z.string(),
  Filter_Estado: z.string(),
  Filter_Municipio: z.string(),
  Filter_Colonia: z.string(),
  Filter_Calle: z.string(),
  Filter_Codigo_Postal: z.string(),
  Filter_Bed: z.string(),
  Filter_Bath: z.string(),
  Filter_Year: z.string(),
  Filter_Min_Living_Area: z.string(),
  Filter_Max_Living_Area: z.string(),
  Filter_Min_Lot_Area: z.string(),
  Filter_Max_Lot_Area: z.string(),
})

export type PropertiesFiltersFormValues = z.infer<typeof propertiesFiltersForm>

export const emptyFiltersForm: PropertiesFiltersFormValues = {
  Filter_Operation: '*',
  Filter_Type: '*',
  Filter_Min_Price: '',
  Filter_Max_Price: '',
  Filter_Estado: '',
  Filter_Municipio: '',
  Filter_Colonia: '',
  Filter_Calle: '',
  Filter_Codigo_Postal: '',
  Filter_Bed: '',
  Filter_Bath: '',
  Filter_Year: '',
  Filter_Min_Living_Area: '',
  Filter_Max_Living_Area: '',
  Filter_Min_Lot_Area: '',
  Filter_Max_Lot_Area: '',
}
