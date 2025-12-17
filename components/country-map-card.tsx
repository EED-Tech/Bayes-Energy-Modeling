"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGlobalState } from "@/lib/global-state"
import type { Country } from "@/lib/model-data"
import { getCountryMetadata } from "@/lib/countries-metadata"
import Image from "next/image"

interface CountryMapCardProps {
  country: Country
}

export function CountryMapCard({ country }: CountryMapCardProps) {
  const { parameters, setParameters } = useGlobalState()
  const countries: Country[] = ["Kenya", "Uganda", "Tanzania", "Ethiopia", "Malawi"]
  const metadata = getCountryMetadata(country)

  return (
    <Card className="border-chart-1/30 overflow-hidden">
      <CardContent className="p-3 space-y-3">
        <Select
          value={country}
          onValueChange={(value) => setParameters({ ...parameters, sel_country: value as Country })}
        >
          <SelectTrigger className="w-full h-9 text-sm">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((c) => {
              const meta = getCountryMetadata(c)
              return (
                <SelectItem key={c} value={c} className="text-sm">
                  <div className="flex items-center gap-2">
                    <Image
                      src={meta.flagUrl || "/placeholder.svg"}
                      alt={meta.name}
                      width={20}
                      height={15}
                      className="rounded"
                    />
                    {meta.name}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>

        <div className="relative w-full aspect-square bg-muted/20 rounded-lg overflow-hidden flex items-center justify-center">
          <Image
            src={metadata.mapUrl || "/placeholder.svg"}
            alt={`${metadata.name} map`}
            width={240}
            height={240}
            className="object-contain"
            priority
          />
        </div>

        <p className="text-xs text-center text-muted-foreground">Active analysis country</p>
      </CardContent>
    </Card>
  )
}
