import { useQuery } from "@tanstack/react-query";
import { getAnimeById } from "@/lib/anilist";
import { Anime } from "@/types/anilist";

export function useAnimeById(id: number) {
  return useQuery<Anime>({
    queryKey: ["anime", id],
    queryFn: () => getAnimeById(id),
    enabled: !!id,          // evita ejecutar si id es undefined
    staleTime: 1000 * 60 * 10, // 10 min cache
  });
}

