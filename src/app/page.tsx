// Home page — Hero, Brand Introduction, Featured Products, Parallax CTA
import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { AnimationWrapper } from "@/components/AnimationWrapper";
import { sanityFetch } from "@/lib/sanity";
import { featuredProductsQuery, siteSettingsQuery } from "@/lib/queries";
import type { Product, SiteSettings } from "@/lib/types";
import {
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// Fallback products for when CMS is not yet configured
const FALLBACK_PRODUCTS: Product[] = [
  {
    _id: "1",
    _type: "product",
    title: "Classic South Indian Filter Coffee",
    slug: { current: "classic-filter-coffee" },
    category: "coffee",
    description:
      "A rich, aromatic blend roasted to perfection. Our signature filter coffee powder that captures the essence of South Indian tradition.",
    image: null as unknown as Product["image"],
    isFeatured: true,
  },
  {
    _id: "2",
    _type: "product",
    title: "Garden Special Masala Chai",
    slug: { current: "garden-special-masala-chai" },
    category: "tea",
    description:
      "A warming blend of premium tea leaves with hand-ground spices — cardamom, ginger, and cinnamon. Perfect for cosy evenings.",
    image: null as unknown as Product["image"],
    isFeatured: true,
  },
  {
    _id: "3",
    _type: "product",
    title: "Pure Nilgiri Green Tea",
    slug: { current: "pure-nilgiri-green-tea" },
    category: "tea",
    description:
      "Sourced from the misty hills of Nilgiri, this delicate green tea offers a light, refreshing flavour with natural antioxidants.",
    image: null as unknown as Product["image"],
    isFeatured: true,
  },
  {
    _id: "4",
    _type: "product",
    title: "Heritage Dark Roast Coffee",
    slug: { current: "heritage-dark-roast" },
    category: "coffee",
    description:
      "Our boldest blend — a full-bodied dark roast with smoky undertones and a velvety finish. For those who like it strong.",
    image: null as unknown as Product["image"],
    isFeatured: true,
  },
];

export default async function HomePage() {
  const [products, siteSettings] = await Promise.all([
    sanityFetch<Product[]>(featuredProductsQuery),
    sanityFetch<SiteSettings>(siteSettingsQuery),
  ]);

  const featuredProducts =
    products && products.length > 0 ? products : FALLBACK_PRODUCTS;
  const settings = siteSettings;

  const storeName = settings?.storeName || "Garden Coffee & Tea Centre";
  const tagline =
    settings?.tagline || "Rooted in Tradition. Brewed with Love.";

  return (
    <>
      {/* ===== Hero Section with Parallax ===== */}
      <HeroSection
        title={storeName}
        subtitle={tagline}
        ctaText="Explore Our Products"
        ctaHref="/products"
        showScrollIndicator
      />

      {/* ===== Brand Introduction ===== */}
      <section className="bg-background py-12 md:py-20" aria-labelledby="brand-intro-heading">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[55%_45%] items-center">
            <AnimationWrapper>
              <div>
                <h2
                  id="brand-intro-heading"
                  className="font-heading text-2xl md:text-[32px] font-bold text-text mb-4"
                >
                  From Our Garden to Your Cup
                </h2>
                <p className="font-body text-base md:text-lg text-text leading-relaxed max-w-[65ch]">
                  For generations, Garden Coffee and Tea Centre has been the
                  trusted neighbourhood destination for premium coffee and tea
                  powders. What began as a grandfather&apos;s passion for the
                  perfect blend has grown into a beloved local institution —
                  where quality is never compromised and every product is crafted
                  with care.
                </p>
                {/* Glassmorphism blockquote */}
                <blockquote
                  className="mt-6 glass rounded-card px-5 py-4 font-accent text-xl md:text-[22px] italic text-accent"
                  style={{ borderLeft: "4px solid var(--color-accent)" }}
                >
                  &ldquo;A cup of our coffee is a cup of heritage — every sip
                  tells the story of four generations.&rdquo;
                </blockquote>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={0.15}>
              <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-sage">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sage to-linen">
                  <div className="text-center px-6">
                    <p className="font-heading text-4xl md:text-5xl text-primary/20 animate-float-slow">
                      ☕
                    </p>
                    <p className="mt-2 font-body text-sm text-muted">
                      Brand image from CMS
                    </p>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* ===== Featured Products Strip ===== */}
      <section
        className="bg-linen py-12 md:py-20"
        aria-labelledby="featured-heading"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <AnimationWrapper>
            <h2
              id="featured-heading"
              className="font-heading text-2xl md:text-[32px] font-bold text-text text-center mb-10 md:mb-14"
            >
              Our Finest Selection
            </h2>
          </AnimationWrapper>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <AnimationWrapper key={product._id} delay={index * 0.08}>
                <ProductCard product={product} />
              </AnimationWrapper>
            ))}
          </div>

          <AnimationWrapper delay={0.3} className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-block rounded-button border-2 border-primary px-6 py-3 font-body text-sm font-bold uppercase tracking-wider text-primary transition-all duration-250 hover:bg-primary hover:text-background hover:shadow-[0_4px_20px_rgba(44,95,46,0.3)] hover:scale-[1.03]"
            >
              View All Products
            </Link>
          </AnimationWrapper>
        </div>
      </section>

      {/* ===== Parallax Footer CTA Banner ===== */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        aria-labelledby="visit-heading"
      >
        {/* Parallax fixed background */}
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: "linear-gradient(135deg, #2C5F2E 0%, #1E4520 50%, #7B4A2D 100%)",
          }}
          aria-hidden="true"
        />
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        {/* Floating decorative elements */}
        <div
          className="absolute top-[10%] left-[5%] w-24 h-24 rounded-full animate-float pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,136,58,0.12), transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[15%] right-[8%] w-36 h-36 rounded-full animate-float-slow pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)" }}
          aria-hidden="true"
        />

        {/* Glass content panel */}
        <div className="relative z-10 mx-auto max-w-[800px] px-6 text-center">
          <div className="glass-dark rounded-card px-8 py-10 md:px-12 md:py-14">
            <h2
              id="visit-heading"
              className="font-heading text-2xl md:text-[32px] font-bold text-background mb-4"
            >
              Visit Us In Store
            </h2>
            <p className="font-body text-base text-background/80 mb-6 max-w-lg mx-auto">
              Experience our products in person. Our knowledgeable team is ready
              to help you find your perfect blend.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-background/80">
              <span className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-accent" aria-hidden="true" />
                <span className="font-body text-sm">
                  {settings?.address || "Garden Coffee and Tea Centre, Main Street"}
                </span>
              </span>
              <span className="hidden sm:inline text-background/40">|</span>
              <span className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-accent" aria-hidden="true" />
                <span className="font-body text-sm">
                  {settings?.openingHours || "Mon – Sat: 9 AM – 7 PM"}
                </span>
              </span>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-button bg-accent px-6 py-3 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-250 hover:bg-accent/90 hover:shadow-[0_4px_20px_rgba(201,136,58,0.4)] hover:scale-[1.03]"
            >
              Get Directions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
