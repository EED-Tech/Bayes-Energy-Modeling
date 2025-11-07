"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"

interface CostChartProps {
  data: Array<{
    year: number
    eCooking: { cost: number }
    eMobility: { cost: number }
  }>
}

export function CostChart({ data }: CostChartProps) {
  const chartData = data.map((d) => ({
    year: d.year.toString(),
    eCooking: d.eCooking.cost,
    eMobility: d.eMobility.cost,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Investment Costs</CardTitle>
        <CardDescription>Projected costs in millions USD</CardDescription>
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
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="year" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="eCooking" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="eMobility" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
