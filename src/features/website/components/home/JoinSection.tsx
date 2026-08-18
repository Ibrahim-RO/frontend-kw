import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const options = [
    { title: "Únete a la familia KW", copy: "Impulsa tu carrera con capacitación, tecnología y una comunidad que crece contigo.", href: "https://kwmx.mx/unete-a-kw-620406", image: "/Join-us-1.png" },
    { title: "Invierte en una franquicia", copy: "Lidera un Market Center y transforma el mercado inmobiliario de tu ciudad.", href: "https://kwmx.mx/franquicias", image: "/Join-us-2.png" },
];

export default function JoinSection() {
    return (
        <section id="unete" className="bg-neutral-100 py-20 lg:py-28" aria-labelledby="join-title">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-6">
                <div
                    className="flex justify-center items-center"
                >
                    <img
                        src={'/section-joinus-image-2.png'}
                        alt="Join"
                        className="w-full md:w-1/2"
                    />
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                    {options.map((option) => <a key={option.title} href={option.href} target="_blank" rel="noreferrer" className="group relative isolate min-h-96 overflow-hidden rounded-3xl bg-kw-secondary p-8 shadow-lg md:p-10"><Image src={option.image} alt={option.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="-z-20 object-cover transition duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 -z-10 bg-linear-to-t from-kw-secondary via-kw-secondary/65 to-transparent" />
                        <div className="flex h-full flex-col justify-end">
                            <h3 className="max-w-md font-heading text-3xl font-extrabold text-white">{option.title}</h3>
                            <p className="mt-3 max-w-lg text-sm leading-6 text-white/75">{option.copy}</p>
                            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white">Conocer más <ArrowUpRight className="text-kw-primary" size={19} /></span>

                        </div>
                    </a>)}
                </div>
            </div>
        </section>
    );
}
