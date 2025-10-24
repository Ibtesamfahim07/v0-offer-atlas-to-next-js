"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { mockCoupons, mockStores, mockBlogPosts } from "@/data/mockData"

interface Coupon {
  id: string
  code: string
  title: string
  discount: string
  description: string
  expiryDate?: string
  store: string
  storeLogo: string
  storeUrl: string
  verified?: boolean
  usageCount?: number
  active?: boolean
  category: string
  clickCount?: number
  type: "code" | "link"
  createdAt?: string
}

interface Store {
  id: string
  name: string
  slug: string
  logo: string
  description: string
  category: string
  couponsCount: number
  url: string
  aboutStore?: string
  howToApply?: string
  whyChoose?: string
  faqs?: { question: string; answer: string }[]
  similarStores?: string[]
  popularCoupons?: string
  trustContent?: string
  customerSavings?: string
  verifiedSavings?: string
  competitorPricing?: string
  priceComparison?: { item: string; withCoupon: string; withoutCoupon: string; savings: string }[]
  expertTips?: string
  benefits?: string
  whyUseCoupons?: string
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  date: string
  readTime: string
  author: string
  tableOfContents?: { title: string; id: string }[]
  relatedPosts?: string[]
  additionalSections?: { title: string; content: string }[]
}

interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

interface PageMeta {
  title: string
  description: string
  keywords: string
  ogImage?: string
}

interface HomePageSettings {
  heroTitle: string
  heroDescription: string
  featuredStoreIds: string[]
  featuredCouponIds: string[]
  featuredBlogPostIds: string[]
  topStoreIds: string[]
  popularStoreIds: string[]
  maxCouponsDisplay: number
}

interface SiteSettings {
  siteTitle: string
  siteDescription: string
  affiliateDisclaimer: string
  socialMedia: {
    facebook: string
    instagram: string
    twitter: string
  }
  pageMeta: {
    home: PageMeta
    stores: PageMeta
    blog: PageMeta
    about: PageMeta
    contact: PageMeta
  }
  categoryContent: {
    [key: string]: {
      description: string
      featuredStores: string[]
      relatedCategories: string[]
    }
  }
}

