# Offer Atlas - Next.js Conversion

This is a complete conversion of the Offer Atlas project from Vite + React to Next.js 15 with App Router.

## Features

- **Next.js 15** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **React Hook Form** for forms
- **TanStack Query** for data fetching
- **Structured Data** (Schema.org) for SEO
- **Admin Dashboard** with authentication
- **Responsive Design** for all devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── store/[slug]/      # Store detail pages
│   ├── category/[slug]/   # Category pages
│   ├── blog/              # Blog pages
│   ├── admin/             # Admin dashboard
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── admin/            # Admin components
├── contexts/             # React contexts
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
├── utils/                # Helper functions
├── data/                 # Mock data
└── public/               # Static assets
\`\`\`

## Key Changes from Vite to Next.js

1. **Routing**: Replaced React Router with Next.js App Router
2. **Build Tool**: Replaced Vite with Next.js built-in bundler
3. **Server Components**: Leveraged Next.js Server Components where possible
4. **API Routes**: Can now use Route Handlers for backend logic
5. **Image Optimization**: Can use Next.js Image component
6. **Environment Variables**: Uses .env.local for environment variables

## Admin Panel

Access the admin panel at `/admin/login`

**Demo Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

## Features

- View and manage coupons
- Manage stores and categories
- Blog post management
- Site settings configuration
- Home page customization

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/offer-atlas-nextjs)

Or deploy to any Node.js hosting platform.

## License

MIT
