"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { getCookingTaxRates } from "@/lib/tax-cooking-data"
import { getCookingTaxDetails } from "@/lib/tax-cooking-data-new"
import type { Country } from "@/lib/model-data"
import { formatNumber } from "@/lib/utils"
import { Zap, Flame, TreeDeciduous } from "lucide-react"

interface CookingTaxesSectionProps {
  country: Country
}

export function CookingTaxesSection({ country }: CookingTaxesSectionProps) {
  const taxRates = getCookingTaxRates(country)
  const electricityDetails = getCookingTaxDetails(country, "Electric")
  const lpgDetails = getCookingTaxDetails(country, "LPG")
  const charcoalDetails = getCookingTaxDetails(country, "Charcoal")

  const taxData = [
    { fuelType: "Electricity", rate: taxRates.electricity, color: "hsl(174, 63%, 50%)", icon: Zap },
    { fuelType: "LPG", rate: taxRates.lpg, color: "hsl(220, 13%, 50%)", icon: Flame },
    { fuelType: "Charcoal", rate: taxRates.charcoal, color: "hsl(199, 89%, 48%)", icon: TreeDeciduous },
  ]

  const chartData = taxData.map((d) => ({
    name: d.fuelType,
    "Tax Rate": d.rate,
  }))

  const pieData = taxData
    .filter((d) => d.rate > 0)
    .map((d) => ({
      name: d.fuelType,
      value: d.rate,
    }))

  const totalTax = pieData.reduce((sum, d) => sum + d.value, 0)

  const uniqueTaxes = Array.from(
    new Set(
      [
        electricityDetails?.recurringPerUnit.rep ? "Rural Electrification Program (REP)" : null,
        electricityDetails?.recurringPerUnit.waterLevy ? "Water Levy" : null,
        electricityDetails?.recurringPerUnit.regulatorLevy ? "Regulator Levy" : null,
        charcoalDetails?.recurringPerUnit.productionLicense ? "Production License" : null,
        charcoalDetails?.recurringPerUnit.movementPermit ? "Movement Permit" : null,
        charcoalDetails?.recurringPerUnit.informalTaxes ? "Informal Taxes" : null,
        charcoalDetails?.recurringPerUnit.cessTax ? "Cess Tax" : null,
        lpgDetails?.nonRecurring.infrastructuralLevy ? "Infrastructural Levy" : null,
      ].filter(Boolean) as string[],
    ),
  )

  return (
    <Card className="border-dashed border-slate-200/80 bg-gradient-to-br from-amber-50/40 via-background to-background">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Cooking taxes</CardTitle>
        <CardDescription className="text-xs">Detailed levy breakdown for {country}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Accordion type="single" collapsible>
          <AccordionItem value="cooking-taxes-details">
            <AccordionTrigger className="text-sm font-medium">Show tax breakdown</AccordionTrigger>
            <AccordionContent className="space-y-5">
              <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2">
                {taxData.map((tax) => {
                  const Icon = tax.icon
                  return (
                    <Card key={tax.fuelType} className="bg-teal-50/50 border border-teal-200/30 shadow-none">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-teal-600" />
                          <CardTitle className="text-sm font-medium">{tax.fuelType}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">${formatNumber(tax.rate, 3)}</div>
                        <p className="text-xs text-muted-foreground mt-0.5">Per unit (kg/kWh)</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {uniqueTaxes.length > 0 && (
                <Card className="bg-slate-50/50 border border-slate-200/30 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Country-specific taxes</CardTitle>
                    <CardDescription className="text-xs">
                      Unique tax components that apply to {country}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {uniqueTaxes.map((tax) => (
                        <span
                          key={tax}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground"
                        >
                          {tax}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-3 lg:grid-cols-2">
                <Card className="bg-teal-50/50 border border-teal-200/30 shadow-none">
                  <CardHeader className="pb-3">
                    <CardTitle>Tax rates by fuel type</CardTitle>
                    <CardDescription>Comparative per-unit tax rates</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ChartContainer config={{}} className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ left: 40, right: 20, top: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "6px",
                            }}
                            formatter={(value) => `$${formatNumber(value as number, 3)}`}
                          />
                          <Legend />
                          <Bar dataKey="Tax Rate" fill="hsl(174, 63%, 50%)">
                            <Cell fill="hsl(174, 63%, 50%)" />
                            <Cell fill="hsl(220, 13%, 50%)" />
                            <Cell fill="hsl(199, 89%, 48%)" />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {pieData.length > 0 && (
                  <Card className="bg-teal-50/50 border border-teal-200/30 shadow-none">
                    <CardHeader className="pb-3">
                      <CardTitle>Tax distribution</CardTitle>
                      <CardDescription>Relative tax burden by fuel type</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      <ChartContainer config={{}} className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              label={({ name, value }) => {
                                const percentage = ((value / totalTax) * 100).toFixed(1)
                                return `${name}: ${percentage}%`
                              }}
                              labelLine
                            >
                              <Cell fill="hsl(174, 63%, 50%)" />
                              <Cell fill="hsl(220, 13%, 50%)" />
                              <Cell fill="hsl(199, 89%, 48%)" />
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "6px",
                              }}
                              formatter={(value) => {
                                const percentage = (((value as number) / totalTax) * 100).toFixed(1)
                                return [`$${formatNumber(value as number, 3)} (${percentage}%)`, "Tax Rate"]
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                )}
              </div>

              <Card className="bg-teal-50/50 border border-teal-200/30 shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle>Detailed tax breakdown</CardTitle>
                  <CardDescription>Component-level view for {country}</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {electricityDetails && (
                      <div className="border-b pb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-teal-600" />
                          <h4 className="font-semibold">Electricity</h4>
                          <span className="ml-auto text-lg font-bold">${formatNumber(taxRates.electricity, 3)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {electricityDetails.recurringPerUnit.waterLevy && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Water Levy:</span>
                              <span>${formatNumber(electricityDetails.recurringPerUnit.waterLevy, 4)}</span>
                            </div>
                          )}
                          {electricityDetails.recurringPerUnit.regulatorLevy && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Regulator Levy:</span>
                              <span>${formatNumber(electricityDetails.recurringPerUnit.regulatorLevy, 4)}</span>
                            </div>
                          )}
                          {electricityDetails.recurringPerUnit.rep && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">REP:</span>
                              <span>${formatNumber(electricityDetails.recurringPerUnit.rep, 4)}</span>
                            </div>
                          )}
                          {electricityDetails.recurringPerUnit.vat && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">VAT:</span>
                              <span>{(electricityDetails.recurringPerUnit.vat * 100).toFixed(0)}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {lpgDetails && (
                      <div className="border-b pb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <h4 className="font-semibold">LPG</h4>
                          <span className="ml-auto text-lg font-bold">${formatNumber(taxRates.lpg, 3)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {lpgDetails.nonRecurring.importDeclarationFees && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Import Declaration:</span>
                              <span>${formatNumber(lpgDetails.nonRecurring.importDeclarationFees, 3)}</span>
                            </div>
                          )}
                          {lpgDetails.nonRecurring.infrastructuralLevy && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Infrastructural Levy:</span>
                              <span>${formatNumber(lpgDetails.nonRecurring.infrastructuralLevy, 3)}</span>
                            </div>
                          )}
                          {lpgDetails.nonRecurring.vat && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">VAT:</span>
                              <span>{(lpgDetails.nonRecurring.vat * 100).toFixed(0)}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {charcoalDetails && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <TreeDeciduous className="h-4 w-4 text-green-700" />
                          <h4 className="font-semibold">Charcoal</h4>
                          <span className="ml-auto text-lg font-bold">${formatNumber(taxRates.charcoal, 3)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {charcoalDetails.recurringPerUnit.productionLicense && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Production License:</span>
                              <span>${formatNumber(charcoalDetails.recurringPerUnit.productionLicense, 3)}</span>
                            </div>
                          )}
                          {charcoalDetails.recurringPerUnit.importDuty && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Import Duty:</span>
                              <span>${formatNumber(charcoalDetails.recurringPerUnit.importDuty, 3)}</span>
                            </div>
                          )}
                          {charcoalDetails.recurringPerUnit.movementPermit && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Movement Permit:</span>
                              <span>${formatNumber(charcoalDetails.recurringPerUnit.movementPermit, 3)}</span>
                            </div>
                          )}
                          {charcoalDetails.recurringPerUnit.cessTax && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Cess Tax:</span>
                              <span>${formatNumber(charcoalDetails.recurringPerUnit.cessTax, 2)}</span>
                            </div>
                          )}
                          {charcoalDetails.recurringPerUnit.informalTaxes && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Informal Taxes:</span>
                              <span>${formatNumber(charcoalDetails.recurringPerUnit.informalTaxes, 2)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
