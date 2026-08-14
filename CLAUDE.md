@AGENTS.md

# Convenciones del proyecto — frontend-kw

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. La feature `src/features/admin/auth` es la referencia de patrón a seguir para cualquier feature nueva.

## Arquitectura por feature

Cada feature sigue la forma de `admin/auth`:
```
src/features/<area>/<feature>/
  actions/      Server Actions ('use server'), ej. login.action.ts
  components/   componentes de React propios de la feature
  dal/          Data Access Layer (lecturas de sesión/datos del lado servidor)
  schemas/      esquemas zod de validación
```
No mezcles la lógica de una feature dentro de otra ni la pongas directo en `app/`. Las páginas en `app/` deben quedar delgadas: solo componen las piezas que vienen de `src/features/...`.

## Obtención de datos

Prioridad: **react-query** para todo lo que se pueda manejar desde el cliente. Usa Server Actions únicamente cuando react-query no sea viable (ej. mutaciones que dependen de cookies/sesión del servidor, como login/logout).

## Formularios

Todo formulario usa `zod` (esquema en `schemas/`) + `react-hook-form`, reutilizando los componentes genéricos ya existentes en `src/shared/components/forms` (`Form`, `FormField`, `FormInput`, `FormLabel`, `FormTextArea`, `FormSubmit`, `FormError`). No crees inputs/labels nuevos desde cero si ya existe el genérico equivalente ahí.

## Componentes de UI

**No se usa shadcn/ui** — no generes ni instales componentes de shadcn aunque la dependencia esté en `package.json`. Los componentes reutilizables genéricos viven en `src/shared/components/`; revisa ahí antes de crear uno nuevo.

Notificaciones/errores al usuario: `sonner` (`src/shared/components/sonner.tsx`), no `alert()` ni notificaciones hechas a mano.

## Identidad visual

Definida en `UI.jpeg` (raíz del proyecto `KW-MEXICO`, fuera de este repo):

**Colores:**
| Token | Hex |
|---|---|
| Primary | `#B40101` |
| Secondary | `#212121` |
| Tertiary | `#757575` |
| Neutral | `#8B716D` |

Cada uno tiene su propia escala de tintes/sombras (ver la imagen). El `--destructive`/`--sidebar-*` de `globals.css` deben alinearse a `Primary` (`#B40101`) — si se ajustan colores del tema, usar estos valores como fuente de verdad en vez de inventar otros.

**Tipografía:** encabezados en **Montserrat**, cuerpo y labels en **Inter** (agregar Montserrat vía `next/font/google` igual que ya se hace con Inter en `app/layout.tsx`).

**Botones:** 4 variantes — Primary (relleno rojo), Secondary (relleno claro), Inverted (relleno oscuro), Outlined (solo borde).

## Flujo de trabajo

- Los commits van directo a `main` (no hay ramas por tarea ni Pull Requests).
- No hay proceso de revisión de código ni CI/CD configurado.
- Prefijos de commit:
  - `feat:` implementación nueva
  - `fix:` arreglo o corrección de algo existente
  - `remove:` eliminación de algo
