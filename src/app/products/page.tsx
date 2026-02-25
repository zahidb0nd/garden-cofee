// Product Catalogue page — Filter tabs + product grid with CMS data
"use client";

import { useState, useEffect, useMemo } from "react";
import type { Product } from "@/lib/types";
import { FilterTabs } from "@/components/FilterTabs";
import { ProductCard } from "@/components/ProductCard";
import { HeroSection } from "@/components/HeroSection";
import { AnimationWrapper } from "@/components/AnimationWrapper";

// Fallback products for when CMS is not yet configured
const FALLBACK_PRODUCTS: Product[] = [
    {
        _id: "1",
        _type: "product",
        title: "Classic South Indian Filter Coffee",
        slug: { current: "classic-filter-coffee" },
        category: "coffee",
        description:
            "A rich, aromatic blend roasted to perfection. Our signature filter coffee powder captures the essence of South Indian tradition.",
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
            "A warming blend of premium tea leaves with hand-ground spices — cardamom, ginger, and cinnamon.",
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
        isFeatured: false,
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
    {
        _id: "5",
        _type: "product",
        title: "Premium Assam Black Tea",
        slug: { current: "premium-assam-black-tea" },
        category: "tea",
        description:
            "Bold and malty, this Assam black tea is perfect for morning chai. Rich in flavour and tradition.",
        image: null as unknown as Product["image"],
        isFeatured: false,
    },
    {
        _id: "6",
        _type: "product",
        title: "Aromatic Chicory Blend Coffee",
        slug: { current: "aromatic-chicory-blend" },
        category: "coffee",
        description:
            "A smooth, aromatic blend of premium coffee with a touch of chicory — the quintessential South Indian experience.",
        image: null as unknown as Product["image"],
        isFeatured: false,
    },
];

export default function ProductsPage() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch products from API route (to keep CMS calls server-side)
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("/api/products");
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) setProducts(data);
                }
            } catch {
                // Use fallback products
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        if (activeFilter === "all") return products;
        return products.filter((p) => p.category === activeFilter);
    }, [products, activeFilter]);

    return (
        <>
            {/* Page Header */}
            <HeroSection title="Our Products" compact />

            {/* Filter Tabs */}
            <section className="theme-bg py-8">
                <div className="mx-auto max-w-[1200px] px-6">
                    <FilterTabs
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                    />
                </div>
            </section>

            {/* Product Grid */}
            <section className="theme-bg pb-12 md:pb-20" aria-label="Product catalogue">
                <div className="mx-auto max-w-[1200px] px-6">
                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="animate-pulse rounded-card theme-sage h-[360px]"
                                />
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProducts.map((product, index) => (
                                <AnimationWrapper key={product._id} delay={index * 0.06}>
                                    <ProductCard product={product} />
                                </AnimationWrapper>
                            ))}
                        </div>
                    ) : (
                        /* Empty state */
                        <div className="py-16 text-center">
                            <svg className="w-12 h-12 mx-auto text-primary/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                            </svg>
                            <h3 className="font-heading text-xl font-bold text-text mb-2">
                                No products found
                            </h3>
                            <p className="font-body text-muted">
                                We don&apos;t have any{" "}
                                {activeFilter !== "all" ? activeFilter : ""} products to show
                                right now. Check back soon!
                            </p>
                            <button
                                onClick={() => setActiveFilter("all")}
                                className="mt-4 font-body text-sm font-bold text-primary underline cursor-pointer"
                            >
                                View all products
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
