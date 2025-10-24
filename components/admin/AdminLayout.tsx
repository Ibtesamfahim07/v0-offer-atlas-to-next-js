"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin_authenticated")
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated")
    router.push("/admin/login")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav className="space-y-4">
          <Link href="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-gray-800">
            Dashboard
          </Link>
          <Link href="/admin/coupons" className="block py-2 px-4 rounded hover:bg-gray-800">
            Manage Coupons
          </Link>
          <Link href="/admin/stores" className="block py-2 px-4 rounded hover:bg-gray-800">
            Manage Stores
          </Link>
          <Link href="/admin/blog" className="block py-2 px-4 rounded hover:bg-gray-800">
            Manage Blog
          </Link>
          <Link href="/admin/settings" className="block py-2 px-4 rounded hover:bg-gray-800">
            Settings
          </Link>
        </nav>
        <Button onClick={handleLogout} variant="outline" className="w-full mt-8 bg-transparent">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
