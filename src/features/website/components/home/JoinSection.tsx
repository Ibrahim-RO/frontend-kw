import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { HomepageSection } from "@/src/features/admin/homepage/types";

const options = [
    { title: "Únete a la familia KW", copy: "Impulsa tu carrera con capacitación, tecnología y una comunidad que crece contigo.", href: "https://kwmx.mx/unete-a-kw-620406", image: "/Join-us-1.png" },
    { title: "Invierte en una franquicia", copy: "Lidera un Market Center y transforma el mercado inmobiliario de tu ciudad.", href: "https://kwmx.mx/franquicias", image: "/Join-us-2.png" },
];

export default function JoinSection({ content }: { content?: HomepageSection }) {
    const data = content?.data
    const configuredOptions = Array.isArray(data?.cards) ? data.cards.map((item) => item as { title:string; copy:string; href:string; imageUrl:string; buttonLabel:string }) : options.map(item => ({...item,imageUrl:item.image,buttonLabel:'Conocer más'}))
    return (
        <section id="unete" className="bg-neutral-100 py-20 lg:py-28" aria-labelledby="join-title">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-6">
                <div className="mx-auto max-w-3xl text-center"><h2 id="join-title" className="font-heading text-4xl font-extrabold text-kw-secondary">{content?.title || 'Únete a Keller Williams'}</h2>{content?.subtitle && <p className="mt-3 text-lg text-kw-tertiary">{content.subtitle}</p>}</div>
                <div
                    className="flex justify-center items-center"
                >
                    <img
                        src={String(data?.headerImageUrl || '/section-joinus-image-2.png')}
                        alt={String(data?.headerImageAlt || "Únete a KW")}
                        className="w-full md:w-1/2"
                    />
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                    {configuredOptions.map((option) => <a key={option.title} href={option.href} target="_blank" rel="noreferrer" className="group relative isolate min-h-96 overflow-hidden rounded-3xl bg-kw-secondary p-8 shadow-lg md:p-10"><Image src={option.imageUrl} alt={option.title} fill sizes="(min-width: 768px) 50vw, 100vw" unoptimized={option.imageUrl.startsWith('http')} className="-z-20 object-cover transition duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 -z-10 bg-linear-to-t from-kw-secondary via-kw-secondary/65 to-transparent" />
                        <div className="flex h-full flex-col justify-end">
                            <h3 className="max-w-md font-heading text-3xl font-extrabold text-white">{option.title}</h3>
                            <p className="mt-3 max-w-lg text-sm leading-6 text-white/75">{option.copy}</p>
                            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white">{option.buttonLabel} <ArrowUpRight className="text-kw-primary" size={19} /></span>

                        </div>
                    </a>)}
                </div>
            </div>
        </section>
    );
}
