// Structured tax data for cooking energy sources
export interface CookingTaxData {
  country: string
  fuelType: string
  nonRecurring: {
    importDuty?: number
    exciseDuty?: number
    importDeclarationFees?: number
    infrastructuralLevy?: number
    vat?: number
  }
  recurringPerUnit: {
    productionLicense?: number
    importDuty?: number
    movementPermit?: number
    cessTax?: number
    petroleumLevy?: number
    informalTaxes?: number
    vat?: number
    waterLevy?: number
    regulatorLevy?: number
    rep?: number
  }
  totalPerUnit?: number
  prevailingPrice?: number
}

export const cookingTaxData: CookingTaxData[] = [
  // Kenya
  {
    country: "Kenya",
    fuelType: "Charcoal",
    nonRecurring: { vat: 0 },
    recurringPerUnit: {
      productionLicense: 0.055,
      importDuty: 1.022,
      movementPermit: 0.333,
      cessTax: 11.11,
      informalTaxes: 13.03,
    },
    totalPerUnit: 0.197,
    prevailingPrice: 0,
  },
  {
    country: "Kenya",
    fuelType: "LPG",
    nonRecurring: { importDuty: 0, importDeclarationFees: 0.035, infrastructuralLevy: 0.02, vat: 0.16 },
    recurringPerUnit: { petroleumLevy: 0.4, vat: 0 },
    totalPerUnit: 0.003,
    prevailingPrice: 0,
  },
  {
    country: "Kenya",
    fuelType: "Electric",
    nonRecurring: { importDuty: 0.25, importDeclarationFees: 0.035, infrastructuralLevy: 0.02, vat: 0.16 },
    recurringPerUnit: { waterLevy: 0.0178, regulatorLevy: 0.03, rep: 0.05, vat: 0.16 },
    totalPerUnit: 0.057,
    prevailingPrice: 0.22,
  },
  // Uganda
  {
    country: "Uganda",
    fuelType: "Charcoal",
    nonRecurring: { vat: 0 },
    recurringPerUnit: { movementPermit: 11.11, informalTaxes: 11.56 },
    totalPerUnit: 0.006,
    prevailingPrice: 0,
  },
  {
    country: "Uganda",
    fuelType: "LPG",
    nonRecurring: { importDuty: 0, importDeclarationFees: 0.06, infrastructuralLevy: 0.015, vat: 0.18 },
    recurringPerUnit: { vat: 0.18 },
    totalPerUnit: 0,
    prevailingPrice: 0,
  },
  {
    country: "Uganda",
    fuelType: "Electric",
    nonRecurring: { importDuty: 0.25, importDeclarationFees: 0.06, infrastructuralLevy: 0.015, vat: 0.18 },
    recurringPerUnit: { regulatorLevy: 0.0003, rep: 0.05, vat: 0.18 },
    totalPerUnit: 0.041,
    prevailingPrice: 0.18,
  },
  // Tanzania
  {
    country: "Tanzania",
    fuelType: "Charcoal",
    nonRecurring: { vat: 0 },
    recurringPerUnit: { productionLicense: 250, informalTaxes: 260.2 },
    totalPerUnit: 0.207,
    prevailingPrice: 0,
  },
  {
    country: "Tanzania",
    fuelType: "LPG",
    nonRecurring: { importDuty: 0, importDeclarationFees: 0.012, infrastructuralLevy: 0.015, vat: 0.18 },
    recurringPerUnit: { vat: 0.18 },
    totalPerUnit: 0,
    prevailingPrice: 0,
  },
  {
    country: "Tanzania",
    fuelType: "Electric",
    nonRecurring: { importDuty: 0.25, importDeclarationFees: 0.012, infrastructuralLevy: 0.015, vat: 0.18 },
    recurringPerUnit: { regulatorLevy: 0.01, rep: 0.03, vat: 0.18 },
    totalPerUnit: 0.021,
    prevailingPrice: 0.09,
  },
  // Ethiopia
  {
    country: "Ethiopia",
    fuelType: "Charcoal",
    nonRecurring: { importDuty: 0.3, vat: 0 },
    recurringPerUnit: { cessTax: 0.024 },
    totalPerUnit: 0.008,
    prevailingPrice: 0,
  },
  {
    country: "Ethiopia",
    fuelType: "LPG",
    nonRecurring: { importDuty: 0, importDeclarationFees: 0.03, vat: 0.15 },
    recurringPerUnit: { vat: 0.15 },
    totalPerUnit: 0,
    prevailingPrice: 0,
  },
  {
    country: "Ethiopia",
    fuelType: "Electric",
    nonRecurring: { importDuty: 0.3, importDeclarationFees: 0.03, vat: 0.15 },
    recurringPerUnit: { regulatorLevy: 0, rep: 0, vat: 0.15 },
    totalPerUnit: 0.001,
    prevailingPrice: 0.01,
  },
  // Malawi
  {
    country: "Malawi",
    fuelType: "Charcoal",
    nonRecurring: { vat: 0 },
    recurringPerUnit: { informalTaxes: 11.62 },
    totalPerUnit: 0.021,
    prevailingPrice: 0,
  },
  {
    country: "Malawi",
    fuelType: "LPG",
    nonRecurring: { importDuty: 0, importDeclarationFees: 0, infrastructuralLevy: 0, vat: 0.165 },
    recurringPerUnit: { vat: 0.165 },
    totalPerUnit: 0,
    prevailingPrice: 0,
  },
  {
    country: "Malawi",
    fuelType: "Electric",
    nonRecurring: { importDuty: 0, importDeclarationFees: 0, infrastructuralLevy: 0, vat: 0.165 },
    recurringPerUnit: { regulatorLevy: 0.01, rep: 0.045, vat: 0.165 },
    totalPerUnit: 0.021,
    prevailingPrice: 0.09,
  },
]

export function getCookingTaxDetails(country: string, fuelType: string): CookingTaxData | undefined {
  const normalizedCountry = country === "United Republic of Tanzania" ? "Tanzania" : country
  return cookingTaxData.find((d) => d.country === normalizedCountry && d.fuelType === fuelType)
}
