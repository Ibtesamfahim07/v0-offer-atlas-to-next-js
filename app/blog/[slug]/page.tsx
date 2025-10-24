"use client"

import { useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SEO from "@/components/SEO"
import { generateArticleSchema, generateBreadcrumbSchema } from "@/utils/structuredData"
import { useEffect } from "react"
import { trackPageView } from "@/utils/analytics"
import { useAdmin } from "@/contexts/AdminContext"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const { blogPosts } = useAdmin()
  const post = blogPosts.find((p) => p.slug === slug)

  useEffect(() => {
    if (post) {
      trackPageView(`/blog/${slug}`, `${post.title} - Offer Atlas`)
    }
  }, [slug, post])

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: post.author,
    url: `/blog/${slug}`,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${slug}` },
  ])

  return (
    <>
      <SEO title={post.title} description={post.excerpt} schema={[articleSchema, breadcrumbSchema]} />
      <Navbar />

      <main className="min-h-screen py-8">
        <article className="container mx-auto px-4 max-w-3xl">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />

          <div className="mb-6">
            <span className="text-blue-600 font-semibold">{post.category}</span>
            <h1 className="text-4xl font-bold mt-2 mb-4">{post.title}</h1>
            <div className="flex justify-between text-gray-600 text-sm">
              <span>By {post.author}</span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Table of Contents */}
          {post.tableOfContents && post.tableOfContents.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="font-bold mb-4">Table of Contents</h2>
              <ul className="space-y-2">
                {post.tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-blue-600 hover:underline">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <p>{post.content}</p>
          </div>

          {/* Additional Sections */}
          {post.additionalSections &&
            post.additionalSections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <p className="text-gray-700">{section.content}</p>
              </div>
            ))}

          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts
                  .filter((p) => post.relatedPosts?.includes(p.id))
                  .map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                        <img
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-bold">{relatedPost.title}</h3>
                          <p className="text-sm text-gray-600 mt-2">{relatedPost.excerpt}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </>
  )
}
