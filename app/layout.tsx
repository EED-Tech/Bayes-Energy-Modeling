import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Nav } from "@/components/nav"
import { Toaster } from "@/components/ui/sonner"
import { GlobalStateProvider } from "@/lib/global-state"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EED Energy Modelling",
  description: "Created ",
  generator: "MK",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <GlobalStateProvider>
          <Nav />
          {children}
        </GlobalStateProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
