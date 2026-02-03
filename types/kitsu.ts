// types/kitsu.ts

export interface KitsuSearchResponse {
  data: KitsuSearchItem[];
}

export interface KitsuSearchItem {
  id: string;
  attributes: {
    canonicalTitle: string;
    startDate: string | null;
  };
}

export interface KitsuEpisodesResponse {
  data: KitsuEpisodeItem[];
}

export interface KitsuEpisodeItem {
  id: string;
  attributes: {
    number: number;
    titles?: {
      en?: string;
      en_jp?: string;
      ja_jp?: string;
    };
    synopsis?: string;
    airdate?: string;
  };
}

export interface KitsuEpisode {
  id: string;
  number: number;
  title: string | null;
  synopsis: string | null;
  airdate: string | null;
}
