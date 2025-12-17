"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface EmissionsChartProps {
  data: Array<{
    year: number
    eCooking: { emissions: number }
    eMobility: { emissions: number }
  }>
}

export function EmissionsChart({ data }: EmissionsChartProps) {
  const chartData = data.map((d) => ({
    year: d.year.toString(),
    eCooking: d.eCooking.emissions,
    eMobility: d.eMobility.emissions,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carbon Emissions</CardTitle>
        <CardDescription>Projected emissions in tons CO₂</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            eCooking: {
              label: "eCooking",
              color: "hsl(var(--chart-3))",
            },
            eMobility: {
              label: "eMobility",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="year" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="eCooking"
                stroke="hsl(var(--chart-3))"
                fill="hsl(var(--chart-3))"
                fillOpacity={0.4}
              />
              <Area
                type="monotone"
                dataKey="eMobility"
                stroke="hsl(var(--chart-4))"
                fill="hsl(var(--chart-4))"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
