"use client"

import { useGlobalState } from "@/lib/global-state"
import { calculateOutputs } from "@/lib/model-data"
import { DemographicCards } from "@/components/demographic-cards"
import { ControlSidebar } from "@/components/control-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Area,
  AreaChart,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { CountryMapCard } from "@/components/country-map-card"
import { CookingTaxesSection } from "@/components/cooking-taxes-section"

export default function ECookingPage() {
  const { parameters } = useGlobalState()

  const outputs = calculateOutputs(parameters)

  if (!outputs) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading data...</p>
      </div>
    )
  }

  const chartData = [
    {
      scenario: "Policy",
      electricity: outputs.ecooking.policy.electricity_gwh,
      lpg: outputs.ecooking.policy.lpg_tonnes,
      charcoal: outputs.ecooking.policy.charcoal_tonnes,
      emissions: outputs.ecooking.policy.emissions,
    },
    {
      scenario: "Your Scenario",
      electricity: outputs.ecooking.user.electricity_gwh,
      lpg: outputs.ecooking.user.lpg_tonnes,
      charcoal: outputs.ecooking.user.charcoal_tonnes,
      emissions: outputs.ecooking.user.emissions,
    },
  ]

  const lineColors = {
    electricity: "hsl(174, 63%, 50%)",
    lpg: "hsl(220, 13%, 50%)",
    charcoal: "hsl(217, 91%, 60%)",
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-0 py-0">
        <div className="grid lg:grid-cols-[280px_1fr] gap-0">
          {/* Left Sidebar with Controls */}
          <aside className="space-y-2 h-fit sticky top-0 pl-4 pt-4">
            <CountryMapCard country={parameters.sel_country} />
            <ControlSidebar />
          </aside>

          {/* Main Content */}
          <main className="space-y-4 px-8 py-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-balance">eCooking Analysis</h1>
              <p className="text-muted-foreground text-pretty">
                Detailed analysis of electric cooking adoption and impacts for {parameters.sel_country} in{" "}
                {parameters.sel_year}
              </p>
            </div>

            <DemographicCards
              population={outputs.countryPopulation}
              households={outputs.countryHouseholds}
              motorVehiclesOwned={outputs.motorVehiclesOwned}
              annualDishes={outputs.annualDishes}
              showAnnualDishes
              country={parameters.sel_country}
              year={parameters.sel_year}
            />

            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-6">
              <Card className="bg-gradient-to-br from-chart-1/5 to-background border-chart-1/20">
                <CardHeader className="pb-1">
                  <CardDescription className="text-xs">Electricity Tax Revenue</CardDescription>
                  <CardTitle className="text-xl">
                    ${formatNumber(outputs.ecooking.user.electricity_tax / 1000000, 2)}M
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs">
                  <p className="text-muted-foreground">
                    Policy: ${formatNumber(outputs.ecooking.policy.electricity_tax / 1000000, 2)}M
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-chart-2/5 to-background border-chart-2/20">
                <CardHeader className="pb-1">
                  <CardDescription className="text-xs">Fossil/Charcoal Tax (Policy)</CardDescription>
                  <CardTitle className="text-xl">
                    ${formatNumber(outputs.ecooking.policy.fossil_charcoal_tax / 1000000, 2)}M
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  Derived from the extrapolated policy trajectory
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-chart-3/5 to-background border-chart-3/20">
                <CardHeader className="pb-1">
                  <CardDescription className="text-xs">Forex Exposure (Policy)</CardDescription>
                  <CardTitle className="text-xl">${formatNumber(outputs.ecooking.policy.forex / 1000000, 2)}M</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  Policy scenario reference only
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-chart-4/5 to-background border-chart-4/20">
                <CardHeader className="pb-1">
                  <CardDescription className="text-xs">CO2 Emissions</CardDescription>
                  <CardTitle className="text-xl">{formatNumber(outputs.ecooking.user.emissions, 2)} MtCO2</CardTitle>
                </CardHeader>
                <CardContent className="text-xs">
                  <p className="text-muted-foreground">
                    Policy: {formatNumber(outputs.ecooking.policy.emissions, 2)} MtCO2
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-chart-1/5 to-background border-chart-1/20">
                <CardHeader className="pb-1">
                  <CardDescription className="text-xs">Total Electricity Demand</CardDescription>
                  <CardTitle className="text-xl">
                    {formatNumber(outputs.ecooking.user.electricity_gwh, 1)} GWh
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs">
                  <p className="text-muted-foreground">
                    Policy: {formatNumber(outputs.ecooking.policy.electricity_gwh, 1)} GWh
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-chart-2/5 to-background border-chart-2/20">
                <CardHeader className="pb-1">
                  <CardDescription className="text-xs">Net Tax Position</CardDescription>
                  <CardTitle className="text-xl">
                    ${formatNumber((outputs.ecooking.user.electricity_tax - outputs.ecooking.user.forex) / 1000000, 2)}M
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs">
                  <p className="text-muted-foreground">
                    Policy: $
                    {formatNumber(
                      (outputs.ecooking.policy.electricity_tax - outputs.ecooking.policy.forex) / 1000000,
                      2,
                    )}
                    M
                  </p>
                </CardContent>
              </Card>
            </div>

            <CookingTaxesSection country={parameters.sel_country} />

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader className="pb-1">
                  <CardTitle className="text-base">Energy Consumption Comparison</CardTitle>
                  <CardDescription className="text-xs">Policy vs Your Scenario</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <ChartContainer
                    config={{
                      electricity: { label: "Electricity (GWh)", color: lineColors.electricity },
                      lpg: { label: "LPG (tonnes)", color: lineColors.lpg },
                      charcoal: { label: "Charcoal (tonnes)", color: lineColors.charcoal },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="scenario" stroke="hsl(var(--foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                            color: "hsl(var(--foreground))",
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="electricity" stroke={lineColors.electricity} strokeWidth={2} />
                        <Line type="monotone" dataKey="lpg" stroke={lineColors.lpg} strokeWidth={2} />
                        <Line type="monotone" dataKey="charcoal" stroke={lineColors.charcoal} strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-1">
                  <CardTitle className="text-base">Emissions Comparison</CardTitle>
                  <CardDescription className="text-xs">Total CO2 emissions (MtCO2)</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <ChartContainer
                    config={{
                      emissions: { label: "Emissions (MtCO2)", color: lineColors.charcoal },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="scenario" stroke="hsl(var(--foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                            color: "hsl(var(--foreground))",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="emissions"
                          stroke={lineColors.charcoal}
                          fill={lineColors.charcoal}
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
