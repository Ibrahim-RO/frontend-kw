import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export default function FormSubmit({ className = '', children }: Props) {
  return (
    <button
      type="submit"
      className={`flex h-12 w-full items-center justify-center gap-2 rounded-md px-4 text-sm font-bold shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-px cursor-pointer ${className}`}
    >
      {children}
    </button>
  )
}

