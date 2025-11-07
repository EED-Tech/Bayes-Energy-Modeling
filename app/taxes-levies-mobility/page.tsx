"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { getMobilityTaxRates } from "@/lib/tax-mobility-data"
import { getMobilityTaxDetails } from "@/lib/tax-mobility-data-new"
import { formatNumber } from "@/lib/utils"
import { CountryMapCard } from "@/components/country-map-card"
import { useGlobalState } from "@/lib/global-state"
import { Bus, Car, Bike } from "lucide-react"

export default function MobilityTaxesPage() {
  const { parameters } = useGlobalState()

  const busTaxes = getMobilityTaxRates(parameters.sel_country, "bus")
  const carTaxes = getMobilityTaxRates(parameters.sel_country, "car")
  const motorcycleTaxes = getMobilityTaxRates(parameters.sel_country, "motorcycle")

  const busICEDetails = getMobilityTaxDetails(parameters.sel_country, "Bus", "ICE")
  const busEVDetails = getMobilityTaxDetails(parameters.sel_country, "Bus", "EV")
  const carICEDetails = getMobilityTaxDetails(parameters.sel_country, "Passenger Car", "ICE")
  const carEVDetails = getMobilityTaxDetails(parameters.sel_country, "Passenger Car", "EV")
  const motorcycleICEDetails = getMobilityTaxDetails(parameters.sel_country, "Motorcycle", "ICE")
  const motorcycleEVDetails = getMobilityTaxDetails(parameters.sel_country, "Motorcycle", "EV")

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

  const getUniqueTaxes = () => {
    const uniqueTaxes: string[] = []
    const uniqueSet = new Set<string>()

    // Helper function to safely extract taxes from a detail object
    const collectTaxes = (details: typeof busICEDetails) => {
      if (!details) return

      // Check recurringEnergy taxes
      if (details.recurringEnergy?.carbonTax) uniqueSet.add("Carbon Tax")
      if (details.recurringEnergy?.railwayDevelopmentLevy) uniqueSet.add("Railway Development Levy")
      if (details.recurringEnergy?.merchantShippingLevy) uniqueSet.add("Merchant Shipping Levy")
      if (details.recurringEnergy?.wayLeaveCharges) uniqueSet.add("Way Leave Charges")
      if (details.recurringEnergy?.tbsCharge) uniqueSet.add("TBS Charge")
      if (details.recurringEnergy?.tasacFee) uniqueSet.add("TASAC Fee")
      if (details.recurringEnergy?.waterLevy) uniqueSet.add("Water Levy")

      // Check nonRecurring taxes
      if (details.nonRecurring?.hivAidsLevy) uniqueSet.add("HIV/AIDS Levy")
      if (details.nonRecurring?.surtax) uniqueSet.add("Surtax")

      // Check recurringFixed taxes (safe access with optional chaining)
      if (details.recurringFixed?.trainingLevy) uniqueSet.add("Training Levy")
    }

    // Collect from all vehicle types
    collectTaxes(busICEDetails)
    collectTaxes(busEVDetails)
    collectTaxes(carICEDetails)
    collectTaxes(carEVDetails)
    collectTaxes(motorcycleICEDetails)
    collectTaxes(motorcycleEVDetails)

    return Array.from(uniqueSet)
  }

  const uniqueTaxes = getUniqueTaxes()

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-0 py-0">
        <div className="grid lg:grid-cols-[280px_1fr] gap-0">
          {/* Left Sidebar */}
          <aside className="space-y-2 h-fit sticky top-0 pl-2 pt-2">
            <CountryMapCard country={parameters.sel_country} />
          </aside>

          {/* Main Content */}
          <main className="space-y-4 py-6 px-8">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">eMobility Taxes & Levies</h1>
              <p className="text-sm text-muted-foreground">
                ICE vs EV vehicle tax comparison for {parameters.sel_country}
              </p>
            </div>

            <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2">
              {[
                { vehicle: "Bus", ice: busTaxes.ice, ev: busTaxes.ev, icon: Bus },
                { vehicle: "Passenger Car", ice: carTaxes.ice, ev: carTaxes.ev, icon: Car },
                { vehicle: "Motorcycle", ice: motorcycleTaxes.ice, ev: motorcycleTaxes.ev, icon: Bike },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.vehicle} className="bg-teal-50/50 border border-teal-200/30">
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
                      <div className="pt-1 border-t">
                        <p className="text-xs text-muted-foreground">Savings</p>
                        <p className="text-sm font-semibold text-green-600">${formatNumber(item.ice - item.ev, 2)}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {uniqueTaxes.length > 0 && (
              <Card className="bg-slate-50/50 border border-slate-200/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Country-Specific Taxes</CardTitle>
                  <CardDescription className="text-xs">
                    Unique tax components for {parameters.sel_country}
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
              <Card className="bg-teal-50/50 border border-teal-200/30">
                <CardHeader className="pb-3">
                  <CardTitle>ICE vs EV Tax Comparison</CardTitle>
                  <CardDescription>Vehicle import and registration taxes</CardDescription>
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

              <Card className="bg-teal-50/50 border border-teal-200/30">
                <CardHeader className="pb-3">
                  <CardTitle>Total Tax Burden</CardTitle>
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
                          labelLine={true}
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
              {/* Bus */}
              {(busICEDetails || busEVDetails) && (
                <div className="border-b pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Bus className="h-4 w-4 text-teal-600" />
                    <h4 className="font-semibold">Bus</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {busICEDetails && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          ICE - ${formatNumber(busTaxes.ice, 2)}
                        </p>
                        <div className="space-y-1 text-xs">
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
                          {busICEDetails.recurringEnergy?.petroleumDevelopmentLevy && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Petroleum Dev:</span>
                              <span>${formatNumber(busICEDetails.recurringEnergy.petroleumDevelopmentLevy, 2)}</span>
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
                        <div className="space-y-1 text-xs">
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
                          {busEVDetails.recurringEnergy?.vat && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">VAT:</span>
                              <span>{(busEVDetails.recurringEnergy.vat * 100).toFixed(0)}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Passenger Car */}
              {(carICEDetails || carEVDetails) && (
                <div className="border-b pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Car className="h-4 w-4 text-teal-600" />
                    <h4 className="font-semibold">Passenger Car</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {carICEDetails && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          ICE - ${formatNumber(carTaxes.ice, 2)}
                        </p>
                        <div className="space-y-1 text-xs">
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
                        <div className="space-y-1 text-xs">
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

              {/* Motorcycle */}
              {(motorcycleICEDetails || motorcycleEVDetails) && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Bike className="h-4 w-4 text-teal-600" />
                    <h4 className="font-semibold">Motorcycle</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {motorcycleICEDetails && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          ICE - ${formatNumber(motorcycleTaxes.ice, 2)}
                        </p>
                        <div className="space-y-1 text-xs">
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
                        <div className="space-y-1 text-xs">
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
          </main>
        </div>
      </div>
    </div>
  )
}
