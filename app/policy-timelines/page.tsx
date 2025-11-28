"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import {
  charcoalUseData,
  biomassUseData,
  woodFuelUseData,
  cleanStackData,
  electricUseData,
} from "@/lib/policy-timelines-data"

export default function PolicyTimelinesPage() {
  // Prepare data for all countries - clean cooking access
  const cleanCookingTimeline = [
    {
      year: 2018,
      Uganda: 0,
      Ethiopia: 5,
      Kenya: 10,
      Malawi: 2,
      Tanzania: 3,
    },
    {
      year: 2021,
      Uganda: 15,
      Ethiopia: 5,
      Kenya: 10,
      Malawi: 2,
      Tanzania: 6.9,
    },
    {
      year: 2022,
      Uganda: 15,
      Ethiopia: 5,
      Kenya: 10,
      Malawi: 2,
      Tanzania: 6.9,
    },
    {
      year: 2027,
      Uganda: 15,
      Ethiopia: 5,
      Kenya: 10,
      Malawi: 50,
      Tanzania: 6.9,
    },
    {
      year: 2030,
      Uganda: 65,
      Ethiopia: 76,
      Kenya: 100,
      Malawi: 100,
      Tanzania: 75,
    },
    {
      year: 2034,
      Uganda: 65,
      Ethiopia: 76,
      Kenya: 100,
      Malawi: 100,
      Tanzania: 80,
    },
  ]

  // Prepare electricity access timeline
  const electricityTimeline = [
    { year: 2018, Uganda: 32.4, Ethiopia: 44.3, Kenya: 55.8, Malawi: 12.7, Tanzania: 32.1 },
    { year: 2023, Uganda: 51.2, Ethiopia: 55.4, Kenya: 76.2, Malawi: 15.6, Tanzania: 48.3 },
    { year: 2030, Uganda: 100, Ethiopia: 100, Kenya: 100, Malawi: 100, Tanzania: 75 },
  ]

  // Prepare eCooking adoption timeline
  const eCookingTimeline = [
    { year: 2018, Uganda: 0, Ethiopia: 4, Kenya: 0, Malawi: 2, Tanzania: 0 },
    { year: 2022, Uganda: 0, Ethiopia: 4, Kenya: 0.58, Malawi: 2, Tanzania: 0 },
    { year: 2028, Uganda: 0, Ethiopia: 4, Kenya: 10, Malawi: 2, Tanzania: 0 },
    { year: 2030, Uganda: 0, Ethiopia: 15, Kenya: 10, Malawi: 5, Tanzania: 0 },
    { year: 2034, Uganda: 0, Ethiopia: 15, Kenya: 10, Malawi: 5, Tanzania: 20 },
  ]

  // Historical fuel transition data already structured for all countries
  const charcoalData = charcoalUseData
  const biomassData = biomassUseData
  const woodFuelData = woodFuelUseData
  const cleanStackData_all = cleanStackData
  const electricUse = electricUseData

  const colors = {
    Uganda: "#9D4EDD", // Purple
    Ethiopia: "#3B82F6", // Blue
    Kenya: "#9CA3AF", // Grey
    Malawi: "#EF4444", // Red
    Tanzania: "#22C55E", // Green
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full pl-6 pr-6 py-4">
        <div className="space-y-3">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Cooking Policy Timelines</h1>
            <p className="text-sm text-muted-foreground">Regional comparison of cooking and energy policy targets</p>
          </div>

          <div className="grid gap-2 grid-cols-1 lg:grid-cols-3">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-1">
                <CardTitle className="text-base">Clean Cooking Access - All Countries</CardTitle>
                <CardDescription className="text-xs">Historical and policy targets through 2034</CardDescription>
              </CardHeader>
              <CardContent className="p-2">
                <ChartContainer config={{}} className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cleanCookingTimeline} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="year" stroke="hsl(var(--foreground))" fontSize={10} />
                      <YAxis
                        stroke="hsl(var(--foreground))"
                        fontSize={10}
                        domain={[0, 100]}
                        label={{ value: "Access (%)", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      {Object.keys(colors).map((country: string) => (
                        <Line
                          key={country}
                          type="monotone"
                          dataKey={country}
                          stroke={colors[country as keyof typeof colors]}
                          strokeWidth={2}
                          dot={false}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-1">
                <CardTitle className="text-base">Electricity Access - All Countries</CardTitle>
                <CardDescription className="text-xs">Path to universal access by 2030</CardDescription>
              </CardHeader>
              <CardContent className="p-2">
                <ChartContainer config={{}} className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={electricityTimeline} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="year" stroke="hsl(var(--foreground))" fontSize={10} />
                      <YAxis
                        stroke="hsl(var(--foreground))"
                        fontSize={10}
                        domain={[0, 100]}
                        label={{ value: "Access (%)", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      {Object.keys(colors).map((country: string) => (
                        <Area
                          key={country}
                          type="monotone"
                          dataKey={country}
                          stroke={colors[country as keyof typeof colors]}
                          fill={colors[country as keyof typeof colors]}
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                      ))}
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-1">
                <CardTitle className="text-base">eCooking Adoption - Policy Targets</CardTitle>
                <CardDescription className="text-xs">Projected uptake percentage by country</CardDescription>
              </CardHeader>
              <CardContent className="p-2">
                <ChartContainer config={{}} className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={eCookingTimeline} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="year" stroke="hsl(var(--foreground))" fontSize={10} />
                      <YAxis
                        stroke="hsl(var(--foreground))"
                        fontSize={10}
                        label={{ value: "Uptake (%)", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      {Object.keys(colors).map((country: string) => (
                        <Bar
                          key={country}
                          dataKey={country}
                          fill={colors[country as keyof typeof colors]}
                          radius={[4, 4, 0, 0]}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-base">Cooking Fuel Transitions - Historical Trends</CardTitle>
            <CardDescription className="text-xs">
              Fuel use patterns 2000-2018 across all countries (eCooking shown explicitly)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <div className="grid gap-2 grid-cols-1 lg:grid-cols-5">
              {[
                { title: "Charcoal Use", data: charcoalData },
                { title: "Biomass Use", data: biomassData },
                { title: "Wood Fuel Use", data: woodFuelData },
                { title: "Clean Stack", data: cleanStackData_all },
                { title: "eCooking Uptake (historical)", data: electricUse },
              ].map((item) => (
                <div key={item.title} className="space-y-1">
                  <h3 className="text-xs font-medium text-center">{item.title}</h3>
                  <ChartContainer config={{}} className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={item.data} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="year" stroke="hsl(var(--foreground))" fontSize={9} />
                          <YAxis
                            stroke="hsl(var(--foreground))"
                            fontSize={9}
                            label={{ value: "Share (%)", angle: -90, position: "insideLeft" }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                            }}
                          />
                          <Legend wrapperStyle={{ fontSize: "9px" }} />
                          {Object.keys(colors).map((country: string) => (
                            <Area
                              key={country}
                              type="monotone"
                              dataKey={country}
                              stroke={colors[country as keyof typeof colors]}
                              fill={colors[country as keyof typeof colors]}
                              fillOpacity={0.4}
                              strokeWidth={1.5}
                            />
                          ))}
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
