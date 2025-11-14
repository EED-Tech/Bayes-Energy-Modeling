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
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { getMobilityTaxRates } from "@/lib/tax-mobility-data"
import { getMobilityTaxDetails } from "@/lib/tax-mobility-data-new"
import type { Country } from "@/lib/model-data"
import { formatNumber } from "@/lib/utils"
import { Bus, Car, Bike } from "lucide-react"

interface MobilityTaxesSectionProps {
  country: Country
}

export function MobilityTaxesSection({ country }: MobilityTaxesSectionProps) {
  const busTaxes = getMobilityTaxRates(country, "bus")
  const carTaxes = getMobilityTaxRates(country, "car")
  const motorcycleTaxes = getMobilityTaxRates(country, "motorcycle")

  const comparisonData = [
    { vehicle: "Bus", "ICE Tax": busTaxes.ice, "EV Tax": busTaxes.ev },
    { vehicle: "Passenger Car", "ICE Tax": carTaxes.ice, "EV Tax": carTaxes.ev },
    { vehicle: "Motorcycle", "ICE Tax": motorcycleTaxes.ice, "EV Tax": motorcycleTaxes.ev },
  ]

  const totalICE = busTaxes.ice + carTaxes.ice + motorcycleTaxes.ice
  const totalEV = busTaxes.ev + carTaxes.ev + motorcycleTaxes.ev
  const pieData = [
    { name: "ICE Vehicles", value: totalICE },
    { name: "EV Vehicles", value: totalEV },
  ]

  const detailSets = [
    getMobilityTaxDetails(country, "Bus", "ICE"),
    getMobilityTaxDetails(country, "Bus", "EV"),
    getMobilityTaxDetails(country, "Passenger Car", "ICE"),
    getMobilityTaxDetails(country, "Passenger Car", "EV"),
    getMobilityTaxDetails(country, "Motorcycle", "ICE"),
    getMobilityTaxDetails(country, "Motorcycle", "EV"),
  ]

  const uniqueTaxes = Array.from(
    detailSets.reduce((set, detail) => {
      if (!detail) return set

      if (detail.recurringEnergy?.carbonTax) set.add("Carbon Tax")
      if (detail.recurringEnergy?.railwayDevelopmentLevy) set.add("Railway Development Levy")
      if (detail.recurringEnergy?.merchantShippingLevy) set.add("Merchant Shipping Levy")
      if (detail.recurringEnergy?.wayLeaveCharges) set.add("Way Leave Charges")
      if (detail.recurringEnergy?.tbsCharge) set.add("TBS Charge")
      if (detail.recurringEnergy?.tasacFee) set.add("TASAC Fee")
      if (detail.recurringEnergy?.waterLevy) set.add("Water Levy")
      if (detail.nonRecurring?.hivAidsLevy) set.add("HIV/AIDS Levy")
      if (detail.nonRecurring?.surtax) set.add("Surtax")
      if (detail.recurringFixed?.trainingLevy) set.add("Training Levy")

      return set
    }, new Set<string>()),
  )

  const busICEDetails = detailSets[0]
  const busEVDetails = detailSets[1]
  const carICEDetails = detailSets[2]
  const carEVDetails = detailSets[3]
  const motorcycleICEDetails = detailSets[4]
  const motorcycleEVDetails = detailSets[5]

  return (
    <Card className="border-dashed border-slate-200/80 bg-gradient-to-br from-sky-50/40 via-background to-background">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Mobility taxes</CardTitle>
        <CardDescription className="text-xs">
          Full ICE vs EV tax context for {country}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Accordion type="single" collapsible>
          <AccordionItem value="mobility-taxes-details">
            <AccordionTrigger className="text-sm font-medium">Show tax breakdown</AccordionTrigger>
            <AccordionContent className="space-y-5">
              <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2">
                {[
                  { vehicle: "Bus", ...busTaxes, icon: Bus },
                  { vehicle: "Passenger Car", ...carTaxes, icon: Car },
                  { vehicle: "Motorcycle", ...motorcycleTaxes, icon: Bike },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <Card key={item.vehicle} className="bg-teal-50/50 border border-teal-200/30 shadow-none">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-teal-600" />
                          <CardTitle className="text-sm font-medium">{item.vehicle}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-1">
                        <div>
                          <p className="text-xs text-muted-foreground">ICE</p>
                          <p className="text-lg font-bold">${formatNumber(item.ice, 2)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">EV</p>
                          <p className="text-lg font-bold text-chart-1">${formatNumber(item.ev, 2)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {uniqueTaxes.length > 0 && (
                <Card className="bg-slate-50/50 border border-slate-200/30 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Country-specific levies</CardTitle>
                    <CardDescription className="text-xs">
                      Additional levies observed in {country}
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
                    <CardTitle>ICE vs EV tax comparison</CardTitle>
                    <CardDescription>Vehicle import & registration taxes</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ChartContainer config={{}} className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData} margin={{ left: 40, right: 20, top: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="vehicle" stroke="hsl(var(--foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "6px",
                            }}
                            formatter={(value) => `$${formatNumber(value as number, 2)}`}
                          />
                          <Legend />
                          <Bar dataKey="ICE Tax" fill="hsl(220, 13%, 50%)" />
                          <Bar dataKey="EV Tax" fill="hsl(174, 63%, 50%)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="bg-teal-50/50 border border-teal-200/30 shadow-none">
                  <CardHeader className="pb-3">
                    <CardTitle>Total tax burden</CardTitle>
                    <CardDescription>ICE vs EV across all vehicle types</CardDescription>
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
                              const total = totalICE + totalEV
                              const percentage = ((value / total) * 100).toFixed(1)
                              return `${name}: ${percentage}%`
                            }}
                            labelLine
                          >
                            <Cell fill="hsl(220, 13%, 50%)" />
                            <Cell fill="hsl(174, 63%, 50%)" />
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "6px",
                            }}
                            formatter={(value) => {
                              const total = totalICE + totalEV
                              const percentage = (((value as number) / total) * 100).toFixed(1)
                              return [`$${formatNumber(value as number, 2)} (${percentage}%)`, "Total Tax"]
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2">
                {(busICEDetails || busEVDetails) && (
                  <div className="border-b pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Bus className="h-4 w-4 text-teal-600" />
                      <h4 className="font-semibold">Bus</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-xs">
                      {busICEDetails && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            ICE - ${formatNumber(busTaxes.ice, 2)}
                          </p>
                          <div className="space-y-1">
                            {busICEDetails.recurringEnergy?.exciseDuty && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Excise Duty:</span>
                                <span>${formatNumber(busICEDetails.recurringEnergy.exciseDuty, 2)}</span>
                              </div>
                            )}
                            {busICEDetails.recurringEnergy?.roadMaintenanceLevy && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Road Maintenance:</span>
                                <span>${formatNumber(busICEDetails.recurringEnergy.roadMaintenanceLevy, 2)}</span>
                              </div>
                            )}
                            {busICEDetails.recurringEnergy?.vat && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">VAT:</span>
                                <span>${formatNumber(busICEDetails.recurringEnergy.vat, 2)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {busEVDetails && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            EV - ${formatNumber(busTaxes.ev, 2)}
                          </p>
                          <div className="space-y-1">
                            {busEVDetails.recurringEnergy?.regulatorLevy && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Regulator Levy:</span>
                                <span>${formatNumber(busEVDetails.recurringEnergy.regulatorLevy, 3)}</span>
                              </div>
                            )}
                            {busEVDetails.recurringEnergy?.rep && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">REP:</span>
                                <span>${formatNumber(busEVDetails.recurringEnergy.rep, 3)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {(carICEDetails || carEVDetails) && (
                  <div className="border-b pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="h-4 w-4 text-teal-600" />
                      <h4 className="font-semibold">Passenger car</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-xs">
                      {carICEDetails && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            ICE - ${formatNumber(carTaxes.ice, 2)}
                          </p>
                          <div className="space-y-1">
                            {carICEDetails.recurringEnergy?.exciseDuty && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Excise Duty:</span>
                                <span>${formatNumber(carICEDetails.recurringEnergy.exciseDuty, 2)}</span>
                              </div>
                            )}
                            {carICEDetails.recurringEnergy?.roadMaintenanceLevy && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Road Maintenance:</span>
                                <span>${formatNumber(carICEDetails.recurringEnergy.roadMaintenanceLevy, 2)}</span>
                              </div>
                            )}
                            {carICEDetails.nonRecurring?.exciseDuty && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Import Excise:</span>
                                <span>{(carICEDetails.nonRecurring.exciseDuty * 100).toFixed(0)}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {carEVDetails && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            EV - ${formatNumber(carTaxes.ev, 2)}
                          </p>
                          <div className="space-y-1">
                            {carEVDetails.recurringEnergy?.regulatorLevy && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Regulator Levy:</span>
                                <span>${formatNumber(carEVDetails.recurringEnergy.regulatorLevy, 3)}</span>
                              </div>
                            )}
                            {carEVDetails.recurringEnergy?.rep && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">REP:</span>
                                <span>${formatNumber(carEVDetails.recurringEnergy.rep, 3)}</span>
                              </div>
                            )}
                            {carEVDetails.nonRecurring?.exciseDuty && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Import Excise:</span>
                                <span>{(carEVDetails.nonRecurring.exciseDuty * 100).toFixed(0)}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {(motorcycleICEDetails || motorcycleEVDetails) && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Bike className="h-4 w-4 text-teal-600" />
                      <h4 className="font-semibold">Motorcycle</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-xs">
                      {motorcycleICEDetails && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            ICE - ${formatNumber(motorcycleTaxes.ice, 2)}
                          </p>
                          <div className="space-y-1">
                            {motorcycleICEDetails.recurringEnergy?.exciseDuty && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Excise Duty:</span>
                                <span>${formatNumber(motorcycleICEDetails.recurringEnergy.exciseDuty, 2)}</span>
                              </div>
                            )}
                            {motorcycleICEDetails.recurringEnergy?.roadMaintenanceLevy && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Road Maintenance:</span>
                                <span>${formatNumber(motorcycleICEDetails.recurringEnergy.roadMaintenanceLevy, 2)}</span>
                              </div>
                            )}
                            {motorcycleICEDetails.recurringEnergy?.vat && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">VAT:</span>
                                <span>${formatNumber(motorcycleICEDetails.recurringEnergy.vat, 2)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {motorcycleEVDetails && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            EV - ${formatNumber(motorcycleTaxes.ev, 2)}
                          </p>
                          <div className="space-y-1">
                            {motorcycleEVDetails.recurringEnergy?.regulatorLevy && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Regulator Levy:</span>
                                <span>${formatNumber(motorcycleEVDetails.recurringEnergy.regulatorLevy, 3)}</span>
                              </div>
                            )}
                            {motorcycleEVDetails.recurringEnergy?.rep && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">REP:</span>
                                <span>${formatNumber(motorcycleEVDetails.recurringEnergy.rep, 3)}</span>
                              </div>
                            )}
                            {motorcycleEVDetails.recurringEnergy?.vat && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">VAT:</span>
                                <span>{(motorcycleEVDetails.recurringEnergy.vat * 100).toFixed(0)}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
