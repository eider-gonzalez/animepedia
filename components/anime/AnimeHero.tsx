import { Star, TrendingUp, Trophy, Users } from "lucide-react"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { Anime } from "@/types"

function AnimeHero({ anime }: { anime: Anime }) {
  const ratedAllTime = anime.rankings?.find(
    r => r.type === "RATED" && r.year === null
  );

  const bannerDefault = "/bannerdefault.jpg";

  return (
    <section className="relative">
      {/* Banner */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src={anime.bannerImage || bannerDefault}
          alt={anime.title?.english || anime.title?.romaji || "Banner"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-32 md:-mt-40 flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Poster */}
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="relative h-64 w-44 md:h-80 md:w-56 overflow-hidden rounded-xl shadow-2xl ring-2 ring-border">
              <Image
                src={anime.coverImage?.large || "/placeholder.svg"}
                alt={anime.title?.english || anime.title?.romaji || "Poster"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pt-4 md:pt-16 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-3">
              <Badge
                className={
                  anime.status === "RELEASING"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-secondary text-secondary-foreground"
                }
              >
                {anime.status === "RELEASING" ? "Emisión" : "Finalizado"}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 text-balance">
              {anime.title.romaji || anime.title.english}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">{anime.title.romaji || anime.title.english}</p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-yellow-500/10">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {anime.averageScore ? (anime.averageScore / 10).toFixed(1) : "N/A"}
                  </p>
                  <p className="text-xs text-muted-foreground">Puntuación</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{ratedAllTime ? `#${ratedAllTime.rank}` : " — "}</p>
                  <p className="text-xs text-muted-foreground">Ranking</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">#{anime.popularity?.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Popularidad</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{anime.favourites?.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Favoritos</p>
                </div>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {anime.genres?.map((genre) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className="text-foreground border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnimeHero