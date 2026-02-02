// types/anilist.ts

export interface Anime {
  id: number;
  title: {
    romaji: string;
    english?: string;
    native?: string;
  };
  coverImage: {
    large: string;
    medium: string;
  };
  bannerImage?: string;
  averageScore?: number;
  episodes?: number;
  genres?: string[];
  status?: string;
  season?: string;
  seasonYear?: number;
  rankings?: {
    id: number;
    rank: number;
    type: string;
    format: string;
    year: number;
    season: string;
    allTime?: boolean;
  }[];
  popularity?: number;
  favourites?: number;
  description?: string;
  duration?: number;
  startDate?: {
    year?: number;
    month?: number;
    day?: number;
  };
  format?: string;
  studios?: {
    nodes: {
      name: string;
    }[];
  }
  source?: string;
  tags?: {
    name: string;
    rank: number;
    category: string;
    isMediaSpoiler: boolean;
  }[];
  isAdult?: boolean;
  externalLinks?: {
    site: string;
    url: string;
    id: number;
  }[];
  relations?: {
    edges: {
      relationType: string;
      node: {
        id: number;
        title: {
          userPreferred: string;
        }
        format: string;
        coverImage: {
          large: string;
          medium: string;
        }
      };
    }[];
  }

  // Datos crudos de AniList para calcular day y time
  nextAiringEpisode?: {
    airingAt: number; // Timestamp Unix en UTC
    episode: number;
    timeUntilAiring: number;
  };

  // Opcional: lista completa de episodios futuros
  airingSchedule?: {
    nodes: {
      episode: number;
      airingAt: number;
    }[];
  };
}
