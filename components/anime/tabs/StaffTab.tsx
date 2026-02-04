"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Anime } from "@/types"
import { useParams } from "next/navigation"

function StaffTab({ staff }: { staff: Anime["staff"]["edges"] }) {
  const staffPrincipales = staff?.filter((persona) =>
    ["Director", "Art Director", "Original Creator", "Sound Director", "Character Design", "Music ", "Chief Director", "Script", "Series Composition"].includes(persona.role)
  )
  const params = useParams();
  const id = Number(params.id);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Staff de Produccion</h3>
        <p className="text-muted-foreground">
          Conoce al equipo detras de la creacion de este anime
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {staffPrincipales?.map((persona) => (
          <HoverCard key={persona.node.id} openDelay={200}>
            <HoverCardTrigger asChild>
              <Card className="border-border bg-card hover:ring-2 hover:ring-primary transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-border shrink-0">
                      <Image
                        src={persona.node.image.large || "/placeholder.svg"}
                        alt={persona.node.name.userPreferred}
                        fill
                        sizes="(min-width: 1024px) 16vw, (min-width: 768px) 22vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-card-foreground truncate">
                        {persona.node.name.userPreferred}
                      </h4>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {persona.role}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-popover border-border">
              <div className="flex gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-lg shrink-0">
                  <Image
                    src={persona.node.image.large || "/placeholder.svg"}
                    alt={persona.node.name.userPreferred}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 768px) 22vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-popover-foreground">{persona.node.name.userPreferred}</h4>
                  <p className="text-sm text-primary mb-2">{persona.role}</p>
                  <p className="text-sm text-muted-foreground">
                    {persona.node.languageV2}
                  </p>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Otros trabajos:</p>
                    <ul className="text-xs text-popover-foreground">
                      {persona.node.staffMedia.nodes
                        .filter((work) => work.id !== id)
                        .slice(0, 3)
                        .map((work) =>
                          <li key={work.id} className="truncate">
                            {work.title.userPreferred}
                          </li>
                        )}
                    </ul>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  )
}

export default StaffTab