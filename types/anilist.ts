// types/anilist.ts

export interface Anime {
  id: number; // ID de AniList
  title: { // Título en español, inglés y japonés
    romaji: string;
    english?: string;
    native?: string;
  };
  coverImage: { // Imagen de portada
    large: string;
    medium: string;
  };
  bannerImage?: string; // Imagen de banner
  averageScore?: number; // Puntuación promedio
  episodes?: number; // Número de episodios
  genres?: string[]; // Lista de géneros
  status?: string; // Estado de publicación
  season?: string; // Temporada
  seasonYear?: number; // Año de la temporada
  rankings?: { // Rankings de la temporada
    id: number;
    rank: number;
    type: string;
    format: string;
    year: number;
    season: string;
    allTime?: boolean;
  }[];
  popularity?: number; // Popularidad
  favourites?: number; // Favoritos
  description?: string; // Descripción
  duration?: number; // Duración en minutos
  startDate?: number[]; // lista de [year, month, day]
  format?: string; // Formato de video
  studios?: { // Lista de studios
    nodes: {
      name: string;
    }[];
  }
  source?: string; // Fuente de anime
  tags?: { // Lista de tags
    name: string;
    rank: number;
    category: string;
    isMediaSpoiler: boolean;
  }[];
  isAdult?: boolean; // Si el anime es para adultos
  externalLinks?: { // Lista de enlaces externos
    site: string;
    url: string;
    id: number;
  }[];
  relations: { // Relaciones con otros animes
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
  staff: { // Lista de staff
    edges: {
      role: string;
      node: {
        id: number;
        name: {
          full: string;
          native: string;
          userPreferred: string;
        }
        language: string;
        image: {
          large: string;
        }
      }
    }[];
  }
  characters: { // Lista de personajes
    edges: {
      role: string;
      node: {
        id: number;
        name: {
          full: string;
          native: string;
        }
        image: {
          large: string;
        }
      }
      voiceActors: {
        id: number;
        name: {
          full: string;
        }
        languageV2: string;
      }[];
    }[];
  }

  // Datos crudos de AniList para calcular day y time
  nextAiringEpisode?: { // Siguiente episodio
    airingAt: number; // Timestamp Unix en UTC
    episode: number;
    timeUntilAiring: number;
  };

  // Opcional: lista completa de episodios futuros
  airingSchedule?: { // Lista de episodios futuros
    nodes: {
      episode: number;
      airingAt: number;
    }[];
  };
}
