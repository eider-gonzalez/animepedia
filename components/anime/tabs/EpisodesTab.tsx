"use client"

import { useState } from "react"
import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { KitsuEpisode, Anime } from "@/types"
import { Spinner } from "@/components/ui/spinner"

function EpisodesList({
  episodes,
  searchTerm,
  setSearchTerm,
  duration,
}: {
  episodes: KitsuEpisode[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  duration: Anime["duration"]
}) {
  const filteredEpisodes = episodes.filter(
    (ep) =>
      ep?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ep.number.toString().includes(searchTerm)
  )

  console.log(episodes)

  return (
    <div className="space-y-6">
      {/* Search + Stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">
          {episodes.length} episodios
        </span>
        <Input
          type="text"
          placeholder="Buscar episodio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs bg-secondary border-border focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Episodes List */}
      <div className="space-y-3 max-h-150 overflow-y-auto pr-2">
        {filteredEpisodes.map((episode) => (
          <Card
            key={episode.number}
            className={cn(
              "border-border bg-card hover:bg-card-hover transition-colors cursor-pointer shadow-sm"
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Episode Number */}
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white font-bold text-lg shrink-0">
                  {episode.number}
                </div>

                {/* Episode Info */}
                <div className="flex-1 min-w-0">
                  <h4
                    className="font-medium text-lg text-card-foreground truncate"
                    title={episode.title || ""}
                  >
                    {episode.title || "Titulo no disponible"}
                  </h4>

                  <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-muted-foreground">
                    {episode.airdate && (
                      <span className="text-white">{new Date(episode.airdate).toLocaleDateString()}</span>
                    )}
                    <span className="flex items-center gap-1 text-white">
                      <Clock className="h-3 w-3" />
                      {duration ? `${duration} min` : "-"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground" title={episode.synopsis || undefined}>
                    {episode.synopsis ? (
                      <span className="line-clamp-3">{episode.synopsis}</span>
                    ) : (
                      "Sin sinopsis disponible"
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEpisodes.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No se encontraron episodios que coincidan con &quot;{searchTerm}&quot;
        </div>
      )}
    </div>
  )
}

function EpisodesTab({
  episodes,
  loading,
  duration,
}: {
  episodes: KitsuEpisode[]
  loading: boolean
  duration: number
}) {
  const [searchTerm, setSearchTerm] = useState("")

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <Spinner className="h-12 w-12 text-primary" />
        <p className="text-lg text-muted-foreground">Cargando episodios...</p>
      </div>
    )
  }

  if (episodes.length === 0) {
    return <p className="text-center text-muted-foreground py-12">No hay episodios para este anime</p>
  }

  return (
    <EpisodesList
      episodes={episodes}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      duration={duration}
    />
  )
}

export default EpisodesTab
