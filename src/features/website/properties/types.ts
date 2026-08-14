export type Property = {
  ID: number
  Property_Command_ID: string
  MLS_Number: string
  Current_Price: number
  Property_Status_ID: number
  Property_Operation_ID: number
  Property_Type_ID: number
  Property_Subtype_ID: number
  Country: string
  State: string
  City: string
  Street: string
  Colony: string | null
  Street_Number: string | null
  Postal_Code: string
  Latitude: number
  Longitude: number
  Currency: string
  Total_Bed: number | null
  Total_Bath: string | null
  Full_Bath: number | null
  Half_Bath: number | null
  Total_Rooms: number | null
  Market_Center_ID: number
  Agent_ID: number
  Has_Garage: number
  Has_Parking: number
  Parking_Total: number | null
  Title: string
  Description: string
  Geo_Estado: string
  Geo_Municipio: string
  Geo_Colonia: string
  Geo_Calle: string
  Geo_Num_Calle: string | null
  Geo_Codigo_Postal: string
  Geo_Direccion_Completa: string
  Contract_Expiry_Date: string | null
  Property_Status_Updated_Date: string | null
  Commission_Buyer: number | null
  Commission_Seller: number | null
  Property_List_Type_ID: number
  Luxury: number
  Living_Area: number | null
  Lot_Size_Area: number | null
  Photo_URL: string | null
}

export type PropertiesListResponse = {
  success: boolean
  message: string
  data: { Properties_Data: Property[]; Total_Properties: number }
}

export type LocationOption = { value: string; label: string }

// value = version sin acentos que espera Filter_Estado/Municipio/Colonia,
// label = como se ve en los datos reales (con acentos). Los municipios se
// indexan por el value del estado, y las colonias por "value_estado|||value_municipio".
export type LocationsCatalog = {
  estados: LocationOption[]
  municipios: Record<string, LocationOption[]>
  colonias: Record<string, LocationOption[]>
}

export type PropertyPhoto = {
  ID: number
  Property_ID: number
  Photo_URL: string
  Photo_Order: number
  Photo_Origin: string | null
  Aws_WM_URL: string | null
  Aws_NWM_URL: string | null
}

export type PropertyAgent = {
  ID: number
  Agent_Command_ID: number
  First_Name: string
  Last_Name: string
  Email: string | null
  Phone: string | null
  Mobile_Phone: string | null
  City: string | null
  Market_Center_ID: number
  Agent_Photo_url: string | null
  Agent_Status: number
  Luxury: number
  Market_Center: string | null
}

export type PropertyDetailResponse = {
  success: boolean
  message: string
  data: {
    Property_Data: Property[]
    Property_Photos: PropertyPhoto[]
    Property_Agent: PropertyAgent[]
  }
}

export type PropertyOperation = '*' | '1' | '2'

export type PropertiesFilters = {
  Filter_Operation: PropertyOperation
  Filter_Type: string
  Filter_Min_Price: string
  Filter_Max_Price: string
  Filter_Estado: string | null
  Filter_Municipio: string | null
  Filter_Colonia: string | null
  Filter_Calle: string | null
  Filter_Codigo_Postal: string | null
  Filter_Bed: string | null
  Filter_Bath: string | null
  Filter_Year: string | null
  Filter_Max_Living_Area: string | null
  Filter_Min_Living_Area: string | null
  Filter_Max_Lot_Area: string | null
  Filter_Min_Lot_Area: string | null
}

export const emptyFilters: PropertiesFilters = {
  Filter_Operation: '*',
  Filter_Type: '*',
  Filter_Min_Price: '',
  Filter_Max_Price: '',
  Filter_Estado: null,
  Filter_Municipio: null,
  Filter_Colonia: null,
  Filter_Calle: null,
  Filter_Codigo_Postal: null,
  Filter_Bed: null,
  Filter_Bath: null,
  Filter_Year: null,
  Filter_Max_Living_Area: null,
  Filter_Min_Living_Area: null,
  Filter_Max_Lot_Area: null,
  Filter_Min_Lot_Area: null,
}

export type MapBounds = {
  TopLeft_Latitude: number
  TopLeft_Longitude: number
  BottomRigth_Latitude: number
  BottomRigth_Longitude: number
}

export type PropertiesSearchPayload = MapBounds &
  PropertiesFilters & { Properties_Listing_Init: number }

// Cobertura aproximada de todo México, usada como caja por defecto cuando
// el usuario aún no ha movido el mapa.
export const mexicoBounds: MapBounds = {
  TopLeft_Latitude: 32.7186,
  TopLeft_Longitude: -118.4662,
  BottomRigth_Latitude: 14.3886,
  BottomRigth_Longitude: -86.4396,
}
