"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Anime } from "@/types"

function CharactersTab({ characters }: { characters: Anime["characters"]["edges"] }) {
  const personajesPrincipales = characters.filter((personaje) => personaje.role !== "BACKGROUND").slice(0, 12);

  const mapCharacter = {
    "MAIN": "Principal",
    "SUPPORTING": "Apoyo",
  } as const;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Personajes Principales</h3>
        <p className="text-muted-foreground">
          Conoce a los personajes más importantes del anime
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {personajesPrincipales.map((personaje) => (
          <Card
            key={personaje.node.id}
            className="group overflow-hidden border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Imagen principal */}
            <div className="relative h-56 w-full">
              <Image
                src={personaje.node.image.large || "/placeholder.svg"}
                alt={personaje.node.name.full}
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradiente para legibilidad */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

              {/* Nombre sobre la imagen */}
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-white font-semibold text-lg leading-tight drop-shadow">
                  {personaje.node.name.full}
                </h4>
                <Badge className="mt-1 bg-white/90 text-black text-[10px]">
                  {mapCharacter[personaje.role as keyof typeof mapCharacter]}
                </Badge>
              </div>
            </div>

            {/* Info */}
            <CardContent className="p-4 space-y-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                  Actores de voz
                </p>

                <div className="flex flex-wrap gap-2">
                  {personaje.voiceActors
                    .filter((actor) => ["Japanese", "English", "Spanish"].includes(actor.languageV2))
                    .map((actor) => (
                    <Badge
                      key={`${actor.name.full}-${actor.languageV2}`}
                      variant="secondary"
                      className="text-[11px] font-normal"
                    >
                      {actor.name.full}
                      <span className="ml-1 text-muted-foreground">
                        ({actor.languageV2})
                      </span>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CharactersTab
