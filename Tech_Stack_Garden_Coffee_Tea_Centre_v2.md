# Tech Stack Document: Garden Coffee and Tea Centre Website

---

## 1. Overview

**Purpose:** This document defines the full technology stack, architecture, tooling, and infrastructure decisions for the Garden Coffee and Tea Centre website. It serves as the reference guide for the developer building and maintaining the site.

**Guiding Principles:**
- **Cost-efficient:** Leverage free tiers wherever possible. Total cost should remain under 2 USD per month.
- **Low maintenance:** Choose stable, well-documented technologies that a single developer can manage.
- **Non-technical friendly:** The store owner must be able to update content (products, hours, contact info) without developer involvement.
- **Performant and scalable:** Fast load times from day one, with a clear upgrade path if the business grows.

---

## 2. Technology Stack Summary

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Frontend Framework | Next.js | 14 (App Router) | Page rendering, routing, SEO |
| UI Library | React | 18 | Component-based UI |
| Styling | Tailwind CSS | 3.x | Utility-first styling |
| Animation | Framer Motion | 11.x | Page transitions and UI animations |
| Font Delivery | Google Fonts | N/A | Playfair Display, Lato, Cormorant Garamond |
| Icons | Heroicons | 2.x | UI icons (outline and solid) |
| CMS | Sanity.io | v3 | Headless content management |
| Contact Form | Formspree | Free tier | Form submissions via email |
| Map Embed | Google Maps Embed API | N/A | Store location display |
| Hosting | Vercel | Hobby tier | Static and serverless hosting |
| Version Control | GitHub | N/A | Source code management |
| Domain Registrar | Namecheap | N/A | Domain registration and DNS |
| Analytics | Google Analytics 4 | N/A | Traffic and behaviour tracking |

---

## 3. Frontend

### 3.1 Next.js 14 (App Router)

Next.js is the core frontend framework. The App Router architecture is used for its built-in support for React Server Components, static site generation, and simplified routing.

**Key usage:**
- Static Site Generation (SSG) for all pages. Content fetched from Sanity at build time.
- Dynamic routes for individual product pages if needed in v1.1.
- Built-in Image component (next/image) for optimised, lazy-loaded images.
- Built-in Head management for per-page SEO meta tags.
- API Routes for any lightweight server-side logic (optional, not required for v1.0).

**Why Next.js over plain React or other frameworks:**
Next.js provides out-of-the-box SSG, file-based routing, image optimisation, and seamless Vercel deployment — all critical for a performant, SEO-friendly showcase website with minimal configuration overhead.

### 3.2 Tailwind CSS

Tailwind CSS is used for all styling via utility classes. No custom CSS files are written except for a small global stylesheet for base resets and font imports.

**Configuration:**
- Custom design tokens (colors, fonts, spacing) defined in tailwind.config.js to match the Design Document.
- Tailwind Typography plugin (@tailwindcss/typography) for rendering rich text from Sanity CMS.
- Tailwind Forms plugin (@tailwindcss/forms) for consistent form element base styles.

**Why Tailwind over CSS Modules or Styled Components:**
Tailwind eliminates context switching between HTML and CSS files, enforces a consistent design token system, and produces minimal CSS bundle sizes via PurgeCSS in production.

### 3.3 Framer Motion

Framer Motion handles all animations including page fade-ins, card hover transitions, and the mobile menu slide-down.

**Key implementation notes:**
- All motion components check prefers-reduced-motion and disable or simplify animations accordingly.
- Animations are kept subtle and purposeful — no decorative animations that delay content visibility.

---

## 4. Content Management System (CMS)

### 4.1 Sanity.io

Sanity.io is the headless CMS used to manage all website content. The store owner interacts with Sanity Studio (a browser-based interface) to add, edit, or remove products and other content without touching any code.

**Content Schemas (data models):**

| Schema | Fields | Purpose |
|---|---|---|
| Product | title, category (coffee/tea), description, image, price (optional), isFeature (boolean) | Individual product entries |
| SiteSettings | storeName, tagline, address, phone, email, openingHours | Global site settings |
| AboutPage | brandStory, heritageStory, values (array of title + description + icon) | About Us page content |

**How content reaches the website:**
1. Store owner edits content in Sanity Studio.
2. Sanity Studio sends a webhook to Vercel on publish.
3. Vercel triggers a new static build, fetching the latest content via Sanity's GROQ API.
4. Updated pages are deployed to the CDN within 1-2 minutes.

**Why Sanity over alternatives (Contentful, Strapi, WordPress):**
Sanity's free tier is generous (2 users, 10k API requests per month), its Studio interface is intuitive for non-technical users, and its GROQ query language integrates cleanly with Next.js static generation. No self-hosting required.

---

