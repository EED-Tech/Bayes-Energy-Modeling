// Structured tax data for mobility vehicles
export interface MobilityTaxData {
  country: string
  vehicleType: string
  driveType: "ICE" | "EV"
  nonRecurring: {
    importDuty?: number
    surtax?: number
    exciseDuty?: number
    importDeclarationFees?: number
    importDeclarationSurcharge?: number
    infrastructuralLevy?: number
    hivAidsLevy?: number
    vat?: number
    registrationFees?: number
    numberPlates?: number
    inspectionOnRegistration?: number
  }
  recurringFixed: {
    roadLicenseInspection?: number
    insurancePolicyHolderLevy?: number
    trainingLevy?: number
    vatOnInsurance?: number
    stampDutyOnInsurance?: number
  }
  recurringEnergy: {
    carbonTax?: number
    exciseDuty?: number
    roadMaintenanceLevy?: number
    petroleumDevelopmentLevy?: number
    petroleumRegulatoryLevy?: number
    railwayDevelopmentLevy?: number
    merchantShippingLevy?: number
    importDeclarationFees?: number
    wayLeaveCharges?: number
    customsProcessingFee?: number
    weightsAndMeasuresFee?: number
    tbsCharge?: number
    storageCharge?: number
    tasacFee?: number
    vat?: number
    waterLevy?: number
    regulatorLevy?: number
    rep?: number
  }
  totalEnergy?: number
}

