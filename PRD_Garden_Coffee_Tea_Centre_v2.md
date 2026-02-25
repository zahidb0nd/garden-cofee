# Product Requirements Document: Garden Coffee and Tea Centre Website

---

## Product Overview

**Product Vision:** A warm, heritage-inspired website that showcases Garden Coffee and Tea Centre's premium coffee and tea powder products, tells the brand's story, and drives foot traffic to the physical store.

**Target Users:** Local customers and tea/coffee enthusiasts looking to discover or revisit the store, and gift buyers seeking quality artisanal products.

**Business Objectives:**
- Establish a credible and beautiful online presence for the business.
- Showcase the product catalogue (coffee and tea powders) to attract new customers.
- Communicate the brand's heritage and story rooted in the grandfather's legacy.
- Increase walk-in traffic to the single physical store location.

**Success Metrics:**
- Website is live, fully functional, and accessible on all major browsers and devices.
- All 4 core pages are complete and populated with accurate content.
- Store owner reports increased awareness or foot traffic within 60 days of launch.
- Google PageSpeed score of 90 or above on mobile and desktop.

---

## User Personas

### Persona 1: Local Aisha
- **Demographics:** 30 years old, working professional, moderate tech proficiency, lives near the store.
- **Goals:** Find a reliable local shop for quality coffee and tea powders; wants to know what products are available before visiting.
- **Pain Points:** Cannot find clear product information online; unsure if the store stocks what she needs before making the trip.
- **User Journey:** Discovers the website via Google search, browses the product catalogue, checks the store location and hours, then visits in person.

### Persona 2: Gift-Buyer Rahman
- **Demographics:** 45 years old, parent/professional, low-to-moderate tech proficiency, looking for thoughtful gifts.
- **Goals:** Find a premium, story-driven product to gift for a special occasion; wants to feel confident in the brand's quality.
- **Pain Points:** Generic gift shops lack character; needs to understand the brand story to feel the gift is meaningful.
- **User Journey:** Lands on the website, reads the About Us page and the grandfather's story, browses featured products on the home page, then visits the store to purchase.

---

## Feature Requirements

| Feature | Description | User Stories | Priority | Acceptance Criteria | Dependencies |
|---|---|---|---|---|---|
| **Hero Section** | Full-width landing section with brand name, tagline, and CTA | As a visitor, I want to immediately understand what the brand is and be invited to explore products | Must | Brand name visible, tagline present, CTA button links to product page, loads high-quality image | Brand assets (logo, hero image) |
| **Product Catalogue** | Grid of coffee and tea powder products with filter tabs | As a customer, I want to browse all products and filter by coffee or tea | Must | Products display in a grid, filter tabs (All, Coffee, Tea) work correctly, each card shows name, description, and image | Product content and images from store owner |
| **About Us Page** | Brand story page highlighting heritage and the grandfather's legacy | As a visitor, I want to understand the brand's story and why I should trust them | Must | Page includes brand origin story, grandfather's heritage section, and values section | Written content from store owner |
| **Contact and Location Page** | Page with address, hours, contact form, and embedded map | As a customer, I want to find the store location and get in touch easily | Must | Google Map embedded and accurate, operating hours listed, contact form submits successfully | Google Maps Embed API, Formspree account |
| **Sticky Navigation** | Top navigation bar persistent on scroll with mobile hamburger menu | As a visitor, I want to navigate between pages easily on any device | Must | Nav links work on all pages, hamburger menu functional on mobile, active page is highlighted | None |
| **Responsive Design** | Full layout adaptation for mobile, tablet, and desktop | As a mobile user, I want the site to look and function well on my phone | Must | All pages render correctly at mobile (under 768px), tablet (768-1024px), and desktop (over 1024px) | All other features |
| **Featured Products Strip** | 3 to 4 highlighted product cards on the home page | As a visitor, I want to see top products at a glance without going to the full catalogue | Should | 3-4 products shown, cards link to product catalogue, visually appealing layout | Product content |
| **Product Pricing Display** | Optional price shown on each product card | As a customer, I want to know the price before visiting the store | Could | Prices can be toggled on or off per product in the CMS | Sanity CMS setup, pricing info from store owner |

---

## User Flows

### Flow 1: Discovering and Browsing Products
1. User lands on the Home page from a Google search or direct link.
2. User reads the hero tagline and clicks the Explore Our Products CTA.
3. User arrives on the Product Catalogue page and sees all products.
4. User clicks the Tea filter tab to narrow down results.
   - Alternative path: User scrolls the full catalogue without filtering.
   - Error state: If no products match a filter, display a friendly empty state message.

### Flow 2: Learning the Brand Story
1. User clicks About in the navigation bar.
2. User reads the brand story and the grandfather's heritage section.
3. User scrolls to the values section (Quality, Tradition, Community).
   - Alternative path: User arrives on About Us from a direct link shared by a friend.
   - Error state: If images fail to load, alt text and text content remain fully readable.

### Flow 3: Finding the Store and Sending a Message
1. User clicks Contact in the navigation bar.
2. User views the embedded Google Map and notes the address.
3. User reads operating hours.
4. User fills in the contact form (name, email, message) and clicks Submit.
   - Alternative path: User calls or emails directly using the listed contact details.
   - Error state: If form fields are incomplete, inline validation messages appear. If submission fails, a friendly error message prompts the user to try again or use the direct contact details.

---

## Non-Functional Requirements

### Performance
- **Load Time:** Under 3 seconds on a standard mobile connection.
- **Concurrent Users:** Designed to handle up to 500 concurrent visitors without degradation (Vercel CDN handles this by default).
- **Response Time:** Static pages served in under 200ms via CDN edge nodes.

