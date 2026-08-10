import React from 'react'

export default function Hero() {
    return (
        <section id="inicio" className="relative h-[85vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-10000 scale-110 hover:scale-100"
                    data-alt="Una toma cinematográfica de alta resolución de una obra maestra de la arquitectura moderna en la Ciudad de México al atardecer. El edificio cuenta con elegantes muros de cristal que reflejan la luz de la hora dorada, rodeado de exuberantes áreas verdes urbanas. El ambiente es sofisticado y prémium, con una iluminación de alto contraste que resalta el lujo inmobiliario y la excelencia profesional."
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBD48wXxC8h6kAsfMFkPQYUcsrEPzytJ7v2QU5lfvx0x6U0jk5AgySZmrPu6C6Xt11g9ba5E4xEcAPflf_1GeWw7mAPJ_2FejRYQpdkSzuvF6pFOKdZ_uM3irBzEZ8n1jQQ3_r9SRmXoymccdeO7taJsZ9r2hHP1m-rfrioFKt7rxV3w1p7dDaZaR8Tbuyc9sI8DZJ4F08ikYqigwmb5cXi5Up6AiMqKu6vrYJBNHMH48DInyX6r75y')" }}>
                </div>
                <div className="absolute inset-0 bg-linear-to-b from-neutral-950/55 via-neutral-950/65 to-neutral-950/80"></div>
            </div>
            <div className="relative z-10 w-full max-w-container-max px-margin-desktop text-center text-white">
                <h1
                    className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 drop-shadow-xl animate-fade-in">
                    Construye un <span className="text-red-500 italic">negocio</span>, <br className="hidden md:block" />no
                    solo un empleo.
                </h1>
                <p className="font-body-lg text-body-lg mb-12 max-w-2xl mx-auto opacity-90">
                    Únete a la red inmobiliaria #1 en crecimiento, unidades cerradas y comisiones brutas a nivel
                    mundial.
                </p>
                <div className="glass-card max-w-4xl mx-auto p-2 rounded-xl flex flex-col md:flex-row gap-2 border border-white/20 bg-neutral-950/35 shadow-2xl">
                    <div className="flex-1 flex items-center px-4 py-3 bg-white rounded-lg">
                        <span className="material-symbols-outlined text-neutral-500 mr-2">search</span>
                        <input
                            className="w-full bg-transparent border-none focus:ring-0 text-neutral-950 placeholder:text-neutral-500 font-body-md"
                            placeholder="Busca por ciudad, zona o agente..." type="text" />
                    </div>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-lg font-label-bold text-label-bold transition-all transform hover:scale-[1.02]">
                        Buscar Propiedades
                    </button>
                </div>
            </div>
        </section>
    )
}
