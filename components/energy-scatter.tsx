"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface EnergyScatterProps {
  data?: Array<{
    category: string
    electricity: number
    fossil: number
    fill: string
  }>
}

export function EnergyScatter({ data }: EnergyScatterProps) {
  const chartData = data || []

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Energy Sources Matrix</CardTitle>
        <CardDescription>Electricity vs Fossil Fuel consumption by category</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="electricity" name="Electricity (GWh/tonnes)" />
            <YAxis dataKey="fossil" name="Fossil Fuel" />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
              cursor={{ fill: "rgba(0,0,0,0.1)" }}
            />
            {chartData.map((entry, index) => (
              <Scatter
                key={`scatter-${index}`}
                name={entry.category}
                data={[
                  {
                    electricity: entry.electricity,
                    fossil: entry.fossil,
                    name: entry.category,
                  },
                ]}
                fill={entry.fill}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
