# Next.js Feature-Based Architecture

Aplicación web desarrollada con **Next.js**, **TypeScript** y **pnpm**, organizada mediante una arquitectura basada en características.

Este enfoque agrupa los archivos por funcionalidad o dominio de negocio, en lugar de separarlos únicamente por tipo técnico. Cada característica puede contener sus propios componentes, servicios, hooks, validaciones, tipos y estado global.

---

## Tabla de contenidos

* [Tecnologías](#tecnologías)
* [Requisitos](#requisitos)
* [Instalación](#instalación)
* [Variables de entorno](#variables-de-entorno)
* [Scripts disponibles](#scripts-disponibles)
* [Arquitectura del proyecto](#arquitectura-del-proyecto)
* [Estructura de una característica](#estructura-de-una-característica)
* [Reglas de organización](#reglas-de-organización)
* [Importaciones](#importaciones)
* [Consumo de API](#consumo-de-api)
* [Manejo del estado](#manejo-del-estado)
* [Validación de formularios](#validación-de-formularios)
* [Convenciones](#convenciones)
* [Flujo de trabajo](#flujo-de-trabajo)
* [Construcción para producción](#construcción-para-producción)
* [Despliegue](#despliegue)

---

## Tecnologías

El proyecto utiliza las siguientes tecnologías principales:

* [Next.js](https://nextjs.org/)
* [React](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [pnpm](https://pnpm.io/)
* [Tailwind CSS](https://tailwindcss.com/)
* App Router de Next.js
* ESLint
* Prettier

Dependiendo de las necesidades del proyecto, también pueden utilizarse:

* Zustand para estado global
* TanStack Query para estado del servidor
* Axios para peticiones HTTP
* React Hook Form para formularios
* Zod para validaciones
* Sonner para notificaciones

---

## Requisitos

Antes de instalar el proyecto, asegúrate de tener las siguientes herramientas:

* Node.js 20 o superior
* pnpm 9 o superior
* Git

Puedes comprobar las versiones instaladas con:

```bash
node --version
pnpm --version
git --version
```

Si no tienes pnpm instalado, puedes instalarlo con Corepack:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

También puedes instalarlo globalmente con npm:

```bash
npm install -g pnpm
```

---

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/usuario/nombre-del-proyecto.git
```

Ingresa al directorio:

```bash
cd nombre-del-proyecto
```

Instala las dependencias:

```bash
pnpm install
```

Crea el archivo de variables de entorno:

```bash
cp .env.example .env.local
```

Inicia el servidor de desarrollo:

```bash
pnpm dev
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

---

## Variables de entorno

Las variables públicas deben comenzar con el prefijo `NEXT_PUBLIC_`.

Ejemplo del archivo `.env.example`:

```env
NEXT_PUBLIC_APP_NAME="Nombre del proyecto"
NEXT_PUBLIC_API_URL="http://localhost:8000/api"

API_SECRET_KEY=""
```

El archivo `.env.local` no debe agregarse al repositorio.

```gitignore
.env
.env.local
.env.development.local
.env.production.local
```

Para acceder a una variable pública:

```ts
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

Las variables que no comiencen con `NEXT_PUBLIC_` solamente estarán disponibles en el servidor.

---

## Scripts disponibles

Ejecutar el proyecto en desarrollo:

```bash
pnpm dev
```

Generar la compilación de producción:

```bash
pnpm build
```

Ejecutar la aplicación compilada:

```bash
pnpm start
```

Ejecutar ESLint:

```bash
pnpm lint
```

Comprobar errores de TypeScript:

```bash
pnpm typecheck
```

Aplicar formato al código:

```bash
pnpm format
```

Comprobar el formato sin modificar archivos:

```bash
pnpm format:check
```

Ejemplo de configuración en `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

---

## Arquitectura del proyecto

El proyecto utiliza una arquitectura basada en características.

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/
│   │   ├── users/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── features/
│   ├── auth/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   └── index.ts
│   │
│   └── users/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── schemas/
│       ├── services/
│       ├── store/
│       ├── types/
│       └── index.ts
│
├── shared/
│   ├── components/
│   │   ├── ui/
│   │   └── layout/
│   ├── constants/
│   ├── hooks/
│   ├── lib/
│   ├── providers/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── utils/
│
├── config/
│   ├── environment.ts
│   ├── navigation.ts
│   └── site.ts
│
├── middleware.ts
└── types/
```

### `app`

Contiene las rutas, layouts y archivos especiales del App Router de Next.js.

Los archivos de esta carpeta deben enfocarse principalmente en:

* Definir rutas
* Obtener parámetros
* Configurar metadata
* Ejecutar validaciones de acceso
* Renderizar componentes de las características
* Coordinar Server Components

Se recomienda evitar colocar lógica de negocio compleja directamente dentro de `page.tsx`.

Ejemplo:

```tsx
import { UsersPage } from '@/features/users'

export default function Page() {
  return <UsersPage />
}
```

### `features`

Contiene las funcionalidades principales del sistema.

Cada carpeta representa una característica o dominio del negocio, por ejemplo:

```text
features/
├── auth/
├── users/
├── products/
├── orders/
└── reports/
```

Cada característica debe ser independiente y contener únicamente los elementos relacionados con su funcionalidad.

### `shared`

Contiene recursos reutilizables que no pertenecen exclusivamente a una característica.

Ejemplos:

* Botones
* Modales genéricos
* Campos de formulario
* Componentes de tablas
* Hooks generales
* Cliente HTTP
* Funciones de formato
* Tipos compartidos
* Providers globales

### `config`

Contiene configuraciones generales del proyecto.

Ejemplos:

* Configuración del sitio
* Navegación
* Variables de entorno
* Roles y permisos
* Opciones generales

---

## Estructura de una característica

Una característica puede tener la siguiente estructura:

```text
features/users/
├── api/
│   ├── create-user.ts
│   ├── delete-user.ts
│   ├── get-user.ts
│   ├── get-users.ts
│   └── update-user.ts
│
├── components/
│   ├── create-user-form.tsx
│   ├── edit-user-form.tsx
│   ├── user-card.tsx
│   ├── user-detail.tsx
│   ├── users-page.tsx
│   └── users-table.tsx
│
├── hooks/
│   ├── use-create-user.ts
│   ├── use-delete-user.ts
│   ├── use-user.ts
│   └── use-users.ts
│
├── schemas/
│   └── user.schema.ts
│
├── services/
│   └── user.service.ts
│
├── store/
│   └── user.store.ts
│
├── types/
│   └── user.types.ts
│
├── utils/
│   └── user.utils.ts
│
└── index.ts
```

No todas las características necesitan todas las carpetas. Solamente deben agregarse cuando sean necesarias.

### `api`

Contiene las funciones relacionadas con las operaciones HTTP de la característica.

```ts
import { httpClient } from '@/shared/lib/http-client'
import type { User } from '../types/user.types'

export async function getUsers(): Promise<User[]> {
  const response = await httpClient.get<User[]>('/users')

  return response.data
}
```

### `components`

Contiene componentes relacionados exclusivamente con la característica.

```tsx
import type { User } from '../types/user.types'

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  return (
    <article>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </article>
  )
}
```

### `hooks`

Contiene hooks personalizados de la característica.

```ts
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../api/get-users'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
}
```

### `schemas`

Contiene esquemas de validación.

```ts
import { z } from 'zod'

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre no puede superar los 100 caracteres'),

  email: z
    .string()
    .trim()
    .min(1, 'El correo electrónico es obligatorio')
    .email('El correo electrónico no es válido'),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
```

### `services`

Contiene lógica de negocio o coordinación entre diferentes operaciones.

```ts
import { createUser } from '../api/create-user'
import type { CreateUserInput } from '../schemas/user.schema'

export const userService = {
  async register(data: CreateUserInput) {
    const normalizedData = {
      ...data,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
    }

    return createUser(normalizedData)
  },
}
```

### `store`

Contiene el estado global propio de la característica.

```ts
import { create } from 'zustand'
import type { User } from '../types/user.types'

interface UserState {
  selectedUser: User | null
  setSelectedUser: (user: User | null) => void
}

export const useUserStore = create<UserState>((set) => ({
  selectedUser: null,

  setSelectedUser: (selectedUser) => {
    set({ selectedUser })
  },
}))
```

### `types`

Contiene interfaces, tipos y enumeraciones.

```ts
export interface User {
  id: number
  name: string
  email: string
  isActive: boolean
  createdAt: string
}

export interface UserFilters {
  search?: string
  isActive?: boolean
  page?: number
}
```

### `utils`

Contiene funciones auxiliares específicas de la característica.

```ts
import type { User } from '../types/user.types'

export function getUserStatus(user: User): string {
  return user.isActive ? 'Activo' : 'Inactivo'
}
```

### `index.ts`

Define la API pública de la característica.

```ts
export { UsersPage } from './components/users-page'
export { UserCard } from './components/user-card'
export { useUsers } from './hooks/use-users'

export type {
  User,
  UserFilters,
} from './types/user.types'
```

Desde otras partes del proyecto se debe importar desde la raíz de la característica:

```ts
import { UsersPage, type User } from '@/features/users'
```

Se debe evitar importar archivos internos directamente:

```ts
// Evitar
import { UsersPage } from '@/features/users/components/users-page'
```

---

## Reglas de organización

### Una característica no debe depender directamente de otra

Se debe evitar lo siguiente:

```ts
import { useUserStore } from '@/features/users/store/user.store'
```

Cuando dos características necesiten compartir una funcionalidad, debe evaluarse moverla a `shared`.

```text
shared/
├── components/
├── hooks/
├── services/
├── types/
└── utils/
```

### Los componentes compartidos no deben contener lógica de negocio

Un botón genérico puede estar en:

```text
shared/components/ui/button.tsx
```

Un botón que cambia el estado de un usuario debe permanecer dentro de:

```text
features/users/components/change-user-status-button.tsx
```

### Las páginas deben ser pequeñas

Los archivos `page.tsx` deben utilizar componentes de las características:

```tsx
import { UserDetailPage } from '@/features/users'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return <UserDetailPage userId={Number(id)} />
}
```

### No crear carpetas innecesarias

Una característica pequeña puede comenzar así:

```text
features/profile/
├── components/
│   └── profile-page.tsx
├── types/
│   └── profile.types.ts
└── index.ts
```

La estructura puede crecer conforme aumente la complejidad.

---

## Importaciones

El proyecto utiliza alias para evitar rutas relativas extensas.

Configuración en `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/app/*": ["./src/app/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/config/*": ["./src/config/*"]
    }
  }
}
```

Ejemplo:

```ts
import { Button } from '@/shared/components/ui/button'
import { UsersPage } from '@/features/users'
import { siteConfig } from '@/config/site'
```

En lugar de:

```ts
import { Button } from '../../../../shared/components/ui/button'
```

---

## Consumo de API

Se recomienda crear un cliente HTTP centralizado.

```text
shared/
└── lib/
    └── http-client.ts
```

Ejemplo con Axios:

```ts
import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

if (!apiUrl) {
  throw new Error('La variable NEXT_PUBLIC_API_URL no está configurada')
}

export const httpClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
})
```

Cada característica debe definir sus propias operaciones.

```ts
import { httpClient } from '@/shared/lib/http-client'
import type { User } from '../types/user.types'

interface GetUsersResponse {
  success: boolean
  data: User[]
}

export async function getUsers(): Promise<User[]> {
  const response = await httpClient.get<GetUsersResponse>('/users')

  return response.data.data
}
```

Para peticiones con parámetros:

```ts
import { httpClient } from '@/shared/lib/http-client'
import type {
  User,
  UserFilters,
} from '../types/user.types'

interface PaginatedUsersResponse {
  data: User[]
  total: number
  page: number
  pageSize: number
}

export async function getUsers(
  filters: UserFilters,
): Promise<PaginatedUsersResponse> {
  const response = await httpClient.get<PaginatedUsersResponse>('/users', {
    params: filters,
  })

  return response.data
}
```

---

## Manejo del estado

El proyecto diferencia entre dos tipos de estado.

### Estado del servidor

Son datos obtenidos desde una API:

* Usuarios
* Productos
* Pedidos
* Reportes
* Catálogos

Se recomienda administrarlos con TanStack Query.

```ts
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../api/get-users'
import type { UserFilters } from '../types/user.types'

export function useUsers(filters: UserFilters) {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => getUsers(filters),
  })
}
```

### Estado del cliente

Es información utilizada únicamente por la interfaz:

* Elemento seleccionado
* Estado de un modal
* Preferencias visuales
* Filtros temporales
* Información de una sesión local

Se puede administrar con Zustand.

```ts
import { create } from 'zustand'

interface UserUIState {
  isCreateModalOpen: boolean
  openCreateModal: () => void
  closeCreateModal: () => void
}

export const useUserUIStore = create<UserUIState>((set) => ({
  isCreateModalOpen: false,

  openCreateModal: () => {
    set({ isCreateModalOpen: true })
  },

  closeCreateModal: () => {
    set({ isCreateModalOpen: false })
  },
}))
```

No se recomienda copiar datos completos de una API a Zustand cuando ya están administrados por TanStack Query.

---

## Validación de formularios

Los esquemas de validación deben mantenerse dentro de la característica correspondiente.

Ejemplo con React Hook Form y Zod:

```tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  createUserSchema,
  type CreateUserInput,
} from '../schemas/user.schema'

export function CreateUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const onSubmit = async (data: CreateUserInput) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Nombre</label>

        <input
          id="name"
          type="text"
          {...register('name')}
        />

        {errors.name && (
          <p>{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Correo electrónico</label>

        <input
          id="email"
          type="email"
          {...register('email')}
        />

        {errors.email && (
          <p>{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  )
}
```

---

## Server Components y Client Components

Next.js utiliza Server Components de forma predeterminada.

Se debe utilizar `'use client'` solamente cuando el componente necesite:

* Hooks de React
* Eventos del navegador
* Estado local
* Contextos del cliente
* APIs del navegador
* Librerías que dependan del DOM

Ejemplo de Server Component:

```tsx
import { getUsers } from '../api/get-users'
import { UsersTable } from './users-table'

export async function UsersPage() {
  const users = await getUsers()

  return <UsersTable users={users} />
}
```

Ejemplo de Client Component:

```tsx
'use client'

import { useState } from 'react'

export function UserSearch() {
  const [search, setSearch] = useState('')

  return (
    <input
      value={search}
      onChange={(event) => {
        setSearch(event.target.value)
      }}
      placeholder="Buscar usuarios"
    />
  )
}
```

Se recomienda mantener los Client Components lo más pequeños posible.

---

## Convenciones

### Archivos y carpetas

Utilizar `kebab-case`:

```text
create-user-form.tsx
user-detail.tsx
use-user-filters.ts
user.schema.ts
user.types.ts
```

### Componentes

Utilizar `PascalCase`:

```tsx
export function CreateUserForm() {
  return <form />
}
```

### Funciones y variables

Utilizar `camelCase`:

```ts
const selectedUser = null

function getUserById() {}
```

### Hooks

Deben comenzar con `use`:

```ts
useUsers()
useUserFilters()
useCreateUser()
```

### Tipos e interfaces

Utilizar `PascalCase`:

```ts
interface User {}
interface CreateUserRequest {}
type UserStatus = 'active' | 'inactive'
```

### Constantes

Utilizar `UPPER_SNAKE_CASE` para constantes globales:

```ts
const DEFAULT_PAGE_SIZE = 10
const MAX_FILE_SIZE = 5_000_000
```

### Booleanos

Utilizar prefijos descriptivos:

```ts
const isLoading = true
const isActive = false
const hasPermission = true
const canEdit = false
```

### Eventos

Utilizar el prefijo `handle` para controladores internos:

```ts
function handleSubmit() {}
function handleDelete() {}
function handleStatusChange() {}
```

Utilizar el prefijo `on` para propiedades recibidas:

```ts
interface UserCardProps {
  onEdit: () => void
  onDelete: () => void
}
```

---

## Flujo de trabajo

Crear una rama a partir de la rama de desarrollo:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nombre-funcionalidad
```

Ejemplos de nombres de ramas:

```text
feature/user-management
feature/authentication
fix/user-form-validation
refactor/http-client
docs/update-readme
```

Agregar los cambios:

```bash
git add .
```

Crear un commit:

```bash
git commit -m "feat: add user creation form"
```

Subir la rama:

```bash
git push origin feature/user-management
```

### Convención de commits

Se recomienda utilizar Conventional Commits:

```text
feat: agrega una nueva funcionalidad
fix: corrige un error
docs: modifica documentación
style: modifica estilos o formato
refactor: reorganiza código sin cambiar comportamiento
test: agrega o modifica pruebas
chore: modifica configuración o herramientas
perf: mejora el rendimiento
```

Ejemplos:

```bash
git commit -m "feat: add user management module"
git commit -m "fix: validate empty email field"
git commit -m "refactor: move user requests to feature API"
git commit -m "docs: update installation instructions"
```

---

## Construcción para producción

Genera la compilación:

```bash
pnpm build
```

Ejecuta la compilación localmente:

```bash
pnpm start
```

Antes de desplegar, ejecuta:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

La aplicación no debe desplegarse si alguno de estos comandos presenta errores.

---

## Despliegue

El proyecto puede desplegarse en diferentes plataformas.

### Vercel

Vercel detecta automáticamente los proyectos Next.js.

Configuración recomendada:

```text
Install Command: pnpm install
Build Command: pnpm build
Output Directory: .next
```

### Servidor propio

Instala las dependencias:

```bash
pnpm install --frozen-lockfile
```

Genera la aplicación:

```bash
pnpm build
```

Inicia el servidor:

```bash
pnpm start
```

Para mantener el proyecto activo se puede utilizar PM2:

```bash
pnpm add -g pm2
pm2 start pnpm --name "next-app" -- start
pm2 save
```

### Docker

Ejemplo de `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

RUN corepack enable

FROM base AS dependencies

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

FROM base AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["pnpm", "start"]
```

Construir la imagen:

```bash
docker build -t next-feature-app .
```

Ejecutar el contenedor:

```bash
docker run -p 3000:3000 next-feature-app
```

---

## Principios de la arquitectura

La arquitectura del proyecto sigue estos principios:

1. Cada funcionalidad debe estar encapsulada dentro de su propia característica.
2. Los recursos compartidos deben permanecer independientes de la lógica de negocio.
3. Las páginas deben delegar la lógica a las características.
4. Las características deben exponer una API pública mediante su archivo `index.ts`.
5. Se deben evitar dependencias directas entre características.
6. La estructura debe crecer conforme crece la complejidad.
7. Los componentes deben tener una responsabilidad clara.
8. La lógica de negocio no debe colocarse directamente en componentes visuales.
9. El estado del servidor y el estado del cliente deben administrarse por separado.
10. Los nombres deben expresar claramente la responsabilidad de cada archivo.

---

## Licencia

Este proyecto es privado y su código no puede distribuirse, modificarse ni utilizarse sin autorización expresa del propietario.
