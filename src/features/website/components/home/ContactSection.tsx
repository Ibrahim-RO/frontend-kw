import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import type { HomepageSection } from "@/src/features/admin/homepage/types";

export default function ContactSection({ content }: { content?: HomepageSection }) {
  const data = content?.data
  return (
    <section
      id="contact"
      className="bg-white py-20 lg:py-28"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-neutral-200 lg:grid lg:grid-cols-[0.8fr_1.2fr]">
          <div className="bg-kw-secondary p-8 text-white md:p-12">
            <h2
              id="contact-title"
              className="mt-3 font-heading text-4xl font-extrabold"
            >
              {String(data?.title || 'Contacto')}
            </h2>

            <p className="mt-4 leading-7 text-white/60">
              {String(data?.description || 'Nuestro equipo está listo para ayudarte a encontrar la oportunidad adecuada.')}
            </p>

            <div className="mt-9 grid gap-6 text-sm">
              <a
                href={`mailto:${String(data?.email || 'info@kwmexico.mx')}`}
                className="hover:text-kw-primary flex items-center gap-4"
              >
                <Mail className="text-kw-primary" size={20} />
                {String(data?.email || 'info@kwmexico.mx')}
              </a>

              <a
                href={`tel:${String(data?.phoneUrl || '+524422512295')}`}
                className="hover:text-kw-primary flex items-center gap-4"
              >
                <Phone className="text-kw-primary" size={20} />
                {String(data?.phone || '(52) 442 251 2295')}
              </a>

              <p className="flex items-start gap-4 text-white/75">
                <MapPin
                  className="text-kw-primary mt-0.5 shrink-0"
                  size={20}
                />
                {String(data?.address || 'Cto. Álamos #83, 3er piso, Álamos 2da Sección, Querétaro, Qro.')}
              </p>

              <p className="flex items-center gap-4 text-white/75">
                <Clock3 className="text-kw-primary" size={20} />
                {String(data?.hours || 'Lun - Vie · 9:00 - 14:30 y 16:00 - 19:00')}
              </p>
            </div>
          </div>

          <iframe
            src={String(data?.mapUrl || '')}
            title="Ubicación de KW México"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="min-h-96 size-full border-0 grayscale-35"
          />
        </div>
      </div>
    </section>
  );
}
