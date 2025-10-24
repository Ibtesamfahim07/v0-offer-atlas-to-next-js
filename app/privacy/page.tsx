"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SEO from "@/components/SEO"
import { useEffect } from "react"
import { trackPageView } from "@/utils/analytics"

export default function PrivacyPage() {
  useEffect(() => {
    trackPageView("/privacy", "Privacy Policy - Offer Atlas")
  }, [])

  return (
    <>
      <SEO
        title="Privacy Policy - Offer Atlas"
        description="Read our privacy policy to understand how we protect your data"
      />
      <Navbar />

      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p>
                At Offer Atlas, we are committed to protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p>We may collect information about you in a variety of ways, including:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Personal Data: Name, email address, and contact information when you voluntarily provide it</li>
                <li>Usage Data: Information about how you use our website and services</li>
                <li>Cookies and Tracking Technologies: We use cookies to enhance your experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p>We may use the information we collect from you to:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Provide and maintain our services</li>
                <li>Send you newsletters and marketing communications</li>
                <li>Improve our website and user experience</li>
                <li>Analyze usage patterns and trends</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Disclosure of Your Information</h2>
              <p>
                We may share your information with third parties in certain situations, including with your consent, to
                comply with legal obligations, or to protect our rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at privacy@offeratlas.com</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
