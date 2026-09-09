"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PropertySearchBar } from "@/src/features/website/properties/components/PropertySearchBar";
import type { HomepageSection } from "@/src/features/admin/homepage/types";

type LocationStatus = 'idle' | 'locating' | 'granted' | 'unavailable'

const hasGeolocation = () => typeof navigator !== 'undefined' && 'geolocation' in navigator

export default function Hero({ content }: { content?: HomepageSection }) {
  const data = content?.data

  // Completo (100vh) hasta confirmar que sí hay permiso de ubicación; solo
  // se achica cuando se confirma "granted" (ahí abajo sí va a aparecer algo
  // de "Propiedades cerca de ti"). Sin permiso, sin soporte, o mientras se
  // resuelve el permiso: se queda como estaba originalmente. Se calcula en
  // el inicializador (no en el efecto) para evitar el lint
  // react-hooks/set-state-in-effect — mismo patrón que useNearestMarketCenter.
  const [locationStatus, setLocationStatus] = useState<LocationStatus>(() => (hasGeolocation() ? 'locating' : 'unavailable'))

  useEffect(() => {
    if (!hasGeolocation()) return

    let cancelled = false

    navigator.geolocation.getCurrentPosition(
      () => {
        if (!cancelled) setLocationStatus('granted')
      },
      () => {
        if (!cancelled) setLocationStatus('unavailable')
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 },
    )

    return () => {
      cancelled = true
    }
  }, [])

  const isCompact = locationStatus === 'granted'

  return (
    <section
      id="inicio"
      className={`relative isolate flex items-center overflow-hidden bg-kw-secondary ${isCompact ? 'min-h-[clamp(430px,48vw,620px)]' : 'min-h-[calc(100svh-5rem)]'}`}
    >
      {/* Video de fondo (loop, sin audio, ya comprimido — public/Hero.webm).
          motion-reduce:hidden lo oculta para quien prefiere menos movimiento
          (prefers-reduced-motion), y en ese caso se ve la imagen de respaldo
          de abajo en su lugar — misma lógica que ya usan los carruseles del
          home, solo que aquí es puro CSS (Tailwind motion-reduce:), sin JS. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={content?.imageUrl || "/Fondo_New_Natural.png"}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
      >
        <source src="/Hero.webm" type="video/webm" />
      </video>
      <Image src={content?.imageUrl || "/Fondo_New_Natural.png"} alt={content?.imageAlt || "Residencia contemporánea con alberca"} fill priority sizes="100vw" className="-z-20 hidden object-cover motion-reduce:block" unoptimized={content?.imageUrl?.startsWith('http')} />
      <div className="absolute inset-0 -z-10 bg-kw-secondary/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-kw-secondary/80 to-transparent" />

      {/* Alineado con el mismo contenedor (max-w-7xl + px-6/lg:px-8) que usa
          el <nav> del Header, para que quede justo bajo el logo del navbar
          sin importar el ancho de pantalla. */}
      <div className="absolute inset-x-0 top-6 z-10 mx-auto max-w-7xl px-6 lg:top-8 lg:px-8">
        <h1 className="font-heading text-2xl leading-snug font-medium tracking-wide text-white lg:text-3xl">
          {String(data?.title || 'Encuentra la casa de')} <span className="block text-kw-primary">{String(data?.titleAccent || 'tus sueños')}</span>
        </h1>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-16 text-center lg:py-20 lg:px-8">
        <p className="mx-auto max-w-3xl text-lg leading-8 text-white/75 sm:text-xl lg:text-2xl">
          {content?.subtitle || "El camino a tu nuevo hogar empieza aquí con los expertos."}
        </p>
      </div>

      {/* Barra de búsqueda anclada abajo del Hero (antes iba pegada al
          subtítulo, a media altura) — reposicionada, sin tocar el video ni
          el resto del contenido. */}
      <div className="absolute inset-x-0 bottom-10 z-10 px-6 sm:bottom-14 lg:bottom-16 lg:px-8">
        <PropertySearchBar />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-kw-primary" />
    </section>
  );
}
