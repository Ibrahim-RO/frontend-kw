@AGENTS.md

# Convenciones del proyecto — frontend-kw

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. La feature `src/features/admin/auth` es la referencia de patrón a seguir para cualquier feature nueva.

## Arquitectura por feature

Cada feature sigue la forma de `admin/auth`:
```
src/features/<area>/<feature>/
  actions/      Server Actions ('use server'), ej. login.action.ts
  api/          axios client contra la ruta BFF propia, ej. users.client.ts -> /api/admin/users
  components/   componentes de React propios de la feature
  dal/          Data Access Layer ('server-only', usa adminApi contra el backend real)
  hooks/        hooks de react-query (useX/useXMutations) que consumen api/
  schemas/      esquemas zod de validación
```
Patrón típico para un recurso CRUD del admin (ver `admin/users` o `admin/blog`): página en `app/admin/(panel)/<recurso>/...` → componente `*Page.tsx` → hook de `hooks/` → `api/<recurso>.client.ts` (axios contra `/api/admin/<recurso>`) → route handler en `app/api/admin/<recurso>/route.ts` → `dal/<recurso>.dal.ts` (`adminApi`, agrega el `Bearer` de la sesión) → backend real. El DAL nunca se llama directo desde un componente cliente; siempre pasa por la ruta BFF.

No mezcles la lógica de una feature dentro de otra ni la pongas directo en `app/`. Las páginas en `app/` deben quedar delgadas: solo componen las piezas que vienen de `src/features/...`.

## Obtención de datos

Prioridad: **react-query** para todo lo que se pueda manejar desde el cliente. Usa Server Actions únicamente cuando react-query no sea viable (ej. mutaciones que dependen de cookies/sesión del servidor, como login/logout).

## Formularios

Todo formulario usa `zod` (esquema en `schemas/`) + `react-hook-form`, reutilizando los componentes genéricos ya existentes en `src/shared/components/forms` (`Form`, `FormField`, `FormInput`, `FormLabel`, `FormSelect`, `FormTextArea`, `FormSubmit`, `FormError`). No crees inputs/labels nuevos desde cero si ya existe el genérico equivalente ahí.

## Componentes de UI

**No se usa shadcn/ui** — no generes ni instales componentes de shadcn aunque la dependencia esté en `package.json`. Los componentes reutilizables genéricos viven en `src/shared/components/`; revisa ahí antes de crear uno nuevo. Ya existen, entre otros: `ConfirmDialog`, `Pagination` (+ `src/shared/lib/pagination.ts` para `getPageNumbers`), `LuxuryRibbon`.

Para overlays accesibles (modal, menú, dropdown) sí se usa `@base-ui/react` (ej. `ConfirmDialog` usa `alert-dialog`, `UserMenu` usa `menu`) — es la excepción a la regla de "no shadcn", no un componente visual con estilos propios que haya que evitar.

Notificaciones/errores al usuario: `sonner` (`src/shared/components/sonner.tsx`), no `alert()` ni notificaciones hechas a mano.

## Home administrable (CMS de secciones)

La home (`app/(website)/page.tsx`) NO tiene las secciones hardcodeadas: lee el documento publicado vía `getPublishedHomepage()` (`src/features/website/homepage.ts`, llama a `GET /homepage` del backend) y renderiza `page.sections.filter(s => s.visible).map(section => <ManagedSection section={section} />)`. `ManagedSection` (`src/features/website/components/home/ManagedSection.tsx`) es un `switch` sobre `section.id` que decide qué componente de sección renderizar.

Cualquier sección de home (Hero, Propiedades, Reconocimientos, etc.) sigue este contrato:
- Recibe `content?: HomepageSection` (tipo en `src/features/admin/homepage/types.ts`) en vez de props fijas.
- Usa `content?.title` / `content?.subtitle` / `content?.buttonLabel` / `content?.buttonUrl` para los campos simples ya tipados en `HomepageSection`; cualquier campo extra (listas, textos secundarios, urls de imagen adicionales) va dentro de `content?.data`.
- Siempre trae un fallback en español si `content` viene vacío (ej. `content?.title || 'Propiedades cerca de ti'`), porque el admin puede no haber personalizado esa sección todavía.
- El texto/orden por default de cada sección vive en dos lugares que deben mantenerse alineados: `src/features/admin/homepage/section-defaults.ts` (frontend, usado por `ManagedSection` al fusionar `content.data`) y `backend-kw/src/homepage/homepage.service.ts` (semilla que se guarda en la BD la primera vez que se crea el registro `homepage_settings`). Si cambias el texto/orden por default de una sección, actualiza los dos.

