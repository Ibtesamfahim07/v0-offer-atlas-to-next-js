"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SEO from "@/components/SEO"
import { useEffect } from "react"
import { trackPageView } from "@/utils/analytics"

export default function AboutPage() {
  useEffect(() => {
    trackPageView("/about", "About Us - Offer Atlas")
  }, [])

  return (
    <>
      <SEO title="About Offer Atlas" description="Learn about Offer Atlas and our mission to help you save money" />
      <Navbar />

      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">About Offer Atlas</h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
              <p>
                Offer Atlas is your trusted destination for finding the best coupon codes and exclusive deals from top
                retailers. We're dedicated to helping you save money on your favorite products and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p>
                Our mission is to make saving money easy and accessible to everyone. We curate the best offers and deals
                from brands we think you'll love, and provide you with the tools to maximize your savings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Why Choose Offer Atlas?</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Verified coupon codes from trusted retailers</li>
                <li>Daily updates with the latest deals and discounts</li>
                <li>Expert saving tips from our e-commerce specialists</li>
                <li>User-friendly interface for easy coupon discovery</li>
                <li>No hidden charges or prolonged processes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p>
                Have questions or suggestions? We'd love to hear from you.{" "}
                <a href="/contact" className="text-blue-600 hover:underline">
                  Visit our Contact Page
                </a>{" "}
                to get in touch.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
