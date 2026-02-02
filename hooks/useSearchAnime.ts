import { useQuery } from "@tanstack/react-query";
import { searchAnime } from "@/lib/anilist";
import { Anime } from "@/types/anilist";

export function useSearchAnime(query: string) {
  return useQuery<Anime[]>({
    queryKey: ["search-anime", query],
    queryFn: () => searchAnime(query),
    enabled: query.length > 0, // solo hace fetch si hay texto
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
