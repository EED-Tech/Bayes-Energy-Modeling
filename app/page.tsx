"use client"

import { useGlobalState } from "@/lib/global-state"
import { calculateOutputs } from "@/lib/model-data"
import { DemographicCards } from "@/components/demographic-cards"
import { ControlSidebar } from "@/components/control-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Zap, DollarSign, Globe, Leaf, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { formatNumber } from "@/lib/utils"
import { CountryMapCard } from "@/components/country-map-card"
import {
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"

export default function OverviewPage() {
  const { parameters } = useGlobalState()

  const outputs = calculateOutputs(parameters)

  if (!outputs) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading data...</p>
      </div>
    )
  }

  const pageColors = {
    teal: "hsl(174, 63%, 50%)",
    grey: "hsl(220, 13%, 50%)",
    blue: "hsl(217, 91%, 60%)",
  }

  const electricityDemandCards = [
    {
      title: "National Electricity Consumption",
      value: `${formatNumber(outputs.nationalElectricityConsumptionTwh, 1)} TWh`,
      icon: Zap,
      change: 0,
      changePercent: 0,
      policy: "BAU projection",
      cardClass: "bg-gradient-to-br from-chart-1/10 via-chart-1/5 to-background border-chart-1/30",
      iconClass: "text-chart-1",
    },
    {
      title: "eCooking Uptake (Policy)",
      value: `${formatNumber(outputs.ecooking.policy.uptake_ecook, 1)}%`,
      icon: Leaf,
      change: 0,
      changePercent: 0,
      policy: "Extrapolated policy",
      cardClass: "bg-gradient-to-br from-emerald-100/40 via-emerald-50 to-background border-emerald-300/40",
      iconClass: "text-emerald-600",
    },
    {
      title: "Electricity Per Capita",
      value: `${formatNumber(outputs.nationalElectricityPerCapitaKwh, 1)} kWh`,
      icon: TrendingUp,
      change: 0,
      changePercent: 0,
      policy: "Extrapolated projection",
      cardClass: "bg-gradient-to-br from-indigo-100/40 via-indigo-50 to-background border-indigo-300/40",
      iconClass: "text-indigo-600",
    },
  ]

  /*const secondaryCards = [
    {
      title: "Forex Exposure",
      value: `$${formatNumber(outputs.combined.user.forex / 1000000, 2)}M`,
      icon: Globe,
      change: outputs.combined.user.forex - outputs.combined.policy.forex,
      changePercent:
        outputs.combined.policy.forex > 0
          ? ((outputs.combined.user.forex - outputs.combined.policy.forex) / outputs.combined.policy.forex) * 100
          : 0,
      policy: `$${formatNumber(outputs.combined.policy.forex / 1000000, 2)}M`,
      cardClass: "bg-gradient-to-br from-chart-4/10 via-chart-4/5 to-background border-chart-4/30",
      iconClass: "text-chart-4",
    },
    {
      title: "Net Tax Position",
      value: `$${formatNumber(outputs.combined.tax_position / 1000000, 2)}M`,
      icon: TrendingUp,
      change: 0,
      changePercent: 0,
      policy: "Baseline",
      cardClass: `bg-gradient-to-br from-chart-5/10 via-chart-5/5 to-background border-chart-5/30 ${outputs.combined.tax_position > 0 ? "" : "opacity-75"}`,
      iconClass: outputs.combined.tax_position > 0 ? "text-chart-5" : "text-chart-3",
    },
    /*{
      title: "Total Emissions",
      value: `${formatNumber(outputs.combined.user.emissions, 3)} MtCO2e`,
      icon: Leaf,
      change: outputs.combined.user.emissions - outputs.combined.policy.emissions,
      changePercent:
        outputs.combined.policy.emissions > 0
          ? ((outputs.combined.user.emissions - outputs.combined.policy.emissions) /
              outputs.combined.policy.emissions) *
            100
          : 0,
      policy: `${formatNumber(outputs.combined.policy.emissions, 3)} MtCO2e`,
      cardClass: "bg-gradient-to-br from-accent/10 via-accent/5 to-background border-accent/30",
      iconClass: "text-accent",
    },
  ]*/

  const scatterData = [
    {
      x: outputs.ecooking.user.electricity_gwh,
      y: outputs.ecooking.user.emissions,
      category: "eCooking (User)",
      fill: pageColors.teal,
    },
    {
      x: outputs.emobility.user.electricity_gwh,
      y: outputs.emobility.user.emissions,
      category: "eMobility (User)",
      fill: pageColors.grey,
    },
    {
      x: outputs.ecooking.policy.electricity_gwh,
      y: outputs.ecooking.policy.emissions,
      category: "eCooking (Policy)",
      fill: pageColors.teal,
    },
    {
      x: outputs.emobility.policy.electricity_gwh,
      y: outputs.emobility.policy.emissions,
      category: "eMobility (Policy)",
      fill: pageColors.blue,
    },
  ]

  console.log("[v0] Scatter plot data:", scatterData)

  const energyMix = [
    {
      name: "eCooking Electricity",
      value: outputs.ecooking.user.electricity_gwh,
      fill: pageColors.teal,
    },
    {
      name: "eMobility Electricity",
      value: outputs.emobility.user.electricity_gwh,
      fill: pageColors.blue,
    },
  ]

  const taxPositionData = [
    {
      name: "Electricity Tax",
      policy: outputs.combined.policy.electricity_tax / 1000000,
      user: outputs.combined.user.electricity_tax / 1000000,
      difference: (outputs.combined.user.electricity_tax - outputs.combined.policy.electricity_tax) / 1000000,
    },
    {
      name: "Fossil Tax",
      policy: outputs.combined.policy.fossil_tax / 1000000,
      user: outputs.combined.user.fossil_tax / 1000000,
      difference: (outputs.combined.user.fossil_tax - outputs.combined.policy.fossil_tax) / 1000000,
    },
    {
      name: "Forex Exposure",
      policy: outputs.combined.policy.forex / 1000000,
      user: outputs.combined.user.forex / 1000000,
      difference: (outputs.combined.user.forex - outputs.combined.policy.forex) / 1000000,
    },
    {
      name: "Net Tax Position",
      policy: 0,
      user: outputs.combined.tax_position / 1000000,
      difference: outputs.combined.tax_position / 1000000,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="w-full">
        <div className="grid lg:grid-cols-[280px_1fr] gap-0">
          {/* Left Sidebar - Sticky */}
          <aside className="h-fit sticky top-0 pt-4 space-y-2 pl-4">
            <CountryMapCard country={parameters.sel_country} />
            <ControlSidebar />
          </aside>

          {/* Main Content */}
          <main className="space-y-4 px-8 py-6">
            <div className="space-y-1">
              <h1 className="tracking-tight text-balance font-semibold text-2xl">Energy Transition Overview</h1>
              <p className="text-sm text-muted-foreground text-pretty">
                Comprehensive analysis of eCooking and eMobility impacts for {parameters.sel_country} in{" "}
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

            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {...electricityDemandCards.map((metric) => {
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
                      {metric.change !== 0 && (
                        <div className="flex items-center gap-1">
                          <ChangeIcon className={`h-3 w-3 ${isPositive ? "text-chart-3" : "text-chart-1"}`} />
                          <span className="text-xs font-semibold">
                            {isPositive ? "+" : ""}
                            {formatNumber(metric.changePercent, 2)}%
                          </span>
                          <span className="text-xs text-muted-foreground">vs policy</span>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">Policy: {metric.policy}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Charts Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border shadow-sm bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Electricity Demand by Sector</CardTitle>
                  <CardDescription className="text-xs">GWh comparison</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <ChartContainer
                    config={{
                      eCooking: { label: "eCooking", color: pageColors.teal },
                      eMobility: { label: "eMobility", color: pageColors.blue },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          {
                            name: "Policy",
                            eCooking: outputs.ecooking.policy.electricity_gwh,
                            eMobility: outputs.emobility.policy.electricity_gwh,
                          },
                          {
                            name: "Your Scenario",
                            eCooking: outputs.ecooking.user.electricity_gwh,
                            eMobility: outputs.emobility.user.electricity_gwh,
                          },
                        ]}
                        margin={{ left: 40, right: 20, top: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                          formatter={(value: number) => formatNumber(value, 2)}
                        />
                        <Legend />
                        <Bar dataKey="eCooking" fill={pageColors.teal} radius={[4, 4, 0, 0]} />
                        <Bar dataKey="eMobility" fill={pageColors.blue} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              

              <Card className="border shadow-sm bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Energy Mix Distribution</CardTitle>
                  <CardDescription className="text-xs">Total electricity demand by sector</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <ChartContainer config={{}} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={energyMix} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                          {energyMix.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                          formatter={(value: number) => formatNumber(value, 2)}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="border shadow-sm bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Tax Position Impact</CardTitle>
                  <CardDescription className="text-xs">Revenue and forex comparison</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <ChartContainer
                    config={{
                      policy: { label: "Policy Baseline", color: pageColors.grey },
                      user: { label: "Your Scenario", color: pageColors.teal },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={taxPositionData} margin={{ left: 40, right: 20, top: 20, bottom: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="name"
                          stroke="hsl(var(--foreground))"
                          fontSize={11}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis
                          stroke="hsl(var(--foreground))"
                          fontSize={12}
                          label={{ value: "Million $", angle: -90, position: "insideLeft" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                          formatter={(value: number) => `$${formatNumber(value, 2)}M`}
                          labelFormatter={(label) => `${label}`}
                        />
                        <Legend />
                        <Bar dataKey="policy" fill={pageColors.grey} radius={[4, 4, 0, 0]} />
                        <Bar dataKey="user" fill={pageColors.teal} radius={[4, 4, 0, 0]} />
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
