"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoTooltip } from "@/components/info-tooltip"

const sections: Array<{
  title: string
  description?: string | string[]
  items?: string[]
}> = [
  {
    title: "Purpose",
    description:
      "This dashboard visualizes budget-neutral energy transition scenarios for eCooking and eMobility, comparing Business as usual (BAU), fixed policy trajectories to user-adjusted scenarios.",
  },
  {
    title: "How to use",
    items: [
      "Use the left sidebar sliders to adjust 'Your scenario'. Policy values remain fixed.",
      "Overview: high-level impacts on electricity demand, taxes, and emissions.",
      "eCooking / eMobility: deep dives into sector-specific energy, taxes, and emissions.",
      "Combined: aggregated view of both sectors.",
      "Policy Timelines: policy targets and fuel transition trajectories.",
    ],
  },
  {
    title: "Data sources",
    description: [
      "Population: World Bank (harmonised, extrapolated).Household size: UNDESA + DHS/MICS per country.Tax and policy inputs mirror the accompanying Excel model.",
    ],
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="w-full px-6 py-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Explainer</h1>
            <p className="text-sm text-muted-foreground">
              Why this dashboard exists, how to navigate it, and how policy vs user scenarios differ.
            </p>
          </div>
          <InfoTooltip
            title="Explainer"
            description="Start here for an overview of the dashboard’s purpose, navigation, and the difference between policy and user scenarios."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{sections[0].title}</CardTitle>
              <CardDescription>{sections[0].description}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{sections[2].title}</CardTitle>
              <CardDescription>{sections[2].description}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="border shadow-sm mt-4">
          <CardHeader>
            <CardTitle className="text-lg">{sections[1].title}</CardTitle>
            <CardDescription>Quick navigation tips for each route</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {sections[1].items?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