El panel `Configuración > Homepage` (`src/features/admin/homepage/components/HomepageEditor.tsx`) edita/reordena/oculta secciones contra `/admin/homepage` (borrador) y las publica contra `/admin/homepage/publish`. Las secciones son independientes entre sí — si necesitas que dos se vean "pegadas" visualmente (como Hero + Propiedades), hazlo con estilos (sin márgenes/gaps entre secciones), nunca anidando el componente de una dentro de otra, porque rompe que el admin las pueda reordenar/ocultar por separado.

## Blog público

El blog tiene dos mitades separadas, como cualquier recurso con lectura pública + gestión admin:
- **Admin** (`src/features/admin/blog`): CRUD completo contra `backend-kw`'s `admin/blog` (crear/editar/eliminar, `RichTextEditor` con Tiptap para `content`, `ImageUpload` para `featured_image_url`). Sigue el patrón estándar `actions/api/components/dal/hooks/schemas` del resto del admin.
- **Público** (`src/features/website/blog`): páginas `app/(website)/blog/page.tsx` (listado, con paginación simple Anterior/Siguiente vía `?page=`) y `app/(website)/blog/[slug]/page.tsx` (detalle, con tabla de contenidos generada de los `<h2>` del `content` vía `lib/content.ts`, botones de compartir y `generateMetadata` para SEO). Ambas son Server Components que llaman directo a `GET /blog` y `GET /blog/:slug` del backend (`dal/blog.dal.ts`, `fetch` con `next.revalidate`, sin pasar por BFF porque es lectura pública sin sesión) — mismo patrón que `getPublishedHomepage()`. El link "Blog" vive en `src/shared/components/ui/Header.tsx` junto con el resto de la navegación pública.

`src/shared/components/ImageUpload.tsx` es el componente de subida de imágenes reutilizable (recibe `endpoint`) — lo usan tanto `admin/blog` como (vía su propia copia local histórica) `admin/homepage`; para una sección nueva que necesite subir imágenes, usa el componente compartido en vez de duplicarlo otra vez.

## Identidad visual

Definida en `UI.jpeg` (raíz del proyecto `KW-MEXICO`, fuera de este repo):

**Colores:**
| Token | Hex |
|---|---|
| Primary | `#B40101` |
| Secondary | `#212121` |
| Tertiary | `#757575` |
| Neutral | `#8B716D` |

Cada uno tiene su propia escala de tintes/sombras (ver la imagen). El `--destructive`/`--sidebar-*`/`--primary`/`--ring` de `globals.css` deben alinearse a `Primary` (`#B40101`) — si se ajustan colores del tema, usar estos valores como fuente de verdad en vez de inventar otros. Esto aplica también al panel admin: usa las clases semánticas (`bg-primary`, `text-primary`, `focus-visible:outline-primary`, etc.) en vez de colores sueltos de Tailwind (`red-700`, `slate-600`...) para que herede la marca automáticamente.

**Distintivo Luxury:** propiedades y agentes pueden traer `Luxury: 1` desde el API externo. Cuando así sea, se muestra el componente compartido `<LuxuryRibbon />` (`src/shared/components/LuxuryRibbon.tsx`) — cintillo diagonal negro con "LUXURY" en dorado, en la esquina superior derecha de la tarjeta. El contenedor de la tarjeta necesita `relative overflow-hidden` para que se recorte como listón. Usa `size="sm"` en tarjetas compactas (ej. el carrusel del home) para que no se vea desproporcionado.

**Tipografía:** la marca KW usa Helvetica Neue LT Std (cuerpo/texto de apoyo) y DIN Next LT Pro Heavy Condensed (titulares y diseños de patrones), pero ninguna de las dos está disponible como Google Font para web. Por eso el sitio usa las alternativas web que el cliente autorizó para ese caso: encabezados en **Rubik** (alternativa de DIN Next), cuerpo y labels en **Roboto** (alternativa de Helvetica cuando no está disponible en web). Ambas se cargan vía `next/font/google` en `app/layout.tsx` (`--font-heading` y `--font-sans` respectivamente). No uses Montserrat/Inter ni ninguna otra tipografía — sin excepciones.

**Botones:** 4 variantes — Primary (relleno rojo), Secondary (relleno claro), Inverted (relleno oscuro), Outlined (solo borde).

## Flujo de trabajo

- Los commits van directo a `main` (no hay ramas por tarea ni Pull Requests).
- No hay proceso de revisión de código ni CI/CD configurado.
- Prefijos de commit:
  - `feat:` implementación nueva
  - `fix:` arreglo o corrección de algo existente
  - `remove:` eliminación de algo
