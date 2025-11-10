"use client"

import { useGlobalState } from "@/lib/global-state"
import { calculateOutputs } from "@/lib/model-data"
import { DemographicCards } from "@/components/demographic-cards"
import { ControlSidebar } from "@/components/control-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Area,
  AreaChart,
  Bar,
  BarChart,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { CountryMapCard } from "@/components/country-map-card"

export default function CombinedPage() {
  const { parameters } = useGlobalState()

  const outputs = calculateOutputs(parameters)

  if (!outputs) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading data...</p>
      </div>
    )
  }

  const economicData = [
    {
      scenario: "Policy",
      electricityTax: outputs.combined.policy.electricity_tax / 1000000,
      fossilTax: outputs.combined.policy.fossil_tax / 1000000,
      forex: outputs.combined.policy.forex / 1000000,
    },
    {
      scenario: "Your Scenario",
      electricityTax: outputs.combined.user.electricity_tax / 1000000,
      fossilTax: outputs.combined.user.fossil_tax / 1000000,
      forex: outputs.combined.user.forex / 1000000,
    },
  ]

  const energyBreakdown = [
    {
      category: "eCooking",
      policy: outputs.ecooking.policy.electricity_gwh,
      user: outputs.ecooking.user.electricity_gwh,
    },
    {
      category: "eMobility",
      policy: outputs.emobility.policy.electricity_gwh,
      user: outputs.emobility.user.electricity_gwh,
    },
  ]

  const emissionsData = [
    {
      scenario: "Policy",
      emissions: outputs.combined.policy.emissions ?? 0,
    },
    {
      scenario: "Your Scenario",
      emissions: outputs.combined.user.emissions ?? 0,
    },
  ]

  const chartColors = {
    teal: "hsl(174, 63%, 50%)",
    grey: "hsl(220, 13%, 50%)",
    blue: "hsl(217, 91%, 60%)",
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
              <h1 className="text-3xl font-bold tracking-tight text-balance text-foreground">Combined Analysis</h1>
              <p className="text-sm text-muted-foreground text-pretty">
                Integrated view of eCooking and eMobility impacts for {parameters.sel_country} in {parameters.sel_year}
              </p>
            </div>

            <DemographicCards
              population={outputs.countryPopulation}
              households={outputs.countryHouseholds}
              motorVehiclesOwned={outputs.motorVehiclesOwned}
              country={parameters.sel_country}
              year={parameters.sel_year}
            />

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 space-y-1">
                  <CardDescription className="text-xs">Total Fossil Fuel Tax</CardDescription>
                  <CardTitle className="text-lg">
                    ${formatNumber(outputs.combined.user.fossil_tax / 1000000, 2)}M
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Policy: ${formatNumber(outputs.combined.policy.fossil_tax / 1000000, 2)}M
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 space-y-1">
                  <CardDescription className="text-xs">Total Electricity Tax</CardDescription>
                  <CardTitle className="text-lg">
                    ${formatNumber(outputs.combined.user.electricity_tax / 1000000, 2)}M
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Policy: ${formatNumber(outputs.combined.policy.electricity_tax / 1000000, 2)}M
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 space-y-1">
                  <CardDescription className="text-xs">Total Forex Exposure</CardDescription>
                  <CardTitle className="text-lg">${formatNumber(outputs.combined.user.forex / 1000000, 2)}M</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Policy: ${formatNumber(outputs.combined.policy.forex / 1000000, 2)}M
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 space-y-1">
                  <CardDescription className="text-xs">Total CO2 Emissions</CardDescription>
                  <CardTitle className="text-lg">{formatNumber(outputs.combined.user.emissions, 2)} MtCO2</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Policy: {formatNumber(outputs.combined.policy.emissions, 2)} MtCO2
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-white border border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Electricity Demand Breakdown</CardTitle>
                  <CardDescription className="text-xs">eCooking vs eMobility (GWh)</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <ChartContainer
                    config={{
                      policy: { label: "Policy Scenario", color: chartColors.grey },
                      user: { label: "Your Scenario", color: chartColors.teal },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={energyBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="category" stroke="hsl(var(--foreground))" fontSize={11} />
                        <YAxis stroke="hsl(var(--foreground))" fontSize={11} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                            color: "hsl(var(--foreground))",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="policy" fill={chartColors.grey} />
                        <Bar dataKey="user" fill={chartColors.teal} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="bg-white border border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Total Emissions Comparison</CardTitle>
                  <CardDescription className="text-xs">Combined CO2 emissions (MtCO2)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      emissions: { label: "Emissions (MtCO2)", color: chartColors.blue },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={emissionsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="scenario" stroke="hsl(var(--foreground))" fontSize={11} />
                        <YAxis stroke="hsl(var(--foreground))" fontSize={11} />
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
                          stroke={chartColors.blue}
                          fill={chartColors.blue}
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 bg-white border border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Economic Impact Comparison</CardTitle>
                  <CardDescription className="text-xs">Tax revenues and forex exposure (USD millions)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      electricityTax: { label: "Electricity Tax", color: chartColors.teal },
                      fossilTax: { label: "Fossil Fuel Tax", color: chartColors.grey },
                      forex: { label: "Forex Exposure", color: chartColors.blue },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={economicData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="scenario" stroke="hsl(var(--foreground))" fontSize={11} />
                        <YAxis stroke="hsl(var(--foreground))" fontSize={11} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                            color: "hsl(var(--foreground))",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="electricityTax" fill={chartColors.teal} />
                        <Bar dataKey="fossilTax" fill={chartColors.grey} />
                        <Bar dataKey="forex" fill={chartColors.blue} />
                      </BarChart>
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
