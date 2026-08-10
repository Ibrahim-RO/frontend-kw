import { Bell, CircleHelp } from 'lucide-react'

export function HeaderActions() {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label="Notificaciones"
      >
        <Bell className="size-5" />
      </button>
      <button
        type="button"
        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label="Ayuda"
      >
        <CircleHelp className="size-5" />
      </button>
    </div>
  )
}
