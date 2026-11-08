"use client";

import React from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Shield,
  ArrowLeft,
  Home,
  Phone,
  Mail,
  AlertTriangle,
  Lock,
  FileText,
  Clock,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { COMPANY_NAME, COMPANY_THEME } from "@/utils/constant";

/* ─── Easing ──────────────────────────────────────────────────────────────── */
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SMOOTH: [number, number, number, number] = [0.4, 0, 0.2, 1];
const SPRING_BOUNCY = { type: "spring", damping: 16, stiffness: 400 } as const;
const SPRING_SNAPPY = { type: "spring", damping: 22, stiffness: 300 } as const;
const SPRING_SOFT   = { type: "spring", damping: 28, stiffness: 180 } as const;

/* ─── rgba helper ─────────────────────────────────────────────────────────── */
const rgba = (hex: string, a: number) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
};

/* ─── Ocean palette (matches NotFound exactly) ────────────────────────────── */
const O = {
  bg:       "linear-gradient(160deg,#0a2a3a 0%,#0d3d4f 30%,#0e5a5e 60%,#0f7a6e 100%)",
  teal:     "#14b8a6",
  cyan:     "#06b6d4",
  tealDark: "#0d9488",
  tealDeep: "#0f766e",
  tealText: "#5eead4",
  mint:     "rgba(167,243,208,0.7)",
  mintFade: "rgba(167,243,208,0.4)",
  white12:  "rgba(255,255,255,0.12)",
  white08:  "rgba(255,255,255,0.08)",
  white20:  "rgba(255,255,255,0.2)",
  teal12:   "rgba(20,184,166,0.12)",
  teal20:   "rgba(20,184,166,0.2)",
  teal30:   "rgba(20,184,166,0.3)",
  teal06:   "rgba(20,184,166,0.06)",
  cyan08:   "rgba(6,182,212,0.08)",
  error:    "#f87171",
  errorBg:  "rgba(248,113,113,0.12)",
  errorBdr: "rgba(248,113,113,0.3)",
};

/* ─── Sea Turtle SVG (identical to NotFound) ─────────────────────────────── */
interface TurtleProps { size: number; flip: boolean }
const SeaTurtle = ({ size, flip }: TurtleProps) => (
  <svg width={size * 0.75} height={size} viewBox="0 0 60 80" fill="none"
    style={{ transform: flip ? "scaleX(-1)" : undefined, opacity: 0.45 }}>
    <ellipse cx="30" cy="9"  rx="8"    ry="9"    fill="#0f766e" />
    <circle  cx="27" cy="6"  r="1"               fill="#0d9488" />
    <circle  cx="33" cy="6"  r="1"               fill="#0d9488" />
    <circle  cx="23" cy="10" r="2"               fill="#134e4a" />
    <circle  cx="37" cy="10" r="2"               fill="#134e4a" />
    <circle  cx="23.8" cy="9.2" r="0.8"          fill="#5eead4" />
    <circle  cx="37.8" cy="9.2" r="0.8"          fill="#5eead4" />
    <rect x="25" y="16" width="10" height="6" rx="3" fill="#0f766e" />
    <ellipse cx="30" cy="45" rx="17" ry="22" fill="#0f766e" />
    <ellipse cx="30" cy="44" rx="13" ry="18" fill="#14b8a6" />
    <ellipse cx="30" cy="44" rx="7"  ry="10" fill="#0d9488" />
    <line x1="30" y1="26" x2="30" y2="62" stroke="#0f766e" strokeWidth="1.2" />
    <line x1="17" y1="44" x2="43" y2="44" stroke="#0f766e" strokeWidth="1.2" />
    <line x1="19" y1="32" x2="41" y2="56" stroke="#0f766e" strokeWidth="0.8" />
    <line x1="41" y1="32" x2="19" y2="56" stroke="#0f766e" strokeWidth="0.8" />
    <ellipse cx="10" cy="33" rx="7"   ry="4"   fill="#0d9488" transform="rotate(-40 10 33)" />
    <ellipse cx="50" cy="33" rx="7"   ry="4"   fill="#0d9488" transform="rotate(40 50 33)" />
    <ellipse cx="11" cy="57" rx="6"   ry="3.5" fill="#0d9488" transform="rotate(30 11 57)" />
    <ellipse cx="49" cy="57" rx="6"   ry="3.5" fill="#0d9488" transform="rotate(-30 49 57)" />
    <ellipse cx="30" cy="69" rx="3.5" ry="5"   fill="#0f766e" />
  </svg>
);

