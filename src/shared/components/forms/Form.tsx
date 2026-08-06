import { ReactNode } from 'react'
import { FormHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = FormHTMLAttributes<HTMLFormElement>

export default function Form(props: Props) {
  const { className } = props

  return (
    <form {...props} className={clsx('space-y-3', className)}>
      {props.children}
    </form>
  )
}
