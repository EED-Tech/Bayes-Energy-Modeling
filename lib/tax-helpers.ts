import { getCookingTaxRates as getCookingRates } from "./tax-cooking-data"
import { getMobilityTaxRates as getMobilityRates } from "./tax-mobility-data"

export function getCookingTaxRates(country: string) {
  return getCookingRates(country)
}

export function getMobilityTaxRates(country: string, vehicleType: "bus" | "car" | "motorcycle") {
  return getMobilityRates(country, vehicleType)
}
