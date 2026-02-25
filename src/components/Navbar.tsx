// Navbar — Liquid glass sticky nav with dark mode toggle
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "liquid-glass shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
                    : "bg-background/80 backdrop-blur-sm"
                }`}
        >
            <nav
                className="mx-auto flex max-w-[1200px] items-center justify-between px-6"
                aria-label="Main navigation"
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="font-heading text-xl font-bold text-primary py-4 lg:py-0"
                    style={{ lineHeight: "72px" }}
                >
                    Garden Coffee &amp; Tea
                </Link>

                {/* Desktop nav links */}
                <ul className="hidden lg:flex items-center gap-8" role="list">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`font-body text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${isActive
                                            ? "text-primary border-b-2 border-primary pb-1"
                                            : "text-text hover:text-primary"
                                        }`}
                                    style={{ lineHeight: "72px" }}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Right side: Theme Toggle + Hamburger */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <button
                        className="lg:hidden p-2 text-text hover:text-primary transition-colors duration-200 cursor-pointer"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    >
                        {isMenuOpen ? (
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile slide-down menu with liquid glass */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                                height: { duration: shouldReduceMotion ? 0 : 0.25 },
                                opacity: { duration: shouldReduceMotion ? 0 : 0.2 },
                            },
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                                height: { duration: shouldReduceMotion ? 0 : 0.2 },
                                opacity: { duration: shouldReduceMotion ? 0 : 0.15 },
                            },
                        }}
                        className="lg:hidden overflow-hidden liquid-glass"
                    >
                        <ul className="flex flex-col px-6 py-4" role="list">
                            {NAV_LINKS.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`block py-3 font-body text-sm font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${isActive ? "text-primary" : "text-text hover:text-primary"
                                                }`}
                                            style={{ minHeight: "48px", lineHeight: "24px" }}
                                            aria-current={isActive ? "page" : undefined}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
