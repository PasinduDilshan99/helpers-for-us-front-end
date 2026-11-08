"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
  success: string;
  error: string;
  warning: string;
};

// Predefined themes
export const themes = {
  light: {
    primary: "#3b82f6",
    secondary: "#6366f1",
    background: "#ffffff",
    surface: "#f3f4f6",
    text: "#111827",
    textSecondary: "#6b7280",
    border: "#e5e7eb",
    accent: "#8b5cf6",
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
  },
  dark: {
    primary: "#60a5fa",
    secondary: "#818cf8",
    background: "#111827",
    surface: "#1f2937",
    text: "#f9fafb",
    textSecondary: "#9ca3af",
    border: "#374151",
    accent: "#a78bfa",
    success: "#34d399",
    error: "#f87171",
    warning: "#fbbf24",
  },
  blue: {
    primary: "#1e40af",
    secondary: "#3b82f6",
    background: "#eff6ff",
    surface: "#dbeafe",
    text: "#1e3a8a",
    textSecondary: "#3b82f6",
    border: "#bfdbfe",
    accent: "#2563eb",
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
  },
  green: {
    primary: "#065f46",
    secondary: "#059669",
    background: "#ecfdf5",
    surface: "#d1fae5",
    text: "#064e3b",
    textSecondary: "#047857",
    border: "#a7f3d0",
    accent: "#10b981",
    success: "#059669",
    error: "#ef4444",
    warning: "#f59e0b",
  },
  purple: {
    primary: "#5b21b6",
    secondary: "#7c3aed",
    background: "#f5f3ff",
    surface: "#ede9fe",
    text: "#4c1d95",
    textSecondary: "#6d28d9",
    border: "#ddd6fe",
    accent: "#8b5cf6",
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
  },
  orange: {
    primary: "#c2410c",
    secondary: "#ea580c",
    background: "#fff7ed",
    surface: "#ffedd5",
    text: "#9a3412",
    textSecondary: "#c2410c",
    border: "#fed7aa",
    accent: "#f97316",
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
  },
};

// Helper function to adjust color brightness
const adjustColor = (color: string, percent: number): string => {
  // Simple color adjustment - for production, consider using a library like chroma.js
  return color; // Placeholder implementation
};

type ThemeContextType = {
  theme: ThemeColors;
  themeName: string;
  setTheme: (themeName: string) => void;
  customColor: string | null;
  setCustomColor: (color: string | null) => void;
  availableThemes: string[];
  isDarkMode: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  themeName: "light",
  setTheme: () => {},
  customColor: null,
  setCustomColor: () => {},
  availableThemes: Object.keys(themes),
  isDarkMode: false,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<string>("light");
  const [customColor, setCustomColor] = useState<string | null>(null);

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedCustomColor = localStorage.getItem("customColor");

    if (savedTheme && themes[savedTheme as keyof typeof themes]) {
      setThemeName(savedTheme);
    }
    if (savedCustomColor) {
      setCustomColor(savedCustomColor);
    }
  }, []);

  // Get current theme colors
  const currentTheme = customColor
    ? {
        primary: customColor,
        secondary: adjustColor(customColor, 20),
        background: "#ffffff",
        surface: "#f3f4f6",
        text: "#111827",
        textSecondary: "#6b7280",
        border: "#e5e7eb",
        accent: adjustColor(customColor, -20),
        success: "#10b981",
        error: "#ef4444",
        warning: "#f59e0b",
      }
    : themes[themeName as keyof typeof themes] || themes.light;

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;

    // Apply CSS variables
    Object.entries(currentTheme).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });

    // Apply Tailwind dark mode class
    if (themeName === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save to localStorage
    localStorage.setItem("theme", themeName);
    if (customColor) {
      localStorage.setItem("customColor", customColor);
    } else {
      localStorage.removeItem("customColor");
    }
  }, [themeName, customColor, currentTheme]);

  const setTheme = (newThemeName: string) => {
    setThemeName(newThemeName);
    setCustomColor(null);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        themeName,
        setTheme,
        customColor,
        setCustomColor,
        availableThemes: Object.keys(themes),
        isDarkMode: themeName === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
