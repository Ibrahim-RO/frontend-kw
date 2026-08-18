import { Award } from "lucide-react";
import styles from "./AwardsSection.module.css";

const awards = [
  ["KW Worldwide", "#1 Growth Share", "A nivel mundial (2024)"],
  ["KW Worldwide", "#1 Unidades cerradas", "A nivel mundial (2024)"],
  ["KW Worldwide", "#1 Comisiones brutas", "A nivel mundial (2024)"],
  ["Presidents Award por KWW", "Región con más Market Centers", "Aperturados (2024)"],
  ["Mejor oficina inmobiliaria noroeste", "KW Regio", "2019"],
  ["Mujer inmobiliaria del año", "Bárbara Gaxoét", "2019"],
  ["Mejor franquicia inmobiliaria", "KW México", "2018"],
  ["Premio al ícono inmobiliario", "Jorge Carbonell / CEO KW México", "2017"],
] as const;

function AwardCards({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className={styles.group} aria-hidden={duplicate || undefined}>
      {awards.map(([eyebrow, title, detail]) => (
        <article key={`${eyebrow}-${title}`} className="flex w-76 shrink-0 items-center gap-4 rounded-2xl border border-white/15 bg-white/4 px-5 py-5 sm:w-[24rem]">
          <img src="/award-icon.png" className="w-10" alt="Award Icon" />
          <div className="min-w-0 font-heading uppercase">
            <p className="text-xs font-extrabold leading-5 text-white/90 sm:text-sm">{eyebrow}</p>
            <h3 className="text-sm font-extrabold leading-5 text-kw-primary sm:text-base">{title}</h3>
            <p className="mt-0.5 text-[11px] font-medium leading-4 text-white/55 sm:text-xs">{detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function AwardsSection() {
  return (
    <section data-aos-skip aria-labelledby="awards-title" className="overflow-hidden border-y border-white/10 bg-kw-secondary py-14 sm:py-16">
      <div className="mx-auto mb-9 max-w-7xl px-6 text-center lg:px-8">
        <h2 id="awards-title" className="font-heading text-3xl font-extrabold text-white sm:text-4xl">Reconocimientos internacionales</h2>
      </div>
      <div className={styles.viewport}>
        <div className={styles.track}><AwardCards /><AwardCards duplicate /></div>
      </div>
    </section>
  );
}