/* ─── Variants ────────────────────────────────────────────────────────────── */
const pageV:    Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const navV:     Variants = { hidden: { opacity: 0, y: -48 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EXPO_OUT } } };
const cardV:    Variants = { hidden: { opacity: 0, y: 48, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EXPO_OUT } } };
const headerV:  Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.35 } } };
const slideUp:  Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EXPO_OUT } } };
const slideL:   Variants = { hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EXPO_OUT } } };
const bodyV:    Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.55 } } };
const logoV:    Variants = { hidden: { scale: 0, rotate: -90, opacity: 0 }, visible: { scale: 1, rotate: 0, opacity: 1, transition: { ...SPRING_BOUNCY, delay: 0.15 } } };
const alertV:   Variants = { hidden: { scale: 0.4, rotate: -30, opacity: 0 }, visible: { scale: 1, rotate: 0, opacity: 1, transition: { ...SPRING_BOUNCY, delay: 0.4 } } };
const badgeV:   Variants = { hidden: { opacity: 0, scale: 0.7, x: 20 }, visible: { opacity: 1, scale: 1, x: 0, transition: { ...SPRING_SNAPPY, delay: 0.5 } } };
const listItemV: Variants = { hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.38, ease: EXPO_OUT } } };
const chevronV: Variants = { rest: { opacity: 0, x: -4 }, hover: { opacity: 1, x: 0, transition: { duration: 0.2 } } };
const iconTileV: Variants = { rest: { scale: 1 }, hover: { scale: 1.12, transition: SPRING_BOUNCY } };
const ctaBtnV:  Variants = { rest: { scale: 1 }, hover: { scale: 1.04, transition: { duration: 0.22, ease: SMOOTH } }, tap: { scale: 0.96 } };

/* ─── Pulse ring ──────────────────────────────────────────────────────────── */
const PulseRing = ({ color }: { color: string }) => (
  <motion.span aria-hidden className="absolute inset-0 rounded-xl"
    style={{ border: `2px solid ${color}` }}
    animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
);

/* ─── Shimmer sweep ───────────────────────────────────────────────────────── */
const ShimmerBar = ({ color }: { color: string }) => (
  <motion.div className="absolute bottom-0 left-0 h-0.5 rounded-full"
    style={{ background: `linear-gradient(90deg,transparent,${color},transparent)` }}
    initial={{ width: "0%", x: "-100%" }}
    animate={{ width: "100%", x: "100%" }}
    transition={{ duration: 1.8, repeat: Infinity, ease: "linear", repeatDelay: 2 }} />
);

/* ─── Wave dots bar ───────────────────────────────────────────────────────── */
const WaveDotsBar = () => (
  <div className="absolute bottom-[88px] left-0 right-0 flex justify-around items-end px-8 h-7 pointer-events-none">
    {Array.from({ length: 12 }, (_, i) => (
      <div key={i} className="w-1.5 rounded-full"
        style={{
          background: "linear-gradient(to top,#14b8a6,#06b6d4)",
          height: "8px",
          animation: `unauth-wave-dot 2.4s ${i * 0.15}s ease-in-out infinite`,
        }} />
    ))}
  </div>
);

