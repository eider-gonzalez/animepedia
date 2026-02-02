"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useSearchAnime } from "@/hooks/useSearchAnime"

function SearchAutocomplete() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: results, isLoading } = useSearchAnime(query);

  const isOpen = isFocused && query.length > 0;

  const handleSelect = (animeId: number) => {
    setIsFocused(false);
    setQuery("");
    router.push(`/anime/${animeId}`);
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full pl-10 pr-10 bg-secondary border-border"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("")
              setIsFocused(false)
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && isLoading && (
        <div className="absolute top-full mt-2 w-full rounded-lg border bg-popover shadow-xl p-4 text-center">
          Buscando...
        </div>
      )}

      {isOpen && results && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full rounded-lg border bg-popover shadow-xl z-50 *:p-0 max-h-80 overflow-y-auto">
          <ul className="divide-y">
            {results.map((anime) => (
              <li key={anime.id}>
                <button
                  onClick={() => handleSelect(anime.id)}
                  className="flex w-full gap-4 p-3 hover:bg-accent"
                >
                  <div className="relative h-16 w-12 overflow-hidden rounded-md">
                    <Image src={anime.coverImage.large} alt={anime.title.romaji} fill className="object-cover" sizes="(min-width: 1024px) 16vw, (min-width: 768px) 22vw, 45vw" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium truncate">{anime.title.english}</p>
                    <p className="text-sm text-muted-foreground truncate">{anime.title.romaji}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs">{anime.seasonYear ? anime.seasonYear.toString() : "N/A"}</span>
                      <Badge variant={anime.status === "RELEASING" ? "default" : "secondary"}>
                        {anime.status === "RELEASING" ? "Emisión" : "Finalizado"}
                      </Badge>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && results && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full rounded-lg border bg-popover shadow-xl p-6 text-center">
          No se encontraron resultados para &quot;{query}&quot;
        </div>
      )}
    </div>
  )
}

export default SearchAutocomplete
