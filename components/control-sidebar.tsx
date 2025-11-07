"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useGlobalState } from "@/lib/global-state"
import { Settings2 } from "lucide-react"

export function ControlSidebar() {
  const { parameters, setParameters } = useGlobalState()

  const updateParameter = (key: string, value: number) => {
    setParameters({ ...parameters, [key]: value })
  }

  return (
    <Card className="sticky top-24 bg-white border border-border/50 card-shadow">
      <CardHeader className="border-b border-border/20 pb-3">
        <div className="flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-semibold">Model Parameters</CardTitle>
        </div>
        <CardDescription className="text-xs mt-1">Adjust to explore your scenarios</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        {/* Year Selection */}
        <div className="space-y-2 p-3 rounded-md bg-secondary/50 border border-border/30">
          <div className="flex items-center justify-between">
            <Label htmlFor="sel_year" className="text-xs font-semibold text-foreground">
              Year
            </Label>
            <span className="text-sm font-bold text-primary">{parameters.sel_year}</span>
          </div>
          <Slider
            id="sel_year"
            min={2000}
            max={2049}
            step={1}
            value={[parameters.sel_year]}
            onValueChange={([value]) => updateParameter("sel_year", value)}
            className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary h-1"
          />
        </div>

        {/* eCooking Adoption */}
        <div className="space-y-2 p-3 rounded-md bg-secondary/50 border border-border/30">
          <div className="flex items-center justify-between">
            <Label htmlFor="user_ecook" className="text-xs font-semibold text-foreground">
              eCooking
            </Label>
            <span className="text-sm font-bold text-primary">{parameters.user_ecook.toFixed(0)}%</span>
          </div>
          <Slider
            id="user_ecook"
            min={0}
            max={100}
            step={0.1}
            value={[parameters.user_ecook]}
            onValueChange={([value]) => updateParameter("user_ecook", value)}
            className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary h-1"
          />
        </div>

        {/* eMobility - Bus */}
        <div className="space-y-2 p-3 rounded-md bg-secondary/50 border border-border/30">
          <div className="flex items-center justify-between">
            <Label htmlFor="user_ev_bus_share" className="text-xs font-semibold text-foreground">
              Bus EV Share
            </Label>
            <span className="text-sm font-bold text-primary">{parameters.user_ev_bus_share.toFixed(0)}%</span>
          </div>
          <Slider
            id="user_ev_bus_share"
            min={0}
            max={100}
            step={0.1}
            value={[parameters.user_ev_bus_share]}
            onValueChange={([value]) => updateParameter("user_ev_bus_share", value)}
            className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary h-1"
          />
        </div>

        {/* eMobility - Passenger Cars */}
        <div className="space-y-2 p-3 rounded-md bg-secondary/50 border border-border/30">
          <div className="flex items-center justify-between">
            <Label htmlFor="user_ev_passenger_vehicle_share" className="text-xs font-semibold text-foreground">
              Car EV Share
            </Label>
            <span className="text-sm font-bold text-primary">
              {parameters.user_ev_passenger_vehicle_share.toFixed(0)}%
            </span>
          </div>
          <Slider
            id="user_ev_passenger_vehicle_share"
            min={0}
            max={100}
            step={0.1}
            value={[parameters.user_ev_passenger_vehicle_share]}
            onValueChange={([value]) => updateParameter("user_ev_passenger_vehicle_share", value)}
            className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary h-1"
          />
        </div>

        {/* eMobility - Motorcycles */}
        <div className="space-y-2 p-3 rounded-md bg-secondary/50 border border-border/30">
          <div className="flex items-center justify-between">
            <Label htmlFor="user_ev_motorcycle_vehicle_share" className="text-xs font-semibold text-foreground">
              Motorcycle EV
            </Label>
            <span className="text-sm font-bold text-primary">
              {parameters.user_ev_motorcycle_vehicle_share.toFixed(0)}%
            </span>
          </div>
          <Slider
            id="user_ev_motorcycle_vehicle_share"
            min={0}
            max={100}
            step={0.1}
            value={[parameters.user_ev_motorcycle_vehicle_share]}
            onValueChange={([value]) => updateParameter("user_ev_motorcycle_vehicle_share", value)}
            className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary h-1"
          />
        </div>
      </CardContent>
    </Card>
  )
}
