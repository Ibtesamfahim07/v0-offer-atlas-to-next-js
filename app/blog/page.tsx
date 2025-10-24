"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BlogCard from "@/components/BlogCard"
import SEO from "@/components/SEO"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAdmin } from "@/contexts/AdminContext"
import { useEffect, useState } from "react"
import { trackPageView } from "@/utils/analytics"
import { generateBreadcrumbSchema } from "@/utils/structuredData"

export default function BlogPage() {
  const { blogPosts, siteSettings } = useAdmin()
  const [selectedCategory, setSelectedCategory] = useState("All Posts")

  useEffect(() => {
    trackPageView("/blog", "Savings Blog - Offer Atlas")
  }, [])

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ])

  const categories = ["All Posts", "Shopping Tips", "Deal Guides", "Tutorials", "App Reviews", "Money Saving"]

  const filteredPosts =
    selectedCategory === "All Posts" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  return (
    <>
      <SEO
        title={siteSettings.pageMeta.blog.title}
        description={siteSettings.pageMeta.blog.description}
        schema={[breadcrumbSchema]}
      />
      <Navbar />

      <main className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Blog Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Savings Blog</h1>
            <p className="text-gray-600 text-lg">{siteSettings.pageMeta.blog.description}</p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input placeholder="Search articles..." className="pl-10" />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
