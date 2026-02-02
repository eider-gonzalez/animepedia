// lib/anilist.ts
import { Anime } from "@/types/anilist";

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

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error("AniList fetch error");

  const json = await res.json();
  return json.data.Page.media as Anime[];
}

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

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { season, year } }),
  });

  if (!res.ok) throw new Error("AniList fetch error");

  const json = await res.json();
  return json.data.Page.media as Anime[];
}

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

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error("AniList fetch error");

  const json = await res.json();
  // Traemos solo el primer anime
  return json.data.Page.media[0] as Anime;
}

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

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: gql, variables: { search: query } }),
  });

  if (!res.ok) throw new Error("AniList search error");

  const json = await res.json();
  return json.data.Page.media as Anime[];
}

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
      }
    }
  `;

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { id },
    }),
  });

  if (!res.ok) throw new Error("Error al obtener anime");

  const json = await res.json();
  return json.data.Media as Anime;
}