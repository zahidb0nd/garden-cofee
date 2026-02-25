// HeroSection — Full-width hero with parallax background, glass content panel, and CTA
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useParallax } from "@/hooks/useParallax";

interface HeroSectionProps {
    /** Main heading text */
    title: string;
    /** Subtitle / tagline */
    subtitle?: string;
    /** CTA button text */
    ctaText?: string;
    /** CTA button link */
    ctaHref?: string;
    /** Background image URL (if not set, uses a gradient fallback) */
    backgroundImage?: string;
    /** Whether to show the scroll indicator arrow */
    showScrollIndicator?: boolean;
    /** Compact mode for inner pages (240px height) */
    compact?: boolean;
}

export function HeroSection({
    title,
    subtitle,
    ctaText,
    ctaHref = "/products",
    backgroundImage,
    showScrollIndicator = false,
    compact = false,
}: HeroSectionProps) {
    const shouldReduceMotion = useReducedMotion();
    const parallaxOffset = useParallax(compact ? 0.15 : 0.4, 250);

    return (
        <section
            className={`relative flex items-center justify-center overflow-hidden ${compact ? "h-[240px]" : "h-[70vh] lg:h-screen"
                }`}
            aria-label={compact ? title : "Hero section"}
        >
            {/* Parallax Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
                style={{
                    backgroundImage: backgroundImage
                        ? `url(${backgroundImage})`
                        : "linear-gradient(135deg, #2C5F2E 0%, #1E4520 50%, #7B4A2D 100%)",
                    transform: `translateY(${parallaxOffset}px) scale(1.1)`,
                    transition: shouldReduceMotion ? "none" : undefined,
                }}
                aria-hidden="true"
            />

            {/* Overlay with subtle grain texture */}
            <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(46, 46, 46, 0.5)" }}
                aria-hidden="true"
            />

            {/* Floating decorative blobs */}
            {!compact && (
                <>
                    <div
                        className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full animate-float-slow pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(201,136,58,0.15), transparent 70%)" }}
                        aria-hidden="true"
                    />
                    <div
                        className="absolute bottom-[20%] right-[12%] w-48 h-48 rounded-full animate-float pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(44,95,46,0.12), transparent 70%)" }}
                        aria-hidden="true"
                    />
                    <div
                        className="absolute top-[40%] right-[25%] w-20 h-20 rounded-full animate-shimmer pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)" }}
                        aria-hidden="true"
                    />
                </>
            )}

            {/* Glass Content Panel */}
            <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
                <motion.div
                    className={`${compact
                            ? ""
                            : "glass-dark rounded-card px-8 py-10 md:px-12 md:py-14"
                        }`}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
                >
                    <h1
                        className={`font-heading font-bold text-background ${compact
                                ? "text-3xl md:text-4xl"
                                : "text-4xl md:text-5xl lg:text-[56px]"
                            }`}
                    >
                        {title}
                    </h1>

                    {subtitle && !compact && (
                        <motion.p
                            className="mt-4 font-body text-base md:text-lg text-background/85"
                            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: shouldReduceMotion ? 0 : 0.4,
                                delay: shouldReduceMotion ? 0 : 0.2,
                                ease: "easeOut",
                            }}
                        >
                            {subtitle}
                        </motion.p>
                    )}

                    {ctaText && !compact && (
                        <motion.div
                            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: shouldReduceMotion ? 0 : 0.4,
                                delay: shouldReduceMotion ? 0 : 0.4,
                                ease: "easeOut",
                            }}
                            className="mt-8"
                        >
                            <Link
                                href={ctaHref}
                                className="inline-block rounded-button bg-primary px-6 py-3 font-body text-sm font-bold uppercase tracking-wider text-background transition-all duration-250 hover:bg-primary-dark hover:shadow-[0_4px_20px_rgba(44,95,46,0.4)] hover:scale-[1.03]"
                            >
                                {ctaText}
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            {showScrollIndicator && !compact && (
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={
                        shouldReduceMotion ? {} : { y: [0, 8, 0] }
                    }
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    aria-hidden="true"
                >
                    <ChevronDownIcon className="h-8 w-8 text-background/60" />
                </motion.div>
            )}
        </section>
    );
}
