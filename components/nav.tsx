"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { BarChart3, Flame, Car, TrendingUp, Info } from "lucide-react"

const navItems = [
  { href: "/", label: "Overview", icon: BarChart3 },
  { href: "/ecooking", label: "eCooking", icon: Flame },
  { href: "/emobility", label: "eMobility", icon: Car },
  { href: "/combined", label: "Combined Analysis", icon: TrendingUp },
  { href: "/about", label: "Explainer", icon: Info },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-border bg-background">
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 text-white px-6 py-6">
        <div className="max-w-full flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">
              Economic Pathways to Budget-Neutral Energy Transitions: Simulation of Energy Transition Scenarios
            </h1>
            <p className="text-sm text-teal-50">E - Cooking and E - Mobility energy transition modeling 2000 to 2049</p>
          </div>
          <div className="flex items-center gap-6 ml-8">
            
            
          </div>
        </div>
      </div>

      <div className="border-b px-6 py-0 bg-input border-muted shadow-lg">
        <div className="flex overflow-x-auto gap-2 py-0">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-all duration-200 whitespace-nowrap border-b-2 -mb-px rounded-md px-4 my-1.5 py-2",
                  isActive
                    ? "bg-teal-50 text-white bg-teal-600 border-b-teal-700"
                    : "text-foreground hover:bg-slate-50 border-b-transparent hover:border-b-slate-200",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
