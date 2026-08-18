import { ArrowRight, Handshake, Users } from "lucide-react";
import Image from "next/image";

export default function AlliesInfoSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="allies-info-title">
      <div className="mx-auto max-w-7xl space-y-16 px-6 lg:space-y-24 lg:px-8">
        <article className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-16">
          <div>
            <span className="flex size-12 items-center justify-center rounded-xl bg-kw-primary/10 text-kw-primary" aria-hidden="true">
              <Users size={24} />
            </span>
            <h2 id="allies-info-title" className="mt-6 max-w-4xl font-heading text-3xl font-extrabold tracking-tight text-kw-secondary sm:text-4xl lg:text-5xl">
              Conecta con la red inmobiliaria más grande de México
            </h2>
            <div className="mt-6 max-w-4xl space-y-4 text-base leading-7 text-kw-tertiary sm:text-lg sm:leading-8">
              <p>
                KW México reúne a más de 2,000 agentes inmobiliarios activos distribuidos en Market Centers a lo largo del país. Al convertirte en aliado, tu marca llega directamente a profesionales con alto poder de decisión y a sus clientes: compradores, vendedores e inversionistas del mercado inmobiliario mexicano.
              </p>
              <p>
                Nuestros aliados tienen presencia en eventos nacionales como Family Reunion, en nuestras plataformas digitales y en la operación diaria de nuestra red.
              </p>
            </div>
            <p className="mt-6 font-heading text-lg font-bold text-kw-secondary">¿Tu marca quiere estar donde crece el sector inmobiliario?</p>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-neutral-100 shadow-xl shadow-black/10">
            <Image src="/Ally-description-1.png" alt="Comunidad reunida en un evento profesional" width={1200} height={1400} sizes="(min-width: 1024px) 34vw, 100vw" className="aspect-4/5 size-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-kw-primary" />
          </div>
        </article>

        <article className="grid overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
          <div className="relative min-h-72 lg:min-h-112">
            <Image src="/Ally-description-2.png" alt="Profesionales estrechando las manos para cerrar una alianza" fill sizes="(min-width: 1024px) 36vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-r from-kw-primary/20 to-transparent" />
          </div>

          <div className="p-8 sm:p-10 lg:p-14">
            <span className="flex size-12 items-center justify-center rounded-xl bg-kw-primary text-white" aria-hidden="true">
              <Handshake size={24} />
            </span>
            <h3 className="mt-6 font-heading text-3xl font-extrabold text-kw-secondary sm:text-4xl">Proveedores de servicios</h3>
            <p className="mt-5 text-lg font-bold text-kw-secondary">Sé parte del ecosistema que impulsa a los agentes KW.</p>
            <div className="mt-4 space-y-4 text-base leading-7 text-kw-tertiary">
              <p>
                Los agentes KW México necesitan herramientas, servicios y soluciones confiables para operar y crecer su negocio. Si ofreces servicios financieros, legales, tecnológicos, de capacitación o bienestar, hay un lugar para ti en nuestra red.
              </p>
              <p>
                Como proveedor aliado, accedes a una comunidad profesional en constante crecimiento, con necesidades reales y ciclos de compra activos. Trabajamos con quienes comparten nuestro compromiso con la excelencia y el desarrollo del agente.
              </p>
            </div>
            <a href="mailto:info@kwmexico.mx?subject=Quiero%20ser%20proveedor%20aliado%20KW" className="mt-8 inline-flex items-center gap-2 rounded-md bg-kw-primary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-red-800">
              Hablemos <ArrowRight size={17} />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
