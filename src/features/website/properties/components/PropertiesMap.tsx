'use client'

import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Link from 'next/link'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { Eraser, PenTool } from 'lucide-react'
import type { LatLngPoint } from '../lib/geometry'
import type { MapBounds, Property } from '../types'
import { formatPrice } from '../lib/format'

// Distancia mínima en pixeles entre puntos muestreados del trazo, para no
// acumular miles de puntos casi idénticos en cada mousemove.
const SAMPLE_DISTANCE_PX = 6
const MIN_POLYGON_POINTS = 3

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

function FlyToController({ target }: { target: MapBounds | null }) {
  const map = useMap()

  useEffect(() => {
    if (!target) return
    map.flyToBounds(
      [
        [target.BottomRigth_Latitude, target.TopLeft_Longitude],
        [target.TopLeft_Latitude, target.BottomRigth_Longitude],
      ],
      { duration: 1.2 },
    )
  }, [target, map])

  return null
}

// Dibujo libre: arma el modo con el botón, el usuario mantiene presionado
// el mouse y arrastra sobre el mapa para encerrar la zona a mano alzada
// (como un lazo), y al soltar se cierra la forma.
function FreehandDrawControl({
  isArmed,
  onPolygonComplete,
  onDrawEnd,
  polygonActive,
}: {
  isArmed: boolean
  onPolygonComplete: (points: LatLngPoint[]) => void
  onDrawEnd: () => void
  polygonActive: boolean
}) {
  const map = useMap()
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null)
  const previewRef = useRef<L.Polyline | null>(null)
  const pointsRef = useRef<L.LatLng[]>([])
  const drawingRef = useRef(false)
  const onPolygonCompleteRef = useRef(onPolygonComplete)
  onPolygonCompleteRef.current = onPolygonComplete
  const onDrawEndRef = useRef(onDrawEnd)
  onDrawEndRef.current = onDrawEnd

  useEffect(() => {
    const drawnItems = new L.FeatureGroup()
    map.addLayer(drawnItems)
    drawnItemsRef.current = drawnItems
    return () => {
      map.removeLayer(drawnItems)
    }
  }, [map])

  useEffect(() => {
    if (!polygonActive) {
      drawnItemsRef.current?.clearLayers()
    }
  }, [polygonActive])

  useEffect(() => {
    if (!isArmed) return

    map.dragging.disable()
    map.getContainer().style.cursor = 'crosshair'

    const handleDown = (event: L.LeafletMouseEvent) => {
      drawingRef.current = true
      pointsRef.current = [event.latlng]
      previewRef.current = L.polyline([event.latlng], { color: '#B40101', weight: 3 }).addTo(map)
    }

    const handleMove = (event: L.LeafletMouseEvent) => {
      if (!drawingRef.current || !previewRef.current) return
      const lastPoint = pointsRef.current[pointsRef.current.length - 1]
      const lastPixel = map.latLngToContainerPoint(lastPoint)
      const currentPixel = map.latLngToContainerPoint(event.latlng)
      if (lastPixel.distanceTo(currentPixel) < SAMPLE_DISTANCE_PX) return
      pointsRef.current.push(event.latlng)
      previewRef.current.setLatLngs(pointsRef.current)
    }

    const handleUp = () => {
      if (!drawingRef.current) return
      drawingRef.current = false

      if (previewRef.current) {
        map.removeLayer(previewRef.current)
        previewRef.current = null
      }

      if (pointsRef.current.length >= MIN_POLYGON_POINTS) {
        const polygon = L.polygon(pointsRef.current, { color: '#B40101', weight: 3, fillOpacity: 0.15 })
        drawnItemsRef.current?.clearLayers()
        drawnItemsRef.current?.addLayer(polygon)
        onPolygonCompleteRef.current(pointsRef.current.map((point) => ({ lat: point.lat, lng: point.lng })))
      }

      pointsRef.current = []
      onDrawEndRef.current()
    }

    map.on('mousedown', handleDown)
    map.on('mousemove', handleMove)
    map.on('mouseup', handleUp)

    return () => {
      map.dragging.enable()
      map.getContainer().style.cursor = ''
      map.off('mousedown', handleDown)
      map.off('mousemove', handleMove)
      map.off('mouseup', handleUp)
      if (previewRef.current) {
        map.removeLayer(previewRef.current)
        previewRef.current = null
      }
      drawingRef.current = false
      pointsRef.current = []
    }
  }, [isArmed, map])

  return null
}

type PropertiesMapProps = {
  properties: Property[]
  onBoundsChange: (bounds: MapBounds) => void
  onPolygonComplete: (points: LatLngPoint[]) => void
  flyTo: MapBounds | null
  polygonActive: boolean
  onClearPolygon: () => void
}

export default function PropertiesMap({
  properties,
  onBoundsChange,
  onPolygonComplete,
  flyTo,
  polygonActive,
  onClearPolygon,
}: PropertiesMapProps) {
  const [isArmed, setIsArmed] = useState(false)

  return (
    <div className="relative h-full w-full">
      <MapContainer center={[23.6345, -102.5528]} zoom={5} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <BoundsWatcher onBoundsChange={onBoundsChange} />
        <FlyToController target={flyTo} />
        <FreehandDrawControl
          isArmed={isArmed}
          onPolygonComplete={onPolygonComplete}
          onDrawEnd={() => setIsArmed(false)}
          polygonActive={polygonActive}
        />
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

      <button
        type="button"
        onClick={() => setIsArmed((prev) => !prev)}
        title="Dibujar una zona en el mapa"
        aria-label="Dibujar una zona en el mapa"
        className={`absolute top-[78px] left-3 z-[1000] flex h-9 w-9 items-center justify-center rounded-md shadow-lg transition-colors ${
          isArmed
            ? 'bg-kw-primary text-white hover:bg-kw-primary/90'
            : 'bg-white text-kw-secondary hover:bg-neutral-100'
        }`}
      >
        <PenTool size={16} />
      </button>

      {polygonActive && (
        <button
          type="button"
          onClick={onClearPolygon}
          className="absolute top-3 right-3 z-[1000] flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-kw-secondary shadow-lg transition-colors hover:bg-neutral-100"
        >
          <Eraser size={16} /> Borrar dibujo
        </button>
      )}
    </div>
  )
}
