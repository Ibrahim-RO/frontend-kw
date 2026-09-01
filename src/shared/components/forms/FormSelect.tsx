import clsx from 'clsx'
import { SelectHTMLAttributes } from 'react'

type Props = SelectHTMLAttributes<HTMLSelectElement>

export default function FormSelect(props: Props) {
  const { className, children, ...rest } = props

  return (
    <select
      {...rest}
      className={clsx(
        'h-12 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-red-600 focus:ring-3 focus:ring-red-100',
        className,
      )}
    >
      {children}
    </select>
  )
}
