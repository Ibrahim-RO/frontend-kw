import Image from "next/image";
import { PropertySearchBar } from "@/src/features/website/properties/components/PropertySearchBar";
import FeaturedPropertiesSection from "@/src/features/website/components/home/FeaturedPropertiesSection";

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-kw-secondary">
      <Image src="/Fondo_New_Natural.png" alt="Residencia contemporánea con alberca" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-kw-secondary/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-kw-secondary/80 to-transparent" />

      <div className="flex min-h-[calc(100svh-5rem)] items-center">
        <div className="mx-auto w-full max-w-6xl px-6 py-24 text-center lg:px-8">
          <h1 className="font-heading text-5xl leading-[1.02] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Encuentra la casa de <span className="block text-kw-primary">tus sueños</span>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl lg:text-2xl">
            El camino a tu nuevo hogar empieza aquí con los expertos.
          </p>

          <PropertySearchBar />
        </div>
      </div>

      <FeaturedPropertiesSection />

      <div className="absolute inset-x-0 bottom-0 h-1 bg-kw-primary" />
    </section>
  );
}
