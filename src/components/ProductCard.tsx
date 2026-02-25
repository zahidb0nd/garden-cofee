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
                    <div className="flex h-full w-full items-center justify-center bg-sage">
                        <svg className="w-12 h-12 text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </div>
                )}

                {/* Vibrant block category badge */}
                <span className="absolute top-3 left-3 rounded-button px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-white bg-primary/90 backdrop-blur-sm">
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
