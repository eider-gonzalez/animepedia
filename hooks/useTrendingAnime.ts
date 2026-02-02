// hooks/useTrendingAnime.ts
import { useQuery } from "@tanstack/react-query";
import { getTrendingAnime } from "@/lib/anilist";
import { Anime } from "@/types/anilist";

export function useTrendingAnime() {
  return useQuery<Anime[]>({  // 👈 aquí también
    queryKey: ["trending-anime"],
    queryFn: getTrendingAnime,
  });
}
