export function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [1]
  const window = 1

  if (current - window > 2) pages.push('ellipsis')

  for (let p = Math.max(2, current - window); p <= Math.min(total - 1, current + window); p++) {
    pages.push(p)
  }

  if (current + window < total - 1) pages.push('ellipsis')
  if (total > 1) pages.push(total)

  return pages
}
