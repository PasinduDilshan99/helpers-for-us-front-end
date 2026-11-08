"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { COMPANY_NAME, COMPANY_THEME } from "@/utils/constant";

export interface CommonLoadingProps {
  message?: string;
  subMessage?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  className?: string;
}

const MESSAGES = [
  "Curating your perfect escape…",
  "Discovering hidden gems…",
  "Crafting unforgettable moments…",
  "Mapping your dream journey…",
];

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

const SeaTurtle = ({ size, flip }: { size: number; flip: boolean }) => (
  <svg
    width={size * 0.75}
    height={size}
    viewBox="0 0 60 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: flip ? "scaleX(-1)" : undefined, opacity: 0.45 }}
  >
    <ellipse cx="30" cy="9" rx="8" ry="9" fill="#0f766e" />
    <circle cx="27" cy="6" r="1" fill="#0d9488" />
    <circle cx="33" cy="6" r="1" fill="#0d9488" />
    <circle cx="23" cy="10" r="2" fill="#134e4a" />
    <circle cx="37" cy="10" r="2" fill="#134e4a" />
    <circle cx="23.8" cy="9.2" r="0.8" fill="#5eead4" />
    <circle cx="37.8" cy="9.2" r="0.8" fill="#5eead4" />
    <rect x="25" y="16" width="10" height="6" rx="3" fill="#0f766e" />
    <ellipse cx="30" cy="45" rx="17" ry="22" fill="#0f766e" />
    <ellipse cx="30" cy="44" rx="13" ry="18" fill="#14b8a6" />
    <ellipse cx="30" cy="44" rx="7" ry="10" fill="#0d9488" />
    <line x1="30" y1="26" x2="30" y2="62" stroke="#0f766e" strokeWidth="1.2" />
    <line x1="17" y1="44" x2="43" y2="44" stroke="#0f766e" strokeWidth="1.2" />
    <line x1="19" y1="32" x2="41" y2="56" stroke="#0f766e" strokeWidth="0.8" />
    <line x1="41" y1="32" x2="19" y2="56" stroke="#0f766e" strokeWidth="0.8" />
    <ellipse cx="10" cy="33" rx="7" ry="4" fill="#0d9488" transform="rotate(-40 10 33)" />
    <ellipse cx="50" cy="33" rx="7" ry="4" fill="#0d9488" transform="rotate(40 50 33)" />
    <ellipse cx="11" cy="57" rx="6" ry="3.5" fill="#0d9488" transform="rotate(30 11 57)" />
    <ellipse cx="49" cy="57" rx="6" ry="3.5" fill="#0d9488" transform="rotate(-30 49 57)" />
    <ellipse cx="30" cy="69" rx="3.5" ry="5" fill="#0f766e" />
  </svg>
);

