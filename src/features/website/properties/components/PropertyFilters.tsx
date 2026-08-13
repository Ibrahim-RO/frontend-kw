'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { MapPin, Ruler, Search, Tag } from 'lucide-react'
import { Form, FormField, FormInput, FormLabel, FormSubmit } from '@/src/shared/components/forms'
import {
  emptyFiltersForm,
  propertiesFiltersForm,
  type PropertiesFiltersFormValues,
} from '../schemas/properties-filters.schema'
import { operationOptions, typeOptions } from '../lib/property-options'
import { toPropertiesFilters } from '../lib/filters'
import type { PropertiesFilters } from '../types'

const selectClassName =
  'h-12 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-kw-primary focus:ring-3 focus:ring-red-100'

type PropertyFiltersProps = {
  onSearch: (filters: PropertiesFilters) => void
  onClear: () => void
}

export function PropertyFilters({ onSearch, onClear }: PropertyFiltersProps) {
  const { register, handleSubmit, reset } = useForm<PropertiesFiltersFormValues>({
    resolver: zodResolver(propertiesFiltersForm),
    defaultValues: emptyFiltersForm,
  })

  const onSubmit = (values: PropertiesFiltersFormValues) => {
    onSearch(toPropertiesFilters(values))
  }

  const handleClear = () => {
    reset(emptyFiltersForm)
    onClear()
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mb-12 overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl md:p-8"
    >
      <div className="absolute top-0 left-0 h-1 w-full bg-kw-primary" />

      <div className="mb-6">
        <span className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-kw-primary uppercase">
          <MapPin size={14} /> Ubicación
        </span>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          <FormInput placeholder="Estado" {...register('Filter_Estado')} />
          <FormInput placeholder="Municipio" {...register('Filter_Municipio')} />
          <FormInput placeholder="Colonia" {...register('Filter_Colonia')} />
          <FormInput placeholder="Calle" {...register('Filter_Calle')} />
          <FormInput placeholder="Código Postal" {...register('Filter_Codigo_Postal')} />
        </div>
      </div>

      <div className="my-6 border-t border-neutral-200" />

      <div className="mb-6">
        <span className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-kw-primary uppercase">
          <Tag size={14} /> Tipo y Precio
        </span>
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
          <select className={selectClassName} {...register('Filter_Operation')}>
            {operationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select className={selectClassName} {...register('Filter_Type')}>
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <FormInput type="number" min={0} placeholder="Precio mín" {...register('Filter_Min_Price')} />
            <span className="font-bold text-kw-tertiary">—</span>
            <FormInput type="number" min={0} placeholder="Precio máx" {...register('Filter_Max_Price')} />
          </div>
        </div>
      </div>

      <div className="my-6 border-t border-neutral-200" />

      <div className="mb-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <span className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-kw-primary uppercase">
            <Ruler size={14} /> Medidas
          </span>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <FormLabel className="text-xs text-kw-tertiary">Construcción (M2)</FormLabel>
              <div className="flex items-center gap-2">
                <FormInput type="number" min={0} placeholder="Mín" {...register('Filter_Min_Living_Area')} />
                <span className="font-bold text-kw-tertiary">—</span>
                <FormInput type="number" min={0} placeholder="Máx" {...register('Filter_Max_Living_Area')} />
              </div>
            </div>
            <div className="space-y-1">
              <FormLabel className="text-xs text-kw-tertiary">Terreno (M2)</FormLabel>
              <div className="flex items-center gap-2">
                <FormInput type="number" min={0} placeholder="Mín" {...register('Filter_Min_Lot_Area')} />
                <span className="font-bold text-kw-tertiary">—</span>
                <FormInput type="number" min={0} placeholder="Máx" {...register('Filter_Max_Lot_Area')} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <span className="mb-3 block text-xs font-bold tracking-wider text-kw-primary uppercase">Otros</span>
          <div className="grid grid-cols-3 gap-3">
            <FormInput type="number" min={0} placeholder="Recámaras" {...register('Filter_Bed')} />
            <FormInput type="number" min={0} placeholder="Baños" {...register('Filter_Bath')} />
            <FormInput type="number" min={1900} max={2099} placeholder="Año constr." {...register('Filter_Year')} />
          </div>
        </div>
      </div>

      <div className="my-6 border-t border-neutral-200" />

      <div className="mt-4 flex justify-end gap-4">
        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold text-kw-secondary transition-all hover:bg-neutral-100"
        >
          Borrar Filtros
        </button>
        <FormSubmit className="w-auto bg-kw-primary text-white hover:bg-kw-primary/90 focus-visible:outline-kw-primary">
          <Search size={16} /> Buscar
        </FormSubmit>
      </div>
    </Form>
  )
}
