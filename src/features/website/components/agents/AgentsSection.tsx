"use client";

import { useState, type FormEvent } from 'react';
import { Loader2, Search } from 'lucide-react';
import { AGENTS_PAGE_SIZE, useAgents } from '../../properties/hooks/useAgents';
import { useMarketCenters } from '../../properties/hooks/useMarketCenters';
import { Pagination } from '../../properties/components/Pagination';
import AgentsGrid from './AgentsGrid';

export default function AgentsSection() {
    const [page, setPage] = useState(1);
    const [marketCenterId, setMarketCenterId] = useState('');
    const [name, setName] = useState('');
    const [search, setSearch] = useState({ marketCenterId: '', name: '' });
    const { data, isLoading, isError, isFetching } = useAgents(
        page,
        search.marketCenterId || undefined,
        search.name,
    );
    const marketCentersQuery = useMarketCenters();
    const agents = data?.data.Agents_Data ?? [];
    const totalAgents = data?.data.Total_Agents ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalAgents / AGENTS_PAGE_SIZE));

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPage(1);
        setSearch({ marketCenterId, name });
    };

    const handlePageChange = (nextPage: number) => {
        setPage(nextPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6 p-5 py-10 md:px-0 md:py-8">
            <div className="flex flex-col items-center justify-center gap-1 space-y-3 text-center">
                <h3 className="font-heading text-3xl font-bold md:text-4xl">Directorio de Agentes</h3>
                <p className="w-full max-w-3xl text-gray-600 md:text-lg">
                    Encuentra a tu asesor inmobiliario experto en KW. Nuestra red de profesionales está lista para ayudarte a encontrar el hogar de tus sueños.
                </p>
            </div>

            <form
                onSubmit={handleSearch}
                className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-md md:flex-row md:items-center md:p-3"
            >
                <select
                    value={marketCenterId}
                    onChange={(event) => setMarketCenterId(event.target.value)}
                    disabled={marketCentersQuery.isLoading}
                    className="h-14 rounded-xl border border-neutral-300 bg-neutral-100 px-4 font-semibold text-neutral-800 outline-none transition-colors hover:bg-neutral-50 focus:border-kw-primary focus:ring-2 focus:ring-kw-primary/20 disabled:opacity-60 md:w-64"
                    aria-label="Seleccionar oficina"
                >
                    <option value="">Todas las oficinas</option>
                    {marketCentersQuery.data?.data.map((marketCenter) => (
                        <option key={marketCenter.ID} value={marketCenter.ID}>
                            {marketCenter.Market_Center}
                        </option>
                    ))}
                </select>

                <label className="flex h-16 min-w-0 flex-1 items-center gap-3 rounded-xl border border-neutral-300 bg-white px-4 transition-colors focus-within:border-kw-primary focus-within:ring-2 focus-within:ring-kw-primary/20 md:h-14">
                    <Search className="shrink-0 text-neutral-600" size={22} aria-hidden="true" />
                    <span className="sr-only">Buscar agente por nombre</span>
                    <input
                        type="search"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Buscar agente por nombre..."
                        className="h-full min-h-0 w-full appearance-none bg-transparent py-4 text-base leading-6 text-neutral-900 outline-none placeholder:text-neutral-500 md:py-3"
                    />
                </label>

                <button
                    type="submit"
                    className="h-14 rounded-xl border border-kw-primary bg-kw-primary px-10 font-bold text-white shadow-sm transition-colors hover:border-red-700 hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kw-primary md:min-w-40"
                >
                    Buscar
                </button>
            </form>

            {isLoading && (
                <div className="flex items-center justify-center py-24 text-kw-tertiary">
                    <Loader2 className="mr-2 animate-spin" size={20} /> Cargando Agentes...
                </div>
            )}

            {isError && (
                <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-kw-tertiary">
                    No se pudieron cargar los Agentes. Intenta de nuevo más tarde.
                </div>
            )}

            {!isLoading && !isError && agents.length === 0 && (
                <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-kw-tertiary">
                    No se encontraron Agentes.
                </div>
            )}

            {agents.length > 0 && <AgentsGrid agentsData={agents} />}

            {isFetching && !isLoading && (
                <div className="flex items-center justify-center text-sm text-kw-tertiary" role="status">
                    <Loader2 className="mr-2 animate-spin" size={16} /> Actualizando agentes...
                </div>
            )}

            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}