interface AdminContextType {
  coupons: Coupon[]
  stores: Store[]
  blogPosts: BlogPost[]
  categories: Category[]
  siteSettings: SiteSettings
  homePageSettings: HomePageSettings
  addCoupon: (coupon: Coupon) => void
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void
  deleteCoupon: (id: string) => void
  addStore: (store: Store) => void
  updateStore: (id: string, store: Partial<Store>) => void
  deleteStore: (id: string) => void
  addBlogPost: (post: BlogPost) => void
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void
  deleteBlogPost: (id: string) => void
  addCategory: (category: Category) => void
  updateCategory: (id: string, category: Partial<Category>) => void
  deleteCategory: (id: string) => void
  updateSiteSettings: (settings: Partial<SiteSettings>) => void
  updateHomePageSettings: (settings: Partial<HomePageSettings>) => void
  incrementCouponClick: (id: string) => void
  getCouponAnalytics: () => any[]
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    if (typeof window === "undefined") return mockCoupons
    const saved = localStorage.getItem("admin_coupons")
    return saved ? JSON.parse(saved) : mockCoupons
  })

  const [stores, setStores] = useState<Store[]>(() => {
    if (typeof window === "undefined") return mockStores
    const saved = localStorage.getItem("admin_stores")
    return saved ? JSON.parse(saved) : mockStores
  })

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    if (typeof window === "undefined") return mockBlogPosts
    const saved = localStorage.getItem("admin_blog_posts")
    return saved ? JSON.parse(saved) : mockBlogPosts
  })

  const [categories, setCategories] = useState<Category[]>(() => {
    if (typeof window === "undefined") return []
    const saved = localStorage.getItem("admin_categories")
    const defaultCategories = [
      { id: "1", name: "Fashion", slug: "fashion" },
      { id: "2", name: "Electronics", slug: "electronics" },
      { id: "3", name: "Beauty", slug: "beauty" },
      { id: "4", name: "Sports", slug: "sports" },
      { id: "5", name: "Home", slug: "home" },
      { id: "6", name: "Food", slug: "food" },
    ]
    return saved ? JSON.parse(saved) : defaultCategories
  })

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    if (typeof window === "undefined") return getDefaultSiteSettings()
    const saved = localStorage.getItem("admin_site_settings")
    return saved ? JSON.parse(saved) : getDefaultSiteSettings()
  })

  const [homePageSettings, setHomePageSettings] = useState<HomePageSettings>(() => {
    if (typeof window === "undefined") return getDefaultHomePageSettings()
    const saved = localStorage.getItem("admin_home_page_settings")
    return saved ? JSON.parse(saved) : getDefaultHomePageSettings()
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_coupons", JSON.stringify(coupons))
    }
  }, [coupons])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_stores", JSON.stringify(stores))
    }
  }, [stores])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_blog_posts", JSON.stringify(blogPosts))
    }
  }, [blogPosts])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_categories", JSON.stringify(categories))
    }
  }, [categories])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_site_settings", JSON.stringify(siteSettings))
    }
  }, [siteSettings])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_home_page_settings", JSON.stringify(homePageSettings))
    }
  }, [homePageSettings])

  const addCoupon = (coupon: Coupon) => setCoupons([...coupons, coupon])
  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons(coupons.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }
  const deleteCoupon = (id: string) => setCoupons(coupons.filter((c) => c.id !== id))

  const addStore = (store: Store) => setStores([...stores, store])
  const updateStore = (id: string, updates: Partial<Store>) => {
    setStores(stores.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }
  const deleteStore = (id: string) => setStores(stores.filter((s) => s.id !== id))

  const addBlogPost = (post: BlogPost) => setBlogPosts([...blogPosts, post])
  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    setBlogPosts(blogPosts.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }
  const deleteBlogPost = (id: string) => setBlogPosts(blogPosts.filter((p) => p.id !== id))

  const addCategory = (category: Category) => setCategories([...categories, category])
  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }
  const deleteCategory = (id: string) => setCategories(categories.filter((c) => c.id !== id))

  const updateSiteSettings = (updates: Partial<SiteSettings>) => {
    setSiteSettings({ ...siteSettings, ...updates })
  }

  const updateHomePageSettings = (updates: Partial<HomePageSettings>) => {
    setHomePageSettings({ ...homePageSettings, ...updates })
  }

  const incrementCouponClick = (id: string) => {
    updateCoupon(id, { clickCount: (coupons.find((c) => c.id === id)?.clickCount || 0) + 1 })
  }

  const getCouponAnalytics = () => {
    return coupons.map((c) => ({
      title: c.title,
      clicks: c.clickCount || 0,
      store: c.store,
    }))
  }

  return (
    <AdminContext.Provider
      value={{
        coupons,
        stores,
        blogPosts,
        categories,
        siteSettings,
        homePageSettings,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        addStore,
        updateStore,
        deleteStore,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addCategory,
        updateCategory,
        deleteCategory,
        updateSiteSettings,
        updateHomePageSettings,
        incrementCouponClick,
        getCouponAnalytics,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider")
  }
  return context
}

function getDefaultSiteSettings(): SiteSettings {
  return {
    siteTitle: "Offer Atlas",
    siteDescription: "Find the best coupons, deals, and discounts from top stores",
    affiliateDisclaimer: "We may earn a commission when you buy through our links.",
    socialMedia: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
    },
    pageMeta: {
      home: {
        title: "Offer Atlas - Best Coupons & Deals",
        description: "Find the best coupons, deals, and discounts from top stores",
        keywords: "coupons, deals, discounts, promo codes",
      },
      stores: {
        title: "All Stores - Offer Atlas",
        description: "Browse all stores and find the best deals",
        keywords: "stores, shopping, deals",
      },
      blog: {
        title: "Savings Blog - Offer Atlas",
        description: "Tips and guides for saving money",
        keywords: "savings, tips, guides",
      },
      about: {
        title: "About Offer Atlas",
        description: "Learn about Offer Atlas",
        keywords: "about, company",
      },
      contact: {
        title: "Contact Us - Offer Atlas",
        description: "Get in touch with us",
        keywords: "contact, support",
      },
    },
    categoryContent: {},
  }
}

function getDefaultHomePageSettings(): HomePageSettings {
  return {
    heroTitle: "Find the Best Deals & Coupons",
    heroDescription: "Discover exclusive offers from your favorite stores",
    featuredStoreIds: [],
    featuredCouponIds: [],
    featuredBlogPostIds: [],
    topStoreIds: [],
    popularStoreIds: [],
    maxCouponsDisplay: 12,
  }
}
