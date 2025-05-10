import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { WagmiProvider } from "wagmi"
import { config } from "@/config"
import QueryClientProvider2 from "@/providers/QueryClientProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Crypto Lottery DApp",
  description: "A decentralized lottery application built on Ethereum",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

 
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider2>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
    </QueryClientProvider2>
  </WagmiProvider>
  )
}
