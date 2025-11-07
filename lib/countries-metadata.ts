export interface CountryMetadata {
  name: string
  flag: string
  flagUrl: string
  mapUrl: string
}

export const countriesMetadata: Record<string, CountryMetadata> = {
  Uganda: {
    name: "Uganda",
    flag: "🇺🇬",
    flagUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uganda%20Flag-sKXQjOpwPLsIUB3l76NujIEJ2uKhKh.png",
    mapUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Uganda%20Map-fD16wylGDUcrxQo4rtyHrLYLe8js79.png",
  },
  Ethiopia: {
    name: "Ethiopia",
    flag: "🇪🇹",
    flagUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ethiopia%20Flag-41CWbSfIpKitMiacb6gO0LTuJVTMaw.png",
    mapUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ethiopia%20Map-K0P3MHsvZvNMLC1RQ7MEHzQTtjoH3d.png",
  },
  Kenya: {
    name: "Kenya",
    flag: "🇰🇪",
    flagUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kenya%20Flag-gf1juabUcdrsUPSMHUF5QpH5WyMeBv.png",
    mapUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kenya%20Map-JZ7pavUKe8QyaMpmk1TB6ifGIDKV4U.png",
  },
  Malawi: {
    name: "Malawi",
    flag: "🇲🇼",
    flagUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/malawi%20Flag-4yvrkUU9FtYISNuoBWO4trtRZ2YgWf.png",
    mapUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Malawi%20Map-kk2q8Q9HCatHQhBPjWeswSCsNlcNyw.png",
  },
  "United Republic of Tanzania": {
    name: "Tanzania",
    flag: "🇹🇿",
    flagUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tanzania%20Flag-zHzigbGEJg3EP4oCoc5lpc4jSqt1ES.png",
    mapUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tanzania%20Map-jVnxFLmxHYPsGAYGkmLdHByf4kuhIv.png",
  },
}

// Helper to get metadata with fallback for Tanzania
export function getCountryMetadata(country: string): CountryMetadata {
  return countriesMetadata[country] || countriesMetadata["United Republic of Tanzania"]
}
