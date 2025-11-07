"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe2 } from "lucide-react"
import { useGlobalState } from "@/lib/global-state"
import type { Country } from "@/lib/model-data"

interface CountrySelectorCompactProps {
  country: Country
}

export function CountrySelectorCompact({ country }: CountrySelectorCompactProps) {
  const { parameters, setParameters } = useGlobalState()

  const countries: Country[] = ["Kenya", "Uganda", "Tanzania", "Ethiopia", "Malawi"]

  return (
    <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-border/50 card-shadow sticky top-6 z-10">
      <Globe2 className="h-4 w-4 text-primary flex-shrink-0" />
      <Select
        value={country}
        onValueChange={(value) => setParameters({ ...parameters, sel_country: value as Country })}
      >
        <SelectTrigger className="w-full h-8 text-sm border-0 shadow-none p-1">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((c) => (
            <SelectItem key={c} value={c} className="text-sm">
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
