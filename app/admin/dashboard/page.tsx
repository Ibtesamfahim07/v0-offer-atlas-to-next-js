"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/AdminLayout"
import { useAdmin } from "@/contexts/AdminContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const router = useRouter()
  const { coupons, stores, blogPosts } = useAdmin()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin_authenticated")
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [router])

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome to the admin panel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Coupons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{coupons.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Stores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stores.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{blogPosts.length}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
