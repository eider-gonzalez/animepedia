"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Github, Search  } from "lucide-react"
import { useState } from "react"
import SearchAutocomplete from "./SearchAutocomplete"

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">A</span>
          </div>
          <span className="text-xl font-bold text-foreground">Animepedia</span>
        </Link>

        <div className="hidden flex-1 max-w-xl mx-8 md:block">
          <SearchAutocomplete />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
          
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border p-4 md:hidden">
          <SearchAutocomplete />
        </div>
      )}
    </header>
  )
}

export default Navbar