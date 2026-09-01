'use client'

import { useState, type ChangeEvent } from 'react'
import {
  Eye,
  EyeOff,
  ImageIcon,
  LoaderCircle,
  Maximize2,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import { toast } from 'sonner'

import { sectionData } from '../section-defaults'
import type { HomepageSection, HomepageSettings } from '../types'

const input =
  'min-h-11 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15'

const labelClass =
  'mb-2 block text-sm font-semibold text-foreground'

const previewBackground = {
  backgroundColor: '#f8fafc',
  backgroundImage:
    'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)',
  backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
  backgroundSize: '12px 12px',
} as const

export function HomepageEditor({
  initial,
}: {
  initial: HomepageSettings
}) {
  const [doc, setDoc] = useState(initial.draft)
  const [tab, setTab] = useState<'content' | 'seo' | 'code'>('content')
  const [busy, setBusy] = useState(false)

  const updateSection = (index: number, section: HomepageSection) =>
    setDoc((v) => ({
      ...v,
      sections: v.sections.map((s, i) => (i === index ? section : s)),
    }))

  async function save(url: string, method: 'PATCH' | 'POST') {
    setBusy(true)

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doc),
      })

      if (!response.ok) {
        throw new Error()
      }

      toast.success(
        method === 'POST'
          ? 'Homepage publicada'
          : 'Borrador guardado',
      )
    } catch {
      toast.error('No se pudo completar la operación')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-5 shadow-sm">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Editor del sitio
          </p>

          <h1 className="text-2xl font-bold">Homepage</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Administra el contenido y la visibilidad de cada bloque de la página.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href="/"
            target="_blank"
            className="rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Ver publicada
          </a>

          <button
            disabled={busy}
            onClick={() => save('/api/admin/homepage', 'PATCH')}
            className="rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
          >
            Guardar borrador
          </button>

          <button
            disabled={busy}
            onClick={() => save('/api/admin/homepage/publish', 'POST')}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm disabled:opacity-50"
          >
            Publicar
          </button>
        </div>
      </div>

      <div className="inline-flex max-w-full gap-1 rounded-lg border bg-muted/40 p-1">
        {(['content', 'seo', 'code'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-4 py-2 text-sm transition-all ${
              tab === t
                ? 'bg-background font-semibold shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t === 'content'
              ? 'Secciones'
              : t === 'seo'
                ? 'SEO y Schema'
                : 'Head y Body'}
          </button>
        ))}
      </div>

      {tab === 'content' && (
        <div className="space-y-8 rounded-xl bg-muted/25 p-3 sm:p-5">
          {doc.sections.map((section, index) => (
            <SectionEditor
              key={section.id}
              section={section}
              index={index}
              total={doc.sections.length}
              onChange={(value) => updateSection(index, value)}
            />
          ))}
        </div>
      )}

      {tab === 'seo' && (
        <div className="grid gap-4 rounded-lg border bg-card p-5 md:grid-cols-2">
          <Text
            label="Título SEO"
            value={doc.seo.title}
            onChange={(title) =>
              setDoc((v) => ({
                ...v,
                seo: {
                  ...v.seo,
                  title,
                },
              }))
            }
          />

          <Area
            label="Meta descripción"
            value={doc.seo.description}
            onChange={(description) =>
              setDoc((v) => ({
                ...v,
                seo: {
                  ...v.seo,
                  description,
                },
              }))
            }
          />

          <Text
            label="URL canónica"
            value={doc.seo.canonicalUrl}
            onChange={(canonicalUrl) =>
              setDoc((v) => ({
                ...v,
                seo: {
                  ...v.seo,
                  canonicalUrl,
                },
              }))
            }
          />

          <Text
            label="Robots"
            value={doc.seo.robots}
            onChange={(robots) =>
              setDoc((v) => ({
                ...v,
                seo: {
                  ...v.seo,
                  robots,
                },
              }))
            }
          />

          <Text
            label="Open Graph: título"
            value={doc.seo.ogTitle}
            onChange={(ogTitle) =>
              setDoc((v) => ({
                ...v,
                seo: {
                  ...v.seo,
                  ogTitle,
                },
              }))
            }
          />

          <ImageUpload
            label="Open Graph: imagen"
            value={doc.seo.ogImage}
            onChange={(ogImage) =>
              setDoc((v) => ({
                ...v,
                seo: {
                  ...v.seo,
                  ogImage,
                },
              }))
            }
          />

          <label className="md:col-span-2">
            <span className={labelClass}>Schema JSON-LD</span>

            <textarea
              className={`${input} font-mono`}
              rows={12}
              value={JSON.stringify(doc.seo.schemaJsonLd ?? {}, null, 2)}
              onChange={(e) => {
                try {
                  const schemaJsonLd = JSON.parse(e.target.value)

                  setDoc((v) => ({
                    ...v,
                    seo: {
                      ...v.seo,
                      schemaJsonLd,
                    },
                  }))
                } catch {
                  // JSON inválido
                }
              }}
            />
          </label>
        </div>
      )}

      {tab === 'code' && (
        <div className="space-y-4 rounded-lg border bg-card p-5">
          <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            Código avanzado. Usa solamente etiquetas de proveedores confiables.
          </div>

          {(
            [
              ['headHtml', 'Antes de cerrar </head>'],
              ['bodyStartHtml', 'Al inicio de <body>'],
              ['bodyEndHtml', 'Antes de cerrar </body>'],
            ] as const
          ).map(([key, title]) => (
            <Area
              key={key}
              label={title}
              value={doc.integrations[key]}
              rows={8}
              onChange={(value) =>
                setDoc((v) => ({
                  ...v,
                  integrations: {
                    ...v.integrations,
                    [key]: value,
                  },
                }))
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

function SectionEditor({
  section,
  index,
  total,
  onChange,
}: {
  section: HomepageSection
  index: number
  total: number
  onChange: (section: HomepageSection) => void
}) {
  const data = sectionData(section.id, section.data)

  const set = (key: string, value: unknown) =>
    onChange({
      ...section,
      data: {
        ...data,
        [key]: value,
      },
    })

  const fields = (names: FieldDef[]) => (
    <div className="grid gap-x-5 gap-y-6 md:grid-cols-2">
      {names.map(([key, label, type = 'text']) => {
        if (type === 'image') {
          return (
            <ImageUpload
              key={key}
              label={label}
              value={String(data[key] ?? '')}
              onChange={(v) => set(key, v)}
            />
          )
        }

        if (type === 'area') {
          return (
            <Area
              key={key}
              label={label}
              value={String(data[key] ?? '')}
              onChange={(v) => set(key, v)}
            />
          )
        }

        return (
          <Text
            key={key}
            label={label}
            value={String(data[key] ?? '')}
            onChange={(v) => set(key, v)}
          />
        )
      })}
    </div>
  )

  let editor: React.ReactNode

  if (section.id === 'hero') {
    editor = fields([
      ['title', 'Primera línea'],
      ['titleAccent', 'Línea destacada'],
      ['subtitle', 'Subtítulo', 'area'],
      ['imageUrl', 'Imagen de fondo', 'image'],
      ['imageAlt', 'Texto alternativo'],
    ])
  } else if (section.id === 'awards') {
    editor = (
      <>
        {fields([
          ['title', 'Título'],
          ['iconUrl', 'Ícono de los reconocimientos', 'image'],
        ])}

        <ObjectList
          title="Reconocimientos"
          itemName="reconocimiento"
          items={data.items}
          keys={[
            ['eyebrow', 'Encabezado'],
            ['title', 'Reconocimiento'],
            ['detail', 'Detalle'],
          ]}
          onChange={(v) => set('items', v)}
        />
      </>
    )
  } else if (section.id === 'properties') {
    editor = fields([
      ['title', 'Primera parte del título'],
      ['titleAccent', 'Parte destacada'],
      ['subtitle', 'Subtítulo', 'area'],
      ['buttonLabel', 'Texto del enlace'],
      ['buttonUrl', 'Destino del enlace'],
    ])
  } else if (section.id === 'about') {
    editor = fields([
      ['title', 'Primera parte del título'],
      ['titleAccent', 'Parte destacada'],
      ['lead', 'Texto destacado'],
      ['paragraph1', 'Primer párrafo', 'area'],
      ['paragraph2', 'Segundo párrafo', 'area'],
      ['coachingText', 'Texto KW MAPS', 'area'],
      ['imageUrl', 'Imagen principal', 'image'],
      ['imageAlt', 'Texto alternativo'],
      ['overlayTitle', 'Título sobre imagen'],
      ['overlaySubtitle', 'Subtítulo sobre imagen'],
    ])
  } else if (section.id === 'join') {
    editor = (
      <>
        {fields([
          ['headerImageUrl', 'Imagen de encabezado', 'image'],
          ['headerImageAlt', 'Texto alternativo'],
        ])}

        <ObjectList
          title="2 tarjetas"
          items={data.cards}
          keys={[
            ['title', 'Título'],
            ['copy', 'Descripción'],
            ['href', 'Enlace'],
            ['imageUrl', 'Imagen', 'image'],
            ['buttonLabel', 'Texto del enlace'],
          ]}
          fixed={2}
          onChange={(v) => set('cards', v)}
        />
      </>
    )
  } else if (section.id === 'family') {
    editor = (
      <>
        {fields([
          ['eyebrow', 'Antetítulo'],
          ['title', 'Título'],
          ['lead', 'Texto destacado', 'area'],
          ['body', 'Descripción', 'area'],
          ['buttonLabel', 'Texto del botón'],
          ['buttonUrl', 'Enlace del botón'],
          ['videoUrl', 'URL embed de YouTube'],
        ])}

        <ObjectList
          title="4 métricas"
          items={data.metrics}
          keys={[
            ['value', 'Valor'],
            ['label', 'Etiqueta'],
          ]}
          fixed={4}
          onChange={(v) => set('metrics', v)}
        />
      </>
    )
  } else if (section.id === 'allies') {
    editor = (
      <>
        {fields([
          ['title', 'Primera parte del título'],
          ['titleAccent', 'Parte destacada'],
          ['titleSuffix', 'Última parte'],
          ['subtitle', 'Descripción', 'area'],
        ])}

        <ImageList
          title="Logos de aliados"
          items={data.logos}
          onChange={(v) => set('logos', v)}
        />
      </>
    )
  } else if (section.id === 'allies-info') {
    editor = (
      <>
        {fields([
          ['title', 'Título del primer bloque'],
          ['prompt', 'Pregunta destacada'],
          ['image1Url', 'Imagen del primer bloque', 'image'],
          ['image1Alt', 'Texto alternativo'],
          ['secondTitle', 'Título del segundo bloque'],
          ['secondLead', 'Texto destacado'],
          ['image2Url', 'Imagen del segundo bloque', 'image'],
          ['image2Alt', 'Texto alternativo'],
          ['buttonLabel', 'Texto del botón'],
          ['buttonUrl', 'Enlace del botón'],
        ])}

        <StringList
          title="2 párrafos del primer bloque"
          items={data.paragraphs}
          fixed={2}
          onChange={(v) => set('paragraphs', v)}
        />

        <StringList
          title="2 párrafos del segundo bloque"
          items={data.secondParagraphs}
          fixed={2}
          onChange={(v) => set('secondParagraphs', v)}
        />
      </>
    )
  } else if (section.id === 'prospecting') {
    editor = fields([
      ['eyebrow', 'Antetítulo'],
      ['title', 'Título accesible'],
      ['body', 'Descripción', 'area'],
      ['imageUrl', 'Ilustración', 'image'],
      ['imageAlt', 'Texto alternativo'],
      ['buttonLabel', 'Texto del botón'],
      ['buttonUrl', 'Enlace del botón'],
    ])
  } else {
    editor = fields([
      ['title', 'Título'],
      ['description', 'Descripción', 'area'],
      ['email', 'Correo'],
      ['phone', 'Teléfono visible'],
      ['phoneUrl', 'Teléfono para enlace'],
      ['address', 'Dirección', 'area'],
      ['hours', 'Horario'],
      ['mapUrl', 'URL embed de Google Maps', 'area'],
    ])
  }

  return (
    <section
      className={`relative overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md ${
        section.visible
          ? 'border-border'
          : 'border-dashed opacity-75'
      }`}
    >
      <div
        className={`absolute inset-y-0 left-0 w-1 ${
          section.visible
            ? 'bg-primary'
            : 'bg-muted-foreground/40'
        }`}
      />

      <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-muted/40 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            {index + 1}
          </span>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold">
                {section.label}
              </h2>

              <span className="rounded-full border bg-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Bloque {index + 1} de {total}
              </span>
            </div>

            <p className="mt-0.5 font-mono text-xs text-muted-foreground">
              {section.id}
            </p>
          </div>
        </div>

        <label
          className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            section.visible
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'bg-background text-muted-foreground'
          }`}
        >
          {section.visible ? (
            <Eye className="size-4" />
          ) : (
            <EyeOff className="size-4" />
          )}

          <input
            className="sr-only"
            type="checkbox"
            checked={section.visible}
            onChange={(e) =>
              onChange({
                ...section,
                visible: e.target.checked,
              })
            }
          />

          {section.visible ? 'Visible' : 'Oculto'}
        </label>
      </div>

      <div className="p-5 sm:p-6">{editor}</div>
    </section>
  )
}

type FieldDef = [
  string,
  string,
  type?: 'text' | 'area' | 'image',
]

type KeyDef = [
  string,
  string,
  type?: 'text' | 'image',
]

function ObjectList({
  title,
  items,
  keys,
  fixed,
  itemName = 'elemento',
  onChange,
}: {
  title: string
  items: unknown
  keys: KeyDef[]
  fixed?: number
  itemName?: string
  onChange: (v: Record<string, string>[]) => void
}) {
  const list = Array.isArray(items)
    ? (items as Record<string, string>[])
    : []

  const normalized =
    fixed === undefined
      ? list
      : Array.from(
          { length: fixed },
          (_, i) => list[i] ?? {},
        )

  const dynamic = fixed === undefined

  return (
    <div className="mt-8 border-t pt-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-bold">{title}</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            {normalized.length}{' '}
            {normalized.length === 1
              ? itemName
              : `${itemName}s`}
          </p>
        </div>

        {dynamic && (
          <button
            type="button"
            onClick={() => onChange([...normalized, {}])}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Añadir
          </button>
        )}
      </div>

      {normalized.length === 0 ? (
        <p className="rounded-lg border-2 border-dashed bg-muted/20 p-6 text-center text-sm text-muted-foreground">
          No hay {title.toLowerCase()}.
        </p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {normalized.map((item, i) => (
            <div
              key={i}
              className="space-y-5 rounded-xl border bg-muted/15 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3 border-b pb-3">
                <p className="text-sm font-bold">
                  {itemName.charAt(0).toUpperCase() +
                    itemName.slice(1)}{' '}
                  {i + 1}
                </p>

                {dynamic && (
                  <button
                    type="button"
                    aria-label={`Eliminar ${itemName} ${i + 1}`}
                    onClick={() =>
                      onChange(
                        normalized.filter(
                          (_, j) => j !== i,
                        ),
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-md border border-destructive/30 bg-background px-2.5 py-1.5 text-xs font-medium text-destructive transition hover:bg-destructive/10"
                  >
                    <Trash2 className="size-3.5" />
                    Eliminar
                  </button>
                )}
              </div>

              {keys.map(([key, label, type]) =>
                type === 'image' ? (
                  <ImageUpload
                    key={key}
                    label={label}
                    value={item[key]}
                    onChange={(v) =>
                      onChange(
                        normalized.map((x, j) =>
                          j === i
                            ? { ...x, [key]: v }
                            : x,
                        ),
                      )
                    }
                  />
                ) : (
                  <Text
                    key={key}
                    label={label}
                    value={item[key]}
                    onChange={(v) =>
                      onChange(
                        normalized.map((x, j) =>
                          j === i
                            ? { ...x, [key]: v }
                            : x,
                        ),
                      )
                    }
                  />
                ),
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StringList({
  title,
  items,
  fixed,
  onChange,
}: {
  title: string
  items: unknown
  fixed: number
  onChange: (v: string[]) => void
}) {
  const list = Array.isArray(items)
    ? items.map(String)
    : []

  const normalized = Array.from(
    { length: fixed },
    (_, i) => list[i] ?? '',
  )

  return (
    <div className="mt-8 space-y-5 border-t pt-6">
      <h3 className="font-bold">{title}</h3>

      {normalized.map((value, i) => (
        <Area
          key={i}
          label={`Párrafo ${i + 1}`}
          value={value}
          onChange={(v) =>
            onChange(
              normalized.map((x, j) =>
                j === i ? v : x,
              ),
            )
          }
        />
      ))}
    </div>
  )
}

function ImageList({
  title,
  items,
  onChange,
}: {
  title: string
  items: unknown
  onChange: (v: string[]) => void
}) {
  const list = Array.isArray(items)
    ? items.map(String)
    : []

  return (
    <div className="mt-8 border-t pt-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-bold">{title}</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            {list.length}{' '}
            {list.length === 1 ? 'logo' : 'logos'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onChange([...list, ''])}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Añadir
        </button>
      </div>

      {list.length === 0 ? (
        <p className="rounded-lg border-2 border-dashed bg-muted/20 p-6 text-center text-sm text-muted-foreground">
          No hay logos de aliados.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {list.map((value, i) => (
            <div
              key={i}
              className="space-y-3 rounded-xl border bg-muted/15 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between border-b pb-3">
                <p className="text-sm font-bold">
                  Logo {i + 1}
                </p>

                <button
                  type="button"
                  aria-label={`Eliminar logo ${i + 1}`}
                  onClick={() =>
                    onChange(
                      list.filter((_, j) => j !== i),
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-md border border-destructive/30 bg-background px-2.5 py-1.5 text-xs font-medium text-destructive transition hover:bg-destructive/10"
                >
                  <Trash2 className="size-3.5" />
                  Eliminar
                </button>
              </div>

              <ImageUpload
                label="Archivo del logo"
                value={value}
                onChange={(v) =>
                  onChange(
                    list.map((x, j) =>
                      j === i ? v : x,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Text({
  label,
  value,
  onChange,
}: {
  label: string
  value?: string
  onChange: (v: string) => void
}) {
  return (
    <label>
      <span className={labelClass}>{label}</span>

      <input
        className={input}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

function Area({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string
  value?: string
  onChange: (v: string) => void
  rows?: number
}) {
  return (
    <label className="md:col-span-2">
      <span className={labelClass}>{label}</span>

      <textarea
        className={input}
        rows={rows}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

function ImageUpload({
  label,
  value,
  onChange,
}: {
  label: string
  value?: string
  onChange: (v: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  async function upload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    e.target.value = ''

    if (!file) return

    if (file.size > 8 * 1024 * 1024) {
      return toast.error('Máximo 8 MB')
    }

    setUploading(true)

    try {
      const body = new FormData()
      body.set('image', file)

      const response = await fetch(
        '/api/admin/homepage/images',
        {
          method: 'POST',
          body,
        },
      )

      if (!response.ok) {
        throw new Error()
      }

      const data = await response.json()

      onChange(data.url)

      toast.success('Imagen subida')
    } catch {
      toast.error('No se pudo subir')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <span className={labelClass}>{label}</span>

      <div className="rounded-xl border-2 border-dashed border-border bg-background p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {value ? (
            <button
              type="button"
              aria-label={`Ampliar ${label}`}
              title="Ver imagen en pantalla completa"
              onClick={() => setExpanded(true)}
              className="group relative flex size-24 shrink-0 cursor-zoom-in items-center justify-center overflow-hidden rounded-lg border p-2 shadow-inner ring-1 ring-black/5"
              style={previewBackground}
            >
              <img
                src={value}
                alt="Vista previa"
                className="relative z-10 max-h-full max-w-full object-contain drop-shadow-sm"
              />
              <span className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/35 group-hover:opacity-100">
                <Maximize2 className="size-6 drop-shadow" />
              </span>
            </button>
          ) : (
            <div className="flex size-24 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground shadow-sm">
              <ImageIcon className="size-8" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="mb-2 text-xs text-muted-foreground">
              JPG, PNG, WebP o GIF · máximo 8 MB
            </p>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-primary px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:bg-primary/5">
              {uploading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}

              {uploading
                ? 'Subiendo...'
                : 'Seleccionar imagen'}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={upload}
              />
            </label>
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <label className="mb-2 block text-xs font-medium text-muted-foreground">
            O introduce la URL de la imagen
          </label>

          <input
            className={input}
            value={value ?? ''}
            placeholder="https://... o /imagen.png"
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>

      {expanded && value && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${label}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setExpanded(false)}
        >
          <button
            type="button"
            aria-label="Cerrar vista ampliada"
            onClick={() => setExpanded(false)}
            className="absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-lg transition hover:bg-white/15 sm:right-6 sm:top-6"
          >
            <X className="size-6" />
          </button>

          <div
            className="flex max-h-full max-w-full items-center justify-center overflow-hidden rounded-xl p-3 shadow-2xl sm:p-5"
            style={previewBackground}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={value}
              alt={label}
              className="max-h-[calc(100vh-4rem)] max-w-[calc(100vw-2rem)] object-contain drop-shadow-md sm:max-h-[calc(100vh-6rem)] sm:max-w-[calc(100vw-6rem)]"
            />
          </div>
        </div>
      )}
    </div>
  )
}
