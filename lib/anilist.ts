// lib/anilist.ts
import { Anime } from "@/types";
import { ANILIST_API } from "./api";

async function anilistFetch(query: string, variables?: object) {
  const res = await fetch(ANILIST_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error("AniList fetch error");

  return res.json();
}

// Obtener datos de animes en tendencia
export async function getTrendingAnime(): Promise<Anime[]> {
  const query = `
    query {
      Page(perPage: 12) {
        media(type: ANIME, sort: TRENDING_DESC) {
          id
          title { romaji }
          coverImage { large medium }
          averageScore
          episodes
          genres
          bannerImage
          status
        }
      }
    }
  `;

  const json = await anilistFetch(query);
  return json.data.Page.media as Anime[];
}

// Obtener datos de animes de una temporada
export async function getSeasonAnime(): Promise<Anime[]> {
  const query = `
    query ($season: MediaSeason, $year: Int) {
      Page(perPage: 8) {
        media(type: ANIME, season: $season, seasonYear: $year, sort: POPULARITY_DESC) {
          id
          title { romaji }
          coverImage { large medium }
          bannerImage
          episodes
          averageScore
          status
          nextAiringEpisode {
            episode
            airingAt
          }
          airingSchedule {
            nodes {
              episode
              airingAt
            }
          }
        }
      }
    }
  `;

  // Para simplificar, usamos la temporada actual
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  let season: "WINTER" | "SPRING" | "SUMMER" | "FALL";
  if (month <= 3) season = "WINTER";
  else if (month <= 6) season = "SPRING";
  else if (month <= 9) season = "SUMMER";
  else season = "FALL";

  const json = await anilistFetch(query, { season, year });
  return json.data.Page.media as Anime[];
}

// Obtener datos de animes destacados
export async function getFeaturedAnime(): Promise<Anime> {
  const query = `
    query {
      Page(perPage: 1) {
        media(type: ANIME, sort: POPULARITY_DESC) {
          id
          title { romaji english native }
          coverImage { large medium }
          bannerImage
          averageScore
          episodes
          genres
          status
        }
      }
    }
  `;

  const json = await anilistFetch(query);
  return json.data.Page.media[0] as Anime;
}

// Buscar animes por título
export async function searchAnime(query: string): Promise<Anime[]> {
  if (!query) return [];

  const gql = `
    query ($search: String) {
      Page(perPage: 10) {
        media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
          id
          title { romaji english native }
          coverImage { large medium }
          bannerImage
          averageScore
          episodes
          status
          seasonYear
        }
      }
    }
  `;

  const json = await anilistFetch(gql, { search: query });
  return json.data.Page.media as Anime[];
}

// Obtener datos de un anime por su ID
export async function getAnimeById(id: number): Promise<Anime> {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        description
        coverImage {
          extraLarge
          large
        }
        bannerImage
        averageScore
        episodes
        duration
        status
        season
        seasonYear
        genres
        format
        source
        studios (isMain: true) {
          nodes {
            name
          }
        }
        tags {
          name
          rank
          category
          isMediaSpoiler
        }
        startDate { year month day }
        popularity
        favourites
        rankings {
          id
          rank
          type
          format
          year
          season
          allTime
        }
        nextAiringEpisode {
          episode
          airingAt
          timeUntilAiring
        }
        isAdult
        externalLinks {
          site
          url
          id
        }
        relations {
          edges {
            relationType
            node {
              id
              title {
                userPreferred
              }
              format
              coverImage {
                large
              }
            }
          }
        }
        staff {
          edges {
            role
            node {
              id
              name {
                full
                native
                userPreferred
              }
              language
              image {
                large
              }
              staffMedia(sort: POPULARITY_DESC, perPage: 4) {
                nodes {
                  id
                  title {
                    userPreferred
                  }
                  coverImage {
                    medium
                  }
                  format
                }
              }
            }
          }
        }
        characters {
          edges {
            role
            node {
              id
              name {
                full
                native
              }
              image {
                large
              }
            }
            voiceActors {
              id
              name {
                full
              }
              languageV2
            }
          }
        }
        stats {
          statusDistribution {
            status
            amount
          }
          scoreDistribution {
            score
            amount
          }
        }
      }
    }
  `;

  const json = await anilistFetch(query, { id });
  return json.data.Media as Anime;
}