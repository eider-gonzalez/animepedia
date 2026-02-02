"use client"

import { useState } from "react"
import { Play, Clock, AlertCircle, RotateCcw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Anime } from "@/types"

// interface EpisodesTabProps {
//   episodes: Anime["episodes"]
// }

// function EpisodesList({ episodes, searchTerm, setSearchTerm, }: { episodes: Anime["episodes"], searchTerm: string, setSearchTerm: (term: string) => void }) {
//   const filteredEpisodes = episodes.filter(
//     (ep) =>
//       ep.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       ep.number.toString().includes(searchTerm)
//   )

//   return (
//     <div className="space-y-6">
//       {/* Search and Stats */}
//       <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//         <div>
//           <h3 className="text-xl font-semibold text-foreground">
//             {episodes} Episodios
//           </h3>
//           <p className="text-sm text-muted-foreground">
//             {episodes.filter((e) => e.filler).length} filler, {episodes.filter((e) => e.recap).length} recaps
//           </p>
//         </div>
//         <Input
//           type="text"
//           placeholder="Buscar episodio..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="max-w-xs bg-secondary border-border"
//         />
//       </div>

//       {/* Episodes List */}
//       <div className="space-y-2 max-h-150p overflow-y-auto pr-2">
//         {filteredEpisodes.map((episode, index) => {
//           const isNext = index === 0 // Mock: first episode as "next"
//           return (
//             <Card
//               key={episode.number}
//               className={cn(
//                 "border-border bg-card hover:bg-accent transition-colors cursor-pointer",
//                 isNext && "ring-2 ring-primary"
//               )}
//             >
//               <CardContent className="p-4">
//                 <div className="flex items-center gap-4">
//                   {/* Episode Number */}
//                   <div
//                     className={cn(
//                       "flex items-center justify-center h-12 w-12 rounded-lg font-bold text-lg shrink-0",
//                       isNext
//                         ? "bg-primary text-primary-foreground"
//                         : "bg-secondary text-foreground"
//                     )}
//                   >
//                     {episode.number}
//                   </div>

//                   {/* Episode Info */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <h4 className="font-medium text-card-foreground truncate">
//                         {episode.title}
//                       </h4>
//                       {isNext && (
//                         <Badge className="bg-primary text-primary-foreground text-xs">
//                           Proximo
//                         </Badge>
//                       )}
//                       {episode.filler && (
//                         <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-500">
//                           <AlertCircle className="h-3 w-3 mr-1" />
//                           Filler
//                         </Badge>
//                       )}
//                       {episode.recap && (
//                         <Badge variant="outline" className="text-xs border-muted-foreground text-muted-foreground">
//                           <RotateCcw className="h-3 w-3 mr-1" />
//                           Recap
//                         </Badge>
//                       )}
//                     </div>
//                     <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
//                       <span>{episode.aired}</span>
//                       <span className="flex items-center gap-1">
//                         <Clock className="h-3 w-3" />
//                         {episode.duration}
//                       </span>
//                     </div>
//                   </div>

//                 </div>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>

//       {filteredEpisodes.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-muted-foreground">No se encontraron episodios que coincidan con &quot;{searchTerm}&quot;</p>
//         </div>
//       )}
//     </div>
//   )
// }

function EpisodesTab({ episodes }: { episodes: Anime["episodes"] }) {
  // const [searchTerm, setSearchTerm] = useState("")

  return (
    // <EpisodesList
    //   episodes={episodes}
    //   searchTerm={searchTerm}
    //   setSearchTerm={setSearchTerm}
    // />
    <h2>Episodes {episodes}</h2>
  )
}

export default EpisodesTab