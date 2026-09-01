import Image from "next/image";
import { PropertySearchBar } from "@/src/features/website/properties/components/PropertySearchBar";
import type { HomepageSection } from "@/src/features/admin/homepage/types";

export default function Hero({ content }: { content?: HomepageSection }) {
  const data = content?.data
  return (
    <section id="inicio" className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-kw-secondary">
      <Image src={content?.imageUrl || "/Fondo_New_Natural.png"} alt={content?.imageAlt || "Residencia contemporánea con alberca"} fill priority sizes="100vw" className="-z-20 object-cover" unoptimized={content?.imageUrl?.startsWith('http')} />
      <div className="absolute inset-0 -z-10 bg-kw-secondary/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-kw-secondary/80 to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-6 py-24 text-center lg:px-8">
        <h1 className="font-heading text-5xl leading-[1.02] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
          {String(data?.title || 'Encuentra la casa de')} <span className="block text-kw-primary">{String(data?.titleAccent || 'tus sueños')}</span>
        </h1>
        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl lg:text-2xl">
          {content?.subtitle || "El camino a tu nuevo hogar empieza aquí con los expertos."}
        </p>

        <PropertySearchBar />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-kw-primary" />
    </section>
  );
}
