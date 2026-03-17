import type React from "react"
import type { Metadata } from "next"
import { Outfit, Great_Vibes, Bricolage_Grotesque } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Navbar from "@/components/navbar"
import { StarknetProvider } from "@/context/starknet-provider"
import { Toaster } from "@/components/ui/sonner"
import PrivyProviderWrapper from "@/components/privy-provider-wrapper"
import "./globals.css"

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-mono",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
})

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vibes",
})

export const metadata: Metadata = {
  title: "0xFoodpreneur — Own food biz website",
  description:
    "Get a professional website for your food business at a discounted rate. Limited New Year offer with direct ownership and control."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="preload" href="https://lottie.host/11f746b7-821e-4c3a-9051-100b0814ca92/tJIbLlYsId.lottie" as="fetch" /> */}
      </head>

      <body className={`${outfit.variable} ${greatVibes.variable} ${bricolageGrotesque.variable}  font-sans antialiased`}>
        <PrivyProviderWrapper>
          <StarknetProvider>
            <Navbar />
            {children}
            <Toaster />
            <Analytics />
          </StarknetProvider>
        </PrivyProviderWrapper>
      </body>
    </html>
  )
}
