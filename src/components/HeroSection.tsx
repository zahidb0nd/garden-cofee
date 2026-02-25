// HeroSection — Liquid glass + parallax + motion-driven staggered entrance
"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useParallax } from "@/hooks/useParallax";

interface HeroSectionProps {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaHref?: string;
    backgroundImage?: string;
    showScrollIndicator?: boolean;
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

    // Stagger children animation
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" },
        },
    };

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
                        : "url('/images/hero-bg.png')", // Ensure this image exists in public/images/
                    transform: `translateY(${parallaxOffset}px) scale(1.1)`,
                }}
                aria-hidden="true"
            />

            {/* Overlay */}
            <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
                aria-hidden="true"
            />

            {/* Morphing decorative blobs */}
            {!compact && (
                <>
                    <div
                        className="absolute top-[15%] left-[8%] w-36 h-36 animate-morph animate-float-slow pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(201,136,58,0.12), transparent 70%)" }}
                        aria-hidden="true"
                    />
                    <div
                        className="absolute bottom-[18%] right-[10%] w-52 h-52 animate-morph animate-float pointer-events-none"
                        style={{
                            background: "radial-gradient(circle, rgba(44,95,46,0.10), transparent 70%)",
                            animationDelay: "-3s",
                        }}
                        aria-hidden="true"
                    />
                </>
            )}

            {/* Liquid Glass Content Panel */}
            <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
                <motion.div
                    className={compact ? "" : "liquid-glass rounded-card px-8 py-10 md:px-12 md:py-14"}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        className={`font-heading font-bold text-white ${compact
                            ? "text-3xl md:text-4xl"
                            : "text-4xl md:text-5xl lg:text-[56px]"
                            }`}
                        variants={itemVariants}
                    >
                        {title}
                    </motion.h1>

                    {subtitle && !compact && (
                        <motion.p
                            className="mt-4 font-body text-base md:text-lg text-white/85"
                            variants={itemVariants}
                        >
                            {subtitle}
                        </motion.p>
                    )}

                    {ctaText && !compact && (
                        <motion.div className="mt-8" variants={itemVariants}>
                            <Link
                                href={ctaHref}
                                className="inline-block rounded-button bg-primary px-6 py-3 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-250 hover:bg-primary-dark hover:shadow-[0_4px_20px_rgba(44,95,46,0.4)] hover:scale-[1.03] cursor-pointer"
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
                    animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                >
                    <ChevronDownIcon className="h-8 w-8 text-white/60" />
                </motion.div>
            )}
        </section>
    );
}