## 5. Forms and Communication

### 5.1 Formspree

Formspree handles contact form submissions. When a visitor submits the contact form, Formspree sends the message directly to the store owner's email address.

**Setup:**
- Create a free Formspree project and obtain the form endpoint URL.
- The Next.js contact form submits a POST request to the Formspree endpoint.
- On success, display a thank-you message. On failure, display an inline error message.

**Free tier limits:** 50 submissions per month. Sufficient for a small business website.

**Alternative if volume exceeds free tier:** Migrate to EmailJS (200 free emails/month) or a custom Next.js API route with Nodemailer and an SMTP service (e.g., Gmail SMTP with App Password).

---

## 6. Maps

### 6.1 Google Maps Embed API

The store location is displayed using a standard Google Maps iframe embed. No JavaScript Maps API key is required for a basic embed.

**Implementation:**
- Use the Google Maps Embed URL format: https://www.google.com/maps/embed/v1/place?key=API_KEY&q=STORE_ADDRESS
- Set iframe dimensions: 100% width, 400px height desktop, 250px mobile.
- Apply border-radius: 12px via Tailwind for visual consistency.

---

## 7. Hosting and Deployment

### 7.1 Vercel

Vercel is the hosting platform. It provides zero-configuration deployment for Next.js projects with a global CDN, automatic HTTPS, and preview deployments for every pull request.

**Deployment workflow:**

| Trigger | Action | Result |
|---|---|---|
| Push to main branch on GitHub | Vercel auto-deploys | Production site updated |
| Pull request opened | Vercel creates preview URL | Developer can review before merging |
| Sanity publish webhook | Vercel triggers rebuild | Content changes go live within 2 minutes |

**Environment Variables stored in Vercel:**
- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET
- SANITY_API_TOKEN (server-side only)
- NEXT_PUBLIC_FORMSPREE_ENDPOINT
- NEXT_PUBLIC_GA_MEASUREMENT_ID

### 7.2 Domain and DNS

1. Purchase domain (e.g., gardenteacentre.com) via Namecheap (~10-15 USD/year).
2. In Namecheap DNS settings, point nameservers to Vercel's nameservers.
3. Add the custom domain in the Vercel project dashboard.
4. Vercel automatically provisions an SSL certificate via Let's Encrypt.

---

## 8. Version Control and Collaboration

### 8.1 GitHub

All source code is stored in a private GitHub repository. Branching strategy for a single developer:

| Branch | Purpose |
|---|---|
| main | Production-ready code. Merges trigger Vercel production deployment. |
| dev | Active development branch. Merges to main after testing. |
| feature/[name] | Individual feature branches. Merged into dev when complete. |

**Commit message convention:** Use conventional commits format.
- feat: add product filter tabs
- fix: correct mobile nav z-index
- chore: update dependencies
- content: update about page copy

---

## 9. Analytics and Monitoring

### 9.1 Google Analytics 4

GA4 tracks visitor behaviour including page views, traffic sources, device types, and contact form submission events.

**Events to configure:**

| Event Name | Trigger | Purpose |
|---|---|---|
| cta_click | Click on Explore Our Products button | Measure hero CTA effectiveness |
| product_filter | Click on Coffee or Tea filter tab | Understand product interest split |
| contact_form_submit | Successful form submission | Measure lead generation |
| page_view | Every page load (automatic) | Overall traffic tracking |

### 9.2 Vercel Analytics (Optional)

Vercel's built-in analytics provide Core Web Vitals monitoring (LCP, CLS, FID) in real time. Enable via the Vercel dashboard at no extra cost on the Hobby tier.

### 9.3 Vercel Deployment Alerts

Configure email notifications in the Vercel dashboard for:
- Failed deployments.
- Build errors.

---

## 10. Performance Strategy

| Strategy | Implementation | Target Impact |
|---|---|---|
| Static Site Generation | All pages pre-rendered at build time | Sub-200ms TTFB |
| Image Optimisation | next/image with WebP conversion and lazy loading | Reduced LCP |
| Font Optimisation | next/font for self-hosted Google Fonts, no layout shift | CLS improvement |
| CSS Minimisation | Tailwind PurgeCSS removes unused styles in production | Smaller CSS bundle |
| CDN Delivery | Vercel global edge network serves all static assets | Fast delivery worldwide |
| Code Splitting | Next.js automatic code splitting per page | Faster initial load |

**Performance Targets:**

| Metric | Target |
|---|---|
| Google PageSpeed (Mobile) | 90 or above |
| Google PageSpeed (Desktop) | 95 or above |
| Largest Contentful Paint (LCP) | Under 2.5 seconds |
| Cumulative Layout Shift (CLS) | Under 0.1 |
| Time to First Byte (TTFB) | Under 200ms |
| Total Page Size (Home) | Under 1MB |

