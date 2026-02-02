"use client"

import React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, Calendar, Clock, Film, Building, Shield, Tv, BookOpen, Tag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Anime } from "@/types"

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

function OverviewTab({ anime }: { anime: Anime }) {
  const [synopsisExpanded, setSynopsisExpanded] = useState(false)

  const mapSource = {
    MANGA: "Manga",
    LIGHT_NOVEL: "Novela ligera",
    VISUAL_NOVEL: "Novela visual",
    ORIGINAL: "Original",
    WEB_NOVEL: "Novela web",
    NOVEL: "Novela",
    GAME: "Videojuego",
    OTHER: "Otro",
  } as const;

  const mapSeason = {
    WINTER: "Invierno",
    SPRING: "Primavera",
    SUMMER: "Verano",
    FALL: "Otoño",
  } as const;

  const demographicTags = anime.tags?.filter(
    (tag) => tag.category === "Demographic"
  );

  const airingTimestamp = anime.nextAiringEpisode?.airingAt;
  const airingDate = airingTimestamp ? new Date(airingTimestamp * 1000) : null;

  const day = airingDate
    ? airingDate.toLocaleDateString("es-CO", { weekday: "long" })
    : "-";
  const time = airingDate
    ? airingDate.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "America/Bogota" })
    : "-";
  const now = new Date();
  let remaining = "-";

  if (airingDate) {
    const diffMs = airingDate.getTime() - now.getTime();

    if (diffMs > 0) {
      const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diffMs / (1000 * 60)) % 60);

      remaining = `${dias}d ${horas}h ${minutos}m`;
    } else {
      remaining = "Ya emitido";
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Synopsis */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">Sinopsis</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-muted-foreground leading-relaxed ${!synopsisExpanded ? "line-clamp-4" : ""
                }`}
              dangerouslySetInnerHTML={{ __html: anime.description || "Sin sinopsis disponible." }}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSynopsisExpanded(!synopsisExpanded)}
              className="mt-3 text-primary hover:text-primary/80 p-0 h-auto"
            >
              {synopsisExpanded ? (
                <>
                  Ver menos <ChevronUp className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Ver mas <ChevronDown className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Information Grid */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">Informacion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem
                icon={<Calendar className="h-4 w-4" />}
                label="Estreno"
                value={`${anime.startDate?.year}-${anime.startDate?.month}-${anime.startDate?.day}` || "Desconocido"}
              />
              <InfoItem
                icon={<Tv className="h-4 w-4" />}
                label="Episodios"
                value={`${anime.episodes ?? "N/A"} episodios`}
              />
              <InfoItem
                icon={<Clock className="h-4 w-4" />}
                label="Duracion"
                value={`${anime.duration} min`}
              />
              <InfoItem
                icon={<Building className="h-4 w-4" />}
                label="Estudio"
                value={anime.studios?.nodes[0]?.name || "Desconocido"}
              />
              <InfoItem
                icon={<BookOpen className="h-4 w-4" />}
                label="Fuente"
                value={mapSource[anime.source as keyof typeof mapSource] || "Desconocido"}
              />
              <InfoItem
                icon={<Calendar className="h-4 w-4" />}
                label="Transmision"
                value={airingDate ? `${day}, ${time}` : "Finalizado"}
              />
            </div>
          </CardContent>
        </Card>

        {/* Themes & Demographics */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">Temas y Demograficos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Temas</p>
                <div className="flex flex-wrap gap-2">
                  {anime.tags?.filter((tag) => tag.rank >= 60 && !tag.isMediaSpoiler).map((tag) => (
                    <Badge key={tag.name} variant="secondary" className="bg-secondary text-secondary-foreground">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Demografia</p>
                <div className="flex flex-wrap gap-2">
                  {demographicTags && demographicTags.length > 0 ? (
                    demographicTags.map((tag) => (
                      <Badge key={tag.name} variant="outline" className="border-primary text-primary" >
                        {tag.name}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline" className="border-primary text-primary">
                      Sin demografía
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Next Episode (if airing) */}
        {anime.nextAiringEpisode && (
          <Card className="border-primary bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                </span>
                Proximo Episodio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground mb-1">
                  Ep. {anime.nextAiringEpisode.episode}
                </p>
                <p className="text-muted-foreground mb-4">{day} - {time}</p>
                <div className="bg-secondary rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Tiempo restante</p>
                  <p className="text-sm text-muted-foreground mt-1">Faltan: {remaining}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Technical Details */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">Detalles Tecnicos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <DetailItem
              icon={<Film className="h-4 w-4" />}
              label="Formato"
              value={anime.format || "Desconocido"}
            />
            <DetailItem
              icon={<Tag className="h-4 w-4" />}
              label="Temporada"
              value={`${mapSeason[anime.season as keyof typeof mapSeason] || "Desconocido"} ${anime.seasonYear || ""}`}
            />
            <DetailItem
              icon={<Shield className="h-4 w-4" />}
              label="Clasificacion"
              value={anime.isAdult ? "18+" : "Todos los publicos"}
            />
            <div>
              <p className="text-sm text-muted-foreground mb-2">Licenciantes</p>
              <div className="flex flex-wrap gap-1">
                {anime.externalLinks?.length ? (
                  anime.externalLinks.map(({ id, site }) => (
                    <Badge key={id} variant="outline" className="text-xs border-border text-muted-foreground text-center">
                      {site}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="outline" className="text-xs border-border text-muted-foreground text-center">
                    Ninguno
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div >
  )
}

export default OverviewTab