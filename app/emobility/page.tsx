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
  Bar,
  BarChart,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { CountryMapCard } from "@/components/country-map-card"

export default function EMobilityPage() {
  const { parameters } = useGlobalState()

  const outputs = calculateOutputs(parameters)

  if (!outputs) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading data...</p>
      </div>
    )
  }

  const adoptionData = [
    {
      category: "Buses",
      policy: outputs.emobility.policy.ev_bus_share,
      user: outputs.emobility.user.ev_bus_share,
    },
    {
      category: "Passenger Cars",
      policy: outputs.emobility.policy.ev_passenger_share,
      user: outputs.emobility.user.ev_passenger_share,
    },
    {
      category: "Motorcycles",
      policy: outputs.emobility.policy.ev_motorcycle_share,
      user: outputs.emobility.user.ev_motorcycle_share,
    },
  ]

  const energyData = [
    {
      scenario: "Policy",
      electricity: outputs.emobility.policy.electricity_gwh,
      emissions: outputs.emobility.policy.emissions,
    },
    {
      scenario: "Your Scenario",
      electricity: outputs.emobility.user.electricity_gwh,
      emissions: outputs.emobility.user.emissions,
    },
  ]

  const chartColors = {
    policy: "hsl(220, 13%, 50%)",
    user: "hsl(174, 63%, 50%)",
    electricity: "hsl(174, 63%, 50%)",
    emissions: "hsl(217, 91%, 60%)",
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
              <h1 className="text-3xl font-bold tracking-tight text-balance text-foreground">eMobility Analysis</h1>
              <p className="text-sm text-muted-foreground text-pretty">
                Detailed analysis of electric vehicle adoption and impacts for {parameters.sel_country} in{" "}
                {parameters.sel_year}
              </p>
            </div>

            <DemographicCards
              population={outputs.countryPopulation}
              households={outputs.countryHouseholds}
              motorVehiclesOwned={outputs.motorVehiclesOwned}
              country={parameters.sel_country}
              year={parameters.sel_year}
            />

            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-6">
              <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-1 space-y-0.5">
                  <CardDescription className="text-xs">Fossil Fuel Tax Revenue</CardDescription>
                  <CardTitle className="text-lg">
                    ${formatNumber(outputs.emobility.user.fossil_tax / 1000000, 2)}M
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs">
                  <p className="text-muted-foreground">
                    Policy: ${formatNumber(outputs.emobility.policy.fossil_tax / 1000000, 2)}M
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-1 space-y-0.5">
                  <CardDescription className="text-xs">Electricity Tax Revenue</CardDescription>
                  <CardTitle className="text-lg">
                    ${formatNumber(outputs.emobility.user.electricity_tax / 1000000, 2)}M
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs">
                  <p className="text-muted-foreground">
                    Policy: ${formatNumber(outputs.emobility.policy.electricity_tax / 1000000, 2)}M
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-1 space-y-0.5">
                  <CardDescription className="text-xs">Forex Exposure</CardDescription>
                  <CardTitle className="text-lg">${formatNumber(outputs.emobility.user.forex / 1000000, 2)}M</CardTitle>
                </CardHeader>
                <CardContent className="text-xs">
                  <p className="text-muted-foreground">
                    Policy: ${formatNumber(outputs.emobility.policy.forex / 1000000, 2)}M
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-1 space-y-0.5">
                  <CardDescription className="text-xs">CO2 Emissions</CardDescription>
                  <CardTitle className="text-lg">{formatNumber(outputs.emobility.user.emissions, 2)} MtCO2</CardTitle>
                </CardHeader>
                <CardContent className="text-xs">
                  <p className="text-muted-foreground">
                    Policy: {formatNumber(outputs.emobility.policy.emissions, 2)} MtCO2
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-1 space-y-0.5">
                  <CardDescription className="text-xs">Total Electricity Demand</CardDescription>
                  <CardTitle className="text-lg">
                    {formatNumber(outputs.emobility.user.electricity_gwh, 1)} GWh
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs">
                  <p className="text-muted-foreground">
                    Policy: {formatNumber(outputs.emobility.policy.electricity_gwh, 1)} GWh
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-1 space-y-0.5">
                  <CardDescription className="text-xs">Net Tax Position</CardDescription>
                  <CardTitle className="text-lg">
                    $
                    {formatNumber((outputs.emobility.user.electricity_tax - outputs.emobility.user.forex) / 1000000, 2)}
                    M
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs">
                  <p className="text-muted-foreground">
                    Policy: $
                    {formatNumber(
                      (outputs.emobility.policy.electricity_tax - outputs.emobility.policy.forex) / 1000000,
                      2,
                    )}
                    M
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-white border border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">EV Adoption by Vehicle Type</CardTitle>
                  <CardDescription className="text-xs">
                    Electric vehicle share (%) - Policy vs Your Scenario
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <ChartContainer
                    config={{
                      policy: { label: "Policy Scenario", color: chartColors.policy },
                      user: { label: "Your Scenario", color: chartColors.user },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={adoptionData}>
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
                        <Bar dataKey="policy" fill={chartColors.policy} />
                        <Bar dataKey="user" fill={chartColors.user} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="bg-white border border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Energy & Emissions Comparison</CardTitle>
                  <CardDescription className="text-xs">Electricity (GWh) and Emissions (MtCO2)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      electricity: { label: "Electricity (GWh)", color: chartColors.electricity },
                      emissions: { label: "Emissions (MtCO2)", color: chartColors.emissions },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={energyData}>
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
                        <Line type="monotone" dataKey="electricity" stroke={chartColors.electricity} strokeWidth={2} />
                        <Line type="monotone" dataKey="emissions" stroke={chartColors.emissions} strokeWidth={2} />
                      </LineChart>
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
