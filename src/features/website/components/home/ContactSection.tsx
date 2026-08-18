import { Clock3, Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
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
              Contacto
            </h2>

            <p className="mt-4 leading-7 text-white/60">
              Nuestro equipo está listo para ayudarte a encontrar la oportunidad
              adecuada.
            </p>

            <div className="mt-9 grid gap-6 text-sm">
              <a
                href="mailto:info@kwmexico.mx"
                className="hover:text-kw-primary flex items-center gap-4"
              >
                <Mail className="text-kw-primary" size={20} />
                info@kwmexico.mx
              </a>

              <a
                href="tel:+524422512295"
                className="hover:text-kw-primary flex items-center gap-4"
              >
                <Phone className="text-kw-primary" size={20} />
                (52) 442 251 2295
              </a>

              <p className="flex items-start gap-4 text-white/75">
                <MapPin
                  className="text-kw-primary mt-0.5 shrink-0"
                  size={20}
                />
                Cto. Álamos #83, 3er piso, Álamos 2da Sección, Querétaro, Qro.
              </p>

              <p className="flex items-center gap-4 text-white/75">
                <Clock3 className="text-kw-primary" size={20} />
                Lun - Vie · 9:00 - 14:30 y 16:00 - 19:00
              </p>
            </div>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.49900651222!2d-100.38546172565698!3d20.60850740208178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d35b3cf101cde5%3A0xf76875173a8ed9f0!2sKW%20M%C3%A9xico!5e0!3m2!1ses!2smx!4v1778085670264!5m2!1ses!2smx"
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