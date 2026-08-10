import { cn } from '@/lib/utils'
import { SidebarHeader } from './SidebarHeader'
import { SidebarNavigation } from './SidebarNavigation'
import { SidebarFooter } from './SidebarFooter'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-68 flex-col bg-sidebar text-sidebar-foreground',
          'transition-transform duration-200 ease-in-out lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <SidebarHeader onClose={onClose} />
        <SidebarNavigation />
        <SidebarFooter />
      </aside>
    </>
  )
}
