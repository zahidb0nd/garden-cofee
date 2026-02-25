// Navbar — Glassmorphism sticky navigation with desktop links and mobile hamburger menu
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

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

    // Add glass effect after scrolling past 20px
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "glass-strong shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                    : "bg-background/80 backdrop-blur-sm"
                }`}
            style={{
                borderBottom: isScrolled
                    ? "1px solid rgba(255,255,255,0.3)"
                    : "1px solid #EDE8E3",
            }}
        >
            <nav
                className="mx-auto flex max-w-[1200px] items-center justify-between px-6"
                aria-label="Main navigation"
            >
                {/* Logo / Store Name */}
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

                {/* Mobile hamburger toggle */}
                <button
                    className="lg:hidden p-2 text-text hover:text-primary transition-colors duration-200"
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
            </nav>

            {/* Mobile slide-down menu with glass effect */}
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
                        className="lg:hidden overflow-hidden glass-strong"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.3)" }}
                    >
                        <ul className="flex flex-col px-6 py-4" role="list">
                            {NAV_LINKS.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`block py-3 font-body text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${isActive ? "text-primary" : "text-text hover:text-primary"
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
