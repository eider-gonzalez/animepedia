import { getEpisodesByAnimeTitle } from "@/lib/kitsu";
import { KitsuEpisode } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useAnimeEpisodes(title: string | undefined) {
  return useQuery<KitsuEpisode[]>({
    queryKey: ["anime-episodes", title],
    queryFn: () => getEpisodesByAnimeTitle(title!),
    enabled: !!title,
    staleTime: 1000 * 60 * 60, // 1 hora cache
  });
}
