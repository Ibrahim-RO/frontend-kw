import LoginForm from '@/src/features/admin/auth/components/LoginForm'
import Link from 'next/link'

const heroImage = '/image-login.webp';

export default function Page() {
  return (
    <main className="grid min-h-screen bg-[#f7f9fc] lg:grid-cols-[minmax(420px,1.03fr)_minmax(520px,0.97fr)]">
      <section
        className="relative hidden min-h-screen overflow-hidden bg-[#173f5c] lg:flex"
        aria-label="Keller Williams México"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0b466a]/95 via-[#0b3a58]/55 to-[#071d2d]/90" />

        <div className="relative z-10 flex w-full flex-col justify-between px-12 py-10 text-white xl:px-16 xl:py-12">
          <div>
            <p className="text-2xl font-bold tracking-tight">KW México</p>
            <p className="mt-1 text-sm font-semibold text-white/90">Admin Console</p>
          </div>

          <div className="max-w-lg pb-2">
            <p className="text-sm font-medium leading-6 text-white/95 xl:text-base">
              Potenciando a nuestros agentes con herramientas precisas e información estratégica para una gestión inmobiliaria de alto valor.
            </p>
            <div className="mt-6 flex items-center gap-4 text-white" aria-hidden="true">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 19V9m6 10V5m6 14v-7m4 7H2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 20h18M5 20V9l7-5 7 5v11M9 20v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 3 5 6v5c0 4.8 2.8 8.1 7 10 4.2-1.9 7-5.2 7-10V6l-7-3Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m9.5 12 1.7 1.7 3.6-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <p className="text-2xl font-bold tracking-tight text-[#173f5c]">KW México</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">Admin Console</p>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Iniciar sesión</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Ingresa tus credenciales para acceder al panel de administración.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>

          <div className="my-9 h-px bg-slate-200" />

          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
            >
              <span aria-hidden="true">←</span>
              Volver al sitio corporativo
            </Link>
            <p className="mt-14 text-xs text-slate-400">
              © {new Date().getFullYear()} KW México. Acceso exclusivo para administradores.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
