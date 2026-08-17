import Link from 'next/link'
import { ArrowLeft, Bath, BedDouble, Building2, Mail, MapPin, Phone, Ruler } from 'lucide-react'
import type { AgentPropertiesResponse, Property } from '../../properties/types'
import { formatPrice, getPropertyLocation, isRental } from '../../properties/lib/format'
import { getOperationLabel } from '../../properties/lib/property-options'

function PropertyCard({ property }: { property: Property }) {
    const location = getPropertyLocation(property) || property.Geo_Direccion_Completa

    return (
        <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link href={`/propiedades/${property.ID}`} className="relative block aspect-16/10 overflow-hidden bg-neutral-100">
                {property.Photo_URL ? (
                    <img
                        src={property.Photo_URL}
                        alt={property.Title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-neutral-400">Sin fotografía</div>
                )}
                <span className="absolute right-4 top-4 rounded-full bg-kw-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-md">
                    {getOperationLabel(property.Property_Operation_ID)}
                </span>
            </Link>

            <div className="p-5">
                <Link href={`/propiedades/${property.ID}`}>
                    <h3 className="line-clamp-2 font-heading text-lg font-bold text-kw-secondary transition-colors group-hover:text-kw-primary">
                        {property.Title}
                    </h3>
                </Link>
                <p className="mt-2 flex min-h-5 items-start gap-1.5 text-sm text-kw-tertiary">
                    <MapPin className="mt-0.5 shrink-0 text-kw-primary" size={15} />
                    <span className="line-clamp-1">{location}</span>
                </p>

                <div className="mt-4 border-t border-neutral-200 pt-4">
                    <div className="flex items-end justify-between gap-3">
                        <p className="text-xl font-extrabold text-kw-primary">
                            {formatPrice(property.Current_Price, property.Currency)}
                            {isRental(property) && <span className="text-xs font-medium text-kw-tertiary">/mes</span>}
                        </p>
                        <div className="flex shrink-0 items-center gap-2.5 text-xs font-semibold text-kw-tertiary">
                            {!!property.Total_Bed && <span className="flex items-center gap-1"><BedDouble size={15} />{property.Total_Bed}</span>}
                            {!!Number(property.Total_Bath) && <span className="flex items-center gap-1"><Bath size={15} />{property.Total_Bath}</span>}
                            {!!property.Living_Area && <span className="flex items-center gap-1"><Ruler size={15} />{property.Living_Area} m²</span>}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default function AgentDetailPage({ response }: { response: AgentPropertiesResponse }) {
    const { Agent_Data: agent, Agent_Properties: properties, Total_Properties: total } = response.data
    const fullName = [agent.First_Name, agent.Last_Name].filter(Boolean).join(' ')
    const phone = agent.Mobile_Phone || agent.Phone
    const officeLocation = [agent.Market_Center, agent.City, agent.State].filter(Boolean).join(' · ')

    return (
        <main className="bg-neutral-50 pb-20">
            <div className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
                <Link href="/agentes" className="inline-flex items-center gap-2 text-sm font-semibold text-kw-tertiary transition-colors hover:text-kw-primary">
                    <ArrowLeft size={17} /> Volver a Agentes
                </Link>

                <section className="relative mt-7 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg">
                    <div className="absolute inset-x-0 top-0 h-2 bg-kw-primary" />
                    <div className="absolute -right-8 -top-20 select-none font-heading text-[15rem] font-black leading-none text-neutral-100" aria-hidden="true">KW</div>

                    <div className="relative flex flex-col items-center gap-7 px-6 py-10 text-center md:flex-row md:px-10 md:py-12 md:text-left lg:px-14">
                        {agent.Agent_Photo_url ? (
                            <img src={agent.Agent_Photo_url} alt={fullName} className="size-36 shrink-0 rounded-full border-4 border-white object-cover shadow-xl md:size-44" />
                        ) : (
                            <div className="flex size-36 shrink-0 items-center justify-center rounded-full bg-kw-primary text-4xl font-black text-white shadow-xl md:size-44">
                                {agent.First_Name.charAt(0)}{agent.Last_Name.charAt(0)}
                            </div>
                        )}

                        <div className="min-w-0 flex-1">
                            {agent.Luxury === 1 && <span className="mb-3 inline-block rounded-full bg-kw-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-kw-primary">KW Luxury</span>}
                            <h1 className="font-heading text-3xl font-extrabold text-kw-secondary md:text-5xl">{fullName}</h1>
                            {officeLocation && <p className="mt-3 flex items-center justify-center gap-2 text-base text-kw-tertiary md:justify-start"><Building2 size={18} className="text-kw-primary" />{officeLocation}</p>}

                            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                                {phone && <a href={`tel:${phone}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-kw-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-red-800"><Phone size={17} />{phone}</a>}
                                {agent.Email && <a href={`mailto:${agent.Email}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-bold text-kw-secondary transition-colors hover:border-kw-primary hover:text-kw-primary"><Mail size={17} className="text-kw-primary" />Enviar mensaje</a>}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-12" aria-labelledby="agent-properties-title">
                    <div className="mb-7 flex items-end justify-between gap-4 border-b border-neutral-200 pb-4">
                        <div>
                            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-kw-primary">Portafolio</p>
                            <h2 id="agent-properties-title" className="font-heading text-2xl font-bold text-kw-secondary md:text-3xl">Propiedades del agente</h2>
                        </div>
                        <span className="rounded-full bg-kw-primary px-3 py-1 text-sm font-bold text-white">{total}</span>
                    </div>

                    {properties.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {properties.map((property) => <PropertyCard key={property.ID} property={property} />)}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center text-kw-tertiary">Este agente todavía no tiene propiedades publicadas.</div>
                    )}
                </section>
            </div>
        </main>
    )
}
