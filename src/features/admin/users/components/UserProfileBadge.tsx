import { cn } from '@/lib/utils'
import type { UserProfileRole } from '../types'

const PROFILE_LABEL: Record<UserProfileRole, string> = {
  admin: 'Administrador',
  marketing: 'Marketing',
  seo: 'SEO',
  usuario: 'Usuario',
}

const PROFILE_CLASSNAME: Record<UserProfileRole, string> = {
  admin: 'bg-primary/10 text-primary',
  marketing: 'bg-blue-100 text-blue-700',
  seo: 'bg-amber-100 text-amber-700',
  usuario: 'bg-muted text-muted-foreground',
}

export function UserProfileBadge({ profile }: { profile: UserProfileRole }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        PROFILE_CLASSNAME[profile],
      )}
    >
      {PROFILE_LABEL[profile]}
    </span>
  )
}
