import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AdminProvider } from "@/contexts/AdminContext"
import { HelmetProvider } from "react-helmet-async"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/queryClient"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DealHub - Find Best Deals & Coupons",
  description: "Discover the best coupons, deals, and discounts from top stores",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.className}`}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <AdminProvider>
              <TooltipProvider>
                {children}
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </AdminProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </body>
    </html>
  )
}
