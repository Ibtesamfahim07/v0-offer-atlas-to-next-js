"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Offer Atlas
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/stores" className="hover:text-blue-600">
              Stores
            </Link>
            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>
            <Link href="/admin/login" className="hover:text-blue-600">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/" className="block py-2 hover:text-blue-600">
              Home
            </Link>
            <Link href="/stores" className="block py-2 hover:text-blue-600">
              Stores
            </Link>
            <Link href="/blog" className="block py-2 hover:text-blue-600">
              Blog
            </Link>
            <Link href="/admin/login" className="block py-2 hover:text-blue-600">
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
