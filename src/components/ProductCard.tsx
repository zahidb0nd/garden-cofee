// ProductCard — Glass morphism card with hover effects
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
        <article
            className="group glass-card rounded-card overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-[4px]"
        >
            {/* Product Image (1:1 square) */}
            <div className="relative aspect-square overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-sage/60">
                        <span className="font-accent text-lg text-muted">No Image</span>
                    </div>
                )}

                {/* Glass category badge */}
                <span
                    className="absolute top-3 left-3 rounded-button px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-background"
                    style={{
                        background: "rgba(44, 95, 46, 0.75)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.15)",
                    }}
                >
                    {product.category}
                </span>
            </div>

            {/* Card Content */}
            <div className="p-4">
                <h3 className="font-heading text-lg font-bold text-text">
                    {product.title}
                </h3>
                <p className="mt-2 font-body text-sm text-muted leading-relaxed line-clamp-2">
                    {product.description}
                </p>

                {product.price != null && (
                    <p className="mt-3 font-accent text-lg font-semibold text-secondary">
                        ₹{product.price}
                    </p>
                )}
            </div>
        </article>
    );
}
