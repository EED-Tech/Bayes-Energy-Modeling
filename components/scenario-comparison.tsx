"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ScenarioComparisonProps {
  data?: Array<{
    label: string
    policy: number
    user: number
  }>
  title?: string
  description?: string
}

export function ScenarioComparison({
  data,
  title = "Policy vs Your Scenario",
  description = "Comparison of outcomes",
}: ScenarioComparisonProps) {
  const chartData = data || []

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
            />
            <Legend />
            <Bar dataKey="policy" fill="hsl(var(--chart-1))" name="Policy Scenario" />
            <Bar dataKey="user" fill="hsl(var(--chart-2))" name="Your Scenario" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
