// MicroInteractions.tsx — Button pulse, floating label form fields, submit spinner + checkmark
"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── 1. Pulse CTA Button ─────────────────────────────────────────────────────
// Pulses once on mount to draw attention, then behaves normally on hover/tap

interface PulseButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}

export function PulseButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
}: PulseButtonProps) {
  const baseClass =
    variant === "primary"
      ? "bg-[#2C5F2E] text-[#FAF7F2] hover:bg-[#1E4520]"
      : "border-2 border-[#2C5F2E] text-[#2C5F2E] hover:bg-[#2C5F2E] hover:text-[#FAF7F2]";

  const sharedClass = `relative inline-flex items-center justify-center rounded-lg px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9883A] focus:ring-offset-2 ${baseClass} ${className}`;

  const motionProps = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.4, ease: "easeOut" as const },
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
  };

  // Pulse ring effect — fades out after initial render
  const PulseRing = () => (
    <motion.span
      className="pointer-events-none absolute inset-0 rounded-lg border-2 border-[#2C5F2E]"
      initial={{ scale: 1, opacity: 0.7 }}
      animate={{ scale: 1.5, opacity: 0 }}
      transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
      aria-hidden="true"
    />
  );

  if (href) {
    return (
      <motion.a href={href} className={sharedClass} {...motionProps}>
        <PulseRing />
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} className={sharedClass} {...motionProps}>
      <PulseRing />
      {children}
    </motion.button>
  );
}

// ─── 2. Floating Label Input ─────────────────────────────────────────────────
// Label floats above on focus or when input has value

interface FloatingInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

export function FloatingInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  error,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const id = useId();
  const isFloating = focused || value.length > 0;

  return (
    <div className="relative pb-1">
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`peer w-full border-b-2 bg-transparent pt-5 pb-1 text-[#2E2E2E] placeholder-transparent outline-none transition-colors duration-200 ${error
            ? "border-red-500"
            : focused
              ? "border-[#2C5F2E]"
              : "border-[#D4CEC9]"
          }`}
        placeholder={label}
      />

      {/* Floating Label */}
      <motion.label
        htmlFor={id}
        className="pointer-events-none absolute left-0 text-[#7A7370]"
        animate={
          isFloating
            ? { top: 0, fontSize: "11px", color: focused ? "#2C5F2E" : "#7A7370" }
            : { top: "20px", fontSize: "16px", color: "#7A7370" }
        }
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}
      >
        {label}
        {required && <span className="ml-0.5 text-[#C9883A]">*</span>}
      </motion.label>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            className="mt-1 text-xs text-red-500"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── 3. Floating Label Textarea ───────────────────────────────────────────────

interface FloatingTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  error?: string;
}

export function FloatingTextarea({
  label,
  name,
  value,
  onChange,
  required = false,
  rows = 4,
  error,
}: FloatingTextareaProps) {
  const [focused, setFocused] = useState(false);
  const id = useId();
  const isFloating = focused || value.length > 0;

  return (
    <div className="relative pb-1">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={rows}
        aria-required={required}
        aria-invalid={!!error}
        className={`peer w-full resize-none border-b-2 bg-transparent pt-6 pb-1 text-[#2E2E2E] placeholder-transparent outline-none transition-colors duration-200 ${error ? "border-red-500" : focused ? "border-[#2C5F2E]" : "border-[#D4CEC9]"
          }`}
        placeholder={label}
      />
      <motion.label
        htmlFor={id}
        className="pointer-events-none absolute left-0 text-[#7A7370]"
        animate={
          isFloating
            ? { top: 0, fontSize: "11px", color: focused ? "#2C5F2E" : "#7A7370" }
            : { top: "20px", fontSize: "16px", color: "#7A7370" }
        }
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}
      >
        {label}
        {required && <span className="ml-0.5 text-[#C9883A]">*</span>}
      </motion.label>
      <AnimatePresence>
        {error && (
          <motion.p role="alert" className="mt-1 text-xs text-red-500"
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── 4. Submit Button with Spinner → Checkmark ───────────────────────────────

type SubmitState = "idle" | "loading" | "success" | "error";

interface AnimatedSubmitButtonProps {
  state: SubmitState;
  idleText?: string;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function AnimatedSubmitButton({
  state,
  idleText = "Send Message",
  loadingText = "Sending...",
  successText = "Message Sent!",
  errorText = "Try Again",
  onClick,
  type = "submit",
}: AnimatedSubmitButtonProps) {
  const bgColor =
    state === "success" ? "#2C5F2E" :
      state === "error" ? "#D9534F" : "#2C5F2E";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={state === "loading" || state === "success"}
      className="relative w-full overflow-hidden rounded-lg px-8 py-3 text-sm font-bold uppercase tracking-widest text-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#C9883A] focus:ring-offset-2 disabled:cursor-not-allowed"
      style={{ backgroundColor: bgColor }}
      animate={{ backgroundColor: bgColor }}
      whileHover={state === "idle" || state === "error" ? { scale: 1.02 } : {}}
      whileTap={state === "idle" || state === "error" ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
      aria-live="polite"
      aria-label={
        state === "loading" ? loadingText :
          state === "success" ? successText :
            state === "error" ? errorText : idleText
      }
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span key="idle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}>
            {idleText}
          </motion.span>
        )}

        {state === "loading" && (
          <motion.span key="loading" className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Spinner */}
            <motion.svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
              <path d="M12 2 A10 10 0 0 1 22 12" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </motion.svg>
            {loadingText}
          </motion.span>
        )}

        {state === "success" && (
          <motion.span key="success" className="flex items-center justify-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            {/* Checkmark */}
            <motion.svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <motion.path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }} />
            </motion.svg>
            {successText}
          </motion.span>
        )}

        {state === "error" && (
          <motion.span key="error"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {errorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/*
FULL CONTACT FORM USAGE EXAMPLE:
--------------------------------------------------
"use client";
import { useState } from "react";
import { FloatingInput, FloatingTextarea, AnimatedSubmitButton } from "@/components/MicroInteractions";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitState, setSubmitState] = useState<"idle"|"loading"|"success"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("loading");
    try {
      const res = await fetch("https://formspree.io/f/YOUR_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitState(res.ok ? "success" : "error");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FloatingInput label="Your Name" name="name" value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <FloatingInput label="Email Address" name="email" type="email" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <FloatingTextarea label="Your Message" name="message" value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })} required />
      <AnimatedSubmitButton state={submitState} />
    </form>
  );
}
--------------------------------------------------
*/
