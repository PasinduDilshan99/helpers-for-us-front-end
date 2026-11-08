"use client";

import { COMPANY_NAME, COMPANY_THEME } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";

interface Turtle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  flip: boolean;
}

interface WaveDot {
  id: number;
  x: number;
  delay: number;
}

/* ── Sea turtle SVG — head pointing UP ──────────────────────────────
   Body vertical: head at top, flippers on sides, tail at bottom.
   `flip` mirrors left↔right for variety.                              */
const SeaTurtle = ({ size, flip }: { size: number; flip: boolean }) => (
  <svg
    width={size * 0.75}
    height={size}
    viewBox="0 0 60 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: flip ? "scaleX(-1)" : undefined, opacity: 0.5 }}
  >
    {/* Head */}
    <ellipse cx="30" cy="9" rx="8" ry="9" fill="#0f766e" />
    <circle cx="27" cy="6" r="1" fill="#0d9488" />
    <circle cx="33" cy="6" r="1" fill="#0d9488" />
    <circle cx="23" cy="10" r="2" fill="#134e4a" />
    <circle cx="37" cy="10" r="2" fill="#134e4a" />
    <circle cx="23.8" cy="9.2" r="0.8" fill="#5eead4" />
    <circle cx="37.8" cy="9.2" r="0.8" fill="#5eead4" />
    {/* Neck */}
    <rect x="25" y="16" width="10" height="6" rx="3" fill="#0f766e" />
    {/* Body */}
    <ellipse cx="30" cy="45" rx="17" ry="22" fill="#0f766e" />
    {/* Shell */}
    <ellipse cx="30" cy="44" rx="13" ry="18" fill="#14b8a6" />
    <ellipse cx="30" cy="44" rx="7" ry="10" fill="#0d9488" />
    <line x1="30" y1="26" x2="30" y2="62" stroke="#0f766e" strokeWidth="1.2" />
    <line x1="17" y1="44" x2="43" y2="44" stroke="#0f766e" strokeWidth="1.2" />
    <line x1="19" y1="32" x2="41" y2="56" stroke="#0f766e" strokeWidth="0.8" />
    <line x1="41" y1="32" x2="19" y2="56" stroke="#0f766e" strokeWidth="0.8" />
    {/* Front flippers */}
    <ellipse cx="10" cy="33" rx="7" ry="4" fill="#0d9488" transform="rotate(-40 10 33)" />
    <ellipse cx="50" cy="33" rx="7" ry="4" fill="#0d9488" transform="rotate(40 50 33)" />
    {/* Rear flippers */}
    <ellipse cx="11" cy="57" rx="6" ry="3.5" fill="#0d9488" transform="rotate(30 11 57)" />
    <ellipse cx="49" cy="57" rx="6" ry="3.5" fill="#0d9488" transform="rotate(-30 49 57)" />
    {/* Tail */}
    <ellipse cx="30" cy="69" rx="3.5" ry="5" fill="#0f766e" />
  </svg>
);

