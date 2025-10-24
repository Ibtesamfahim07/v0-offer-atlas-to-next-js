"use client"

import { useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CouponCard from "@/components/CouponCard"
import SEO from "@/components/SEO"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useSearch } from "@/hooks/useSearch"
import { generateStoreSchema, generateBreadcrumbSchema } from "@/utils/structuredData"
import { useEffect } from "react"
import { trackPageView } from "@/utils/analytics"
import { useAdmin } from "@/contexts/AdminContext"
import Link from "next/link"

export default function StorePage() {
  const params = useParams()
  const slug = params.slug as string
  const { stores, coupons, incrementCouponClick } = useAdmin()
  const store = stores.find((s) => s.slug === slug)
  const storeCoupons = coupons.filter((c) => c.store === store?.name && c.active)

  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    results: filteredCoupons,
  } = useSearch(storeCoupons, ["title", "description", "code"])

  useEffect(() => {
    if (store) {
      trackPageView(`/store/${slug}`, `${store.name} Coupons - DealHub`)
    }
  }, [slug, store])

  if (!store) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Store Not Found</h1>
          <p className="text-gray-600 mb-8">The store you're looking for doesn't exist.</p>
          <Link href="/stores">
            <Button>Back to Stores</Button>
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  const storeSchema = generateStoreSchema({
    name: store.name,
    description: store.description,
    logo: store.logo,
    website: store.url,
  })
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Stores", url: "/stores" },
    { name: store.name, url: `/store/${slug}` },
  ])

  return (
    <>
      <SEO
        title={`${store.name} Coupons & Deals`}
        description={store.description}
        schema={[storeSchema, breadcrumbSchema]}
      />
      <Navbar />

      <main className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow">
                <img
                  src={store.logo || "/placeholder.svg"}
                  alt={store.name}
                  className="w-full h-32 object-contain mb-4"
                />
                <p className="text-sm text-gray-600 mb-4">{storeCoupons.length} Offers Available</p>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">Rate {store.name} Offers</h3>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Rated 4.5 / 5 by 124 users</p>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <h1 className="text-4xl font-bold mb-2">{store.name} Promo Codes & Discount Deals</h1>
              <p className="text-gray-600 mb-8">Save Big With {store.name} Promo Codes and Deals</p>

              <div className="mb-6">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="expiring">Expiring Soon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Coupons List */}
              {filteredCoupons.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredCoupons.map((coupon) => (
                    <CouponCard key={coupon.id} coupon={coupon} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No active coupons available for this store.</p>
              )}

              {/* About Store Section */}
              {store.aboutStore && (
                <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">About {store.name}</h2>
                  <p className="text-gray-700">{store.aboutStore}</p>
                </div>
              )}

              {/* FAQs Section */}
              {store.faqs && store.faqs.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible>
                    {store.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
