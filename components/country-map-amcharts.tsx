"use client"

import { useState, useEffect } from "react"
import { formatNumber } from "@/lib/utils"

interface CountryMapAmchartsProps {
  country: string
  population?: number
}

const countryBounds: Record<string, { minLat: number; maxLat: number; minLng: number; maxLng: number; label: string }> =
  {
    Kenya: { minLat: -4.7, maxLat: 4.9, minLng: 33.9, maxLng: 41.9, label: "🇰🇪" },
    Uganda: { minLat: -1.6, maxLat: 4.2, minLng: 29.3, maxLng: 35.0, label: "🇺🇬" },
    Tanzania: { minLat: -11.7, maxLat: -0.95, minLng: 29.4, maxLng: 40.4, label: "🇹🇿" },
    Ethiopia: { minLat: 3.4, maxLat: 14.9, minLng: 33.0, maxLng: 47.8, label: "🇪🇹" },
    Malawi: { minLat: -17.8, maxLat: -9.2, minLng: 32.6, maxLng: 35.9, label: "🇲🇼" },
  }

const generateCountryDots = (country: string, dotSpacing = 0.35) => {
  const bounds = countryBounds[country]
  if (!bounds) return []

  const dots: Array<{ x: number; y: number; intensity: number }> = []

  // Create grid of dots - use consistent seeding for reproducibility
  for (let lat = bounds.minLat; lat <= bounds.maxLat; lat += dotSpacing) {
    for (let lng = bounds.minLng; lng <= bounds.maxLng; lng += dotSpacing) {
      // Pseudo-random but deterministic based on coordinates
      const seed = Math.sin(lat * 12.9898 + lng * 78.233) * 43758.5453
      const random = seed - Math.floor(seed)

      // Create border effect - more dots in center, fewer at edges
      const latRatio = (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)
      const lngRatio = (lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)
      const distFromCenter = Math.sqrt(Math.pow(latRatio - 0.5, 2) + Math.pow(lngRatio - 0.5, 2))

      // Include dot with probability based on distance from center
      const probability = Math.max(0.3, 1 - distFromCenter * 0.5)
      if (random < probability) {
        dots.push({
          x: lngRatio * 100,
          y: (1 - latRatio) * 100,
          intensity: 0.5 + Math.abs(Math.cos(lat)) * 0.5,
        })
      }
    }
  }

  return dots
}

export function CountryMapAmcharts({ country, population }: CountryMapAmchartsProps) {
  const [dots, setDots] = useState<Array<{ x: number; y: number; intensity: number }>>([])

  useEffect(() => {
    const generatedDots = generateCountryDots(country, 0.35)
    setDots(generatedDots)
  }, [country])

  const bounds = countryBounds[country]
  const countryData = countryBounds[country]

  return (
    <div className="space-y-2">
      {/* SVG Dot-Pattern Map - matches the Kenya reference image */}
      <div className="w-full rounded-lg border border-border/50 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 p-4">
        <svg
          viewBox="0 0 100 100"
          className="w-full"
          style={{ aspectRatio: "4/3" }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Light background */}
          <rect width="100" height="100" fill="rgb(240, 244, 248)" />

          {/* Render dots - creating country boundary pattern */}
          {dots.map((dot, idx) => (
            <circle key={idx} cx={dot.x} cy={dot.y} r="0.5" fill="rgb(75, 85, 99)" opacity={dot.intensity * 0.75} />
          ))}

          {/* Country label */}
          <text x="8" y="18" fontSize="6" fontWeight="bold" fill="rgb(15, 23, 42)" letterSpacing="2">
            {country}
          </text>
        </svg>
      </div>

      {/* Info Card */}
      <div className="px-3 py-2 bg-white rounded-lg border border-border/50 space-y-1">
        <h3 className="font-semibold text-foreground text-sm">{country}</h3>
        {population && (
          <p className="text-xs text-muted-foreground">
            Population: <span className="font-medium text-foreground">{formatNumber(population, 0)}</span>
          </p>
        )}
        <p className="text-xs text-muted-foreground">Active analysis country</p>
      </div>
    </div>
  )
}