export default function NotFound(): JSX.Element {
  const [turtles, setTurtles] = useState<Turtle[]>([]);
  const [waveDots, setWaveDots] = useState<WaveDot[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTurtles(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 88 + 2,
        size: Math.random() * 22 + 18,     // 18–40px
        delay: Math.random() * 6,
        duration: Math.random() * 10 + 14, // 14–24s — slow, graceful
        flip: Math.random() > 0.5,
      })),
    );
    setWaveDots(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: (i / 11) * 100,
        delay: i * 0.15,
      })),
    );
    requestAnimationFrame(() => setMounted(true));
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0a2a3a 0%, #0d3d4f 30%, #0e5a5e 60%, #0f7a6e 100%)",
      }}
    >
      {/* ── Deep ocean gradient orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)",
            animation: "orb-drift-1 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #0891b2 0%, transparent 70%)",
            animation: "orb-drift-2 22s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            animation: "orb-drift-3 14s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Swimming turtles (replaces bubbles) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {turtles.map((t) => (
          <div
            key={t.id}
            style={{
              position: "absolute",
              left: `${t.x}%`,
              bottom: `-${t.size * 2}px`,
              animation: `turtle-swim ${t.duration}s ${t.delay}s ease-in-out infinite`,
            }}
          >
            <SeaTurtle size={t.size} flip={t.flip} />
          </div>
        ))}
      </div>

      {/* ── Wave dots ── */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-around items-end px-8 h-12 pointer-events-none">
        {waveDots.map((d) => (
          <div
            key={d.id}
            className="w-1.5 rounded-full"
            style={{
              background: "linear-gradient(to top, #14b8a6, #06b6d4)",
              animation: `wave-dot 2.4s ${d.delay}s ease-in-out infinite`,
              height: "8px",
            }}
          />
        ))}
      </div>

      {/* ── Ocean floor wave SVG ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ animation: "wave-slide 8s linear infinite" }}
        >
          <path
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
            fill="rgba(20,184,166,0.12)"
          />
        </svg>
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full absolute bottom-0"
          style={{ animation: "wave-slide 12s linear infinite reverse" }}
        >
          <path
            d="M0,80 C360,20 720,100 1080,40 C1260,20 1380,60 1440,80 L1440,120 L0,120 Z"
            fill="rgba(6,182,212,0.08)"
          />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl w-full"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Logo — bobs gently, NO rotation */}
        <div
          className="relative mb-8"
          style={{ animation: "gentle-bob 4s ease-in-out infinite" }}
        >
          <div
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(20,184,166,0.2), rgba(6,182,212,0.1))",
              border: "1px solid rgba(20,184,166,0.3)",
              boxShadow:
                "0 0 40px rgba(20,184,166,0.15), inset 0 0 20px rgba(6,182,212,0.05)",
            }}
          >
            <div
              className="w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(20,184,166,0.3), rgba(8,145,178,0.2))",
                border: "1px solid rgba(20,184,166,0.5)",
              }}
            >
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #0e7490, #0f766e)",
                  boxShadow: "0 8px 32px rgba(14,116,144,0.5)",
                }}
              >
                <Image
                  src="/logo.png"
                  alt={COMPANY_NAME}
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) fallback.classList.remove("hidden");
                  }}
                />
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white hidden"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-10l6-3m6 3l-5.447 2.724A1 1 0 0015 10.382v10.764a1 1 0 001.447.894L21 19V8m0 0l-5.447-2.724A1 1 0 0015 6.382V5.618"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid rgba(20,184,166,0.3)",
              animation: "ping-ring 3s ease-out infinite",
            }}
          />
        </div>

        {/* 404 */}
        <div className="relative mb-4">
          <div
            className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-none select-none"
            style={{
              background:
                "linear-gradient(135deg, #5eead4 0%, #22d3ee 40%, #34d399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(20,184,166,0.4))",
              animation: "number-shimmer 4s ease-in-out infinite",
            }}
          >
            404
          </div>
          <div
            className="absolute top-full left-0 right-0 text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-none select-none opacity-10 scale-y-[-1]"
            style={{
              background: "linear-gradient(to bottom, #5eead4, transparent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </div>
        </div>

        {/* Heading */}
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-snug"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s 0.15s ease, transform 0.8s 0.15s ease",
            letterSpacing: "-0.02em",
          }}
        >
          Looks Like You&apos;ve Drifted Off Course
        </h2>

        {/* Subtext */}
        <p
          className="text-base sm:text-lg mb-3 max-w-md leading-relaxed"
          style={{
            color: "rgba(167,243,208,0.7)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s 0.25s ease, transform 0.8s 0.25s ease",
          }}
        >
          The destination you&apos;re searching for seems to have sailed away.
          Let&apos;s navigate you back to calmer waters.
        </p>

        {/* Status pill */}
        <div
          className="flex items-center gap-2 mb-10 px-4 py-2 rounded-full text-sm font-medium"
          style={{
            background: "rgba(20,184,166,0.12)",
            border: "1px solid rgba(20,184,166,0.3)",
            color: "#5eead4",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s 0.35s ease",
          }}
        >
          <span
            className="w-2 h-2 rounded-full bg-teal-400"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          Error 404 — Page Not Found
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center mb-12"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s 0.45s ease, transform 0.8s 0.45s ease",
          }}
        >
          <Link
            href="/"
            className="group relative flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #0e7490, #0f766e)",
              boxShadow: "0 4px 24px rgba(14,116,144,0.4)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(14,116,144,0.6)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 4px 24px rgba(14,116,144,0.4)")
            }
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </Link>

          <button
            onClick={() => window.history.back()}
            className="cursor-pointer group flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "rgba(20,184,166,0.08)",
              border: "1px solid rgba(20,184,166,0.35)",
              color: "#5eead4",
              boxShadow: "0 2px 12px rgba(20,184,166,0.1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(20,184,166,0.16)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 20px rgba(20,184,166,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(20,184,166,0.08)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 2px 12px rgba(20,184,166,0.1)";
            }}
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>
        </div>

        {/* Help links */}
        <div
          className="pt-6 w-full max-w-sm"
          style={{
            borderTop: "1px solid rgba(20,184,166,0.15)",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s 0.6s ease",
          }}
        >
          <p
            className="text-xs sm:text-sm mb-4"
            style={{ color: "rgba(167,243,208,0.4)" }}
          >
            Need help finding your way?
          </p>
          {/* <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm">
            {[
              { href: CONTACT_US_PAGE_PATH, label: "Contact Us" },
              { href: SRI_LANKAN_TOUR_PAGE_PATH, label: "Browse Tours" },
              { href: DESTINATIONS_PAGE_PATH, label: "Destinations" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-teal-300"
                style={{ color: "rgba(94,234,212,0.55)" }}
              >
                {link.label}
              </Link>
            ))}
          </div> */}
        </div>
      </div>

      {/* ── Footer ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 1s 0.8s ease",
        }}
      >
        <span
          className="text-xs tracking-widest uppercase font-medium"
          style={{ color: "rgba(94,234,212,0.35)", letterSpacing: "0.18em" }}
        >
          {COMPANY_NAME}
        </span>
        <span style={{ color: "rgba(94,234,212,0.2)" }}>—</span>
        <span
          className="text-xs font-semibold italic"
          style={{
            background: "linear-gradient(90deg, #5eead4, #22d3ee, #34d399)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {COMPANY_THEME}
        </span>
      </div>

      {/* ── Keyframes ── */}
      <style jsx global>{`
        @keyframes turtle-swim {
          0%   { transform: translateY(0)      rotate(0deg);   opacity: 0; }
          8%   { opacity: 1; }
          20%  { transform: translateY(-20vh)  rotate(4deg); }
          40%  { transform: translateY(-40vh)  rotate(-4deg); }
          60%  { transform: translateY(-60vh)  rotate(3deg); }
          80%  { transform: translateY(-80vh)  rotate(-3deg); opacity: 0.8; }
          95%  { opacity: 0; }
          100% { transform: translateY(-105vh) rotate(0deg);   opacity: 0; }
        }
        @keyframes orb-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.1); }
        }
        @keyframes orb-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -40px) scale(1.08); }
        }
        @keyframes orb-drift-3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.15); }
        }
        @keyframes gentle-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes ping-ring {
          0% { transform: scale(1); opacity: 0.6; }
          80% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes number-shimmer {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(20, 184, 166, 0.3)); }
          50% { filter: drop-shadow(0 0 40px rgba(6, 182, 212, 0.6)); }
        }
        @keyframes wave-dot {
          0%, 100% { height: 6px; opacity: 0.4; }
          50% { height: 24px; opacity: 1; }
        }
        @keyframes wave-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </div>
  );
}