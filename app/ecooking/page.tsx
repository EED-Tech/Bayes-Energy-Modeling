"use client"

import { useGlobalState } from "@/lib/global-state"
import { calculateOutputs } from "@/lib/model-data"
import { DemographicCards } from "@/components/demographic-cards"
import { ControlSidebar } from "@/components/control-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"
import { scaleSymlog } from "d3-scale"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Cell } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { CountryMapCard } from "@/components/country-map-card"
import { CookingTaxesSection } from "@/components/cooking-taxes-section"
import { InfoTooltip } from "@/components/info-tooltip"

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

  const waterfallTicks = [
    200000000, 150000000, 100000000, 50000000, 0, -50000000, -100000000, -150000000, -200000000,
  ]

  const barColors = {
    user: "hsl(var(--chart-2))",
    policy: "hsl(var(--chart-3))",
    overall: "hsl(var(--chart-4))",
  }

  const waterfallData = [
    {
      id: "user-charcoal-tax",
      label: "Charcoal fuel tax revenue",
      scenarioLabel: "Your scenario",
      value: outputs.ecooking.user.charcoal_tax,
    },
    {
      id: "user-lpg-tax",
      label: "LPG sales taxes",
      scenarioLabel: "Your scenario",
      value: outputs.ecooking.user.lpg_tax,
    },
    {
      id: "user-electricity-tax",
      label: "Electricity sales taxes",
      scenarioLabel: "Your scenario",
      value: outputs.ecooking.user.electricity_tax,
    },
    {
      id: "user-forex",
      label: "Forex requirement",
      scenarioLabel: "Your scenario",
      value: -outputs.ecooking.user.forex,
    },
    {
      id: "policy-charcoal-tax",
      label: "Fossil, Charcoal fuel tax revenue",
      scenarioLabel: "Policy scenario",
      value: outputs.ecooking.policy.charcoal_tax,
    },
    {
      id: "policy-lpg-tax",
      label: "LPG sales taxes",
      scenarioLabel: "Policy scenario",
      value: outputs.ecooking.policy.lpg_tax,
    },
    {
      id: "policy-electricity-tax",
      label: "Electricity sales taxes",
      scenarioLabel: "Policy scenario",
      value: outputs.ecooking.policy.electricity_tax,
    },
    {
      id: "policy-forex",
      label: "Forex requirement",
      scenarioLabel: "Policy scenario",
      value: -outputs.ecooking.policy.forex,
    },
    {
      id: "forex-position",
      label: "Change in annual forex requirement",
      scenarioLabel: "Overall",
      value: outputs.ecooking.forex_position,
    },
    {
      id: "overall",
      label: "Overall",
      scenarioLabel: "Overall",
      value: outputs.ecooking.tax_position - outputs.ecooking.forex_position,
    },
  ]

  const legendItems = [
    { label: "Your scenario", color: barColors.user },
    { label: "Policy scenario", color: barColors.policy },
    { label: "Overall", color: barColors.overall },
  ]

  const symlogScale = scaleSymlog().constant(1000000)

  const tickLabelLookup = waterfallData.reduce<Record<string, { label: string; scenarioLabel: string }>>(
    (acc, item) => {
      acc[item.id] = { label: item.label, scenarioLabel: item.scenarioLabel }
      return acc
    },
    {},
  )

  const getBarColor = (scenarioLabel: string) => {
    if (scenarioLabel === "Your scenario") return barColors.user
    if (scenarioLabel === "Policy scenario") return barColors.policy
    return barColors.overall
  }

  const DualLabelTick = ({ x = 0, y = 0, payload }: { x?: number; y?: number; payload?: any }) => {
    const key = payload?.value as string
    const item = (key && tickLabelLookup[key]) || {}
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={10} textAnchor="middle" fontSize={11} fill="hsl(var(--foreground))">
          {item.label}
        </text>
        <text
          x={0}
          y={0}
          dy={24}
          textAnchor="middle"
          fontSize={11}
          fill="hsl(var(--muted-foreground))"
        >
          {item.scenarioLabel}
        </text>
      </g>
    )
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
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-balance">eCooking Analysis</h1>
                <p className="text-muted-foreground text-pretty">
                  Detailed analysis of electric cooking adoption and impacts for {parameters.sel_country} in{" "}
                  {parameters.sel_year}
                </p>
              </div>
              <InfoTooltip
                title="eCooking page"
                description="Explore policy vs user eCooking scenarios, including fuels, emissions, and taxes. Sliders only affect “Your scenario”."
              />
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
            <p className="text-[11px] text-muted-foreground max-w-3xl">
              Data sources: Population (World Bank, harmonised/extrapolated), Household size (UNDESA + DHS/MICS per
              country). Total households refer to all households, which can exceed grid-connected customers.
            </p>

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

            <Card>
              <CardHeader className="pb-1 flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">Fiscal and Forex Waterfall</CardTitle>
                  <CardDescription className="text-xs">
                    Clustered bar comparison (USD) across scenarios and aggregates
                  </CardDescription>
                </div>
                <InfoTooltip
                  title="Fiscal waterfall"
                  description="Grouped waterfall-style comparison of taxes and forex costs. Forex values are plotted as negatives to show outflows, with symmetric USD axis for gains vs costs."
                />
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground">
                  {legendItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
                <ChartContainer
                  config={{
                    user: { label: "Your scenario", color: barColors.user },
                    policy: { label: "Policy scenario", color: barColors.policy },
                    overall: { label: "Overall impacts", color: barColors.overall },
                  }}
                  className="h-[420px]"
                >
                  <BarChart data={waterfallData} barCategoryGap={18} barGap={6}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="id" interval={0} height={76} tick={<DualLabelTick />} />
                    <YAxis
                      scale={symlogScale}
                      ticks={waterfallTicks}
                      domain={[Math.min(...waterfallTicks), Math.max(...waterfallTicks)]}
                      stroke="hsl(var(--foreground))"
                      fontSize={11}
                      tickFormatter={(value) => `$${formatNumber((value as number) / 1000000, 0)}M`}
                      label={{ value: "USD (millions)", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                        color: "hsl(var(--foreground))",
                      }}
                      formatter={(value: number, _name, item) => {
                        return [`$${formatNumber(value / 1000000, 2)}M`, item?.payload?.scenarioLabel || ""]
                      }}
                      labelFormatter={(_value, payload) => {
                        const item = payload?.[0]?.payload
                        return item ? `${item.label} — ${item.scenarioLabel}` : "Value"
                      }}
                    />
                    <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeWidth={1} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {waterfallData.map((item) => (
                        <Cell key={item.id} fill={getBarColor(item.scenarioLabel)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
