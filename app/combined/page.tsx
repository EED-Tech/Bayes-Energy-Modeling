"use client"

import { useGlobalState } from "@/lib/global-state"
import { calculateOutputs } from "@/lib/model-data"
import { DemographicCards } from "@/components/demographic-cards"
import { ControlSidebar } from "@/components/control-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"
import { ArrowDownLeft, ArrowUpRight, DollarSign } from "lucide-react"
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
import { InfoTooltip } from "@/components/info-tooltip"

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

  const bauCombined = outputs.bau_combined ?? outputs.combined.policy

  const economicData = [
    {
      scenario: "BAU (baseline)",
      electricityTax: bauCombined.electricity_tax / 1000000,
      fossilTax: bauCombined.fossil_tax / 1000000,
      forex: bauCombined.forex / 1000000,
    },
    {
      scenario: "Your scenario (slider)",
      electricityTax: outputs.combined.user.electricity_tax / 1000000,
      fossilTax: outputs.combined.user.fossil_tax / 1000000,
      forex: outputs.combined.user.forex / 1000000,
    },
  ]

  const bauEcookElectricity = outputs.bau?.ecooking?.electricity_gwh ?? outputs.ecooking.policy.electricity_gwh

  const energyBreakdown = [
    {
      category: "eCooking",
      bau: bauEcookElectricity,
      user: outputs.ecooking.user.electricity_gwh,
    },
    {
      category: "eMobility",
      bau: outputs.emobility.policy.electricity_gwh,
      user: outputs.emobility.user.electricity_gwh,
    },
  ]

  const emissionsData = [
    {
      scenario: "BAU (baseline)",
      emissions: bauCombined.emissions ?? 0,
    },
    {
      scenario: "Your scenario (slider)",
      emissions: outputs.combined.user.emissions ?? 0,
    },
  ]

  const chartColors = {
    teal: "hsl(174, 63%, 50%)",
    grey: "hsl(220, 13%, 50%)",
    blue: "hsl(217, 91%, 60%)",
  }

  const revenueCards = [
    {
      title: "Electricity Tax Revenue",
      value: `$${formatNumber(outputs.combined.user.electricity_tax / 1000000, 2)}M`,
      icon: DollarSign,
      change: outputs.combined.user.electricity_tax - bauCombined.electricity_tax,
      changePercent:
        bauCombined.electricity_tax > 0
          ? ((outputs.combined.user.electricity_tax - bauCombined.electricity_tax) / bauCombined.electricity_tax) * 100
          : 0,
      policy: `$${formatNumber(bauCombined.electricity_tax / 1000000, 2)}M`,
      cardClass: "bg-gradient-to-br from-chart-2/10 via-chart-2/5 to-background border-chart-2/30",
      iconClass: "text-chart-2",
    },
    {
      title: "Fossil Fuel Tax Revenue",
      value: `$${formatNumber(outputs.combined.user.fossil_tax / 1000000, 2)}M`,
      icon: DollarSign,
      change: outputs.combined.user.fossil_tax - bauCombined.fossil_tax,
      changePercent:
        bauCombined.fossil_tax > 0
          ? ((outputs.combined.user.fossil_tax - bauCombined.fossil_tax) / bauCombined.fossil_tax) * 100
          : 0,
      policy: `$${formatNumber(bauCombined.fossil_tax / 1000000, 2)}M`,
      cardClass: "bg-gradient-to-br from-chart-3/10 via-chart-3/5 to-background border-chart-3/30",
      iconClass: "text-chart-3",
    },
  ]

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
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-balance text-foreground">Combined Analysis</h1>
                <p className="text-sm text-muted-foreground text-pretty">
                  Integrated view of eCooking and eMobility impacts for {parameters.sel_country} in {parameters.sel_year}
                </p>
              </div>
              <InfoTooltip
                title="Combined page"
                description="View eCooking and eMobility together to understand total electricity, emissions, and fiscal positions. Sliders only affect “Your scenario”."
              />
            </div>

            <DemographicCards
              population={outputs.countryPopulation}
              households={outputs.countryHouseholds}
              motorVehiclesOwned={outputs.motorVehiclesOwned}
              country={parameters.sel_country}
              year={parameters.sel_year}
            />

            <div className="grid gap-2 md:grid-cols-2">
              {revenueCards.map((metric) => {
                const Icon = metric.icon
                const isPositive = metric.changePercent > 0
                const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownLeft

                return (
                  <Card key={metric.title} className={`hover:shadow-lg transition-all ${metric.cardClass} border`}>
                    <CardHeader className="flex flex-row items-start justify-between pb-1 space-y-0">
                      <div className="space-y-0.5 flex-1">
                        <CardTitle className="text-xs font-medium text-muted-foreground">{metric.title}</CardTitle>
                        <div className="text-base font-bold">{metric.value}</div>
                      </div>
                      <Icon className={`h-4 w-4 ${metric.iconClass} opacity-60`} />
                    </CardHeader>
                    <CardContent className="space-y-0.5 pt-0">
                      <div className="flex items-center gap-1 invisible">
                        <ChangeIcon className="h-3 w-3" />
                        <span className="text-xs font-semibold"> </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-2">
              <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 space-y-1">
                  <CardDescription className="text-xs">Total Forex Exposure</CardDescription>
                  <CardTitle className="text-lg">${formatNumber(outputs.combined.user.forex / 1000000, 2)}M</CardTitle>
                </CardHeader>
                
              </Card>

              <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 space-y-1">
                  <CardDescription className="text-xs">Total CO2 Emissions</CardDescription>
                  <CardTitle className="text-lg">{formatNumber(outputs.combined.user.emissions, 2)} MtCO2</CardTitle>
                </CardHeader>
                
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              <Card className="bg-white border border-border/60 shadow-sm h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">Electricity Demand Breakdown</CardTitle>
                  <CardDescription className="text-xs">eCooking vs eMobility (GWh)</CardDescription>
                </CardHeader>
                <CardContent className="p-4 grow min-h-[240px] sm:min-h-[300px] lg:min-h-[360px]">
                  <ChartContainer
                    config={{
                      bau: { label: "BAU Scenario", color: chartColors.grey },
                      user: { label: "Your Scenario", color: chartColors.teal },
                    }}
                    className="h-full w-full"
                  >
                    <BarChart data={energyBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="category" stroke="hsl(var(--foreground))" fontSize={11} />
                      <YAxis
                        stroke="hsl(var(--foreground))"
                        fontSize={11}
                        label={{ value: "Electricity (GWh)", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                          color: "hsl(var(--foreground))",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="bau" fill={chartColors.grey} />
                      <Bar dataKey="user" fill={chartColors.teal} />
                    </BarChart>
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
