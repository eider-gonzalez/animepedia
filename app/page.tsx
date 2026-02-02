"use client"

import Link from "next/link"
import Image from "next/image"
import { Star, TrendingUp, Calendar, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useTrendingAnime } from "@/hooks/useTrendingAnime"
import { useSeasonAnime } from "@/hooks/useSeasonAnime"
import { useFeaturedAnime } from "@/hooks/useFeaturedAnime"
import { Spinner } from "@/components/ui/spinner"

export default function Home() {
  const trendingQuery = useTrendingAnime();
  const seasonQuery = useSeasonAnime();
  const featuredQuery = useFeaturedAnime();

  if (trendingQuery.isLoading || seasonQuery.isLoading || featuredQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen gap-5">
        <p className="text-center text-xl">Cargando...</p> 
        <Spinner className="h-12 w-12 text-primary" />
      </div>
    )
  }

  if (trendingQuery.error || seasonQuery.error || featuredQuery.error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-xl text-red-500">Error al cargar datos 😢</p>
      </div>
    )
  }

  const trendingAnime = trendingQuery.data;
  const seasonAnime = seasonQuery.data;
  const featuredAnime = featuredQuery.data;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-125 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={featuredAnime?.bannerImage || "/placeholder.svg"}
            alt={featuredAnime?.title?.romaji || "Anime"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container relative mx-auto flex h-full items-end px-4 pb-12">
          <div className="flex gap-8">
            <Link href={`/anime/${featuredAnime?.id}`} className="hidden md:block">
              <div className="relative h-72 w-48 overflow-hidden rounded-xl shadow-2xl ring-1 ring-border transition-transform hover:scale-105">
                <Image
                  src={featuredAnime?.coverImage.large || "/placeholder.svg"}
                  alt={featuredAnime?.title?.romaji || "Anime"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </Link>

            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-primary text-primary-foreground">Destacado</Badge>
                <Badge variant="secondary">{featuredAnime?.status}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 text-balance">
                {featuredAnime?.title.english}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">{featuredAnime?.title.romaji}</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold text-foreground">
                    {featuredAnime?.averageScore
                      ? (featuredAnime.averageScore / 10).toFixed(1)
                      : "N/A"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {featuredAnime?.genres?.map((genre) => (
                    <Badge key={genre} variant="outline" className="text-foreground border-border">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
              <Link
                href={`/anime/${featuredAnime?.id}`}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Play className="h-5 w-5" />
                Ver detalles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Tendencias</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trendingAnime?.map((anime) => (
            <Link key={anime.id} href={`/anime/${anime.id}`} className="h-full">
              <Card className="h-full flex flex-col group overflow-hidden border-border bg-card hover:ring-2 hover:ring-primary transition-all">
                {/* Imagen */}
                <div className="relative aspect-2/3 overflow-hidden">
                  <Image
                    src={anime.coverImage.large || "/placeholder.svg"}
                    alt={anime.title.romaji}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 768px) 22vw, 45vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-bold text-white">
                        {anime.averageScore ? (anime.averageScore / 10).toFixed(1) : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Texto */}
                <CardContent className="p-3 flex flex-col flex-1">
                  <h3 className="font-medium line-clamp-2 text-sm">
                    {anime.title.romaji}
                  </h3>

                  <p className="text-xs text-muted-foreground mt-auto">
                    {anime.episodes ?? "N/A"} episodios
                  </p>
                </CardContent>

              </Card>
            </Link>
          ))}

        </div>
      </section>

      {/* Current Season */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Temporada Actual</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seasonAnime?.map((anime) => {
            const airingTimestamp = anime.nextAiringEpisode?.airingAt;
            const airingDate = airingTimestamp ? new Date(airingTimestamp * 1000) : null;

            const day = airingDate
              ? airingDate.toLocaleDateString("es-CO", { weekday: "long" })
              : "-";
            const time = airingDate
              ? airingDate.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "America/Bogota" })
              : "-";

            return (
              <Link key={anime.id} href={`/anime/${anime.id}`}>
                <Card className="group relative flex overflow-hidden border-border hover:ring-2 hover:ring-primary transition-all">
                  {anime.bannerImage && (
                    <Image
                      src={anime.bannerImage}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover scale-110 blur-sm opacity-40"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="relative z-10 flex w-full">
                    <div className="relative h-32 w-24 shrink-0 overflow-hidden">
                      <Image
                        src={anime.coverImage.large}
                        alt={anime.title.romaji}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="flex flex-1 flex-col justify-center p-4">
                      <h3 className="font-medium text-white line-clamp-2 mb-2">
                        {anime.title.romaji}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs border-primary text-primary bg-black/30">
                          {day}
                        </Badge>
                        <span className="text-sm text-gray-200">{time}</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            );
          })}

        </div>
      </section>
    </div>
  );
}