---

## 11. Security

| Area | Measure |
|---|---|
| HTTPS | Enforced automatically by Vercel via Let's Encrypt SSL |
| Environment Variables | All API keys stored in Vercel environment variables, never in code |
| CMS Access | Sanity Studio protected by email and password login |
| Form Spam Protection | Formspree includes built-in spam filtering |
| Dependency Security | Run npm audit regularly; use Dependabot alerts on GitHub |
| Content Security Policy | Add basic CSP headers via next.config.js headers() |

---

## 12. Cost Breakdown

### Monthly Costs

| Service | Plan | Cost |
|---|---|---|
| Vercel Hosting | Hobby (free) | 0 USD |
| Sanity CMS | Free tier | 0 USD |
| Formspree | Free tier (50 submissions/month) | 0 USD |
| Google Fonts | Free | 0 USD |
| Google Analytics 4 | Free | 0 USD |
| Google Maps Embed | Free | 0 USD |
| GitHub | Free (public or private repo) | 0 USD |
| Domain Name | ~12 USD/year billed annually | ~1 USD/month |
| **Total** | | **~1 USD/month** |

### Upgrade Triggers and Costs

| Trigger | Upgrade | Additional Cost |
|---|---|---|
| Form submissions exceed 50/month | Formspree Basic plan | 10 USD/month |
| More than 2 CMS editors needed | Sanity Growth plan | 15 USD/month |
| Need team collaboration on Vercel | Vercel Pro | 20 USD/month |
| Add e-commerce | Shopify Starter | 5 USD/month |

---

## 13. Development Environment Setup

### Prerequisites
- Node.js 18.x or above
- npm 9.x or above
- Git
- Vercel CLI (npm install -g vercel)
- Sanity CLI (npm install -g @sanity/cli)

### Local Setup Steps
1. Clone the GitHub repository: git clone [repo-url]
2. Install dependencies: npm install
3. Create a .env.local file and populate with environment variables (see Section 7.1).
4. Run the development server: npm run dev
5. Open http://localhost:3000 in the browser.
6. Run Sanity Studio locally: cd studio && npx sanity dev

### Key Scripts

| Script | Command | Purpose |
|---|---|---|
| Development server | npm run dev | Start local dev server with hot reload |
| Production build | npm run build | Build static output for deployment |
| Lint | npm run lint | Run ESLint checks |
| Type check | npm run type-check | Run TypeScript checks |
| Sanity deploy | npx sanity deploy | Deploy Sanity Studio to hosted URL |

---

## 14. Future Tech Roadmap

| Version | Feature | Technology Addition |
|---|---|---|
| v1.1 | Product pricing and Instagram feed | Instagram Basic Display API or Embedsocial |
| v1.2 | WhatsApp chat widget | Tidio or WhatsApp Business Widget embed |
| v2.0 | E-commerce / online ordering | Shopify Buy Button SDK or Stripe + custom cart |
| v2.0 | Customer accounts | NextAuth.js + Supabase or Firebase Auth |
| v2.0 | Blog / content marketing | Sanity CMS blog schema (already supported) |

---

## Appendix

### Dependency List (package.json)

**Production dependencies:**
- next@14
- react@18
- react-dom@18
- @sanity/client
- @sanity/image-url
- next-sanity
- framer-motion
- @heroicons/react
- @tailwindcss/typography
- @tailwindcss/forms

**Development dependencies:**
- tailwindcss@3
- autoprefixer
- postcss
- eslint
- eslint-config-next
- typescript
- @types/react
- @types/node
- next-sitemap

### Useful Links
- Next.js Documentation: https://nextjs.org/docs
- Sanity Documentation: https://www.sanity.io/docs
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- Formspree Documentation: https://help.formspree.io
- Vercel Documentation: https://vercel.com/docs
- Framer Motion Documentation: https://www.framer.com/motion

### Glossary
- **SSG (Static Site Generation):** A rendering method where pages are built as static HTML files at deploy time, not on each user request. Results in very fast load times.
- **CDN (Content Delivery Network):** A network of globally distributed servers that serve website files from locations geographically close to each visitor.
- **GROQ:** Sanity's query language for fetching structured content. Similar to GraphQL but simpler for document-oriented data.
- **Webhook:** An automated HTTP request sent from one service to another when a specific event occurs (e.g., Sanity sends a webhook to Vercel when content is published).
- **Environment Variable:** A configuration value (like an API key) stored outside the codebase, loaded at runtime. Keeps sensitive credentials secure and out of version control.
- **Core Web Vitals:** Google's set of performance metrics (LCP, CLS, FID/INP) used to measure real-world user experience and influence search rankings.
