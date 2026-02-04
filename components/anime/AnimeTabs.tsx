"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import OverviewTab from "./tabs/OverviewTab"
import EpisodesTab from "./tabs/EpisodesTab"
import RelationsTab from "./tabs/RelationsTab"
import { Anime } from "@/types"
import { useAnimeEpisodes } from "@/hooks/useAnimeEpisodes"
import StaffTab from "./tabs/StaffTab"
import CharactersTab from "./tabs/CharactersTab"

const tabs = [
  { id: "overview", label: "General" },
  { id: "episodes", label: "Episodios" },
  { id: "relations", label: "Relaciones" },
  { id: "characters", label: "Personajes" },
  { id: "staff", label: "Staff" },
]

function AnimeTabs({ anime }: { anime: Anime }) {
  const [activeTab, setActiveTab] = useState("overview")
  const { data: episodes, isLoading: epLoading } = useAnimeEpisodes(anime.title.romaji);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Sticky Tab Navigation */}
      <div className="sticky top-16 z-40 -mx-4 px-4 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
        <nav className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors relative",
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === "overview" && <OverviewTab anime={anime} />}
        {activeTab === "episodes" && (<EpisodesTab episodes={episodes || []} loading={epLoading} duration={anime.duration || 0} />)}
        {activeTab === "relations" && <RelationsTab related={anime.relations.edges} />}
        {activeTab === "characters" && <CharactersTab characters={anime.characters.edges} />}
        {activeTab === "staff" && <StaffTab staff={anime.staff.edges} />}
      </div>
    </div>
  )
}

export default AnimeTabs