'use client'

import { CircleUserRound } from 'lucide-react'
import { useMyProfile } from '../hooks/useMyProfile'
import { ProfileInfoForm } from './ProfileInfoForm'
import { ChangePasswordForm } from './ChangePasswordForm'
import { UserProfileBadge } from '@/src/features/admin/users/components/UserProfileBadge'

export function ProfilePage() {
  const { data: profile, isLoading, isError } = useMyProfile()

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Cargando tu perfil...</p>
  }

  if (isError || !profile) {
    return <p className="text-sm text-destructive">No se pudo cargar tu perfil.</p>
  }

  const fullName = `${profile.name} ${profile.last_name} ${profile.surname_name}`

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-xl font-semibold text-foreground">Mi perfil</h1>
        <p className="text-sm text-muted-foreground">Administra tu información y tu contraseña.</p>
      </div>

      <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-6">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <CircleUserRound className="size-8" />
        </div>
        <div>
          <p className="font-heading text-base font-semibold text-foreground">{fullName}</p>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <div className="mt-1.5">
            <UserProfileBadge profile={profile.profile} />
          </div>
        </div>
      </div>

      <section className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="font-heading text-base font-semibold text-foreground">Información personal</h2>
        <ProfileInfoForm profile={profile} />
      </section>

      <section className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="font-heading text-base font-semibold text-foreground">Cambiar contraseña</h2>
        <ChangePasswordForm />
      </section>
    </div>
  )
}
