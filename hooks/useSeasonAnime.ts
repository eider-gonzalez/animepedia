import { useQuery } from "@tanstack/react-query";
import { getSeasonAnime } from "@/lib/anilist";
import { Anime } from "@/types/anilist";

export function useSeasonAnime() {
  return useQuery<Anime[]>({
    queryKey: ["season-anime"],
    queryFn: getSeasonAnime,
  });
}
