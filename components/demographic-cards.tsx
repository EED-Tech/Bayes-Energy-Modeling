"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Home, Car } from "lucide-react"
import { formatNumber } from "@/lib/utils"

interface DemographicCardsProps {
  population: number
  households: number
  motorVehiclesOwned: number
  country: string
  year: number
}

export function DemographicCards({
  population,
  households,
  motorVehiclesOwned,
  country,
  year,
}: DemographicCardsProps) {
  return (
    <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2">
      <Card className="bg-teal-50/50 border border-teal-200/30 card-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-1 space-y-0">
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Population
          </CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-base font-bold text-primary">{formatNumber(population, 0)}</div>
          <p className="text-xs text-muted-foreground mt-0.5">{year}</p>
        </CardContent>
      </Card>

      <Card className="bg-teal-50/50 border border-teal-200/30 card-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-1 space-y-0">
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Households
          </CardTitle>
          <Home className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-base font-bold text-primary">{formatNumber(households, 0)}</div>
          <p className="text-xs text-muted-foreground mt-0.5">{country}</p>
        </CardContent>
      </Card>

      <Card className="bg-teal-50/50 border border-teal-200/30 card-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-1 space-y-0">
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Motor Vehicles Owned
          </CardTitle>
          <Car className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-base font-bold text-primary">{formatNumber(motorVehiclesOwned, 0)}</div>
          <p className="text-xs text-muted-foreground mt-0.5">Estimated fleet size</p>
        </CardContent>
      </Card>
    </div>
  )
}
