// AnimationWrapper — Framer Motion fade-in wrapper that respects prefers-reduced-motion
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimationWrapperProps {
    children: ReactNode;
    /** Delay before animation starts (in seconds) */
    delay?: number;
    /** Custom className */
    className?: string;
}

export function AnimationWrapper({
    children,
    delay = 0,
    className = "",
}: AnimationWrapperProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: shouldReduceMotion ? 0 : delay,
                ease: "easeOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
