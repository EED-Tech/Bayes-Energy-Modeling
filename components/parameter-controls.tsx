"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import type { ModelParameters } from "@/lib/model-data"

interface ParameterControlsProps {
  parameters: ModelParameters
  onParametersChange: (params: ModelParameters) => void
  showECooking?: boolean
  showEMobility?: boolean
}

export function ParameterControls({
  parameters,
  onParametersChange,
  showECooking = true,
  showEMobility = true,
}: ParameterControlsProps) {
  const updateParameter = (key: keyof ModelParameters, value: number | string) => {
    onParametersChange({ ...parameters, [key]: value })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className={!showECooking && !showEMobility ? "md:col-span-2" : ""}>
        <CardHeader>
          <CardTitle className="text-lg">Analysis Year (sel_year)</CardTitle>
          <CardDescription>Select year for detailed analysis: 2000-2049</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="sel_year">Year</Label>
              <span className="text-sm font-medium text-foreground">{parameters.sel_year}</span>
            </div>
            <Slider
              id="sel_year"
              min={2000}
              max={2049}
              step={1}
              value={[parameters.sel_year]}
              onValueChange={([value]) => updateParameter("sel_year", value)}
            />
          </div>
        </CardContent>
      </Card>

      {showECooking && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">eCooking Adoption (user_ecook)</CardTitle>
            <CardDescription>Household adoption rate for electric cooking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="user_ecook">Adoption Rate</Label>
                <span className="text-sm font-medium text-foreground">{parameters.user_ecook.toFixed(1)}%</span>
              </div>
              <Slider
                id="user_ecook"
                min={0}
                max={100}
                step={0.1}
                value={[parameters.user_ecook]}
                onValueChange={([value]) => updateParameter("user_ecook", value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {showEMobility && (
        <Card className={showECooking ? "md:col-span-2" : ""}>
          <CardHeader>
            <CardTitle className="text-lg">eMobility Adoption</CardTitle>
            <CardDescription>Electric vehicle share by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="user_ev_bus_share">Bus EV Share (user_ev_bus_share)</Label>
                <span className="text-sm font-medium text-foreground">{parameters.user_ev_bus_share.toFixed(1)}%</span>
              </div>
              <Slider
                id="user_ev_bus_share"
                min={0}
                max={100}
                step={0.1}
                value={[parameters.user_ev_bus_share]}
                onValueChange={([value]) => updateParameter("user_ev_bus_share", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="user_ev_passenger_vehicle_share">
                  Passenger Car EV Share (user_ev_passenger_vehicle_share)
                </Label>
                <span className="text-sm font-medium text-foreground">
                  {parameters.user_ev_passenger_vehicle_share.toFixed(1)}%
                </span>
              </div>
              <Slider
                id="user_ev_passenger_vehicle_share"
                min={0}
                max={100}
                step={0.1}
                value={[parameters.user_ev_passenger_vehicle_share]}
                onValueChange={([value]) => updateParameter("user_ev_passenger_vehicle_share", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="user_ev_motorcycle_vehicle_share">
                  Motorcycle EV Share (user_ev_motorcycle_vehicle_share)
                </Label>
                <span className="text-sm font-medium text-foreground">
                  {parameters.user_ev_motorcycle_vehicle_share.toFixed(1)}%
                </span>
              </div>
              <Slider
                id="user_ev_motorcycle_vehicle_share"
                min={0}
                max={100}
                step={0.1}
                value={[parameters.user_ev_motorcycle_vehicle_share]}
                onValueChange={([value]) => updateParameter("user_ev_motorcycle_vehicle_share", value)}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
