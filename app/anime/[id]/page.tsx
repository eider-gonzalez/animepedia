"use client"

import { useParams } from "next/navigation";
import AnimeHero from "@/components/anime/AnimeHero"
import { useAnimeById } from "@/hooks/useAnimeById";
import AnimeTabs from "@/components/anime/AnimeTabs"
import { Spinner } from "@/components/ui/spinner";

export default function AnimePage() {
  const params = useParams(); // hook
  const id = Number(params.id); // ya es string

  const { data: anime, isLoading, error } = useAnimeById(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen gap-5">
        <p className="text-center text-xl">Cargando...</p>
        <Spinner className="h-12 w-12 text-primary" />
      </div>
    )
  }
  if (error || !anime) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-xl text-red-500">Error al cargar datos 😢</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimeHero anime={anime} />
      <AnimeTabs anime={anime} />
    </div>
  )
}
