"use client"

import { Helmet } from "react-helmet-async"

interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
  schema?: any[]
}

export default function SEO({ title, description, image, url, schema }: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      {schema &&
        schema.map((s, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(s)}
          </script>
        ))}
    </Helmet>
  )
}
