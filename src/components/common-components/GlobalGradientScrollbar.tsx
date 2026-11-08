"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useEffect } from "react";

const GlobalGradientScrollbar: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.classList.add("gradient-scrollbar");

    body.style.minHeight = "100vh";
    body.style.overflowX = "hidden";

    // Get theme colors with fallbacks
    const primaryColor = theme.primary || "#3b82f6";
    const secondaryColor = theme.secondary || "#6366f1";
    const surfaceColor = theme.surface || "#f3f4f6";
    const borderColor = theme.border || "#e5e7eb";

    // Calculate lighter and darker shades
    const getLighterShade = (color: string, percent: number) => {
      // Simple lightening function - you can adjust as needed
      if (color.startsWith('#')) {
        const num = parseInt(color.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = ((num >> 8) & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
      }
      return color;
    };

    const getDarkerShade = (color: string, percent: number) => {
      if (color.startsWith('#')) {
        const num = parseInt(color.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = ((num >> 8) & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return `#${(0x1000000 + (R > 0 ? R : 0) * 0x10000 + (G > 0 ? G : 0) * 0x100 + (B > 0 ? B : 0)).toString(16).slice(1)}`;
      }
      return color;
    };

    const lighterPrimary = getLighterShade(primaryColor, 20);
    const darkerPrimary = getDarkerShade(primaryColor, 15);
    const trackColor = surfaceColor === "#ffffff" ? "#f0fdf4" : `${surfaceColor}80`;

    const style = document.createElement("style");
    style.textContent = `
      /* Webkit Scrollbar (Chrome, Safari, Edge) */
      html::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }

      /* Scrollbar thumb: gradient from primary to secondary */
      html::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, ${primaryColor}, ${secondaryColor});
        border-radius: 8px;
        transition: background 0.3s ease;
      }

      /* Hover effect: deeper gradient */
      html::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, ${darkerPrimary}, ${primaryColor});
      }

      /* Scrollbar track */
      html::-webkit-scrollbar-track {
        background: ${trackColor};
        border-radius: 8px;
      }

      /* Scrollbar corner (for both scrollbars) */
      html::-webkit-scrollbar-corner {
        background: ${trackColor};
      }

      /* Firefox Scrollbar */
      html {
        scrollbar-width: thin;
        scrollbar-color: ${primaryColor} ${trackColor};
        transition: scrollbar-color 0.3s ease;
      }
      
      html:hover {
        scrollbar-color: ${secondaryColor} ${trackColor};
      }

      /* For smooth scrolling */
      html {
        scroll-behavior: smooth;
      }

      /* Dark mode adjustments */
      @media (prefers-color-scheme: dark) {
        html::-webkit-scrollbar-track {
          background: ${surfaceColor}40;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      html.classList.remove("gradient-scrollbar");
      body.style.minHeight = "";
      body.style.overflowX = "";
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [theme]);

  return null;
};

export default GlobalGradientScrollbar;