import Link from "next/link";
import Image from "next/image";
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

// Fallback products
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
    fallbackImage: "/images/product_filter_coffee.png",
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
    fallbackImage: "/images/product_masala_chai.png",
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
    fallbackImage: "/images/product_green_tea.png",
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
    fallbackImage: "/images/product_dark_roast.png",
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
      {/* ===== Hero Section ===== */}
      <HeroSection
        title={storeName}
        subtitle={tagline}
        ctaText="Explore Our Products"
        ctaHref="/products"
        showScrollIndicator
      />

      {/* ===== Brand Introduction ===== */}
      <section className="theme-bg py-12 md:py-20" aria-labelledby="brand-intro-heading">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[55%_45%] items-center">
            <AnimationWrapper>
              <div>
                <h2
                  id="brand-intro-heading"
                  className="font-heading text-2xl md:text-[32px] font-bold theme-text mb-4"
                >
                  From Our Garden to Your Cup
                </h2>
                <p className="font-body text-base md:text-lg theme-text leading-relaxed max-w-[65ch]">
                  For generations, Garden Coffee and Tea Centre has been the
                  trusted neighbourhood destination for premium coffee and tea
                  powders. What began as a grandfather&apos;s passion for the
                  perfect blend has grown into a beloved local institution —
                  where quality is never compromised and every product is crafted
                  with care.
                </p>
                {/* Liquid glass blockquote */}
                <blockquote
                  className="mt-6 liquid-glass rounded-card px-5 py-4 font-accent text-xl md:text-[22px] italic theme-accent"
                  style={{ borderLeft: "4px solid var(--theme-accent)" }}
                >
                  &ldquo;A cup of our coffee is a cup of heritage — every sip
                  tells the story of four generations.&rdquo;
                </blockquote>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={0.15}>
              <div className="relative aspect-[4/3] rounded-card overflow-hidden glass-card">
                <Image
                  src="/images/brand_heritage.png"
                  alt="Brand Heritage"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* ===== Featured Products Strip ===== */}
      <section className="theme-sage py-12 md:py-20" aria-labelledby="featured-heading">
        <div className="mx-auto max-w-[1200px] px-6">
          <AnimationWrapper>
            <h2
              id="featured-heading"
              className="font-heading text-2xl md:text-[32px] font-bold theme-text text-center mb-10 md:mb-14"
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
              className="inline-block rounded-button border-2 border-primary px-6 py-3 font-body text-sm font-bold uppercase tracking-wider text-primary transition-all duration-250 hover:bg-primary hover:text-white hover:shadow-[0_4px_20px_rgba(44,95,46,0.3)] hover:scale-[1.03] cursor-pointer"
            >
              View All Products
            </Link>
          </AnimationWrapper>
        </div>
      </section>

      {/* ===== Block-Based Vibrant CTA ===== */}
      <section className="theme-bg py-12 md:py-16 px-6" aria-labelledby="visit-heading">
        <div className="mx-auto max-w-[800px]">
          <AnimationWrapper>
            <div className="block-vibrant px-8 py-12 md:px-12 md:py-16 text-center text-white">
              <h2
                id="visit-heading"
                className="font-heading text-2xl md:text-[32px] font-bold mb-4 relative z-10"
              >
                Visit Us In Store
              </h2>
              <p className="font-body text-base text-white/80 mb-6 max-w-lg mx-auto relative z-10">
                Experience our products in person. Our knowledgeable team is ready
                to help you find your perfect blend.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/80 relative z-10">
                <span className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <span className="font-body text-sm">
                    {settings?.address || "# 52, BTM Layout 1st Stage, Bannerghatta Road, Bangalore – 560029"}
                  </span>
                </span>
                <span className="hidden sm:inline text-white/40">|</span>
                <span className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <span className="font-body text-sm">
                    {settings?.openingHours || "Mon – Sat: 7 AM – 9 PM | Sun: 7 AM – 2 PM"}
                  </span>
                </span>
              </div>
              <Link
                href="/contact"
                className="mt-8 inline-block rounded-button bg-accent px-6 py-3 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-250 hover:bg-accent/90 hover:shadow-[0_4px_20px_rgba(201,136,58,0.4)] hover:scale-[1.03] relative z-10 cursor-pointer"
              >
                Get Directions
              </Link>
            </div>
          </AnimationWrapper>
        </div>
      </section>
    </>
  );
}
