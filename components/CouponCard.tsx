"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Coupon {
  id: string
  code: string
  title: string
  discount: string
  description: string
  expiryDate?: string
  store: string
  storeLogo: string
  verified?: boolean
  active?: boolean
  category: string
  type: "code" | "link"
}

export default function CouponCard({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border-l-4 border-blue-600">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg">{coupon.title}</h3>
          <p className="text-sm text-gray-600">{coupon.store}</p>
        </div>
        {coupon.verified && <Badge>Verified</Badge>}
      </div>

      <p className="text-gray-700 mb-4">{coupon.description}</p>

      <div className="bg-gray-50 p-3 rounded mb-4">
        <p className="text-2xl font-bold text-blue-600">{coupon.discount}</p>
        {coupon.code && <p className="text-sm text-gray-600">Code: {coupon.code}</p>}
      </div>

      {coupon.expiryDate && (
        <p className="text-xs text-gray-500 mb-4">Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
      )}

      <Button onClick={handleCopy} className="w-full" variant={copied ? "outline" : "default"}>
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-2" />
            Copy Code
          </>
        )}
      </Button>
    </div>
  )
}
