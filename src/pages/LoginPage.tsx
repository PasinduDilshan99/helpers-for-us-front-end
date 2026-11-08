"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { hexToRgba } from "@/utils/functions";

/* ------------------------------------------------------------------ */
/*  Personalise these                                                  */
/* ------------------------------------------------------------------ */
const APP_NAME = "Bloom";                 // name of the workspace
const HER_NAME = "love";                  // e.g. "Nimasha" -> "Good evening, Nimasha"
const MADE_BY = "Pasindu";                // shown in the footer
const SIGN_IN_REDIRECT = "/";

const EASE = [0.22, 1, 0.36, 1] as const;

const MESSAGES = [
  "Every small step you take today builds the person you're becoming.",
  "You don't have to be perfect. You just have to keep going.",
  "Learning something new is the quietest kind of bravery.",
  "Your hard work is seen, and it is so very loved.",
  "Take a breath. You've got this, and I've got you.",
];

const HIGHLIGHTS = [
  { title: "Plan your day", text: "Tasks and priorities, calm and organised." },
  { title: "Keep learning", text: "Notes, goals and progress in one place." },
  { title: "Do your best work", text: "Fewer clicks, more focus." },
];

/* Fixed values (not Math.random) so server and client render the same */
const HEARTS = [
  { left: "6%", size: 14, delay: 0, duration: 14 },
  { left: "18%", size: 22, delay: 3, duration: 18 },
  { left: "30%", size: 12, delay: 7, duration: 15 },
  { left: "44%", size: 18, delay: 1.5, duration: 20 },
  { left: "58%", size: 10, delay: 9, duration: 13 },
  { left: "70%", size: 24, delay: 4.5, duration: 19 },
  { left: "82%", size: 14, delay: 11, duration: 16 },
  { left: "92%", size: 18, delay: 6, duration: 17 },
];

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
const HeartIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);
const UserIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const LockIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
const EyeIcon = ({ off }: { off: boolean }) =>
  off ? (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ) : (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

/* ------------------------------------------------------------------ */
/*  Animated logo – a softly beating heart                             */
/* ------------------------------------------------------------------ */
function BeatingHeart({ size = 44, reduce }: { size?: number; reduce: boolean }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {!reduce && (
        <motion.span
          className="absolute inset-0 rounded-2xl"
          style={{ backgroundColor: hexToRgba("#ffffff", 0.25) }}
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <div
        className="relative flex h-full w-full items-center justify-center rounded-2xl backdrop-blur-sm"
        style={{
          backgroundColor: hexToRgba("#ffffff", 0.18),
          border: `1px solid ${hexToRgba("#ffffff", 0.3)}`,
        }}
      >
        <motion.div
          animate={reduce ? undefined : { scale: [1, 1.14, 1, 1.08, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-white"
        >
          <HeartIcon className="h-5 w-5" />
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Input field                                                        */
/* ------------------------------------------------------------------ */
interface FieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  autoComplete: string;
  disabled: boolean;
  hasError: boolean;
  icon: React.ReactNode;
  onChange: (v: string) => void;
  onKeyEvent?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  trailing?: React.ReactNode;
  describedBy?: string;
  autoFocus?: boolean;
}

function Field({
  id, label, type, value, placeholder, autoComplete, disabled, hasError,
  icon, onChange, onKeyEvent, trailing, describedBy, autoFocus,
}: FieldProps) {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = hasError ? theme.error : focused ? theme.primary : theme.border;
  const ringColor = hasError ? theme.error : theme.primary;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium" style={{ color: theme.text }}>
        {label}
      </label>
      <div
        className="relative flex items-center rounded-xl transition-all duration-300"
        style={{
          backgroundColor: theme.surface,
          border: `1px solid ${borderColor}`,
          boxShadow: focused ? `0 0 0 4px ${hexToRgba(ringColor, 0.14)}` : `0 1px 2px ${hexToRgba("#000000", 0.04)}`,
        }}
      >
        <span
          className="pointer-events-none pl-3.5 transition-colors duration-300"
          style={{ color: focused ? theme.primary : theme.textSecondary }}
        >
          {icon}
        </span>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyEvent}
          onKeyUp={onKeyEvent}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-3 py-3 text-[15px] outline-none disabled:cursor-not-allowed disabled:opacity-60"
          style={{ color: theme.text }}
        />
        {trailing}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [greeting, setGreeting] = useState("Welcome back");
  const [messageIndex, setMessageIndex] = useState(0);

  const router = useRouter();
  const { login } = useAuth();
  const { theme } = useTheme();
  const reduce = !!useReducedMotion();

  const uid = useId();
  const usernameId = `${uid}-username`;
  const passwordId = `${uid}-password`;
  const errorId = `${uid}-error`;

  const canSubmit = !!username.trim() && !!password && !isLoading && !success;

  /* Time-aware greeting (client only, avoids hydration mismatch) */
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);

  /* Rotating encouragement */
  useEffect(() => {
    const t = setInterval(() => setMessageIndex((i) => (i + 1) % MESSAGES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const hearts = useMemo(() => HEARTS, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    try {
      setError(null);
      setIsLoading(true);
      await login(username.trim(), password);
      setSuccess(true);
      setTimeout(() => router.push(SIGN_IN_REDIRECT), 1100);
    } catch (err: unknown) {
      console.log(err);
      setError("Hmm, that doesn't look right. Please check your details and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const detectCapsLock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCapsLock(e.getModifierState?.("CapsLock") ?? false);
  };

  return (
    <div
      className="flex min-h-screen w-full transition-colors duration-300"
      style={{ backgroundColor: theme.background }}
    >
      {/* ================= Brand / inspiration panel ================= */}
      <aside
        className="relative hidden w-[48%] max-w-[680px] flex-col justify-between overflow-hidden p-12 text-white lg:flex"
        style={{ background: `linear-gradient(150deg, ${theme.primary}, ${theme.secondary})` }}
      >
        {/* soft glow orbs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <motion.div
            className="absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full blur-3xl"
            style={{ backgroundColor: hexToRgba("#ffffff", 0.12) }}
            animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-32 -left-20 h-[420px] w-[420px] rounded-full blur-3xl"
            style={{ backgroundColor: hexToRgba(theme.accent, 0.25) }}
            animate={reduce ? undefined : { scale: [1.1, 1, 1.1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* floating hearts */}
          {!reduce &&
            hearts.map((h, i) => (
              <motion.span
                key={i}
                className="absolute bottom-[-40px]"
                style={{ left: h.left, color: hexToRgba("#ffffff", 0.35) }}
                initial={{ y: 0, opacity: 0, rotate: -8 }}
                animate={{ y: [-0, -720], opacity: [0, 0.8, 0], rotate: [-8, 10, -6] }}
                transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="block" style={{ width: h.size, height: h.size }}>
                  <HeartIcon className="h-full w-full" />
                </span>
              </motion.span>
            ))}
        </div>

        {/* logo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative z-10 flex items-center gap-3"
        >
          <BeatingHeart reduce={reduce} />
          <span className="text-2xl font-semibold tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {APP_NAME}
          </span>
        </motion.div>

        {/* message block */}
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mb-5 text-4xl font-semibold leading-tight xl:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            A little space,
            <br />
            made with love,
            <br />
            for your big dreams.
          </motion.h2>

          <div className="mb-8 min-h-[56px] max-w-sm">
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-[15px] italic leading-relaxed"
                style={{ color: hexToRgba("#ffffff", 0.9) }}
              >
                “{MESSAGES[messageIndex]}”
              </motion.p>
            </AnimatePresence>
          </div>

          <ul className="space-y-3">
            {HIGHLIGHTS.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.35 + i * 0.12 }}
                className="flex items-center gap-3 rounded-xl px-4 py-3 backdrop-blur-sm"
                style={{
                  backgroundColor: hexToRgba("#ffffff", 0.1),
                  border: `1px solid ${hexToRgba("#ffffff", 0.16)}`,
                }}
              >
                <span
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: hexToRgba("#ffffff", 0.2) }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs" style={{ color: hexToRgba("#ffffff", 0.8) }}>{item.text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 flex items-center gap-1.5 text-xs" style={{ color: hexToRgba("#ffffff", 0.75) }}>
          Made with <HeartIcon className="h-3 w-3" /> by {MADE_BY}
        </p>
      </aside>

      {/* ================= Form panel ================= */}
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-12 sm:px-8">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ backgroundColor: hexToRgba(theme.primary, 0.08) }}
          />
          <div
            className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
            style={{ backgroundColor: hexToRgba(theme.accent, 0.08) }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="relative z-10 w-full max-w-[420px]"
        >
          {/* mobile brand */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
              style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
            >
              <HeartIcon className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold" style={{ color: theme.text, fontFamily: "'Cormorant Garamond', serif" }}>
              {APP_NAME}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              /* ---------- Success state ---------- */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col items-center py-16 text-center"
                role="status"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.25, 1] }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-full text-white"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                    boxShadow: `0 12px 30px ${hexToRgba(theme.primary, 0.35)}`,
                  }}
                >
                  <HeartIcon className="h-9 w-9" />
                </motion.div>
                <h2 className="text-2xl font-semibold" style={{ color: theme.text, fontFamily: "'Jost', sans-serif" }}>
                  Welcome back, {HER_NAME}
                </h2>
                <p className="mt-2 text-sm" style={{ color: theme.textSecondary }}>
                  Getting your workspace ready…
                </p>
                <div className="mt-6 h-1 w-40 overflow-hidden rounded-full" style={{ backgroundColor: hexToRgba(theme.primary, 0.15) }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})` }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            ) : (
              /* ---------- Form ---------- */
              <motion.div key="form" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <div className="mb-8">
                  <h1
                    className="text-3xl font-semibold tracking-tight"
                    style={{ color: theme.text, fontFamily: "'Jost', sans-serif" }}
                  >
                    {greeting}, {HER_NAME}
                    <motion.span
                      className="ml-2 inline-block align-middle"
                      style={{ color: theme.primary }}
                      animate={reduce ? undefined : { scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <HeartIcon className="h-6 w-6" />
                    </motion.span>
                  </h1>
                  <p className="mt-2 text-sm" style={{ color: theme.textSecondary }}>
                    Sign in to pick up right where you left off.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <AnimatePresence initial={false}>
                    {error && (
                      <motion.div
                        key="error"
                        id={errorId}
                        role="alert"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          x: reduce ? 0 : [0, -8, 8, -5, 5, 0],
                        }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div
                          className="flex items-start gap-3 rounded-xl p-3.5"
                          style={{
                            backgroundColor: hexToRgba(theme.error, 0.08),
                            border: `1px solid ${hexToRgba(theme.error, 0.25)}`,
                          }}
                        >
                          <svg className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: theme.error }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <p className="text-sm" style={{ color: theme.error }}>{error}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Field
                    id={usernameId}
                    label="Username"
                    type="text"
                    value={username}
                    placeholder="Your username"
                    autoComplete="username"
                    disabled={isLoading}
                    hasError={!!error}
                    icon={<UserIcon />}
                    onChange={(v) => { setUsername(v); if (error) setError(null); }}
                    describedBy={error ? errorId : undefined}
                    autoFocus
                  />

                  <div>
                    <Field
                      id={passwordId}
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      placeholder="Your password"
                      autoComplete="current-password"
                      disabled={isLoading}
                      hasError={!!error}
                      icon={<LockIcon />}
                      onChange={(v) => { setPassword(v); if (error) setError(null); }}
                      onKeyEvent={detectCapsLock}
                      describedBy={error ? errorId : undefined}
                      trailing={
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          aria-pressed={showPassword}
                          className="mr-2 rounded-lg p-1.5 transition-colors duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2"
                          style={{ color: theme.textSecondary }}
                        >
                          <EyeIcon off={showPassword} />
                        </button>
                      }
                    />
                    <AnimatePresence initial={false}>
                      {capsLock && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1.5 overflow-hidden text-xs font-medium"
                          style={{ color: theme.error }}
                          role="status"
                        >
                          Caps Lock is on
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`${uid}-remember`}
                      className="flex cursor-pointer select-none items-center gap-2 text-sm"
                      style={{ color: theme.textSecondary }}
                    >
                      <input
                        id={`${uid}-remember`}
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="h-4 w-4 rounded"
                        style={{ accentColor: theme.primary }}
                      />
                      Keep me signed in
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium transition-opacity duration-200 hover:opacity-80 focus-visible:underline focus-visible:outline-none"
                      style={{ color: theme.primary }}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!canSubmit}
                    whileHover={canSubmit && !reduce ? { y: -2 } : undefined}
                    whileTap={canSubmit && !reduce ? { scale: 0.98 } : undefined}
                    className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl px-4 py-3 text-[15px] font-semibold text-white transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                      boxShadow: canSubmit ? `0 10px 24px ${hexToRgba(theme.primary, 0.3)}` : "none",
                    }}
                  >
                    {/* shine sweep on hover */}
                    {canSubmit && !reduce && (
                      <span
                        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 transition-all duration-700 group-hover:left-[150%]"
                        style={{ background: `linear-gradient(90deg, transparent, ${hexToRgba("#ffffff", 0.3)}, transparent)` }}
                      />
                    )}
                    {isLoading ? (
                      <span className="relative flex items-center gap-2">
                        <motion.span
                          animate={reduce ? undefined : { scale: [1, 1.25, 1] }}
                          transition={{ duration: 0.9, repeat: Infinity }}
                        >
                          <HeartIcon className="h-4 w-4" />
                        </motion.span>
                        Signing you in…
                      </span>
                    ) : (
                      <span className="relative flex items-center gap-2">
                        Sign in
                        <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    )}
                  </motion.button>
                </form>

                <div
                  className="mt-8 pt-6 text-center text-sm"
                  style={{ borderTop: `1px solid ${theme.border}`, color: theme.textSecondary }}
                >
                  Trouble getting in?{" "}
                  <Link
                    href="/request-account"
                    className="font-medium transition-opacity duration-200 hover:opacity-80 focus-visible:underline focus-visible:outline-none"
                    style={{ color: theme.primary }}
                  >
                    Ask for help
                  </Link>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs" style={{ color: theme.textSecondary }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: theme.success }} />
                  Secure, encrypted connection
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-8 flex items-center justify-center gap-1.5 text-xs lg:hidden" style={{ color: theme.textSecondary }}>
            Made with <span style={{ color: theme.primary }}><HeartIcon className="h-3 w-3" /></span> by {MADE_BY}
          </p>
        </motion.div>
      </main>
    </div>
  );
}