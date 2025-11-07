"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TrendLineChartProps {
  data?: Array<{
    year: number
    [key: string]: number | string
  }>
  lines?: Array<{
    key: string
    name: string
    color: string
    marker?: boolean
  }>
  title?: string
  description?: string
}

export function TrendLineChart({
  data,
  lines,
  title = "Trend Analysis",
  description = "Year-over-year trends",
}: TrendLineChartProps) {
  const chartData = data || []
  const lineConfigs = lines || []

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
            />
            <Legend />
            {lineConfigs.map((lineConfig, index) => (
              <Line
                key={lineConfig.key}
                type="monotone"
                dataKey={lineConfig.key}
                stroke={lineConfig.color}
                name={lineConfig.name}
                strokeWidth={2}
                dot={lineConfig.marker ? { r: 4, fill: lineConfig.color } : false}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
