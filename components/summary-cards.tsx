"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Zap, DollarSign, Leaf } from "lucide-react"

interface SummaryCardsProps {
  data: Array<{
    year: number
    total: {
      cost: number
      energy: number
      emissions: number
    }
    eCooking: { units: number }
    eMobility: { units: number }
  }>
}

export function SummaryCards({ data }: SummaryCardsProps) {
  const latestYear = data[data.length - 1]
  const totalUnits = latestYear.eCooking.units + latestYear.eMobility.units
  const totalCost = latestYear.total.cost
  const totalEnergy = latestYear.total.energy
  const totalEmissions = latestYear.total.emissions

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Units</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUnits.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">By {latestYear.year}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalCost.toLocaleString()}M</div>
          <p className="text-xs text-muted-foreground">Cumulative by {latestYear.year}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Energy Demand</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEnergy.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">kWh in {latestYear.year}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CO₂ Emissions</CardTitle>
          <Leaf className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEmissions.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Tons in {latestYear.year}</p>
        </CardContent>
      </Card>
    </div>
  )
}
