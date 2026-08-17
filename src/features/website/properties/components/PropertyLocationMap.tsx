'use client'

import type { Property } from '../types'

export default function PropertyLocationMap({ property }: { property: Property }) {
  const coordinates = `${property.Latitude},${property.Longitude}`
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(coordinates)}&z=15&output=embed`

  return (
    <iframe
      src={mapUrl}
      title={`Mapa de ${property.Title}`}
      className="h-full w-full border-0"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}
