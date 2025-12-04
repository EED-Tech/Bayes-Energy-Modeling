"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"

interface EnergyChartProps {
  data: Array<{
    year: number
    eCooking: { energy: number }
    eMobility: { energy: number }
    total: { energy: number }
  }>
}

export function EnergyChart({ data }: EnergyChartProps) {
  const chartData = data.map((d) => ({
    year: d.year.toString(),
    eCooking: d.eCooking.energy,
    eMobility: d.eMobility.energy,
    total: d.total.energy,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Energy Demand</CardTitle>
        <CardDescription>Projected energy consumption in GWh</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            eCooking: {
              label: "eCooking",
              color: "hsl(var(--chart-1))",
            },
            eMobility: {
              label: "eMobility",
              color: "hsl(var(--chart-2))",
            },
            total: {
              label: "Total",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="year" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                label={{ value: "Energy (GWh)", angle: -90, position: "insideLeft" }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="eCooking" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="eMobility" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="total" stroke="hsl(var(--chart-5))" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
