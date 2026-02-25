// ProductCard — Liquid glass card with dark mode + motion
"use client";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { urlFor } from "@/lib/sanity-image";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const imageUrl = product.image
        ? urlFor(product.image).width(400).height(400).url()
        : null;

    return (
        <article className="group glass-card rounded-card overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                ) : (
                    <Image
                        src="/images/product_placeholder.png"
                        alt={product.title || "Product placeholder"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                )}

                {/* Vibrant block category badge */}
                <span className="absolute top-3 left-3 rounded-button px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-white bg-primary/90 backdrop-blur-sm">
                    {product.category}
                </span>
            </div>

            {/* Card Content */}
            <div className="p-4">
                <h3 className="font-heading text-lg font-bold theme-text">
                    {product.title}
                </h3>
                <p className="mt-2 font-body text-sm theme-muted leading-relaxed line-clamp-2">
                    {product.description}
                </p>

                {product.price != null && (
                    <p className="mt-3 font-accent text-lg font-semibold theme-secondary">
                        ₹{product.price}
                    </p>
                )}
            </div>
        </article>
    );
}
