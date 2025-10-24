"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Store {
  id: string
  name: string
  slug: string
  logo: string
  description: string
  category: string
  couponsCount: number
  url: string
}

export default function StoreCard({ store }: { store: Store }) {
  return (
    <Link href={`/store/${store.slug}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 text-center">
        <img src={store.logo || "/placeholder.svg"} alt={store.name} className="w-full h-24 object-contain mb-4" />
        <h3 className="font-bold text-lg mb-2">{store.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{store.description}</p>
        <p className="text-blue-600 font-semibold mb-4">{store.couponsCount} Offers</p>
        <Button className="w-full">View Deals</Button>
      </div>
    </Link>
  )
}
