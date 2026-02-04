import { KitsuEpisode, KitsuEpisodesResponse, KitsuSearchResponse } from "@/types";
import { KITSU_API } from "./api";

async function kitsuFetch(path: string) {
  const res = await fetch(`${KITSU_API}${path}`);

  if (!res.ok) throw new Error("Kitsu fetch error");

  return res.json();
}

export async function getKitsuIdByTitle(title: string): Promise<string | null> {
  const json: KitsuSearchResponse = await kitsuFetch(
    `/anime?filter[text]=${encodeURIComponent(title)}&page[limit]=5`
  );
  return json.data[0]?.id ?? null;
}

export async function getEpisodesFromKitsu(
  kitsuId: string
): Promise<KitsuEpisode[]> {
  const allEpisodes: KitsuEpisode[] = [];
  let offset = 0;
  const limit = 20;
  let hasMore = true;

  while (hasMore) {
    const json: KitsuEpisodesResponse = await kitsuFetch(
      `/anime/${kitsuId}/episodes?page[limit]=${limit}&page[offset]=${offset}`
    );

    const episodes = json.data.map((ep) => ({
      id: ep.id,
      number: ep.attributes.number,
      title:
        ep.attributes.titles?.en_jp ??
        ep.attributes.titles?.en ??
        ep.attributes.titles?.ja_jp ??
        null,
      synopsis: ep.attributes.synopsis ?? null,
      airdate: ep.attributes.airdate ?? null,
    }));

    allEpisodes.push(...episodes);

    if (json.data.length < limit) {
      hasMore = false;
    } else {
      offset += limit;
    }
  }

  return allEpisodes;
}


export async function getEpisodesByAnimeTitle(
  title: string
): Promise<KitsuEpisode[]> {
  const kitsuId = await getKitsuIdByTitle(title);

  if (!kitsuId) return [];

  return await getEpisodesFromKitsu(kitsuId);
}