export const mobilityTaxData: MobilityTaxData[] = [
  // Kenya
  {
    country: "Kenya",
    vehicleType: "Bus",
    driveType: "ICE",
    nonRecurring: {
      importDuty: 0.1,
      importDeclarationFees: 0.035,
      infrastructuralLevy: 0.02,
      vat: 0.16,
      registrationFees: 16600,
      numberPlates: 3050,
      inspectionOnRegistration: 0,
    },
    recurringFixed: { roadLicenseInspection: 3500, insurancePolicyHolderLevy: 0.025, trainingLevy: 0.02 },
    recurringEnergy: {
      exciseDuty: 11.37,
      roadMaintenanceLevy: 25,
      petroleumDevelopmentLevy: 5.4,
      petroleumRegulatoryLevy: 0.75,
      railwayDevelopmentLevy: 1.53,
      merchantShippingLevy: 0.03,
      importDeclarationFees: 1.93,
      vat: 23.65,
    },
    totalEnergy: 0.54,
  },
  {
    country: "Kenya",
    vehicleType: "Bus",
    driveType: "EV",
    nonRecurring: {
      importDuty: 0.1,
      importDeclarationFees: 0.035,
      infrastructuralLevy: 0.02,
      vat: 0.16,
      registrationFees: 16600,
      numberPlates: 3050,
      inspectionOnRegistration: 0,
    },
    recurringFixed: { roadLicenseInspection: 3500, insurancePolicyHolderLevy: 0.025, trainingLevy: 0.02 },
    recurringEnergy: { waterLevy: 0.02, regulatorLevy: 0.03, rep: 0.05, vat: 0.16 },
    totalEnergy: 0.05,
  },
  {
    country: "Kenya",
    vehicleType: "Passenger Car",
    driveType: "ICE",
    nonRecurring: {
      importDuty: 0.35,
      exciseDuty: 0.25,
      importDeclarationFees: 0.035,
      infrastructuralLevy: 0.02,
      vat: 0.16,
      registrationFees: 13000,
      numberPlates: 3050,
      inspectionOnRegistration: 3500,
    },
    recurringFixed: { insurancePolicyHolderLevy: 0.025, trainingLevy: 0.02 },
    recurringEnergy: {
      exciseDuty: 21.95,
      roadMaintenanceLevy: 25,
      petroleumDevelopmentLevy: 5.4,
      petroleumRegulatoryLevy: 0.75,
      railwayDevelopmentLevy: 1.53,
      merchantShippingLevy: 0.03,
      importDeclarationFees: 1.92,
      vat: 25.45,
    },
    totalEnergy: 0.63,
  },
  {
    country: "Kenya",
    vehicleType: "Passenger Car",
    driveType: "EV",
    nonRecurring: {
      importDuty: 0.25,
      exciseDuty: 0.1,
      importDeclarationFees: 0.035,
      infrastructuralLevy: 0.02,
      vat: 0.16,
      registrationFees: 13000,
      numberPlates: 3050,
      inspectionOnRegistration: 3500,
    },
    recurringFixed: { insurancePolicyHolderLevy: 0.025, trainingLevy: 0.02 },
    recurringEnergy: { waterLevy: 0.02, regulatorLevy: 0.03, rep: 0.05, vat: 0.16 },
    totalEnergy: 0.05,
  },
  {
    country: "Kenya",
    vehicleType: "Motorcycle",
    driveType: "ICE",
    nonRecurring: {
      importDuty: 0.1,
      importDeclarationFees: 0.035,
      infrastructuralLevy: 0.02,
      vat: 0.16,
      registrationFees: 3400,
      numberPlates: 3050,
    },
    recurringFixed: { insurancePolicyHolderLevy: 0.025, trainingLevy: 0.02 },
    recurringEnergy: {
      exciseDuty: 21.95,
      roadMaintenanceLevy: 25,
      petroleumDevelopmentLevy: 5.4,
      petroleumRegulatoryLevy: 0.75,
      railwayDevelopmentLevy: 1.53,
      merchantShippingLevy: 0.03,
      importDeclarationFees: 1.92,
      vat: 25.45,
    },
    totalEnergy: 0.63,
  },
  {
    country: "Kenya",
    vehicleType: "Motorcycle",
    driveType: "EV",
    nonRecurring: {
      importDuty: 0.1,
      importDeclarationFees: 0.035,
      infrastructuralLevy: 0.02,
      vat: 0.16,
      registrationFees: 3400,
      numberPlates: 3050,
    },
    recurringFixed: { insurancePolicyHolderLevy: 0.025, trainingLevy: 0.02 },
    recurringEnergy: { waterLevy: 0.02, regulatorLevy: 0.03, rep: 0.05, vat: 0.16 },
    totalEnergy: 0.05,
  },

  // Uganda
  {
    country: "Uganda",
    vehicleType: "Bus",
    driveType: "ICE",
    nonRecurring: { importDuty: 0.1, importDeclarationFees: 0.04, infrastructuralLevy: 0.015, vat: 0.18 },
    recurringFixed: { roadLicenseInspection: 135000, stampDutyOnInsurance: 35000, vatOnInsurance: 0.018 },
    recurringEnergy: { exciseDuty: 900, vatOnInsurance: 0.018 },
    totalEnergy: 0.11,
  },
  {
    country: "Uganda",
    vehicleType: "Bus",
    driveType: "EV",
    nonRecurring: { importDuty: 0.1, importDeclarationFees: 0.04, infrastructuralLevy: 0.015, vat: 0.18 },
    recurringFixed: { roadLicenseInspection: 135000, stampDutyOnInsurance: 35000, vatOnInsurance: 0.018 },
    recurringEnergy: { regulatorLevy: 0.03, rep: 0.05, vatOnInsurance: 0.018 },
    totalEnergy: 0.05,
  },
  {
    country: "Uganda",
    vehicleType: "Passenger Car",
    driveType: "ICE",
    nonRecurring: {
      importDuty: 0.35,
      exciseDuty: 0.2,
      importDeclarationFees: 0.04,
      infrastructuralLevy: 0.015,
      vat: 0.18,
    },
    recurringFixed: { stampDutyOnInsurance: 35000, vatOnInsurance: 0.018 },
    recurringEnergy: { exciseDuty: 900, vatOnInsurance: 0.018 },
    totalEnergy: 0.11,
  },
  {
    country: "Uganda",
    vehicleType: "Passenger Car",
    driveType: "EV",
    nonRecurring: {
      importDuty: 0.35,
      exciseDuty: 0.1,
      importDeclarationFees: 0.04,
      infrastructuralLevy: 0.015,
      vat: 0.18,
    },
    recurringFixed: { stampDutyOnInsurance: 35000, vatOnInsurance: 0.018 },
    recurringEnergy: { regulatorLevy: 0.03, rep: 0.05, vatOnInsurance: 0.018 },
    totalEnergy: 0.05,
  },
  {
    country: "Uganda",
    vehicleType: "Motorcycle",
    driveType: "ICE",
    nonRecurring: {
      importDuty: 0.1,
      importDeclarationFees: 0.04,
      infrastructuralLevy: 0.015,
      vat: 0.18,
      numberPlates: 50000,
    },
    recurringFixed: { stampDutyOnInsurance: 35000, vatOnInsurance: 0.018 },
    recurringEnergy: { exciseDuty: 900, vatOnInsurance: 0.018 },
    totalEnergy: 0.11,
  },
  {
    country: "Uganda",
    vehicleType: "Motorcycle",
    driveType: "EV",
    nonRecurring: {
      importDuty: 0.1,
      importDeclarationFees: 0.04,
      infrastructuralLevy: 0.015,
      vat: 0.18,
      numberPlates: 50000,
    },
    recurringFixed: { stampDutyOnInsurance: 35000, vatOnInsurance: 0.018 },
    recurringEnergy: { regulatorLevy: 0.03, rep: 0.05, vatOnInsurance: 0.018 },
    totalEnergy: 0.05,
  },

  // Tanzania
  {
    country: "Tanzania",
    vehicleType: "Bus",
    driveType: "ICE",
    nonRecurring: {
      importDuty: 0.1,
      importDeclarationFees: 0.0112,
      importDeclarationSurcharge: 10,
      vat: 0.2,
      registrationFees: 300000,
      hivAidsLevy: 200000,
    },
    recurringEnergy: {
      exciseDuty: 379,
      petroleumDevelopmentLevy: 413,
      railwayDevelopmentLevy: 20.36,
      wayLeaveCharges: 6.09,
      customsProcessingFee: 0.76,
      weightsAndMeasuresFee: 0.27,
      tbsCharge: 0.48,
      tasacFee: 0.76,
    },
    totalEnergy: 0.34,
  },
  {
    country: "Tanzania",
    vehicleType: "Bus",
    driveType: "EV",
    nonRecurring: {
      importDuty: 0.1,
      importDeclarationFees: 0.0112,
      importDeclarationSurcharge: 10,
      vat: 0.2,
      registrationFees: 300000,
      hivAidsLevy: 250000,
    },
    recurringEnergy: { regulatorLevy: 0.01, rep: 0.03 },
    totalEnergy: 0.02,
  },
  {
    country: "Tanzania",
    vehicleType: "Passenger Car",
    driveType: "ICE",
    nonRecurring: {
      importDuty: 0.25,
      exciseDuty: 0.05,
      importDeclarationFees: 0.0112,
      importDeclarationSurcharge: 10,
      vat: 0.2,
      registrationFees: 200000,
      hivAidsLevy: 100000,
    },
    recurringEnergy: {
      exciseDuty: 379,
      petroleumDevelopmentLevy: 413,
      railwayDevelopmentLevy: 20.36,
      wayLeaveCharges: 6.09,
      customsProcessingFee: 0.76,
      weightsAndMeasuresFee: 0.27,
      tbsCharge: 0.48,
      tasacFee: 0.76,
    },
    totalEnergy: 0.34,
  },
  {
    country: "Tanzania",
    vehicleType: "Passenger Car",
    driveType: "EV",
    nonRecurring: {
      importDuty: 0.25,
      importDeclarationFees: 0.0112,
      importDeclarationSurcharge: 10,
      vat: 0.2,
      registrationFees: 200000,
      hivAidsLevy: 95000,
    },
    recurringEnergy: { regulatorLevy: 0.01, rep: 0.03 },
    totalEnergy: 0.02,
  },
  {
    country: "Tanzania",
    vehicleType: "Motorcycle",
    driveType: "ICE",
    nonRecurring: {
      importDuty: 0.1,
      importDeclarationFees: 0.0112,
      importDeclarationSurcharge: 10,
      vat: 0.2,
      registrationFees: 50000,
      hivAidsLevy: 50000,
    },
    recurringEnergy: {
      exciseDuty: 379,
      petroleumDevelopmentLevy: 413,
      railwayDevelopmentLevy: 20.36,
      wayLeaveCharges: 6.09,
      customsProcessingFee: 0.76,
      weightsAndMeasuresFee: 0.27,
      tbsCharge: 0.48,
      tasacFee: 0.76,
    },
    totalEnergy: 0.34,
  },
  {
    country: "Tanzania",
    vehicleType: "Motorcycle",
    driveType: "EV",
    nonRecurring: {
      importDuty: 0.1,
      importDeclarationFees: 0.0112,
      importDeclarationSurcharge: 10,
      vat: 0.2,
      registrationFees: 50000,
      hivAidsLevy: 95000,
    },
    recurringEnergy: { regulatorLevy: 0.01, rep: 0.03 },
    totalEnergy: 0.02,
  },

  // Ethiopia
  {
    country: "Ethiopia",
    vehicleType: "Bus",
    driveType: "ICE",
    nonRecurring: { importDuty: 0.35, surtax: 0.1, vat: 0, registrationFees: 5000 },
    recurringEnergy: { exciseDuty: 0.15, weightsAndMeasuresFee: 0.005, vat: 0.15 },
    totalEnergy: 0.09,
  },
  {
    country: "Ethiopia",
    vehicleType: "Bus",
    driveType: "EV",
    nonRecurring: { vat: 0, registrationFees: 5000 },
    recurringEnergy: { rep: 0, vat: 0.15 },
    totalEnergy: 0,
  },
  {
    country: "Ethiopia",
    vehicleType: "Passenger Car",
    driveType: "ICE",
    nonRecurring: { importDuty: 0.35, weightsAndMeasuresFee: 1e99, vat: 0, registrationFees: 5000 },
    recurringEnergy: { exciseDuty: 0.15, weightsAndMeasuresFee: 0.005, vat: 0.15 },
    totalEnergy: 0.09,
  },
  {
    country: "Ethiopia",
    vehicleType: "Passenger Car",
    driveType: "EV",
    nonRecurring: { vat: 0, registrationFees: 5000 },
    recurringEnergy: { rep: 0, vat: 0.15 },
    totalEnergy: 0,
  },
  {
    country: "Ethiopia",
    vehicleType: "Motorcycle",
    driveType: "ICE",
    nonRecurring: { importDuty: 0.35, surtax: 0.1, vat: 0, registrationFees: 5000 },
    recurringEnergy: { exciseDuty: 0.15, weightsAndMeasuresFee: 0.005, vat: 0.15 },
    totalEnergy: 0.09,
  },
  {
    country: "Ethiopia",
    vehicleType: "Motorcycle",
    driveType: "EV",
    nonRecurring: { vat: 0, registrationFees: 5000 },
    recurringEnergy: { rep: 0, vat: 0.15 },
    totalEnergy: 0,
  },

  // Malawi
  {
    country: "Malawi",
    vehicleType: "Bus",
    driveType: "ICE",
    nonRecurring: { importDuty: 0.2, exciseDuty: 0.15, vat: 0.165, registrationFees: 5000, numberPlates: 12500 },
    recurringFixed: { roadLicenseInspection: 12500, inspectionOnRegistration: 2750 },
    recurringEnergy: { carbonTax: 5, roadMaintenanceLevy: 100, vat: 0.165 },
    totalEnergy: 0.35,
  },
  {
    country: "Malawi",
    vehicleType: "Bus",
    driveType: "EV",
    nonRecurring: { vat: 0.165, registrationFees: 5000, numberPlates: 12500 },
    recurringFixed: { roadLicenseInspection: 12500, inspectionOnRegistration: 2750 },
    recurringEnergy: { storageCharge: 10, regulatorLevy: 0.01, rep: 0.045, vat: 0.165 },
    totalEnergy: 0.03,
  },
  {
    country: "Malawi",
    vehicleType: "Passenger Car",
    driveType: "ICE",
    nonRecurring: { importDuty: 0.2, exciseDuty: 0.15, vat: 0.165, registrationFees: 5000, numberPlates: 12500 },
    recurringFixed: { roadLicenseInspection: 0, inspectionOnRegistration: 2750 },
    recurringEnergy: { carbonTax: 5, roadMaintenanceLevy: 100, vat: 0.165 },
    totalEnergy: 0.35,
  },
  {
    country: "Malawi",
    vehicleType: "Passenger Car",
    driveType: "EV",
    nonRecurring: { vat: 0.165, registrationFees: 5000, numberPlates: 12500 },
    recurringFixed: { roadLicenseInspection: 0, inspectionOnRegistration: 2750 },
    recurringEnergy: { storageCharge: 10, regulatorLevy: 0.01, rep: 0.045, vat: 0.165 },
    totalEnergy: 0.03,
  },
  {
    country: "Malawi",
    vehicleType: "Motorcycle",
    driveType: "ICE",
    nonRecurring: { importDuty: 0.2, exciseDuty: 0.15, vat: 0.165, registrationFees: 5000, numberPlates: 12500 },
    recurringFixed: { roadLicenseInspection: 0, inspectionOnRegistration: 2750 },
    recurringEnergy: { carbonTax: 5, roadMaintenanceLevy: 100, vat: 0.165 },
    totalEnergy: 0.35,
  },
  {
    country: "Malawi",
    vehicleType: "Motorcycle",
    driveType: "EV",
    nonRecurring: { vat: 0.165, registrationFees: 5000, numberPlates: 12500 },
    recurringFixed: { roadLicenseInspection: 0, inspectionOnRegistration: 2750 },
    recurringEnergy: { storageCharge: 10, regulatorLevy: 0.01, rep: 0.045, vat: 0.165 },
    totalEnergy: 0.03,
  },
]

export function getMobilityTaxDetails(
  country: string,
  vehicleType: string,
  driveType: "ICE" | "EV",
): MobilityTaxData | undefined {
  const normalizedCountry = country === "United Republic of Tanzania" ? "Tanzania" : country
  return mobilityTaxData.find(
    (d) => d.country === normalizedCountry && d.vehicleType === vehicleType && d.driveType === driveType,
  )
}
