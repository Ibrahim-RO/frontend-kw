import { Search } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-kw-secondary">
      <Image src="/Fondo_New_Natural.png" alt="Residencia contemporánea con alberca" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-kw-secondary/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-kw-secondary/80 to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-6 py-24 text-center lg:px-8">
        <h1 className="font-heading text-5xl leading-[1.02] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Encuentra la casa de <span className="block text-kw-primary">tus sueños</span>
        </h1>
        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl lg:text-2xl">
          El camino a tu nuevo hogar empieza aquí con los expertos.
        </p>

        <form action="/propiedades" method="get" className="mx-auto mt-10 flex max-w-5xl flex-col gap-3 rounded-3xl bg-kw-secondary/90 p-3 shadow-2xl shadow-black/25 backdrop-blur-md sm:flex-row sm:items-center sm:rounded-full" role="search">
          <label htmlFor="hero-property-search" className="sr-only">Buscar propiedades por ubicación</label>
          <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:px-4">
            <Search className="shrink-0 text-white/60" size={26} aria-hidden="true" />
            <input id="hero-property-search" name="ubicacion" type="search" required autoComplete="street-address" placeholder="Busca por calle, colonia, municipio o estado..." className="min-w-0 flex-1 bg-transparent py-4 text-base text-white outline-none placeholder:text-white/55 sm:text-lg" />
          </div>
          <button type="submit" className="shrink-0 rounded-full bg-kw-primary px-9 py-4 text-base font-bold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-12">
            Buscar
          </button>
        </form>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-kw-primary" />
    </section>
  );
}
