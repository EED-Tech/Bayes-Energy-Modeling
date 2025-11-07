"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { ModelParameters } from "@/lib/model-data"

interface GlobalStateContextType {
  parameters: ModelParameters
  setParameters: (params: ModelParameters) => void
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined)

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [parameters, setParameters] = useState<ModelParameters>({
    sel_country: "Kenya",
    sel_year: 2030,
    user_ecook: 10,
    user_ev_bus_share: 20,
    user_ev_passenger_vehicle_share: 10,
    user_ev_motorcycle_vehicle_share: 20,
  })

  return <GlobalStateContext.Provider value={{ parameters, setParameters }}>{children}</GlobalStateContext.Provider>
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext)
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider")
  }
  return context
}
