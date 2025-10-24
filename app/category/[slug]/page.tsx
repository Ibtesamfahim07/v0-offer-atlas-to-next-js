"use client"

import { useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CouponCard from "@/components/CouponCard"
import SEO from "@/components/SEO"
import { Shirt, Laptop, Sparkles, Dumbbell, HomeIcon, UtensilsCrossed } from "lucide-react"
import { useSearch } from "@/hooks/useSearch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateBreadcrumbSchema } from "@/utils/structuredData"
import { useEffect } from "react"
import { trackPageView } from "@/utils/analytics"
import { useAdmin } from "@/contexts/AdminContext"
import Link from "next/link"

const categoryMap: Record<string, { name: string; icon: any; description: string }> = {
  fashion: {
    name: "Fashion",
    icon: Shirt,
    description: "Get the latest fashion deals on Clothing & Accessories at Offer Atlas.",
  },
  "clothing-accessories": {
    name: "Clothing & Accessories",
    icon: Shirt,
    description: "Get the latest fashion deals on Clothing & Accessories at Offer Atlas.",
  },
  electronics: {
    name: "Electronics",
    icon: Laptop,
    description: "Find the best deals on electronics, gadgets, and tech products from leading brands.",
  },
  beauty: {
    name: "Beauty",
    icon: Sparkles,
    description: "Save on beauty products, cosmetics, and skincare with exclusive coupon codes.",
  },
  sports: {
    name: "Sports",
    icon: Dumbbell,
    description: "Get discounts on sports equipment, fitness gear, and athletic wear.",
  },
  home: {
    name: "Home",
    icon: HomeIcon,
    description: "Shop home decor, furniture, and essentials at discounted prices.",
  },
  food: {
    name: "Food",
    icon: UtensilsCrossed,
    description: "Find deals on food delivery, restaurants, and grocery shopping.",
  },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const { coupons, stores, siteSettings } = useAdmin()

  const category = slug ? categoryMap[slug] || categoryMap.fashion : categoryMap.fashion
  const categoryCoupons = coupons.filter((c) => c.category.toLowerCase() === category.name.toLowerCase() && c.active)
  const categoryStores = stores.filter((s) => s.category.toLowerCase() === category.name.toLowerCase())

  const categoryContent = siteSettings.categoryContent?.[slug || "fashion"] || {
    description: category.description,
    featuredStores: [],
    relatedCategories: [],
  }

  const {
    sortBy,
    setSortBy,
    results: filteredCoupons,
  } = useSearch(categoryCoupons, ["title", "description", "code", "store"])

  useEffect(() => {
    trackPageView(`/category/${slug}`, `${category.name} Deals - Offer Atlas`)
  }, [slug, category.name])

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Categories", url: "/categories" },
    { name: category.name, url: `/category/${slug}` },
  ])

  return (
    <>
      <SEO
        title={`${category.name} Coupons & Deals`}
        description={categoryContent.description}
        schema={[breadcrumbSchema]}
      />
      <Navbar />

      <main className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Category Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Top {category.name} Coupons and Discount Codes</h1>
            <p className="text-gray-600 text-lg">{categoryContent.description}</p>
          </div>

          {/* Featured Coupons */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Featured Coupons</h2>

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

            {filteredCoupons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No deals available in this category.</p>
            )}
          </div>

          {/* Featured Stores Section */}
          {categoryStores.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Our Featured Stores</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categoryStores.slice(0, 24).map((store) => (
                  <Link
                    key={store.id}
                    href={`/store/${store.slug}`}
                    className="text-center hover:opacity-75 transition"
                  >
                    <img
                      src={store.logo || "/placeholder.svg"}
                      alt={store.name}
                      className="w-full h-16 object-contain mb-2"
                    />
                    <p className="text-sm text-gray-600">{store.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
