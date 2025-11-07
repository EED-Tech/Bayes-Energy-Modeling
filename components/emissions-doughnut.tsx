"use client"

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface EmissionsDoughnutProps {
  data?: {
    ecooking: number
    emobility: number
  }
}

export function EmissionsDoughnut({ data }: EmissionsDoughnutProps) {
  const chartData = [
    { name: "eCooking", value: data?.ecooking || 0, fill: "hsl(var(--chart-1))" },
    { name: "eMobility", value: data?.emobility || 0, fill: "hsl(var(--chart-2))" },
  ]

  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Emissions Breakdown</CardTitle>
        <CardDescription>Million tCO2e by sector</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => value.toFixed(2)} />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">Total Emissions</p>
          <p className="text-2xl font-bold">{total.toFixed(2)} MtCO2e</p>
        </div>
      </CardContent>
    </Card>
  )
}
