// Contact and Location page — Form, business info, and map
import type { Metadata } from "next";
import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";
import { HeroSection } from "@/components/HeroSection";
import { ContactForm } from "@/components/ContactForm";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import { AnimationWrapper } from "@/components/AnimationWrapper";
import { sanityFetch } from "@/lib/sanity";
import { siteSettingsQuery } from "@/lib/queries";
import type { SiteSettings } from "@/lib/types";

export const metadata: Metadata = {
    title: "Contact & Location",
    description:
        "Find us at Garden Coffee and Tea Centre. View our store location, operating hours, and send us a message.",
};

export default async function ContactPage() {
    const settings = await sanityFetch<SiteSettings>(siteSettingsQuery);

    const storeName = settings?.storeName || "Garden Coffee & Tea Centre";
    const address = settings?.address || "# 52, Near HDFC Bank and Opposite Bismillah Function Hall, 3rd Main, Bismillah Nagar, Bannerghatta Road, BTM Layout 1st Stage, Bangalore – 560029, Karnataka";
    const phone = settings?.phone || "+91 98765 43210";
    const email = settings?.email || "hello@gardenteacentre.com";
    const openingHours = settings?.openingHours || "Mon – Sat: 7:00 AM – 9:00 PM\nSun: 7:00 AM – 2:00 PM";

    return (
        <>
            {/* Page Header */}
            <HeroSection title="Contact & Location" compact />

            <section className="theme-bg py-12 md:py-20">
                <div className="mx-auto max-w-[1200px] px-6">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                        {/* Business Info & Map — shows first on mobile */}
                        <div className="order-1 lg:order-2">
                            <AnimationWrapper>
                                <h2 className="font-heading text-2xl md:text-[32px] font-bold theme-text mb-6">
                                    {storeName}
                                </h2>

                                <ul className="space-y-4 mb-8" role="list">
                                    <li className="flex items-start gap-3">
                                        <MapPinIcon
                                            className="h-6 w-6 mt-0.5 shrink-0 text-primary"
                                            aria-hidden="true"
                                        />
                                        <div>
                                            <span className="font-body text-xs font-bold uppercase tracking-wider text-muted">
                                                Address
                                            </span>
                                            <p className="font-body text-text">{address}</p>
                                        </div>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <PhoneIcon
                                            className="h-6 w-6 mt-0.5 shrink-0 text-primary"
                                            aria-hidden="true"
                                        />
                                        <div>
                                            <span className="font-body text-xs font-bold uppercase tracking-wider text-muted">
                                                Phone
                                            </span>
                                            <p className="font-body text-text">
                                                <a
                                                    href={`tel:${phone.replace(/\s/g, "")}`}
                                                    className="hover:text-primary transition-colors duration-200"
                                                >
                                                    {phone}
                                                </a>
                                            </p>
                                        </div>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <EnvelopeIcon
                                            className="h-6 w-6 mt-0.5 shrink-0 text-primary"
                                            aria-hidden="true"
                                        />
                                        <div>
                                            <span className="font-body text-xs font-bold uppercase tracking-wider text-muted">
                                                Email
                                            </span>
                                            <p className="font-body text-text">
                                                <a
                                                    href={`mailto:${email}`}
                                                    className="hover:text-primary transition-colors duration-200"
                                                >
                                                    {email}
                                                </a>
                                            </p>
                                        </div>
                                    </li>

                                    <li className="flex items-start gap-3">
                                        <ClockIcon
                                            className="h-6 w-6 mt-0.5 shrink-0 text-primary"
                                            aria-hidden="true"
                                        />
                                        <div>
                                            <span className="font-body text-xs font-bold uppercase tracking-wider text-muted">
                                                Opening Hours
                                            </span>
                                            <p className="font-body text-text whitespace-pre-line">
                                                {openingHours}
                                            </p>
                                        </div>
                                    </li>
                                </ul>

                                {/* Map embed */}
                                <GoogleMapEmbed />
                            </AnimationWrapper>
                        </div>

                        {/* Contact Form — shows second on mobile, left on desktop */}
                        <div className="order-2 lg:order-1">
                            <AnimationWrapper delay={0.1}>
                                <h2 className="font-heading text-2xl md:text-[32px] font-bold theme-text mb-6">
                                    Send a Message
                                </h2>
                                <p className="font-body theme-muted mb-8">
                                    Have a question or want to know more? Drop us a message and
                                    we&apos;ll get back to you shortly.
                                </p>
                                <ContactForm />
                            </AnimationWrapper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
