import { TextareaHTMLAttributes } from 'react'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

export default function FormTextArea(props: Props) {
  return <textarea {...props} className="w-full p-2 h-40 rounded-md border border-slate-300 bg-white  pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-600 focus:ring-3 focus:ring-red-100 resize-none" />
}
