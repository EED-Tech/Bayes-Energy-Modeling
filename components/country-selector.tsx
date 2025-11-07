"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Globe2 } from "lucide-react"
import { useGlobalState } from "@/lib/global-state"
import type { Country } from "@/lib/model-data"
import { cn } from "@/lib/utils"

interface CountrySelectorProps {
  country: Country
}

export function CountrySelector({ country }: CountrySelectorProps) {
  const { parameters, setParameters } = useGlobalState()

  const countries: Country[] = ["Kenya", "Uganda", "Tanzania", "Ethiopia", "Malawi"]

  return (
    <Card className="bg-white border border-border/50 card-shadow sticky top-24 z-10">
      <CardContent className="pt-4">
        <div className="space-y-3">
          <label className="text-xs font-semibold text-foreground flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-primary" />
            Select Country
          </label>
          <div className="flex flex-wrap gap-2">
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setParameters({ ...parameters, sel_country: c })}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 border",
                  country === c
                    ? "bg-orange-500 text-white border-orange-600 shadow-md"
                    : "bg-white text-foreground border-border hover:bg-slate-50 hover:border-slate-300",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
