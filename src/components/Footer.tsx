// Footer — OLED dark aware footer with store info
import Link from "next/link";
import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="bg-primary-dark text-white border-t border-white/10"
            role="contentinfo"
        >
            <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {/* Brand Column */}
                    <div>
                        <h2 className="font-heading text-2xl font-bold mb-4">
                            Garden Coffee &amp; Tea Centre
                        </h2>
                        <p className="font-body text-sm leading-relaxed opacity-80">
                            Rooted in tradition. Brewed with love. Discover our premium
                            selection of artisanal coffee and tea powders, crafted from a
                            legacy that spans generations.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-accent text-lg font-semibold mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2" role="list">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="font-body text-sm opacity-80 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-accent text-lg font-semibold mb-4">
                            Visit Us
                        </h3>
                        <ul className="space-y-3" role="list">
                            <li className="flex items-start gap-2">
                                <MapPinIcon className="h-5 w-5 mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                                <span className="font-body text-sm opacity-80">
                                    Garden Coffee and Tea Centre, Main Street
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <PhoneIcon className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                                <span className="font-body text-sm opacity-80">
                                    +91 98765 43210
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <EnvelopeIcon className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                                <span className="font-body text-sm opacity-80">
                                    hello@gardenteacentre.com
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <ClockIcon className="h-5 w-5 mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                                <span className="font-body text-sm opacity-80">
                                    Mon – Sat: 9 AM – 7 PM
                                    <br />
                                    Sun: Closed
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-6 text-center">
                    <p className="font-body text-xs opacity-60">
                        © {currentYear} Garden Coffee and Tea Centre. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
