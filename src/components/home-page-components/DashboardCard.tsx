"use client";

import React, { useEffect, useRef, useState } from "react";
import { hexToRgba } from "@/utils/functions";
import { DashboardCardProps } from "@/types/home-page-types";

const DashboardCard: React.FC<DashboardCardProps> = ({
  card,
  index,
  onClick,
  theme,
  isDarkMode,
}) => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="group cursor-pointer"
      onClick={onClick}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(28px) scale(0.97)",
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      <style>{`
        @keyframes _shimmer {
          0%   { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(250%)  skewX(-12deg); }
        }
        @keyframes _iconFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-4px) scale(1.05); }
        }
        @keyframes _pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          height: "100%",
          border: `1.5px solid ${hovered ? card.color : hexToRgba(card.color, 0.25)}`,
          borderRadius: "16px",
          padding: "28px 20px 24px",
          backgroundColor: theme.surface,
          boxShadow: hovered
            ? `0 16px 40px ${hexToRgba(card.color, 0.18)}, 0 4px 12px ${hexToRgba(card.color, 0.1)}`
            : isDarkMode
              ? `0 2px 10px ${hexToRgba(card.color, 0.08)}`
              : "none",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          transition:
            "border-color 0.3s ease, box-shadow 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1), background-color 0.3s ease",
        }}
      >
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(90deg, transparent 0%, ${hexToRgba(card.color, 0.07)} 50%, transparent 100%)`,
              animation: "_shimmer 0.7s ease-out forwards",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: hexToRgba(card.color, hovered ? 0.1 : 0.04),
            transition: "background 0.35s ease",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
            zIndex: 1,
          }}
        >
          {hovered && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 60,
                height: 60,
                borderRadius: "50%",
                border: `1.5px solid ${hexToRgba(card.color, 0.5)}`,
                animation: "_pulse-ring 0.8s ease-out forwards",
              }}
            />
          )}

          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              backgroundColor: hexToRgba(card.color, hovered ? 0.2 : 0.1),
              border: `1.5px solid ${hexToRgba(card.color, hovered ? 0.5 : 0.2)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: hovered ? "_iconFloat 1.8s ease-in-out infinite" : "none",
              transition: "background-color 0.3s ease, border-color 0.3s ease",
            }}
          >
            <img
              src={card.iconUrl}
              alt={card.name}
              style={{
                width: 30,
                height: 30,
                objectFit: "contain",
                filter: `drop-shadow(0 2px 6px ${hexToRgba(card.color, 0.4)})`,
              }}
            />
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h3
            style={{
              margin: "0 0 6px",
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: card.color,
              transition: "color 0.2s ease",
            }}
          >
            {card.name}
          </h3>

          {card.description && (
            <p
              style={{
                margin: 0,
                fontSize: "0.8rem",
                lineHeight: 1.5,
                color: theme.textSecondary,
                transition: "color 0.3s ease",
              }}
            >
              {card.description}
            </p>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: hovered ? 0 : "50%",
            width: hovered ? "100%" : "0%",
            height: 3,
            borderRadius: "0 0 16px 16px",
            backgroundColor: card.color,
            transition:
              "width 0.35s cubic-bezier(0.22,1,0.36,1), left 0.35s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
    </div>
  );
};

export default DashboardCard;