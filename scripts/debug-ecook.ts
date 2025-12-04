import { calculateOutputs, type Country } from "../lib/model-data.ts"

const country: Country = "Tanzania"
const sel_year = 2030
const user_ecook = 30

const out = calculateOutputs({
  sel_country: country,
  sel_year,
  user_ecook,
  user_ev_bus_share: 0,
  user_ev_passenger_vehicle_share: 0,
  user_ev_motorcycle_vehicle_share: 0,
})

console.log("Scenario:", { country, sel_year, user_ecook })
console.log("Policy uptake %:", out?.ecooking.policy.uptake_ecook)
console.log("User uptake %:", out?.ecooking.user.uptake_ecook)
console.log("User electricity GWh:", out?.ecooking.user.electricity_gwh)
console.log("User LPG tonnes:", out?.ecooking.user.lpg_tonnes)
console.log("User charcoal tonnes:", out?.ecooking.user.charcoal_tonnes)
