import { ArrowRight } from "lucide-react";
import Image from "next/image";
import styles from "./ProspectingCtaSection.module.css";

export default function ProspectingCtaSection() {
  return (
    <section className="relative isolate overflow-hidden border-y border-neutral-200 bg-neutral-50 py-20 sm:py-24" aria-labelledby="prospecting-title">
      <div className="absolute left-1/2 top-1/3 -z-10 size-72 -translate-x-1/2 rounded-full bg-kw-primary/10 blur-3xl sm:size-[30rem]" aria-hidden="true" />
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-kw-primary">Tu siguiente oportunidad comienza aquí</p>
        <h2 id="prospecting-title" className="sr-only">¿Listo para prosperar?</h2>
        <div className="relative mx-auto mt-5 flex min-h-64 max-w-2xl items-center justify-center sm:min-h-80" aria-hidden="true">
          <div className="absolute inset-x-8 inset-y-4 rounded-[50%] bg-kw-secondary shadow-2xl shadow-kw-primary/20 sm:inset-x-12" />
          <div className="absolute inset-16 rounded-full bg-kw-primary/35 blur-3xl" />
          <Image src="/interseccion.png" alt="" width={500} height={500} priority={false} className={`${styles.artwork} relative h-auto w-72 sm:w-96`} />
        </div>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-kw-tertiary sm:text-xl">
          Únete a la red inmobiliaria de mayor crecimiento y transforma tu carrera con el mejor entrenamiento y tecnología del mercado.
        </p>
        <a href="#contact" className="mt-9 inline-flex items-center justify-center gap-3 rounded-full bg-kw-primary px-8 py-4 text-sm font-bold text-white shadow-lg shadow-kw-primary/20 transition hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kw-primary sm:text-base">
          Comienza tu historia de éxito <ArrowRight size={19} />
        </a>
      </div>
    </section>
  );
}
