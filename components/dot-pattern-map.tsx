"use client"

import { useMemo } from "react"
import { COUNTRY_BOUNDARIES, isPointInPolygon } from "@/lib/country-boundaries"

interface DotPatternMapProps {
  country: string
  width?: number
  height?: number
}

export function DotPatternMap({ country, width = 300, height = 300 }: DotPatternMapProps) {
  const dots = useMemo(() => {
    const boundary = COUNTRY_BOUNDARIES[country]
    if (!boundary) return []

    const { points, bounds } = boundary
    const generatedDots: { x: number; y: number }[] = []
    const spacing = 0.25 // Smaller spacing for denser dot pattern

    // Generate dots across the bounding box and filter to those inside polygon
    for (let lat = bounds.minLat; lat <= bounds.maxLat; lat += spacing) {
      for (let lng = bounds.minLng; lng <= bounds.maxLng; lng += spacing) {
        if (isPointInPolygon([lat, lng], points)) {
          // Convert geographic coordinates to pixel coordinates
          const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * width
          const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * height
          generatedDots.push({ x, y })
        }
      }
    }

    return generatedDots
  }, [country, width, height])

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full border rounded bg-card">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {dots.map((dot, i) => (
        <circle key={i} cx={dot.x} cy={dot.y} r="1.5" fill="hsl(var(--chart-1))" opacity="0.8" filter="url(#glow)" />
      ))}
    </svg>
  )
}
