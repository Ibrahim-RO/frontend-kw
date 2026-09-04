'use client'

import { useState } from 'react'
import { Link as LinkIcon, Mail, Check } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

type ShareTarget = 'facebook' | 'linkedin' | 'x' | 'mail'

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.45 2.91h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  )
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.2 8.75h3.5V21H3.2V8.75Zm6.2 0h3.36v1.68h.05c.47-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.35V21h-3.5v-6.28c0-1.5-.03-3.42-2.08-3.42-2.09 0-2.41 1.63-2.41 3.31V21H9.4V8.75Z" />
    </svg>
  )
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.72 10.66 20.42 3h-1.59l-5.82 6.66L8.36 3H3l7.03 10.02L3 21h1.59l6.14-7.03L15.64 21H21l-7.28-10.34Zm-2.17 2.49-.71-1L5.16 4.2h2.44l4.55 6.4.71 1 5.92 8.32h-2.44l-4.83-6.77Z" />
    </svg>
  )
}

const shareIcons: Record<ShareTarget, ComponentType<SVGProps<SVGSVGElement>>> = {
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  mail: Mail,
}

function buildShareUrl(target: ShareTarget, url: string, title: string) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  switch (target) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    case 'x':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
    case 'mail':
      return `mailto:?subject=${encodedTitle}&body=${encodedUrl}`
  }
}

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const share = (target: ShareTarget) => {
    const url = window.location.href
    const href = buildShareUrl(target, url, title)
    if (target === 'mail') {
      window.location.href = href
      return
    }
    window.open(href, '_blank', 'noopener,noreferrer,width=600,height=500')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard no disponible, no bloquea la interacción
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-kw-tertiary">Compartir:</span>
      {(['facebook', 'linkedin', 'x', 'mail'] as const).map((target) => {
        const Icon = shareIcons[target]
        return (
          <button
            key={target}
            type="button"
            onClick={() => share(target)}
            aria-label={`Compartir en ${target}`}
            className="flex size-9 items-center justify-center rounded-full border border-neutral-300 text-kw-secondary transition-colors hover:border-kw-primary hover:bg-kw-primary hover:text-white"
          >
            <Icon className="size-4" />
          </button>
        )
      })}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copiar enlace"
        className="flex size-9 items-center justify-center rounded-full border border-neutral-300 text-kw-secondary transition-colors hover:border-kw-primary hover:bg-kw-primary hover:text-white"
      >
        {copied ? <Check size={16} /> : <LinkIcon size={16} />}
      </button>
    </div>
  )
}
