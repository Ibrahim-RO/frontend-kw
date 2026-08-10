import { CircleUserRound } from 'lucide-react'

export function UserMenu() {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      aria-label="Cuenta"
    >
      <CircleUserRound className="size-7" />
    </button>
  )
}
