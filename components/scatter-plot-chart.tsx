"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface ScatterPlotChartProps {
  title: string
  description?: string
  data: Array<{
    x: number
    y: number
    category?: string
  }>
  xAxisLabel: string
  yAxisLabel: string
}

export function ScatterPlotChart({ title, description, data, xAxisLabel, yAxisLabel }: ScatterPlotChartProps) {
  const colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

  // Group data by category if present
  const groupedData: Record<string, typeof data> = {}
  data.forEach((point) => {
    const cat = point.category || "default"
    if (!groupedData[cat]) {
      groupedData[cat] = []
    }
    groupedData[cat].push(point)
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            scatter: {
              label: "Data Points",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="x"
                name={xAxisLabel}
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                dataKey="y"
                name={yAxisLabel}
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "rgba(0,0,0,0.1)" }} />
              {Object.entries(groupedData).map((entry, idx) => (
                <Scatter
                  key={entry[0]}
                  name={entry[0]}
                  data={entry[1]}
                  fill={colors[idx % colors.length]}
                  fillOpacity={0.7}
                  shape="circle"
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
