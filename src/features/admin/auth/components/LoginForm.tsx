'use client'

import { Form, FormError, FormField, FormInput, FormSubmit } from '@/src/shared/components/forms'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner'
import { loginForm } from '../schemas';
import { useMutation } from '@tanstack/react-query';
import { loginAction } from '../actions/login.action';
import { useRouter } from 'next/navigation';


export default function LoginForm() {
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginForm),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { mutate } = useMutation({
    mutationFn: loginAction,
    onError: () => {
      toast.error('Credenciales incorrectas');
    },
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message)
        return
      }
      toast.success('Inicio de sesión satisfactorio');
      router.replace('/admin/usuarios')
    }
  })

  const onSubmit = (data: { email: string; password: string }) => {
    mutate(data);
  }


  return (
    <Form
      className="space-y-5"
      onSubmit={handleSubmit(onSubmit)}
    >
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
            type="email"
            autoComplete="email"
            placeholder="agente@kwmexico.com"
            className='pl-10'
            {...register('email')}
          />
        </div>
        {errors.email && <FormError>{errors.email.message}</FormError>}
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
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className='pl-10'
            {...register('password')}
          />
        </div>
        {errors.password && <FormError>{errors.password.message}</FormError>}
      </FormField>

      <FormSubmit className="bg-red-700 text-white hover:bg-red-800 focus-visible:outline-red-800">
        Iniciar sesión
        <span aria-hidden="true">→</span>
      </FormSubmit>
    </Form>
  )
}

