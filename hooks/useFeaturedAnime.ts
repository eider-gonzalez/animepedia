// hooks/useFeaturedAnime.ts
import { useQuery } from "@tanstack/react-query";
import { getFeaturedAnime } from "@/lib/anilist";
import { Anime } from "@/types/anilist";

export function useFeaturedAnime() {
  return useQuery<Anime>({
    queryKey: ["featured-anime"],
    queryFn: getFeaturedAnime,
  });
}
