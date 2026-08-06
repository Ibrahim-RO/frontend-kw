import { LabelHTMLAttributes } from 'react'

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

export default function FormLabel({ required, className, children, ...rest }: Props) {
  const base = 'block font-medium text-neutral-800'
  const combined = className ? `${base} ${className}` : base

  return (
    <label {...rest} className={combined}>
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  )
}
