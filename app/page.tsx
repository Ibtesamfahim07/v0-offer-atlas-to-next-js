"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CouponCard from "@/components/CouponCard"
import StoreCard from "@/components/StoreCard"
import SEO from "@/components/SEO"
import Link from "next/link"
import { generateWebsiteSchema, generateBreadcrumbSchema } from "@/utils/structuredData"
import { useSearch } from "@/hooks/useSearch"
import { useEffect } from "react"
import { trackPageView } from "@/utils/analytics"
import { useAdmin } from "@/contexts/AdminContext"

export default function Home() {
  const { coupons, stores, blogPosts, siteSettings, homePageSettings } = useAdmin()
  const activeCoupons = coupons.filter(
    (c) => c.active && (!c.expiryDate || (c.expiryDate && new Date(c.expiryDate) > new Date())),
  )

  const {
    searchQuery,
    setSearchQuery,
    results: filteredCoupons,
  } = useSearch(activeCoupons, ["title", "description", "code", "store"])

  useEffect(() => {
    trackPageView("/", "Home - Offer Atlas")
  }, [])

  const heroFeaturedStores =
    homePageSettings.featuredStoreIds.length > 0
      ? stores.filter((s) => homePageSettings.featuredStoreIds.includes(s.id)).slice(0, 8)
      : stores.slice(0, 8)

  const displayCoupons =
    homePageSettings.featuredCouponIds.length > 0
      ? coupons.filter((c) => homePageSettings.featuredCouponIds.includes(c.id) && c.active)
      : filteredCoupons

  const displayBlogPosts =
    homePageSettings.featuredBlogPostIds.length > 0
      ? blogPosts.filter((p) => homePageSettings.featuredBlogPostIds.includes(p.id))
      : blogPosts

  const featuredStores =
    homePageSettings.topStoreIds.length > 0
      ? stores.filter((s) => homePageSettings.topStoreIds.includes(s.id))
      : stores.slice(0, 8)

  const topStores =
    homePageSettings.topStoreIds.length > 0
      ? stores.filter((s) => homePageSettings.topStoreIds.includes(s.id))
      : stores.slice(0, 8)

  const popularStores =
    homePageSettings.popularStoreIds.length > 0
      ? stores.filter((s) => homePageSettings.popularStoreIds.includes(s.id))
      : stores

  const websiteSchema = generateWebsiteSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: "Home", url: "/" }])

  return (
    <>
      <SEO
        title={siteSettings.pageMeta.home.title}
        description={siteSettings.pageMeta.home.description}
        schema={[websiteSchema, breadcrumbSchema]}
      />
      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">{homePageSettings.heroTitle}</h1>

            {/* Featured Store Logos */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 mb-8">
              {heroFeaturedStores.map((store) => (
                <Link key={store.id} href={`/store/${store.slug}`}>
                  <img
                    src={store.logo || "/placeholder.svg"}
                    alt={store.name}
                    className="h-12 object-contain hover:opacity-75 transition"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Coupons */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">Today's Top Coupons and Discount Codes</h2>
            <p className="text-gray-600 mb-8">{homePageSettings.heroDescription}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCoupons.slice(0, homePageSettings.maxCouponsDisplay).map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon} />
              ))}
            </div>

            {displayCoupons.length === 0 && <p className="text-center text-gray-500">No coupons found.</p>}
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayBlogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                    <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <span className="text-sm text-blue-600">{post.category}</span>
                      <h3 className="font-bold text-lg mt-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mt-2">{post.excerpt}</p>
                      <div className="flex justify-between text-xs text-gray-500 mt-4">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Stores */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Featured Stores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </div>
        </section>

        {/* Our Top Stores */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Our Top Stores</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {topStores.map((store) => (
                <Link key={store.id} href={`/store/${store.slug}`} className="text-blue-600 hover:underline">
                  {store.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Stores */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Popular Stores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
