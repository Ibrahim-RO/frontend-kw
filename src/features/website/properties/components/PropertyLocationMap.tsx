'use client'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type { Property } from '../types'

const markerIcon = L.divIcon({
  className: 'kw-map-marker',
  html: '<div style="background-color:#B40101;width:16px;height:16px;border-radius:50%;border:2px solid white;box-shadow:0 0 8px rgba(180,1,1,0.6);"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

export default function PropertyLocationMap({ property }: { property: Property }) {
  return (
    <MapContainer
      center={[property.Latitude, property.Longitude]}
      zoom={15}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[property.Latitude, property.Longitude]} icon={markerIcon}>
        <Popup>{property.Title}</Popup>
      </Marker>
    </MapContainer>
  )
}
