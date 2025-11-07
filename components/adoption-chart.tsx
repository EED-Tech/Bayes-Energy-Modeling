"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface AdoptionChartProps {
  data: Array<{
    year: number
    eCooking: { units: number }
    eMobility: { units: number }
  }>
}

export function AdoptionChart({ data }: AdoptionChartProps) {
  const chartData = data.map((d) => ({
    year: d.year.toString(),
    eCooking: d.eCooking.units,
    eMobility: d.eMobility.units,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adoption Trends</CardTitle>
        <CardDescription>Projected units over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            eCooking: {
              label: "eCooking Units",
              color: "hsl(var(--chart-1))",
            },
            eMobility: {
              label: "eMobility Units",
              color: "hsl(var(--chart-2))",
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
                stackId="1"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="eMobility"
                stackId="1"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
