// ContactForm — Glassmorphism contact form with validation
"use client";

import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const formspreeEndpoint =
        process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/placeholder";

    function validate(formData: FormData): Record<string, string> {
        const validationErrors: Record<string, string> = {};
        const name = formData.get("name")?.toString().trim() || "";
        const email = formData.get("email")?.toString().trim() || "";
        const message = formData.get("message")?.toString().trim() || "";

        if (!name) validationErrors.name = "Name is required.";
        if (!email) {
            validationErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = "Please enter a valid email address.";
        }
        if (!message) validationErrors.message = "Message is required.";

        return validationErrors;
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setStatus("submitting");

        try {
            const response = await fetch(formspreeEndpoint, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                setStatus("success");
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div
                className="glass rounded-card p-8 text-center"
                role="alert"
                aria-live="polite"
            >
                <h3 className="font-heading text-xl font-bold text-primary mb-2">
                    Thank you!
                </h3>
                <p className="font-body text-text">
                    Your message has been sent. We&apos;ll get back to you soon.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 font-body text-sm font-bold text-primary underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div className="glass rounded-card p-6 md:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Name field */}
                <div>
                    <label
                        htmlFor="contact-name"
                        className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-2"
                    >
                        Name
                    </label>
                    <input
                        id="contact-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        className={`w-full border-0 border-b-2 bg-transparent px-0 py-2 font-body text-text outline-none transition-colors duration-200 focus:border-primary ${errors.name ? "border-error" : "border-input-border"
                            }`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                        <p id="name-error" className="mt-1 font-body text-xs text-error" role="alert">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email field */}
                <div>
                    <label
                        htmlFor="contact-email"
                        className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-2"
                    >
                        Email
                    </label>
                    <input
                        id="contact-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        className={`w-full border-0 border-b-2 bg-transparent px-0 py-2 font-body text-text outline-none transition-colors duration-200 focus:border-primary ${errors.email ? "border-error" : "border-input-border"
                            }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                        <p id="email-error" className="mt-1 font-body text-xs text-error" role="alert">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Message field */}
                <div>
                    <label
                        htmlFor="contact-message"
                        className="block font-body text-xs font-bold uppercase tracking-wider text-muted mb-2"
                    >
                        Message
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        className={`w-full border-0 border-b-2 bg-transparent px-0 py-2 font-body text-text outline-none transition-colors duration-200 resize-y focus:border-primary ${errors.message ? "border-error" : "border-input-border"
                            }`}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                        <p id="message-error" className="mt-1 font-body text-xs text-error" role="alert">
                            {errors.message}
                        </p>
                    )}
                </div>

                {/* Error banner */}
                {status === "error" && (
                    <div
                        className="glass rounded-button p-3 text-center"
                        role="alert"
                        aria-live="assertive"
                        style={{ borderLeft: "3px solid var(--color-error)" }}
                    >
                        <p className="font-body text-sm text-error">
                            Something went wrong. Please try again or contact us directly.
                        </p>
                    </div>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-button bg-primary px-6 py-3 font-body text-sm font-bold uppercase tracking-wider text-background transition-all duration-250 hover:bg-primary-dark hover:shadow-[0_4px_20px_rgba(44,95,46,0.3)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {status === "submitting" ? "Sending…" : "Send Message"}
                </button>
            </form>
        </div>
    );
}
