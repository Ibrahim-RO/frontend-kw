import Image from "next/image";
import type { HomepageSection } from "@/src/features/admin/homepage/types";

export default function AboutSection({ content }: { content?: HomepageSection }) {
  const data = content?.data
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <h2 id="about-title" className="font-heading text-4xl font-extrabold tracking-tight text-kw-secondary sm:text-5xl lg:text-6xl">
            {String(data?.title || '¿QUÉ ES')} <span className="text-kw-primary">{String(data?.titleAccent || 'KW?')}</span>
          </h2>

          <div className="mt-8 max-w-2xl space-y-8 text-lg leading-8 text-kw-tertiary sm:text-xl">
            <p>
              <strong className="font-heading font-extrabold text-kw-secondary">{String(data?.lead || 'EMPRESA NÚMERO 1 DE ENTRENAMIENTO')}</strong>, {String(data?.paragraph1 || 'networking, aprendizaje y coaching para agentes inmobiliarios.')}
            </p>
            <p>
              {String(data?.paragraph2 || 'Construye un negocio, no solo un empleo. Usa nuestros entrenamientos, sistemas y modelos probados.')}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:flex-row sm:items-center sm:p-7">
            <div className="flex min-h-24 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-center font-heading text-kw-secondary shadow-sm">
              <div>
                <span className="block text-3xl font-bold tracking-tight"><span className="lowercase">kw</span><span className="font-light">/MAPS</span><sup className="ml-1 text-[10px]">MX</sup></span>
                <span className="block text-[10px] font-bold tracking-[0.4em] text-kw-tertiary">COACHING</span>
              </div>
            </div>
            <p className="text-lg leading-8 text-kw-secondary sm:text-xl">
              {String(data?.coachingText || 'Programas de entrenamiento para potencializar tu negocio.')}
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-neutral-100 shadow-xl shadow-black/10">
          <Image
            src={content?.imageUrl || "/section-banner-image.png"}
            alt={content?.imageAlt || "Profesionales inmobiliarios colaborando en una sesión de entrenamiento"}
            width={1400}
            height={1050}
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="aspect-4/3 size-full object-cover"
            unoptimized={content?.imageUrl?.startsWith('http')}
          />
          <div className="absolute inset-0 bg-linear-to-t from-kw-secondary/70 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
            <p className="font-heading text-2xl font-extrabold text-white sm:text-3xl">{String(data?.overlayTitle || 'Mentalidad de millonario')}</p>
            <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-kw-primary">{String(data?.overlaySubtitle || 'Modelos probados desde 1983')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
