"use client"

import { formatNumber } from "@/lib/utils"

interface CountryMapProps {
  country: string
  population?: number
}

// Country flag data
const countryData: Record<
  string,
  {
    flag: string
    colors: { primary: string; secondary: string }
  }
> = {
  Kenya: {
    flag: "🇰🇪",
    colors: { primary: "bg-red-500", secondary: "bg-green-600" },
  },
  Uganda: {
    flag: "🇺🇬",
    colors: { primary: "bg-yellow-400", secondary: "bg-red-500" },
  },
  Tanzania: {
    flag: "🇹🇿",
    colors: { primary: "bg-cyan-500", secondary: "bg-green-600" },
  },
  Ethiopia: {
    flag: "🇪🇹",
    colors: { primary: "bg-green-600", secondary: "bg-yellow-400" },
  },
  Malawi: {
    flag: "🇲🇼",
    colors: { primary: "bg-red-600", secondary: "bg-green-600" },
  },
}

export function CountryMap({ country, population }: CountryMapProps) {
  const data = countryData[country] || { flag: "🌍", colors: { primary: "bg-primary", secondary: "bg-accent" } }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-border shadow-sm p-6 overflow-hidden">
      <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 rounded-md overflow-hidden">
        {/* Dotted background pattern - creates map-like appearance */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-full h-full opacity-30" viewBox="0 0 400 300">
            <defs>
              <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="1.5" fill="currentColor" className="text-slate-700" />
              </pattern>
            </defs>
            {/* Map shape - simplified country outline */}
            <path
              d="M 100 80 Q 120 60, 150 70 T 220 90 Q 250 100, 260 130 T 250 180 Q 240 210, 200 220 T 140 210 Q 100 200, 90 170 T 100 120 Z"
              fill="url(#dots)"
            />
          </svg>
        </div>

        {/* Country content */}
        <div className="absolute inset-0 flex flex-col items-start justify-between p-5 z-10">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-slate-900">{country}</h3>
            {population && (
              <p className="text-sm font-medium text-slate-600">
                Pop: <span className="font-semibold">{formatNumber(population, 0)}</span>
              </p>
            )}
          </div>

          {/* Flag with subtle shadow */}
          <div className="flex items-center gap-3">
            <div className="text-5xl drop-shadow-md">{data.flag}</div>
          </div>
        </div>

        {/* Decorative accent */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-full" />
      </div>
    </div>
  )
}
