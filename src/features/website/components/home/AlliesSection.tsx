import Image from "next/image";
import styles from "./AlliesSection.module.css";

const allies = [
  "/Ally-slider-1.png",
  "/Ally-slider-2.png",
  "/Ally-slider-3.png",
  "/Ally-slider-5.png",
  "/Ally-slider-6.png",
  "/Ally-slider7.png",
  "/Ally-slider-8.png",
  "/Ally-slider-9.png",
  "/Ally-slider-10.png",
  "/Ally-slider-11.png",
] as const;

function AllyLogos({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className={styles.group} aria-hidden={duplicate || undefined}>
      {allies.map((src, index) => (
        <div key={src} className="flex h-28 w-52 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/4 px-7 sm:h-32 sm:w-60">
          <Image
            src={src}
            alt={duplicate ? "" : `Logo de aliado KW México ${index + 1}`}
            width={200}
            height={96}
            sizes="(min-width: 640px) 200px, 170px"
            className="w-full max-h-16 max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export default function AlliesSection() {
  return (
    <section id="aliados" className="overflow-hidden bg-kw-secondary py-16 sm:py-20" aria-labelledby="allies-title">
      <div className="mx-auto mb-12 max-w-7xl px-6 text-center lg:px-8">
        <h2 id="allies-title" className="font-heading text-3xl font-extrabold uppercase text-white sm:text-4xl lg:text-5xl">
          Aliados <span className="text-kw-primary">KW</span> México
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/60 sm:text-lg">
          Conecta con la red inmobiliaria más grande de México. Nuestros aliados son fundamentales para el ecosistema KW.
        </p>
      </div>

      <div className={styles.viewport}>
        <div className={styles.track}>
          <AllyLogos />
          <AllyLogos duplicate />
        </div>
      </div>
    </section>
  );
}
