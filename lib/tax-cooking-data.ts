// Tax data for cooking fuels by country
export const cookingTaxData = {
  Kenya: {
    Charcoal: 0.197,
    LPG: 0.003,
    Electricity: 0.057,
  },
  Uganda: {
    Charcoal: 0.006,
    LPG: 0,
    Electricity: 0.041,
  },
  Tanzania: {
    Charcoal: 0.207,
    LPG: 0,
    Electricity: 0.021,
  },
  Ethiopia: {
    Charcoal: 0.008,
    LPG: 0,
    Electricity: 0.001,
  },
  Malawi: {
    Charcoal: 0.007,
    LPG: 0,
    Electricity: 0.021,
  },
}

// Old Excel-based data structure for backward compatibility with model-data.ts
export const Tax___levies___Cooking = {
  A1: "='#'",
  B1: "='Taxation type'",
  C1: "='Taxation'",
  D1: "='Kenya - Charcoal'",
  E1: "='Kenya - LPG'",
  F1: "='Kenya - Electric'",
  G1: "='Uganda - Charcoal'",
  H1: "='Uganda - LPG'",
  I1: "='Uganda - Electric'",
  J1: "='Tanzania - Charcoal'",
  K1: "='Tanzania - LPG'",
  L1: "='Tanzania - Electric'",
  M1: "='Ethiopia - Charcoal'",
  N1: "='Ethiopia - LPG'",
  O1: "='Ethiopia - Electric'",
  P1: "='Malawi - Charcoal'",
  Q1: "='Malawi - LPG'",
  R1: "='Malawi - Electric'",
  A19: "='Energy'",
  B19: "='Recurring variable costs (per kg / kWh)'",
  C19: "='Total'",
  D19: "=SUM(D8:D18)/'Variables & Outputs'!B186",
  E19: "=SUM(E8:E18)/'Variables & Outputs'!B186",
  F19: "=SUM(F15:F18)*F7",
  G19: "=SUM(G8:G18)/'Variables & Outputs'!B187",
  H19: "=SUM(H15:H18)*H7",
  I19: "=SUM(I15:I18)*I7",
  J19: "=SUM(J8:J18)/'Variables & Outputs'!B188",
  K19: "=SUM(K15:K18)*K7",
  L19: "=SUM(L15:L18)*L7",
  M19: "=SUM(M8:M18)/'Variables & Outputs'!B185",
  N19: "=SUM(N15:N18)*N7",
  O19: "=SUM(O15:O18)*O7",
  P19: "=SUM(P8:P18)/'Variables & Outputs'!B189",
  Q19: "=SUM(Q15:Q18)*Q7",
  R19: "=SUM(R15:R18)*R7",
}

export function getCookingTaxRates(country: string) {
  const normalizedCountry = country === "United Republic of Tanzania" ? "Tanzania" : country
  const rates = cookingTaxData[normalizedCountry as keyof typeof cookingTaxData]

  if (!rates) return { electricity: 0, lpg: 0, charcoal: 0 }

  return {
    electricity: rates.Electricity,
    lpg: rates.LPG,
    charcoal: rates.Charcoal,
  }
}
