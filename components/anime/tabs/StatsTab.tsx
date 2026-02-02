"use client"

import { Eye, CheckCircle, PauseCircle, XCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimeTabsProps } from "@/types"

interface StatsTabProps {
  stats: AnimeTabsProps["anime"]["stats"]
}

function StatsTab({ stats }: StatsTabProps) {
  const totalUsers =
    stats.watching + stats.completed + stats.onHold + stats.dropped + stats.planToWatch
  const totalScores = stats.scoreDistribution.reduce((acc, d) => acc + d.count, 0)
  const maxCount = Math.max(...stats.scoreDistribution.map((d) => d.count))

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`
    }
    return num.toString()
  }

  const statusItems = [
    {
      label: "Viendo",
      value: stats.watching,
      icon: Eye,
      color: "text-blue-500",
      bgColor: "bg-blue-500",
    },
    {
      label: "Completado",
      value: stats.completed,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500",
    },
    {
      label: "En espera",
      value: stats.onHold,
      icon: PauseCircle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500",
    },
    {
      label: "Abandonado",
      value: stats.dropped,
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-500",
    },
    {
      label: "Planea ver",
      value: stats.planToWatch,
      icon: Clock,
      color: "text-muted-foreground",
      bgColor: "bg-muted-foreground",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Estadisticas de Usuarios</h3>
        <p className="text-muted-foreground">
          {formatNumber(totalUsers)} usuarios han agregado este anime a sus listas
        </p>
      </div>

      {/* Status Distribution */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">Estado de Visualizacion</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Progress Bar */}
          <div className="h-4 rounded-full overflow-hidden flex mb-6">
            {statusItems.map((item) => (
              <div
                key={item.label}
                className={`${item.bgColor}`}
                style={{
                  width: `${(item.value / totalUsers) * 100}%`,
                }}
                title={`${item.label}: ${formatNumber(item.value)}`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {statusItems.map((item) => {
              const Icon = item.icon
              const percentage = ((item.value / totalUsers) * 100).toFixed(1)
              return (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <Icon className={`h-5 w-5 ${item.color}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{formatNumber(item.value)}</p>
                    <p className="text-xs text-muted-foreground">{item.label} ({percentage}%)</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Score Distribution */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">Distribucion de Puntuaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.scoreDistribution
              .sort((a, b) => b.score - a.score)
              .map((item) => {
                const percentage = (item.count / totalScores) * 100
                return (
                  <div key={item.score} className="flex items-center gap-4">
                    <div className="w-8 text-right">
                      <span className="text-sm font-medium text-foreground">{item.score}</span>
                    </div>
                    <div className="flex-1 h-8 rounded-lg bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${(item.count / maxCount) * 100}%` }}
                      />
                    </div>
                    <div className="w-16 text-right">
                      <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-20 text-right hidden sm:block">
                      <span className="text-sm text-muted-foreground">{formatNumber(item.count)}</span>
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">9.1</p>
            <p className="text-sm text-muted-foreground mt-1">Puntuacion Media</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-foreground">#1</p>
            <p className="text-sm text-muted-foreground mt-1">Ranking</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-foreground">#1</p>
            <p className="text-sm text-muted-foreground mt-1">Popularidad</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-foreground">4M</p>
            <p className="text-sm text-muted-foreground mt-1">Miembros</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default StatsTab