### Security
- **Authentication:** No user login required for v1.0. CMS access (Sanity) protected by email and password login.
- **Authorization:** Only the store owner has CMS edit access. Contact form submissions sent directly to owner's email via Formspree.
- **Data Protection:** No user data stored on the website. Contact form data handled by Formspree per their privacy policy. HTTPS enforced on all pages.

### Compatibility
- **Devices:** Desktop, tablet, and mobile (iOS and Android).
- **Browsers:** Chrome, Safari, Firefox, and Edge (latest 2 major versions each).
- **Screen Sizes:** 320px (small mobile) up to 1920px (large desktop).

### Accessibility
- **Compliance Level:** WCAG 2.1 AA.
- **Specific Requirements:** All images have descriptive alt text. Minimum 4.5:1 color contrast ratio for body text. All interactive elements accessible via keyboard. Form fields have proper visible labels.

---

## Technical Specifications

### Frontend
- **Technology Stack:** Next.js 14 (React), Tailwind CSS, Framer Motion for animations.
- **Design System:** Custom design system based on this document's color palette and typography (Playfair Display, Lato via Google Fonts).
- **Responsive Design:** Mobile-first approach using Tailwind CSS responsive breakpoints.

### Backend
- **Technology Stack:** No custom backend for v1.0. Content served via Sanity CMS API.
- **API Requirements:** Sanity GROQ API for content fetching at build time (static generation). Formspree REST API for contact form submissions.
- **Database:** Sanity CMS serves as the content store. No relational database required for v1.0.

### Infrastructure
- **Hosting:** Vercel (Hobby tier, free). Custom domain connected via DNS settings.
- **Scaling:** Handled automatically by Vercel's global CDN. No manual scaling required.
- **CI/CD:** GitHub repository connected to Vercel. Every push to the main branch triggers an automatic deployment. Content updates in Sanity trigger a Vercel rebuild via webhook.

---

## Analytics and Monitoring

- **Key Metrics:** Total page views, most visited pages, traffic source (organic search vs direct), contact form submission count.
- **Events:** CTA button clicks (Explore Our Products), product filter tab clicks, contact form submissions, map interactions.
- **Dashboards:** Google Analytics 4 dashboard showing traffic overview, top pages, and device breakdown.
- **Alerting:** Vercel deployment failure notifications sent to developer email. Formspree email notifications on each form submission.

---

## Release Planning

### MVP (v1.0)
- **Features:** Home page, Product Catalogue, About Us, Contact and Location, Sticky Navigation, Responsive Design.
- **Timeline:** 4 weeks from project kickoff.
- **Success Criteria:** All 4 pages live, content populated, store owner approves the design, website passes basic accessibility and performance checks.

### Future Releases
- **v1.1:** Add product pricing display, Instagram feed embed on home page. Expected 4 weeks after v1.0 launch.
- **v1.2:** Add WhatsApp Business chat widget for quick customer inquiries. Expected 2 months after v1.0 launch.
- **v2.0:** Full e-commerce capability (Shopify Buy Button or Stripe integration), customer accounts, order tracking. Timeline dependent on business growth.

---

## Open Questions and Assumptions

- **Question 1:** Does the store owner have high-quality product photography ready, or will placeholder images be needed for initial launch?
- **Question 2:** What are the exact operating hours and contact details to be listed on the website?
- **Question 3:** Should product prices be displayed publicly on the website, or kept in-store only?
- **Assumption 1:** The store has a single physical location and no plans to expand to multiple locations before v2.0.
- **Assumption 2:** The store owner or a trusted contact will manage content updates in Sanity CMS after a brief onboarding session.
- **Assumption 3:** A domain name has not yet been purchased and needs to be registered as part of the project setup.

---

## Appendix

### Competitive Analysis
- **Local Cafe Websites:** Typically have basic menus and contact pages but lack strong brand storytelling. Opportunity: Garden Coffee and Tea Centre can differentiate through heritage narrative and premium visual design.
- **Large Tea/Coffee Retailers (e.g., TWG, Boh):** Strong visual branding and e-commerce but feel corporate and impersonal. Opportunity: A smaller, family-owned business can offer warmth and authenticity that large brands cannot.

### User Research Findings
- **Finding 1:** Customers often search online for local specialty shops before visiting. A discoverable website with clear product information directly influences foot traffic decisions.
- **Finding 2:** Brand story and heritage are important purchase motivators for tea and coffee buyers, especially when buying gifts or premium products.

### AI Conversation Insights
- **Conversation 1:** February 25, 2026, Claude Sonnet 4.6. Key insight: A Jamstack architecture (Next.js + Sanity + Vercel) is optimal for this scale of website, offering near-zero cost with easy content management for a non-technical store owner.
- **AI-Generated Edge Cases:** Empty product catalogue state if no products are added to CMS; contact form failure state if Formspree is unavailable; broken image handling if product photos are not yet uploaded.
- **AI-Suggested Improvements:** Include an Open Graph image and meta description for each page to improve social media sharing previews; add a Sanity webhook to trigger Vercel rebuilds when product content is updated so changes go live without developer action.

### Glossary
- **Jamstack:** A web architecture where pages are pre-built as static files and served via a CDN, resulting in fast load times and low hosting cost.
- **CMS:** Content Management System. A tool (Sanity.io in this project) that allows non-technical users to add, edit, and remove website content without writing code.
- **CDN:** Content Delivery Network. A network of servers distributed globally that serve website files from a location close to the user, reducing load times.
- **WCAG 2.1 AA:** Web Content Accessibility Guidelines, level AA. An internationally recognized standard for making web content accessible to people with disabilities.
- **GROQ:** Graph-Relational Object Queries. The query language used by Sanity CMS to fetch content.
