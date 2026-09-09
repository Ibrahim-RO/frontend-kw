export function isHeroVideo(url: string): boolean {
  return /\.(mp4|webm)(?:[?#]|$)/i.test(url)
}

export function heroMediaUrl(data?: Record<string, unknown>, imageUrl?: string): string {
  if (typeof data?.mediaUrl === 'string') return data.mediaUrl
  if (typeof data?.videoUrl === 'string') return data.videoUrl || String(data?.imageUrl || imageUrl || '/Fondo_New_Natural.png')
  return '/Hero.webm'
}
