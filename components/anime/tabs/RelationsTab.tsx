"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Anime } from "@/types"


function RelationsTab({ related }: { related: Anime["relations"]["edges"] }) {
  // Group by relation type
  const filtered = related.filter((edge) =>
    ["PREQUEL", "SEQUEL", "SIDE_STORY", "SPIN_OFF", "ALTERNATIVE", ].includes(
      edge.relationType
    )
  )

  if (filtered.length === 0) {
    return <p>No se encontraron relaciones para este anime</p>
  }

  const groupedRelations = filtered.reduce(
    (acc, edge) => {
      const key = edge.relationType

      if (!acc[key]) acc[key] = []
      acc[key].push(edge.node)

      return acc
    },
    {} as Record<string, typeof related[number]["node"][]>
  )

  const relationOrder = ["PREQUEL", "SEQUEL", "SIDE_STORY", "SPIN_OFF", "ALTERNATIVE",]
  const mapRelation = {
    PREQUEL: "Precuela",
    SEQUEL: "Secuela",
    SIDE_STORY: "Historia secundaria",
    SPIN_OFF: "Spin-off",
    ALTERNATIVE: "Versión alternativa",
    ADAPTATION: "Adaptación",
    SUMMARY: "Resumen",
    CHARACTER: "Personaje",
    OTHER: "Otro",
  } as const;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Obras Relacionadas</h3>
        <p className="text-muted-foreground">
          Explora otras series y peliculas del mismo universo
        </p>
      </div>

      {/* Timeline View */}
      <div className="relative">
        {/* Timeline items */}
        <p>Linea de tiempo</p>
        <div className="flex flex-col lg:flex-row gap-4 overflow-x-auto pb-4">
          {filtered.map((edge) => (
            <Link
              key={edge.node.id}
              href={`/anime/${edge.node.id}`}
              className="shrink-0 w-full lg:w-64"
            >
              <Card className="border-border bg-card hover:ring-2 hover:ring-primary transition-all h-full">
                <CardContent className="p-0">
                  <div className="flex lg:flex-col gap-4 p-4">
                    <div className="relative h-28 w-20 lg:h-48 lg:w-full overflow-hidden rounded-lg shrink-0">
                      <Image
                        src={edge.node.coverImage.large || "/placeholder.svg"}
                        alt={edge.node.title.userPreferred}
                        fill
                        sizes="(min-width: 1024px) 16vw, (min-width: 768px) 22vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center lg:text-center">
                      <Badge
                        variant="outline"
                        className="self-start lg:self-center mb-2 text-xs border-primary text-primary"
                      >
                        {mapRelation[edge.relationType as keyof typeof mapRelation]}
                      </Badge>
                      <h4 className="font-medium text-card-foreground line-clamp-2">
                        {edge.node.title.userPreferred}
                      </h4>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Grouped View */}
      <div className="space-y-6">
        <p>Vista agrupada</p>
        {relationOrder.map((relationType) => {
          const animes = groupedRelations[relationType]
          if (!animes || animes.length === 0) return null

          return (
            <div key={relationType}>
              <h4 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {mapRelation[relationType as keyof typeof mapRelation]}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {animes.map((edge) => (
                  <Link key={edge.id} href={`/anime/${edge.id}`}>
                    <Card className="h-full flex flex-col group overflow-hidden border-border bg-card hover:ring-2 hover:ring-primary transition-all">
                      <div className="relative aspect-2/3 overflow-hidden">
                        <Image
                          src={edge.coverImage.large || "/placeholder.svg"}
                          alt={edge.title.userPreferred}
                          fill
                          sizes="(min-width: 1024px) 16vw, (min-width: 768px) 22vw, 45vw"
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-3">
                        <h5 className="font-medium text-card-foreground text-sm line-clamp-2">
                          {edge.title.userPreferred}
                        </h5>
                        <Badge
                          variant="outline"
                          className="self-start lg:self-center mb-2 text-xs border-primary text-primary"
                        >
                          {edge.format || "N/A"}
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RelationsTab 