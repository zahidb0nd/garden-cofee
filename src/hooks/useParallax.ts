// useParallax — Custom hook for scroll-based parallax effect
"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Returns a value representing the current scroll position,
 * which can be used to drive parallax transforms.
 *
 * @param speed - Parallax speed multiplier (0.1–1.0). Lower = slower.
 * @param clamp - Maximum offset in pixels to prevent runaway transforms.
 */
export function useParallax(speed: number = 0.3, clamp: number = 200) {
    const [offset, setOffset] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) return;

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const raw = window.scrollY * speed;
                    setOffset(Math.min(raw, clamp));
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed, clamp, shouldReduceMotion]);

    return shouldReduceMotion ? 0 : offset;
}
