import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export default function FormInput(props: Props) {
  const { className } = props

  return (
    <input
      {...props}
      className={clsx('h-12 w-full rounded-md border border-slate-300 bg-white pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-600 focus:ring-3 focus:ring-red-100', className)}
    />
  )
}
