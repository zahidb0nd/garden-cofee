"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { PulseButton } from "./MicroInteractions";

interface GrainParallaxHeroProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  tagline: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function GrainParallaxHero({
  imageSrc,
  imageAlt,
  title,
  tagline,
  ctaText = "Explore Our Products",
  ctaHref = "/products",
}: GrainParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax: image moves at 40% of scroll speed, creating depth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] overflow-hidden"
      aria-label="Hero section"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ y: imageY }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[rgba(46,46,46,0.55)]" />
      </motion.div>

      {/* Grain Texture Overlay */}
      {/* SVG grain filter applied as a pseudo-element via inline style */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.18]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* Vignette — darkens edges for cinematic depth */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Hero Content */}
      <motion.div
        className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ y: contentY, opacity }}
      >
        {/* Decorative line above title */}
        <motion.div
          className="mb-6 h-px w-16 bg-[#C9883A]"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        />

        {/* Brand Name */}
        <motion.h1
          className="font-heading mb-4 text-5xl font-bold leading-tight text-[#FAF7F2] md:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
        >
          {title}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mb-10 max-w-xl text-lg leading-relaxed text-[#FAF7F2]/80 md:text-xl font-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: "easeOut" }}
        >
          {tagline}
        </motion.p>

        {/* CTA Button with pulse animation on mount */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: "easeOut" }}
        >
          <PulseButton href={ctaHref} variant="primary">
            {ctaText}
          </PulseButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.div
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-[#FAF7F2]/50 p-1"
            aria-hidden="true"
          >
            <motion.div
              className="h-2 w-1 rounded-full bg-[#FAF7F2]/70"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
