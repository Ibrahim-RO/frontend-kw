import { useQuery } from "@tanstack/react-query";
import { getAgents } from "../../services/agents";

export const AGENTS_PAGE_SIZE = 24;

export function useAgents(page: number, marketCenterId?: string, name?: string, enabled = true) {
    const offset = (page - 1) * AGENTS_PAGE_SIZE;

    return useQuery({
        queryKey: ["agents", marketCenterId ?? "all", name?.trim() ?? "", offset],
        queryFn: () => getAgents(offset, marketCenterId, name),
        staleTime: 30 * 60 * 1000,
        enabled,
    })
}
