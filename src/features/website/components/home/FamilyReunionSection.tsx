import { ArrowRight } from "lucide-react";

const metrics = [
  ["11", "Años creando historias"],
  ["+10K", "Asistentes"],
  ["+3K", "Horas de entrenamiento"],
  ["+200%", "Productividad"],
];

export default function FamilyReunionSection() {
  return (
    <section
      id="family"
      className="bg-white py-20 text-kw-secondary lg:py-28"
      aria-labelledby="family-title"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-kw-primary">
            El evento de nuestra comunidad
          </p>

          <h2
            id="family-title"
            className="mt-3 font-heading text-4xl font-extrabold md:text-5xl"
          >
            Family Reunion
          </h2>

          <p className="mt-6 text-xl font-semibold leading-8 text-kw-secondary">
            Tres días de entrenamiento, networking, aprendizaje y coaching para
            agentes inmobiliarios.
          </p>

          <p className="mt-4 leading-7 text-kw-tertiary">
            Cada año reunimos las mejores prácticas del sector para llevar los
            negocios de nuestra comunidad al siguiente nivel.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7">
            {metrics.map(([value, label]) => (
              <div
                key={label}
                className="border-l-2 border-kw-primary pl-4"
              >
                <dt className="text-xs font-bold uppercase tracking-wider text-kw-tertiary">
                  {label}
                </dt>

                <dd className="mt-1 font-heading text-3xl font-extrabold text-kw-secondary">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="https://kwfamilyreunion.mx/"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-md bg-kw-primary px-7 py-4 text-sm font-bold uppercase text-white transition hover:bg-red-800"
          >
            Pre - Registro Family Reunion 2027
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-black shadow-2xl">
          <iframe
            src="https://www.youtube.com/embed/Au3Py1qH75o?start=2"
            title="Family Reunion KW México"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full"
          />
        </div>
      </div>
    </section>
  );
}