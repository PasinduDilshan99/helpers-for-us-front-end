"use client";

import { useAuth } from "@/contexts/AuthContext";
import { homeCardData } from "@/data/home-page-data";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { hexToRgba } from "@/utils/functions";
import DashboardCard from "@/components/home-page-components/DashboardCard";

const HomePage = () => {
  const router = useRouter();
  const { hasPrivilege } = useAuth();
  const { theme, isDarkMode } = useTheme();
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const filteredCards = homeCardData.filter((card) =>
    hasPrivilege(card.privilege),
  );

  if (filteredCards.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{
          backgroundColor: theme.background,
          transition: "background-color 0.3s ease",
        }}
      >
        <div className="text-center">
          <h1
            className="text-3xl font-bold mb-4"
            style={{ color: theme.text, transition: "color 0.3s ease" }}
          >
            Access Restricted
          </h1>
          <p className="text-lg mb-6" style={{ color: theme.textSecondary }}>
            You don't have access to any management modules. Please contact your
            administrator.
          </p>
          <div
            className="p-8 border-2 border-dashed rounded-xl"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.surface,
            }}
          >
            <p style={{ color: theme.textSecondary }}>
              No accessible modules found for your user role.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const count = filteredCards.length;
  const gridClass =
    count === 1
      ? "grid-cols-1"
      : count === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : count === 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : count === 4
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.background,
        transition: "background-color 0.3s ease",
        padding: "80px 24px 64px",
      }}
    >
      <style>{`
        @keyframes _fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes _pulse-dot { 
          0%,100%{box-shadow:0 0 0 3px rgba(16,185,129,0.2);} 
          50%{box-shadow:0 0 0 6px rgba(16,185,129,0.1);} 
        }
      `}</style>

      <div
        className="mx-auto mb-14 text-center"
        style={{
          maxWidth: 720,
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(18px)",
          transition:
            "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
            padding: "5px 14px",
            borderRadius: 999,
            border: `1px solid ${hexToRgba(theme.text, 0.12)}`,
            backgroundColor: hexToRgba(theme.text, 0.04),
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 0 3px rgba(16,185,129,0.2)",
              animation: "_pulse-dot 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: theme.textSecondary,
              textTransform: "uppercase",
            }}
          >
            Admin Portal
          </span>
        </div>

        <h1
          style={{
            margin: "0 0 14px",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: theme.text,
          }}
        >
          Business Management
          <br />
          <span
            style={{
              color: theme.textSecondary,
              fontWeight: 400,
              fontSize: "0.85em",
            }}
          >
            Dashboard
          </span>
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: "1rem",
            lineHeight: 1.65,
            color: theme.textSecondary,
          }}
        >
          Centralized platform to manage all your business operations including
          travel, employees, hotels, vehicles, and enterprise resource planning
          systems.
        </p>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className={`grid ${gridClass} gap-5`}>
          {filteredCards.map((card, index) => (
            <DashboardCard
              key={card.id}
              card={card}
              index={index}
              onClick={() => router.push(card.linkTo)}
              theme={theme}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;