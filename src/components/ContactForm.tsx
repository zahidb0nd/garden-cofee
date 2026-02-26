// ContactForm — Liquid glass contact form with micro-interactions
"use client";

import { useState, type FormEvent } from "react";
import { FloatingInput, FloatingTextarea, AnimatedSubmitButton } from "./MicroInteractions";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const formspreeEndpoint =
        process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/placeholder";

    function validate(): Record<string, string> {
        const validationErrors: Record<string, string> = {};
        const { name, email, message } = form;

        if (!name.trim()) validationErrors.name = "Name is required.";
        if (!email.trim()) {
            validationErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = "Please enter a valid email address.";
        }
        if (!message.trim()) validationErrors.message = "Message is required.";

        return validationErrors;
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setStatus("loading");

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("message", form.message);

            const response = await fetch(formspreeEndpoint, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                setStatus("success");
                setForm({ name: "", email: "", message: "" });
                // Reset status to idle after a few seconds
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    }

    return (
        <div className="liquid-glass rounded-card p-6 md:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <FloatingInput
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    error={errors.name}
                    required
                />

                <FloatingInput
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    error={errors.email}
                    required
                />

                <FloatingTextarea
                    label="Message"
                    name="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    error={errors.message}
                    required
                    rows={4}
                />

                {/* Error banner mostly handled by individual field errors now, but kept as a fallback */}
                {status === "error" && Object.keys(errors).length === 0 && (
                    <div className="glass rounded-button p-3 text-center" role="alert" aria-live="assertive"
                        style={{ borderLeft: "3px solid var(--color-error)" }}>
                        <p className="font-body text-sm text-error">
                            Something went wrong. Please try again or contact us directly.
                        </p>
                    </div>
                )}

                <AnimatedSubmitButton
                    state={status}
                    idleText="Send Message"
                    loadingText="Sending…"
                    successText="Message Sent!"
                    errorText="Try Again"
                />
            </form>
        </div>
    );
}

