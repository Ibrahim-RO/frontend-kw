import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export default function FormSubmit({ className = '', children, type = 'submit', ...props }: Props) {
  return (
    <button
      {...props}
      type={type}
      className={`flex h-12 w-full items-center justify-center gap-2 rounded-md px-4 text-sm font-bold shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-px cursor-pointer ${className}`}
    >
      {children}
    </button>
  )
}
