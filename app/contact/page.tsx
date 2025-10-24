"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SEO from "@/components/SEO"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import { useEffect } from "react"
import { trackPageView } from "@/utils/analytics"

export default function ContactPage() {
  useEffect(() => {
    trackPageView("/contact", "Contact Us - Offer Atlas")
  }, [])

  return (
    <>
      <SEO title="Contact Us - Offer Atlas" description="Get in touch with Offer Atlas. We'd love to hear from you." />
      <Navbar />

      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-12">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-gray-600">support@offeratlas.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Phone</h3>
                <p className="text-gray-600">1-800-OFFERS</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Address</h3>
                <p className="text-gray-600">123 Savings Street, Discount City, DC 12345</p>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input placeholder="Your name" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" placeholder="your@email.com" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input placeholder="How can we help?" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea placeholder="Your message..." rows={6} />
            </div>

            <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  )
}
