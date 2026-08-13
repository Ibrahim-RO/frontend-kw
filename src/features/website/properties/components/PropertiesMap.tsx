'use client'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Link from 'next/link'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import type { MapBounds, Property } from '../types'
import { formatPrice } from '../lib/format'

const markerIcon = L.divIcon({
  className: 'kw-map-marker',
  html: '<div style="background-color:#B40101;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 8px rgba(180,1,1,0.6);"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

function BoundsWatcher({ onBoundsChange }: { onBoundsChange: (bounds: MapBounds) => void }) {
  useMapEvents({
    moveend: (event) => {
      const bounds = event.target.getBounds()
      onBoundsChange({
        TopLeft_Latitude: bounds.getNorth(),
        TopLeft_Longitude: bounds.getWest(),
        BottomRigth_Latitude: bounds.getSouth(),
        BottomRigth_Longitude: bounds.getEast(),
      })
    },
  })
  return null
}

type PropertiesMapProps = {
  properties: Property[]
  onBoundsChange: (bounds: MapBounds) => void
}

export default function PropertiesMap({ properties, onBoundsChange }: PropertiesMapProps) {
  return (
    <MapContainer center={[23.6345, -102.5528]} zoom={5} scrollWheelZoom className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <BoundsWatcher onBoundsChange={onBoundsChange} />
      {properties
        .filter((property) => property.Latitude && property.Longitude)
        .map((property) => (
          <Marker key={property.ID} position={[property.Latitude, property.Longitude]} icon={markerIcon}>
            <Popup>
              <Link href={`/propiedades/${property.ID}`} className="font-semibold text-kw-primary">
                {property.Title}
              </Link>
              <div className="text-xs text-kw-tertiary">
                {formatPrice(property.Current_Price, property.Currency)}
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  )
}
