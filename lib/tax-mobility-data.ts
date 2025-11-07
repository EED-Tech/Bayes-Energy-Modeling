// Tax data for mobility vehicles by country
export const mobilityTaxData = {
  Kenya: {
    bus: { ice: 69.66, ev: 6.11 },
    car: { ice: 82.03, ev: 6.11 },
    motorcycle: { ice: 82.03, ev: 6.11 },
  },
  Uganda: {
    bus: { ice: 387.37, ev: 164.034 },
    car: { ice: 391.31, ev: 164.034 },
    motorcycle: { ice: 391.31, ev: 164.03 },
  },
  Tanzania: {
    bus: { ice: 825.92, ev: 50.93 },
    car: { ice: 825.92, ev: 50.93 },
    motorcycle: { ice: 825.92, ev: 50.93 },
  },
  Ethiopia: {
    bus: { ice: 13.72, ev: 0.11 },
    car: { ice: 13.86, ev: 0.11 },
    motorcycle: { ice: 13.86, ev: 0.11 },
  },
  Malawi: {
    bus: { ice: 611.59, ev: 56.59 },
    car: { ice: 616.63, ev: 56.59 },
    motorcycle: { ice: 616.67, ev: 56.59 },
  },
}

// Old Excel-based data structure for backward compatibility with model-data.ts
export const Tax___levies___Mobility = {
  A1: "=null",
  B1: "=null",
  C1: "=null",
  D1: "='Kenya'",
  A38: "='Energy'",
  B38: "='Recurring variable costs (Per liter / kWh)'",
  C38: "='Total - local currency'",
  D38: "=SUM(D20:D37)",
  E38: "=SUM(E20:E37)",
  F38: "=SUM(F20:F37)",
  G38: "=((('Variables & Outputs'!$B$191*'Variables & Outputs'!$B$186)*(G34+G37)))+SUM(G35:G36)",
  H38: "=((('Variables & Outputs'!$B$191*'Variables & Outputs'!$B$186)*(H34+H37)))+SUM(H35:H36)",
  I38: "=((('Variables & Outputs'!$B$191*'Variables & Outputs'!$B$186)*(I34+I37)))+SUM(I35:I36)",
  J38: "=('Variables & Outputs'!$B$196*'Variables & Outputs'!$B$187)*'Tax & levies - Mobility'!J34",
  K38: "=('Variables & Outputs'!$B$197*'Variables & Outputs'!$B$187)*'Tax & levies - Mobility'!K34",
  L38: "=('Variables & Outputs'!$B$197*'Variables & Outputs'!$B$187)*'Tax & levies - Mobility'!L34",
  M38: "=('Variables & Outputs'!$B$193*'Variables & Outputs'!$B$187)*SUM('Tax & levies - Mobility'!M34:M37)",
  N38: "=('Variables & Outputs'!$B$193*'Variables & Outputs'!$B$187)*SUM('Tax & levies - Mobility'!N34:N37)",
  O38: "=('Variables & Outputs'!$B$193*'Variables & Outputs'!$B$187)*SUM('Tax & levies - Mobility'!O34:O37)",
  P38: "=SUM(P21:P37)",
  Q38: "=SUM(Q21:Q37)",
  R38: "=SUM(R21:R37)",
  S38: "=('Variables & Outputs'!$B$194*'Variables & Outputs'!$B$188)*SUM('Tax & levies - Mobility'!S34:S37)",
  T38: "=('Variables & Outputs'!$B$194*'Variables & Outputs'!$B$188)*SUM('Tax & levies - Mobility'!T34:T37)",
  U38: "=('Variables & Outputs'!$B$194*'Variables & Outputs'!$B$188)*SUM('Tax & levies - Mobility'!U34:U37)",
  V38: "=('Variables & Outputs'!$B$196*'Variables & Outputs'!$B$185)*V34",
  W38: "=('Variables & Outputs'!$B$197*'Variables & Outputs'!$B$185)*W34",
  X38: "=('Variables & Outputs'!$B$197*'Variables & Outputs'!$B$185)*X34",
  Y38: "=('Variables & Outputs'!$B$190*'Variables & Outputs'!$B$185)*SUM('Tax & levies - Mobility'!Y34:Y37)",
  Z38: "=('Variables & Outputs'!$B$190*'Variables & Outputs'!$B$185)*SUM('Tax & levies - Mobility'!Z34:Z37)",
  AA38: "=('Variables & Outputs'!$B$190*'Variables & Outputs'!$B$185)*SUM('Tax & levies - Mobility'!AA34:AA37)",
  AB38: "=(('Variables & Outputs'!$B$196*'Variables & Outputs'!$B$189)*(AB21+AB30+AB34+AB37))+AB20+AB22+AB32+AB36",
  AC38: "=(('Variables & Outputs'!$B$197*'Variables & Outputs'!$B$189)*(AB21+AB30+AB34+AB37))+AB20+AB22+AB32+AB36",
  AD38: "=(('Variables & Outputs'!$B$197*'Variables & Outputs'!$B$189)*(AC21+AC30+AC34+AC37))+AC20+AC22+AC32+AC36",
  AE38: "=('Variables & Outputs'!$B$189*'Variables & Outputs'!$B$192)*SUM('Tax & levies - Mobility'!AE34:AE37)",
  AF38: "=('Variables & Outputs'!$B$189*'Variables & Outputs'!$B$192)*SUM('Tax & levies - Mobility'!AF34:AF37)",
  AG38: "=('Variables & Outputs'!$B$189*'Variables & Outputs'!$B$192)*SUM('Tax & levies - Mobility'!AG34:AG37)",
}

export function getMobilityTaxRates(country: string, vehicleType: "bus" | "car" | "motorcycle") {
  const normalizedCountry = country === "United Republic of Tanzania" ? "Tanzania" : country
  const countryData = mobilityTaxData[normalizedCountry as keyof typeof mobilityTaxData]

  if (!countryData) return { ice: 0, ev: 0 }

  const vehicleData = countryData[vehicleType]
  if (!vehicleData) return { ice: 0, ev: 0 }

  return {
    ice: vehicleData.ice,
    ev: vehicleData.ev,
  }
}
