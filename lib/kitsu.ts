import { KitsuEpisode, KitsuEpisodesResponse, KitsuSearchResponse } from "@/types";


export async function getKitsuIdByTitle(title: string): Promise<string | null> {
  const res = await fetch(
    `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(
      title
    )}&page[limit]=5`
  );

  if (!res.ok) return null;

  const json: KitsuSearchResponse = await res.json();

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
    const res = await fetch(
      `https://kitsu.io/api/edge/anime/${kitsuId}/episodes?page[limit]=${limit}&page[offset]=${offset}`
    );

    if (!res.ok) break;

    const json: KitsuEpisodesResponse = await res.json();

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
