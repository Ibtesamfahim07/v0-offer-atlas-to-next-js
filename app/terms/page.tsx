"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SEO from "@/components/SEO"
import { useEffect } from "react"
import { trackPageView } from "@/utils/analytics"

export default function TermsPage() {
  useEffect(() => {
    trackPageView("/terms", "Terms of Use - Offer Atlas")
  }, [])

  return (
    <>
      <SEO
        title="Terms of Use - Offer Atlas"
        description="Read our terms of use and conditions for using Offer Atlas"
      />
      <Navbar />

      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Terms of Use</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
              <p>
                By accessing or using Offer Atlas, you agree to be bound by these Terms of Use. If you disagree with any
                part of these terms, you may not access our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Use of Our Service</h2>
              <p>
                You may use our service only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit any harmful or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated systems to access our website without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Coupon Codes and Deals</h2>
              <p>
                All coupon codes and deals are provided by third-party retailers. Offer Atlas does not guarantee the
                validity, availability, or terms of any coupon or deal. All codes are temporary and may expire without
                notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Affiliate Disclosure</h2>
              <p>
                Offer Atlas may earn a commission if you buy a product or service after clicking one of our links. This
                does not affect the price you pay.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p>
                Offer Atlas shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages resulting from your use of or inability to use the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p>If you have questions about these Terms, please contact us at legal@offeratlas.com</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