const LoadingInner: React.FC<CommonLoadingProps & { mounted: boolean }> = ({
  message,
  subMessage,
  size = "md",
  fullScreen = false,
  className = "",
  mounted,
}) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [msgVisible, setMsgVisible] = useState(true);
  const [turtles, setTurtles] = useState<Turtle[]>([]);
  const [waveDots, setWaveDots] = useState<WaveDot[]>([]);
  const [innerMounted, setInnerMounted] = useState(false);

  useEffect(() => {
    setTurtles(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 88 + 2,
        size: Math.random() * 22 + 18,
        delay: Math.random() * 6,
        duration: Math.random() * 10 + 14,
        flip: Math.random() > 0.5,
      }))
    );
    setWaveDots(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: (i / 11) * 100,
        delay: i * 0.15,
      }))
    );
    requestAnimationFrame(() => setInnerMounted(true));
  }, []);

  useEffect(() => {
    if (message) return;
    const interval = setInterval(() => {
      setMsgVisible(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % MESSAGES.length);
        setMsgVisible(true);
      }, 350);
    }, 3000);
    return () => clearInterval(interval);
  }, [message]);

  const logoSizes = {
    sm: { ring: 88, inner: 62, core: 42 },
    md: { ring: 120, inner: 84, core: 56 },
    lg: { ring: 152, inner: 108, core: 72 },
  };
  const textSizes = {
    sm: { brand: "text-xl", tag: "text-[8px]", msg: "text-[11px]" },
    md: { brand: "text-[26px]", tag: "text-[9.5px]", msg: "text-[12px]" },
    lg: { brand: "text-[34px]", tag: "text-[11px]", msg: "text-sm" },
  };
  const lc = logoSizes[size];
  const tc = textSizes[size];

  const containerStyle: React.CSSProperties = fullScreen
    ? {
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        background:
          "linear-gradient(160deg,#0a2a3a 0%,#0d3d4f 30%,#0e5a5e 60%,#0f7a6e 100%)",
      }
    : {
        background:
          "linear-gradient(160deg,#0a2a3a 0%,#0d3d4f 30%,#0e5a5e 60%,#0f7a6e 100%)",
        minHeight: 420,
      };

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden ${
        fullScreen ? "" : className
      }`}
      style={containerStyle}
    >
      {/* ── Orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full opacity-[0.18]"
          style={{
            background: "radial-gradient(circle,#14b8a6 0%,transparent 70%)",
            animation: "ft-orb1 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-36 -right-36 w-[500px] h-[500px] rounded-full opacity-[0.13]"
          style={{
            background: "radial-gradient(circle,#0891b2 0%,transparent 70%)",
            animation: "ft-orb2 22s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full opacity-[0.09]"
          style={{
            background: "radial-gradient(circle,#06b6d4 0%,transparent 70%)",
            animation: "ft-orb3 14s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Swimming turtles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {turtles.map((t) => (
          <div
            key={t.id}
            style={{
              position: "absolute",
              left: `${t.x}%`,
              bottom: `-${t.size * 2}px`,
              animation: `ft-turtle-swim ${t.duration}s ${t.delay}s ease-in-out infinite`,
            }}
          >
            <SeaTurtle size={t.size} flip={t.flip} />
          </div>
        ))}
      </div>

      {/* ── Wave dots ── */}
      <div className="absolute bottom-[88px] left-0 right-0 flex justify-around items-end px-8 h-7 pointer-events-none">
        {waveDots.map((d) => (
          <div
            key={d.id}
            className="w-1.5 rounded-full"
            style={{
              background: "linear-gradient(to top,#14b8a6,#06b6d4)",
              animation: `ft-wave-dot 2.4s ${d.delay}s ease-in-out infinite`,
              height: "8px",
            }}
          />
        ))}
      </div>

      {/* ── Ocean floor waves ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 2880 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ animation: "ft-wave-slide 8s linear infinite" }}
        >
          <path
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 C1680,100 1920,20 2160,60 C2400,100 2640,20 2880,60 L2880,120 L0,120 Z"
            fill="rgba(20,184,166,0.1)"
          />
        </svg>
        <svg
          viewBox="0 0 2880 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full absolute bottom-0"
          style={{ animation: "ft-wave-slide 12s linear infinite reverse" }}
        >
          <path
            d="M0,80 C360,20 720,100 1080,40 C1440,0 1800,80 2160,40 C2520,0 2760,60 2880,80 L2880,120 L0,120 Z"
            fill="rgba(6,182,212,0.07)"
          />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6"
        style={{
          opacity: innerMounted ? 1 : 0,
          transform: innerMounted ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Logo ring */}
        <div
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: lc.ring,
            height: lc.ring,
            background:
              "linear-gradient(135deg,rgba(20,184,166,0.2),rgba(6,182,212,0.1))",
            border: "1px solid rgba(20,184,166,0.3)",
            boxShadow:
              "0 0 40px rgba(20,184,166,0.15),inset 0 0 20px rgba(6,182,212,0.05)",
            animation: "ft-gentle-bob 4s ease-in-out infinite",
          }}
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: lc.inner,
              height: lc.inner,
              background:
                "linear-gradient(135deg,rgba(20,184,166,0.3),rgba(8,145,178,0.2))",
              border: "1px solid rgba(20,184,166,0.5)",
            }}
          >
            <div
              className="flex items-center justify-center rounded-full overflow-hidden"
              style={{
                width: lc.core,
                height: lc.core,
                background: "linear-gradient(135deg,#0e7490,#0f766e)",
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
                  const fb = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (fb) fb.style.display = "block";
                }}
              />
              <div style={{ display: "none" }}>
                <SeaTurtle size={lc.core * 0.7} flip={false} />
              </div>
            </div>
          </div>
          {/* Ping ring */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid rgba(20,184,166,0.3)",
              animation: "ft-ping-ring 3s ease-out infinite",
            }}
          />
        </div>

        {/* Brand */}
        <p
          className={`mt-5 font-light tracking-widest ${tc.brand}`}
          style={{
            fontFamily: "'Cormorant Garamond','Georgia',serif",
            letterSpacing: "0.12em",
            color: "#ffffff",
            textShadow: "0 2px 18px rgba(0,0,0,0.3)",
          }}
        >
          {COMPANY_NAME}
        </p>

        {/* Tagline */}
        <p
          className={`mt-1 uppercase tracking-[0.28em] ${tc.tag}`}
          style={{
            fontFamily: "'Jost',sans-serif",
            fontWeight: 300,
            color: "rgba(167,243,208,0.65)",
          }}
        >
          {subMessage ?? COMPANY_THEME}
        </p>

        {/* Separator */}
        <div
          style={{
            width: 44,
            height: 1,
            background: "rgba(20,184,166,0.35)",
            borderRadius: 2,
            margin: "18px auto 0",
          }}
        />

        {/* Progress bar */}
        <div
          style={{
            width: 140,
            height: 2,
            background: "rgba(255,255,255,0.1)",
            borderRadius: 4,
            overflow: "hidden",
            marginTop: 14,
          }}
        >
          <div
            style={{
              height: "100%",
              width: "30%",
              background: "linear-gradient(90deg,#5eead4,#22d3ee)",
              borderRadius: 4,
              animation: "ft-progress 1.8s ease-in-out infinite",
            }}
          />
        </div>

        {/* Cycling message */}
        <p
          className={`mt-3 ${tc.msg}`}
          style={{
            fontFamily: "'Jost',sans-serif",
            fontWeight: 300,
            color: "rgba(167,243,208,0.65)",
            letterSpacing: "0.05em",
            opacity: msgVisible ? 1 : 0,
            transform: msgVisible ? "translateY(0)" : "translateY(5px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
            minHeight: "1.4rem",
          }}
        >
          {message ?? MESSAGES[msgIndex]}
        </p>
      </div>

      {/* ── Footer brand line (fullScreen only) ── */}
      {fullScreen && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap"
          style={{
            opacity: innerMounted ? 1 : 0,
            transition: "opacity 1s 0.8s ease",
          }}
        >
          <span
            className="text-xs tracking-widest uppercase font-medium"
            style={{
              color: "rgba(94,234,212,0.35)",
              letterSpacing: "0.18em",
            }}
          >
            {COMPANY_NAME}
          </span>
          <span style={{ color: "rgba(94,234,212,0.2)" }}>—</span>
          <span
            className="text-xs font-semibold italic"
            style={{
              background: "linear-gradient(90deg,#5eead4,#22d3ee,#34d399)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {COMPANY_THEME}
          </span>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400&display=swap');

        @keyframes ft-turtle-swim {
          0%   { transform: translateY(0)      rotate(0deg);  opacity: 0; }
          8%   { opacity: 1; }
          20%  { transform: translateY(-20vh)  rotate(4deg); }
          40%  { transform: translateY(-40vh)  rotate(-4deg); }
          60%  { transform: translateY(-60vh)  rotate(3deg); }
          80%  { transform: translateY(-80vh)  rotate(-3deg); opacity: 0.8; }
          95%  { opacity: 0; }
          100% { transform: translateY(-110vh) rotate(0deg);  opacity: 0; }
        }
        @keyframes ft-orb1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(36px,28px) scale(1.1); }
        }
        @keyframes ft-orb2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(-44px,-36px) scale(1.08); }
        }
        @keyframes ft-orb3 {
          0%, 100% { transform: translate(-50%,-50%) scale(1); }
          50%       { transform: translate(-50%,-50%) scale(1.14); }
        }
        @keyframes ft-gentle-bob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes ft-ping-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          80%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        @keyframes ft-wave-dot {
          0%, 100% { height: 6px;  opacity: 0.35; }
          50%       { height: 22px; opacity: 0.9; }
        }
        @keyframes ft-wave-slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ft-progress {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(367%); }
          100% { transform: translateX(367%); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </div>
  );
};

const CommonLoading: React.FC<CommonLoadingProps> = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (props.fullScreen) {
    if (!mounted) return null;
    return createPortal(
      <LoadingInner {...props} mounted={mounted} />,
      document.body
    );
  }

  return <LoadingInner {...props} mounted={mounted} />;
};

export default CommonLoading;