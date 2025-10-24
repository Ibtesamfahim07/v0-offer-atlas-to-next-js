"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import StoreCard from "@/components/StoreCard"
import SEO from "@/components/SEO"
import { useAdmin } from "@/contexts/AdminContext"
import { useEffect } from "react"
import { trackPageView } from "@/utils/analytics"
import { generateBreadcrumbSchema } from "@/utils/structuredData"

export default function StoresPage() {
  const { stores, siteSettings } = useAdmin()

  useEffect(() => {
    trackPageView("/stores", "All Stores - Offer Atlas")
  }, [])

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Stores", url: "/stores" },
  ])

  return (
    <>
      <SEO
        title={siteSettings.pageMeta.stores.title}
        description={siteSettings.pageMeta.stores.description}
        schema={[breadcrumbSchema]}
      />
      <Navbar />

      <main className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">All Stores</h1>
          <p className="text-gray-600 mb-8">{siteSettings.pageMeta.stores.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