/* ─── Component ───────────────────────────────────────────────────────────── */
const UnauthorizedPage = () => {
  const router = useRouter();
  useReducedMotion();

  const [turtles] = React.useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 88 + 2,
      size: Math.random() * 22 + 18,
      delay: Math.random() * 6,
      duration: Math.random() * 10 + 14,
      flip: Math.random() > 0.5,
    }))
  );

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  const [referenceId] = React.useState(() => `SEC-${Date.now().toString().slice(-12).toUpperCase()}`);
  const [errorCode]   = React.useState(() => `FLT-${Date.now().toString().slice(-8)}`);
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const formattedTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <motion.div variants={pageV} initial="hidden" animate="visible"
      className="relative min-h-screen overflow-hidden"
      style={{ background: O.bg }}>

      {/* ── Orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full opacity-[0.18]"
          style={{ background: "radial-gradient(circle,#14b8a6 0%,transparent 70%)", animation: "unauth-orb1 18s ease-in-out infinite" }} />
        <div className="absolute -bottom-36 -right-36 w-[500px] h-[500px] rounded-full opacity-[0.13]"
          style={{ background: "radial-gradient(circle,#0891b2 0%,transparent 70%)", animation: "unauth-orb2 22s ease-in-out infinite" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full opacity-[0.09]"
          style={{ background: "radial-gradient(circle,#06b6d4 0%,transparent 70%)", animation: "unauth-orb3 14s ease-in-out infinite" }} />
      </div>

      {/* ── Swimming turtles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {turtles.map((t) => (
          <div key={t.id} style={{
            position: "absolute", left: `${t.x}%`, bottom: `-${t.size * 2}px`,
            animation: `unauth-turtle-swim ${t.duration}s ${t.delay}s ease-in-out infinite`,
          }}>
            <SeaTurtle size={t.size} flip={t.flip} />
          </div>
        ))}
      </div>

      {/* ── Wave dots ── */}
      <WaveDotsBar />

      {/* ── Ocean floor waves ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 2880 120" fill="none" className="w-full"
          style={{ animation: "unauth-wave-slide 8s linear infinite" }}>
          <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 C1680,100 1920,20 2160,60 C2400,100 2640,20 2880,60 L2880,120 L0,120 Z" fill="rgba(20,184,166,0.1)" />
        </svg>
        <svg viewBox="0 0 2880 120" fill="none" className="w-full absolute bottom-0"
          style={{ animation: "unauth-wave-slide 12s linear infinite reverse" }}>
          <path d="M0,80 C360,20 720,100 1080,40 C1440,0 1800,80 2160,40 C2520,0 2760,60 2880,80 L2880,120 L0,120 Z" fill="rgba(6,182,212,0.07)" />
        </svg>
      </div>

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <motion.nav variants={navV}
        className="sticky top-0 z-50 relative overflow-hidden border-b"
        style={{ backgroundColor: "rgba(10,42,58,0.88)", borderColor: "rgba(20,184,166,0.2)", backdropFilter: "blur(16px)" }}>
        <ShimmerBar color="rgba(20,184,166,0.5)" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <motion.div variants={logoV}
                whileHover={{ scale: 1.08, rotate: 8, transition: SPRING_BOUNCY }}
                className="w-9 h-9 rounded-xl flex items-center justify-center relative"
                style={{
                  background: "linear-gradient(135deg,#0e7490,#0f766e)",
                  boxShadow: "0 4px 14px rgba(14,116,144,0.45)",
                }}>
                <Shield className="w-5 h-5 text-white" />
              </motion.div>
              <motion.div variants={slideUp} className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white"
                  style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", letterSpacing: "0.06em" }}>
                  {COMPANY_NAME}
                </span>
                <motion.span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: O.errorBg, color: O.error, border: `1px solid ${O.errorBdr}` }}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}>
                  Restricted
                </motion.span>
              </motion.div>
            </div>

            {/* Nav action */}
            <motion.a href="tel:+94-11-000-0000" variants={slideL}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ color: O.tealText, backgroundColor: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)" }}>
              <Phone className="w-4 h-4" />
              <span className="text-sm" style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>Support</span>
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* ── Main ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        <motion.div variants={cardV} className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "rgba(10,42,58,0.75)",
            border: "1px solid rgba(20,184,166,0.22)",
            boxShadow: "0 24px 60px -16px rgba(0,0,0,0.5), 0 0 0 1px rgba(20,184,166,0.1)",
            backdropFilter: "blur(20px)",
          }}>

          {/* ── Error Header Band ────────────────────────────────────── */}
          <motion.div variants={headerV}
            className="px-6 sm:px-8 py-6 sm:py-8 border-b relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg,rgba(248,113,113,0.07) 0%,rgba(20,184,166,0.04) 100%)",
              borderColor: "rgba(20,184,166,0.15)",
            }}>
            <motion.div aria-hidden className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at top right,rgba(248,113,113,0.07),transparent 65%)" }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity }} />

            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Alert icon */}
                <motion.div variants={alertV} className="relative w-12 h-12 flex-shrink-0">
                  <PulseRing color="rgba(248,113,113,0.5)" />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg,#f87171,rgba(248,113,113,0.7))",
                      boxShadow: "0 0 24px rgba(248,113,113,0.35)",
                    }}>
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                <motion.div variants={slideUp}>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white"
                    style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", letterSpacing: "-0.01em" }}>
                    Access Denied
                  </h1>
                  <p className="text-sm mt-0.5" style={{ color: O.mintFade }}>
                    You don&apos;t have permission to view this resource
                  </p>
                </motion.div>
              </div>

              {/* Badge */}
              <motion.span variants={badgeV}
                className="inline-flex items-center self-start sm:self-auto px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide"
                style={{ backgroundColor: O.errorBg, color: O.error, border: `1px solid ${O.errorBdr}` }}>
                <motion.span className="mr-1.5"
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}>
                  <Lock className="w-3 h-3 inline" />
                </motion.span>
                403 FORBIDDEN
              </motion.span>
            </div>
          </motion.div>

          {/* ── Body ─────────────────────────────────────────────────── */}
          <motion.div variants={bodyV} className="p-6 sm:p-8">
            <div className="grid lg:grid-cols-3 gap-8">

              {/* Left — Details + Actions */}
              <div className="lg:col-span-2 space-y-6">

                {/* Description */}
                <motion.div variants={slideUp}>
                  <h2 className="text-lg font-semibold mb-2 text-white">
                    Unauthorized Access Attempt
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: O.mint }}>
                    Your account does not have the necessary privileges to access the requested
                    resource. This incident has been logged and flagged for security review.
                  </p>
                </motion.div>

                {/* Meta grid */}
                <motion.div variants={slideUp} className="rounded-xl p-4"
                  style={{ backgroundColor: "rgba(20,184,166,0.06)", border: "1px solid rgba(20,184,166,0.15)" }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: O.mintFade }}>Error Code</p>
                      <motion.p className="text-sm font-mono font-semibold" style={{ color: O.error }}
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}>
                        403 — Forbidden
                      </motion.p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: O.mintFade }}>Timestamp</p>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" style={{ color: O.tealText }} />
                        <p className="text-sm font-medium text-white">{formattedTime}</p>
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: O.mintFade }}>{formattedDate}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Recommended Actions */}
                <motion.div variants={slideUp}>
                  <h3 className="text-base font-semibold mb-3 text-white">Recommended Actions</h3>
                  <motion.div variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="space-y-3">
                    {[
                      {
                        label: "Return to Previous Page",
                        sub: "Navigate back to your last location",
                        icon: ArrowLeft,
                        onClick: () => router.back(),
                        bg: "rgba(20,184,166,0.06)",
                        border: "rgba(20,184,166,0.15)",
                        accent: O.tealText,
                        iconBg: "rgba(20,184,166,0.12)",
                      },
                      {
                        label: "Go to Home Dashboard",
                        sub: "Access your authorized workspace",
                        icon: Home,
                        onClick: () => router.push("/"),
                        bg: "rgba(20,184,166,0.1)",
                        border: "rgba(20,184,166,0.25)",
                        accent: O.tealText,
                        iconBg: "rgba(20,184,166,0.2)",
                      },
                    ].map(({ label, sub, icon: Icon, onClick, bg, border, accent, iconBg }) => (
                      <motion.button key={label} variants={listItemV}
                        initial="rest" whileHover="hover" whileTap="tap"
                        onClick={onClick}
                        className="w-full text-left p-4 rounded-xl group relative overflow-hidden transition-all duration-200"
                        style={{ backgroundColor: bg, border: `1px solid ${border}` }}>
                        <motion.div aria-hidden
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{ background: `linear-gradient(120deg,rgba(20,184,166,0.06),transparent)` }} />
                        <div className="relative flex items-center">
                          <motion.div variants={iconTileV}
                            className="w-10 h-10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                            style={{ backgroundColor: iconBg }}>
                            <Icon className="w-5 h-5" style={{ color: accent }} />
                          </motion.div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-white">{label}</p>
                            <p className="text-xs mt-0.5" style={{ color: O.mintFade }}>{sub}</p>
                          </div>
                          <motion.div variants={chevronV}>
                            <ChevronRight className="w-4 h-4" style={{ color: O.tealText }} />
                          </motion.div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>
              </div>

              {/* Right — Contact + Notice */}
              <motion.div variants={slideL} className="space-y-4">

                {/* Contact card */}
                <motion.div className="rounded-xl p-6"
                  style={{
                    background: "linear-gradient(145deg,rgba(20,184,166,0.08),rgba(6,182,212,0.04))",
                    border: "1px solid rgba(20,184,166,0.2)",
                  }}
                  whileHover={{ boxShadow: "0 8px 32px -8px rgba(20,184,166,0.2)", transition: { duration: 0.3 } }}>

                  <h3 className="text-base font-semibold mb-5 text-white">Need Assistance?</h3>

                  <div className="space-y-5">
                    {[
                      { icon: Mail,  label: "Email Support",  href: "mailto:hello@felicitatrips.com", text: "hello@felicitatrips.com", sub: null },
                      { icon: Phone, label: "Phone Support",  href: "tel:+94-11-000-0000", text: "+94 11 000 0000", sub: "Available 24/7" },
                    ].map(({ icon: Icon, label, href, text, sub }) => (
                      <motion.div key={label} className="flex items-start"
                        whileHover={{ x: 2, transition: { duration: 0.18 } }}>
                        <motion.div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                          style={{ backgroundColor: "rgba(20,184,166,0.12)" }}
                          whileHover={{ scale: 1.1, transition: SPRING_BOUNCY }}>
                          <Icon className="w-4 h-4" style={{ color: O.tealText }} />
                        </motion.div>
                        <div>
                          <p className="font-medium text-sm mb-0.5 text-white">{label}</p>
                          <a href={href} className="text-sm hover:underline underline-offset-2 transition-colors"
                            style={{ color: O.tealText }}>{text}</a>
                          {sub && <p className="text-xs mt-0.5" style={{ color: O.mintFade }}>{sub}</p>}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t" style={{ borderColor: "rgba(20,184,166,0.15)" }}>
                    <p className="text-xs leading-relaxed" style={{ color: O.mintFade }}>
                      All access attempts are logged and monitored. Repeated unauthorized
                      attempts may be escalated to your account manager.
                    </p>
                  </div>
                </motion.div>

                {/* Security notice */}
                <motion.div className="flex items-start p-4 rounded-xl"
                  style={{ backgroundColor: "rgba(20,184,166,0.05)", border: "1px solid rgba(20,184,166,0.15)" }}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.4, ease: EXPO_OUT }}>
                  <motion.div className="mr-3 flex-shrink-0 mt-0.5"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>
                    <Shield className="w-4 h-4" style={{ color: O.tealText }} />
                  </motion.div>
                  <div>
                    <p className="text-xs font-medium mb-1 text-white">Security Protocol Active</p>
                    <p className="text-xs" style={{ color: O.mintFade }}>
                      Incident recorded under{" "}
                      <motion.code className="px-1.5 py-0.5 rounded text-xs font-mono"
                        style={{ backgroundColor: "rgba(20,184,166,0.12)", color: O.tealText }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.4 }}>
                        {errorCode}
                      </motion.code>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Footer ───────────────────────────────────────────────── */}
          <motion.div variants={slideUp}
            className="px-6 sm:px-8 py-5 border-t flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden"
            style={{ borderColor: "rgba(20,184,166,0.15)", backgroundColor: "rgba(10,42,58,0.4)" }}>

            <motion.div className="flex items-center gap-2"
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.4, ease: EXPO_OUT }}>
              <FileText className="w-4 h-4" style={{ color: O.tealText }} />
              <p className="text-xs" style={{ color: O.mintFade }}>
                Reference ID:{" "}
                <motion.span className="font-mono" style={{ color: O.tealText }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.5 }}>
                  {referenceId}
                </motion.span>
              </p>
            </motion.div>

            <motion.button variants={ctaBtnV} initial="rest" whileHover="hover" whileTap="tap"
              onClick={() => { window.location.href = "mailto:hello@felicitatrips.com?subject=Access%20Request"; }}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#0e7490,#0f766e)",
                color: "#fff",
                boxShadow: "0 4px 14px rgba(14,116,144,0.4)",
              }}>
              {/* Shine sweep */}
              <motion.span aria-hidden className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(120deg,transparent 30%,rgba(255,255,255,0.15) 50%,transparent 70%)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: "linear" }} />
              <span className="relative">Request Access</span>
              <ExternalLink className="w-3.5 h-3.5 relative" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Legal footer */}
        <motion.div variants={slideUp} className="mt-8 text-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}>
          <p className="text-xs" style={{ color: O.mintFade }}>
            © {new Date().getFullYear()} {COMPANY_NAME} · {COMPANY_THEME}
          </p>
        </motion.div>
      </div>

      {/* ── Keyframes ── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400&display=swap');

        @keyframes unauth-turtle-swim {
          0%   { transform: translateY(0)      rotate(0deg);  opacity: 0; }
          8%   { opacity: 1; }
          20%  { transform: translateY(-20vh)  rotate(4deg); }
          40%  { transform: translateY(-40vh)  rotate(-4deg); }
          60%  { transform: translateY(-60vh)  rotate(3deg); }
          80%  { transform: translateY(-80vh)  rotate(-3deg); opacity: 0.8; }
          95%  { opacity: 0; }
          100% { transform: translateY(-110vh) rotate(0deg);  opacity: 0; }
        }
        @keyframes unauth-orb1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(36px,28px) scale(1.1); }
        }
        @keyframes unauth-orb2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(-44px,-36px) scale(1.08); }
        }
        @keyframes unauth-orb3 {
          0%, 100% { transform: translate(-50%,-50%) scale(1); }
          50%       { transform: translate(-50%,-50%) scale(1.14); }
        }
        @keyframes unauth-wave-dot {
          0%, 100% { height: 6px;  opacity: 0.35; }
          50%       { height: 22px; opacity: 0.9; }
        }
        @keyframes unauth-wave-slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </motion.div>
  );
};

export default UnauthorizedPage;