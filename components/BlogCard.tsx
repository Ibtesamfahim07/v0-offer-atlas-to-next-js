"use client"

import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  image: string
  category: string
  date: string
  readTime: string
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
        <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <span className="text-sm text-blue-600 font-semibold">{post.category}</span>
          <h3 className="font-bold text-lg mt-2 mb-2">{post.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
