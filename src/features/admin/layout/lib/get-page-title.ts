import { adminFooterNavItems, adminNavItems } from '../config/nav-items.config'

const DEFAULT_TITLE = 'Panel de administración'

export function getPageTitle(pathname: string) {
  const items = [...adminNavItems, ...adminFooterNavItems]
  const activeItem = items.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  )

  return activeItem?.label ?? DEFAULT_TITLE
}
