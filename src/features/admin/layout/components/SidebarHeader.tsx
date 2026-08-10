import { X } from 'lucide-react'

type SidebarHeaderProps = {
  onClose: () => void
}

export function SidebarHeader({ onClose }: SidebarHeaderProps) {
  return (
    <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5 lg:h-20">
      <div className="flex flex-col justify-center">
        <span className="text-lg font-bold tracking-tight text-sidebar-accent-foreground">
          KW México
        </span>
        <span className="text-xs font-medium text-sidebar-foreground/60">
          Panel de administración
        </span>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="rounded-md p-1.5 text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:hidden"
        aria-label="Cerrar menú"
      >
        <X className="size-5" />
      </button>
    </div>
  )
}
