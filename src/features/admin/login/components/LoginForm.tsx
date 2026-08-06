import { Form, FormError, FormField, FormInput, FormSubmit, FormTextArea } from '@/src/shared/components/forms'

export default function LoginForm() {
  return (
    <Form className="space-y-5">
      <FormField>
        <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600">
          Correo electrónico
        </label>
        <div className="relative">
          <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <FormInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="agente@kwmexico.com"
            className='pl-10'
          />
        </div>
      </FormField>

      <FormField>
        <div className="mb-2 flex items-center justify-between gap-4">
          <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Contraseña
          </label>
          {/* <Link href="/" className="text-xs font-semibold text-[#b40101] hover:underline">
            ¿Olvidaste tu contraseña?
          </Link> */}
        </div>
        <div className="relative">
          <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="5" y="10" width="14" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
          </svg>
          <FormInput
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className='pl-10'
          />          
        </div>        
      </FormField>         

      <FormSubmit
        className="bg-red-700  text-white  hover:bg-red-800  focus-visible:outline-red-800"
      >
        Iniciar sesión
        <span aria-hidden="true">→</span>
      </FormSubmit>
    </Form>
  )
}

 