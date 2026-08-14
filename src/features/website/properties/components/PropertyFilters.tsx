'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ChevronDown, MapPin, Ruler, Search, Tag } from 'lucide-react'
import { Form, FormField, FormInput, FormLabel, FormSubmit } from '@/src/shared/components/forms'
import {
  emptyFiltersForm,
  propertiesFiltersForm,
  type PropertiesFiltersFormValues,
} from '../schemas/properties-filters.schema'
import { operationOptions, typeOptions } from '../lib/property-options'
import { toPropertiesFilters } from '../lib/filters'
import { useLocationsCatalog } from '../hooks/useLocationsCatalog'
import type { PropertiesFilters } from '../types'

const selectClassName =
  'h-12 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-kw-primary focus:ring-3 focus:ring-red-100'

const summaryClassName =
  'mb-3 flex cursor-pointer list-none items-center justify-between gap-2 text-xs font-bold tracking-wider text-kw-primary uppercase marker:hidden [&::-webkit-details-marker]:hidden'

type PropertyFiltersProps = {
  onSearch: (filters: PropertiesFilters) => void
  onClear: () => void
}

export function PropertyFilters({ onSearch, onClear }: PropertyFiltersProps) {
  const { register, handleSubmit, reset, watch, setValue } = useForm<PropertiesFiltersFormValues>({
    resolver: zodResolver(propertiesFiltersForm),
    defaultValues: emptyFiltersForm,
  })

  const { data: catalog, isLoading: isLoadingCatalog } = useLocationsCatalog()

  const selectedEstado = watch('Filter_Estado')
  const selectedMunicipio = watch('Filter_Municipio')

  const estadoField = register('Filter_Estado')
  const municipioField = register('Filter_Municipio')

  const municipioOptions = catalog?.municipios[selectedEstado] ?? []
  const coloniaOptions = catalog?.colonias[`${selectedEstado}|||${selectedMunicipio}`] ?? []

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
      className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-5 shadow-xl"
    >
      <div className="absolute top-0 left-0 h-1 w-full bg-kw-primary" />

      <div className="mb-5">
        <span className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-kw-primary uppercase">
          <MapPin size={14} /> Ubicación
        </span>
        <div className="grid grid-cols-1 gap-3">
          <select
            className={selectClassName}
            disabled={isLoadingCatalog}
            {...estadoField}
            onChange={(event) => {
              estadoField.onChange(event)
              setValue('Filter_Municipio', '')
              setValue('Filter_Colonia', '')
            }}
          >
            <option value="">{isLoadingCatalog ? 'Cargando estados...' : 'Todos los estados'}</option>
            {catalog?.estados.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {selectedEstado && (
            <select
              className={selectClassName}
              {...municipioField}
              onChange={(event) => {
                municipioField.onChange(event)
                setValue('Filter_Colonia', '')
              }}
            >
              <option value="">Todos los municipios</option>
              {municipioOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {selectedMunicipio && (
            <>
              <select className={selectClassName} {...register('Filter_Colonia')}>
                <option value="">Todas las colonias</option>
                {coloniaOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <FormInput placeholder="Calle" {...register('Filter_Calle')} />
              <FormInput placeholder="Código Postal" {...register('Filter_Codigo_Postal')} />
            </>
          )}
        </div>
      </div>

      <div className="my-4 border-t border-neutral-200" />

      <details className="group mb-5" open>
        <summary className={summaryClassName}>
          <span className="flex items-center gap-2">
            <Tag size={14} /> Tipo y Precio
          </span>
          <ChevronDown size={14} className="transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <div className="grid grid-cols-1 gap-3">
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
      </details>

      <div className="my-4 border-t border-neutral-200" />

      <details className="group mb-5">
        <summary className={summaryClassName}>
          <span className="flex items-center gap-2">
            <Ruler size={14} /> Medidas
          </span>
          <ChevronDown size={14} className="transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <div className="grid grid-cols-1 gap-4">
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
      </details>

      <div className="my-4 border-t border-neutral-200" />

      <details className="group mb-5">
        <summary className={summaryClassName}>
          <span>Otros</span>
          <ChevronDown size={14} className="transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <div className="grid grid-cols-2 gap-3">
          <FormInput type="number" min={0} placeholder="Recámaras" {...register('Filter_Bed')} />
          <FormInput type="number" min={0} placeholder="Baños" {...register('Filter_Bath')} />
          <FormInput
            type="number"
            min={1900}
            max={2099}
            placeholder="Año constr."
            className="col-span-2"
            {...register('Filter_Year')}
          />
        </div>
      </details>

      <div className="my-4 border-t border-neutral-200" />

      <div className="flex flex-col gap-2">
        <FormSubmit className="bg-kw-primary text-white hover:bg-kw-primary/90 focus-visible:outline-kw-primary">
          <Search size={16} /> Buscar
        </FormSubmit>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold text-kw-secondary transition-all hover:bg-neutral-100"
        >
          Borrar Filtros
        </button>
      </div>
    </Form>
  )
}
