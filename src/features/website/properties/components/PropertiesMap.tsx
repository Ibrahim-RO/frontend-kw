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

function toLeafletBounds(bounds: MapBounds): L.LatLngBoundsExpression {
  return [
    [bounds.BottomRigth_Latitude, bounds.TopLeft_Longitude],
    [bounds.TopLeft_Latitude, bounds.BottomRigth_Longitude],
  ]
}

function FlyToController({ target }: { target: MapBounds | null }) {
  const map = useMap()

  useEffect(() => {
    if (!target) return
    map.flyToBounds(toLeafletBounds(target), { duration: 1.2 })
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
  const activePointerIdRef = useRef<number | null>(null)
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

    const container = map.getContainer()
    map.dragging.disable()
    container.style.cursor = 'crosshair'
    // Sin esto el navegador interpreta el arrastre como una selección de
    // texto nativa (se ve azul, como si fueras a copiar) y el mouseup deja
    // de llegarle al mapa, dejando el trazo pegado sin poder cerrarlo.
    container.style.userSelect = 'none'
    // Sin esto en móvil el navegador interpreta el arrastre como scroll/zoom
    // de la página y el gesto de dibujo nunca llega a los listeners de abajo.
    container.style.touchAction = 'none'

    const finishStroke = () => {
      if (!drawingRef.current) return
      drawingRef.current = false
      activePointerIdRef.current = null

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

    // Pointer Events en vez de mouse-only: así el mismo código dibuja con
    // mouse, touch (celular/tablet) o pluma sin duplicar lógica.
    const handleDown = (event: PointerEvent) => {
      if (drawingRef.current) return
      event.preventDefault()
      drawingRef.current = true
      activePointerIdRef.current = event.pointerId
      const latlng = map.mouseEventToLatLng(event)
      pointsRef.current = [latlng]
      previewRef.current = L.polyline([latlng], { color: '#B40101', weight: 3 }).addTo(map)
    }

    const handleMove = (event: PointerEvent) => {
      if (!drawingRef.current || !previewRef.current) return
      if (event.pointerId !== activePointerIdRef.current) return
      const latlng = map.mouseEventToLatLng(event)
      const lastPoint = pointsRef.current[pointsRef.current.length - 1]
      const lastPixel = map.latLngToContainerPoint(lastPoint)
      const currentPixel = map.latLngToContainerPoint(latlng)
      if (lastPixel.distanceTo(currentPixel) < SAMPLE_DISTANCE_PX) return
      pointsRef.current.push(latlng)
      previewRef.current.setLatLngs(pointsRef.current)
    }

    const handleUp = (event: PointerEvent) => {
      if (event.pointerId !== activePointerIdRef.current) return
      finishStroke()
    }

    // pointerdown se queda en el contenedor del mapa (solo empieza a dibujar
    // si el gesto fue sobre el mapa), pero move/up/cancel van en document:
    // así el trazo se sigue actualizando y sobre todo se cierra bien aunque
    // el dedo o el mouse salga del mapa o se suelte fuera de él. pointercancel
    // cubre cuando el sistema interrumpe el gesto (ej. una llamada entrante).
    container.addEventListener('pointerdown', handleDown)
    document.addEventListener('pointermove', handleMove)
    document.addEventListener('pointerup', handleUp)
    document.addEventListener('pointercancel', handleUp)

    return () => {
      map.dragging.enable()
      container.style.cursor = ''
      container.style.userSelect = ''
      container.style.touchAction = ''
      container.removeEventListener('pointerdown', handleDown)
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerup', handleUp)
      document.removeEventListener('pointercancel', handleUp)
      if (previewRef.current) {
        map.removeLayer(previewRef.current)
        previewRef.current = null
      }
      drawingRef.current = false
      pointsRef.current = []
      activePointerIdRef.current = null
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
  // Solo para el montaje inicial del mapa (ver abajo) — a diferencia de
  // flyTo, esto nunca cambia despues de montado.
  initialBounds: MapBounds | null
}

export default function PropertiesMap({
  properties,
  onBoundsChange,
  onPolygonComplete,
  flyTo,
  polygonActive,
  onClearPolygon,
  initialBounds,
}: PropertiesMapProps) {
  const [isArmed, setIsArmed] = useState(false)

  // Si ya sabemos el area correcta al montar (ej. vino de una direccion
  // geocodificada), el mapa arranca ahi directo en vez de arrancar en el
  // centro de Mexico y volar despues con FlyToController — ese vuelo
  // disparaba un "moveend" con el viewport todavia mal puesto que pisaba
  // el bounds correcto con uno vacio antes de que la animacion terminara.
  const initProps = initialBounds
    ? { bounds: toLeafletBounds(initialBounds) }
    : { center: [23.6345, -102.5528] as [number, number], zoom: 5 }

  return (
    <div className="relative h-full w-full">
      <MapContainer {...initProps} scrollWheelZoom className="h-full w-full">
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
