"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { themes, useTheme } from "@/contexts/ThemeContext";
import { Palette, X, Check, ChevronRight, Sparkles } from "lucide-react";

/* ─── Animation Variants ─────────────────────────────────────────────────── */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_IN: [number, number, number, number] = [0.42, 0, 1, 1];

const triggerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300,
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.12,
    rotate: 14,
    transition: { duration: 0.22, ease: EASE_OUT },
  },
  tap: {
    scale: 0.94,
    rotate: 0,
    transition: { duration: 0.1, ease: "easeIn" },
  },
};

const breatheVariants: Variants = {
  animate: {
    boxShadow: [
      "0 4px 16px rgba(59,130,246,0.5)",
      "0 6px 24px rgba(59,130,246,0.7)",
      "0 4px 16px rgba(59,130,246,0.5)",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: EASE_IN },
  },
};

const panelVariants: Variants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
      duration: 0.38,
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.28,
      ease: EASE_IN,
    },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.05,
      duration: 0.3,
      ease: EASE_OUT,
    },
  }),
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.2 },
  },
};

const themeBtnVariants: Variants = {
  rest: { scale: 1, x: 0 },
  hover: {
    x: 5,
    transition: { duration: 0.18, ease: EASE_OUT },
  },
  tap: {
    x: 2,
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

const swatchVariants: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.08,
    rotate: -3,
    transition: { duration: 0.2, ease: EASE_OUT },
  },
};

const closeBtnVariants: Variants = {
  rest: { rotate: 0 },
  hover: {
    rotate: 90,
    scale: 1.1,
    transition: { duration: 0.15, ease: EASE_OUT },
  },
  tap: {
    rotate: 90,
    scale: 0.92,
    transition: { duration: 0.1 },
  },
};

const applyBtnVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    filter: "brightness(1.08)",
    transition: { duration: 0.18 },
  },
  tap: {
    scale: 0.97,
    transition: { duration: 0.1 },
  },
};

const resetBtnVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.15 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.5, 1],
    opacity: [1, 0.5, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const shimmerVariants: Variants = {
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(255,255,255,0.25)",
      "0 0 0 8px rgba(255,255,255,0)",
      "0 0 0 0 rgba(255,255,255,0)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const themeMeta: Record<string, { label: string; desc: string }> = {
  light: { label: "Light", desc: "Clean & minimal" },
  dark: { label: "Dark", desc: "Easy on the eyes" },
  blue: { label: "Ocean", desc: "Cool & focused" },
  green: { label: "Forest", desc: "Natural & calm" },
  purple: { label: "Violet", desc: "Creative & bold" },
  orange: { label: "Ember", desc: "Warm & energetic" },
};

const ThemeEmoji: Record<string, string> = {
  light: "☀️",
  dark: "🌙",
  blue: "🌊",
  green: "🌿",
  purple: "💜",
  orange: "🔥",
};

const ThemePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customColorInput, setCustomColorInput] = useState("#3b82f6");
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const {
    themeName,
    setTheme,
    customColor,
    setCustomColor,
    theme,
    availableThemes,
    isDarkMode,
  } = useTheme();

  const currentColor =
    customColor ??
    themes[themeName as keyof typeof themes]?.primary ??
    "#3b82f6";

  // Helper function to determine if a color is light or dark
  const isLightColor = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };

  const iconColor = isLightColor(currentColor) ? "#1f2937" : "#ffffff";
  const applyButtonTextColor = isLightColor(customColorInput)
    ? "#1f2937"
    : "#ffffff";

  /* ── Close helpers ── */
  const closePanel = () => {
    setIsOpen(false);
  };

  const openPanel = () => {
    setIsOpen(true);
  };

  const togglePanel = () => (isOpen ? closePanel() : openPanel());

  /* ── Outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closePanel();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  /* ── Escape key ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleThemeSelect = (t: string) => setTheme(t);
  const handleCustomApply = () => setCustomColor(customColorInput);
  const handleReset = () => setCustomColor(null);

  // Custom scrollbar styles
  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { 
      border-radius: 99px; 
      background: rgba(128,128,128,0.2);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
      background: rgba(128,128,128,0.4);
    }
  `;

  return (
    <div className="tp-root">
      <style>{scrollbarStyles}</style>

      {/* ── Trigger button ── */}
      <motion.button
        onClick={togglePanel}
        variants={triggerVariants}
        initial="hidden"
        animate={["visible", "animate"]}
        whileHover="hover"
        whileTap="tap"
        className="fixed left-4 sm:left-6 bottom-6 sm:bottom-8 z-[1100] w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer"
        style={{
          background: currentColor,
          transition: "background 0.3s ease",
        }}
        title="Theme Settings"
        aria-label="Open theme picker"
      >
        <motion.div
          variants={breatheVariants}
          animate="animate"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Palette size={18} className="sm:w-5 sm:h-5" color={iconColor} />
        </motion.div>
      </motion.button>

      {/* ── Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-[1050] cursor-pointer"
            onClick={closePanel}
          />
        )}
      </AnimatePresence>

      {/* ── Side Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-0 top-0 bottom-0 w-[280px] sm:w-[340px] z-[1200] flex flex-col shadow-2xl"
            style={{
              background: theme.surface,
              borderRight: `1px solid ${theme.border}`,
            }}
          >
            {/* Accent bar */}
            <motion.div
              style={{
                height: 3,
                background: `linear-gradient(90deg, ${currentColor}, ${currentColor}55)`,
                borderRadius: "0 0 3px 3px",
              }}
              animate={{
                background: `linear-gradient(90deg, ${currentColor}, ${currentColor}55)`,
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Header */}
            <div
              style={{
                padding: "16px 16px 14px",
                borderBottom: `1px solid ${theme.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: theme.text,
                    margin: 0,
                    marginBottom: 2,
                  }}
                >
                  Appearance
                </h2>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: theme.textSecondary,
                    margin: 0,
                  }}
                >
                  Personalise your workspace
                </p>
              </div>
              <motion.button
                variants={closeBtnVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={closePanel}
                style={{
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: theme.background,
                  color: theme.textSecondary,
                  border: `1px solid ${theme.border}`,
                  cursor: "pointer",
                  borderRadius: "8px",
                }}
                aria-label="Close"
              >
                <X size={14} />
              </motion.button>
            </div>

            {/* Body */}
            <div
              className="custom-scrollbar"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* Active preview */}
              <motion.div
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                custom={0}
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: `linear-gradient(135deg, ${currentColor}14 0%, ${currentColor}07 100%)`,
                  border: `1.5px solid ${currentColor}30`,
                }}
              >
                <motion.div
                  variants={shimmerVariants}
                  animate="animate"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: currentColor,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: theme.text,
                      margin: 0,
                    }}
                  >
                    {customColor
                      ? "Custom Color"
                      : (themeMeta[themeName]?.label ?? themeName)}
                  </p>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      color: theme.textSecondary,
                      margin: "2px 0 0",
                    }}
                  >
                    {customColor
                      ? currentColor
                      : (themeMeta[themeName]?.desc ?? "Active theme")}
                  </p>
                </div>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: currentColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check
                    size={12}
                    color={isLightColor(currentColor) ? "#1f2937" : "#ffffff"}
                  />
                </div>
              </motion.div>

              {/* Preset Themes */}
              <motion.div
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <Sparkles size={12} color={theme.textSecondary} />
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: theme.textSecondary,
                    }}
                  >
                    Preset Themes
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      opacity: 0.5,
                      background: theme.border,
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {availableThemes.map((t, i) => {
                    const meta = themeMeta[t];
                    const tPrimary = themes[t as keyof typeof themes]?.primary;
                    const isActive = themeName === t && !customColor;

                    return (
                      <motion.button
                        key={t}
                        variants={themeBtnVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => handleThemeSelect(t)}
                        onMouseEnter={() => setHoveredTheme(t)}
                        onMouseLeave={() => setHoveredTheme(null)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "8px 10px",
                          borderRadius: 10,
                          cursor: "pointer",
                          background: isActive ? `${tPrimary}12` : "transparent",
                          border: `1.5px solid ${isActive ? tPrimary + "60" : theme.border}`,
                          textAlign: "left",
                        }}
                        aria-pressed={isActive}
                      >
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 8,
                            flexShrink: 0,
                            background: `${tPrimary}1a`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <motion.div
                            variants={swatchVariants}
                            initial="rest"
                            whileHover="hover"
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 5,
                              background: tPrimary,
                            }}
                          />
                        </div>

                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: theme.text,
                              margin: 0,
                            }}
                          >
                            {meta?.label ?? t}
                          </p>
                          <p
                            style={{
                              fontSize: "0.7rem",
                              color: theme.textSecondary,
                              margin: "1px 0 0",
                            }}
                          >
                            {meta?.desc ?? ""}
                          </p>
                        </div>

                        {isActive ? (
                          <motion.div
                            variants={pulseVariants}
                            animate="animate"
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: tPrimary,
                              flexShrink: 0,
                            }}
                          />
                        ) : hoveredTheme === t ? (
                          <ChevronRight
                            size={14}
                            color={tPrimary}
                            style={{ flexShrink: 0 }}
                          />
                        ) : null}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Custom Color */}
              <motion.div
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <Palette size={12} color={theme.textSecondary} />
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: theme.textSecondary,
                    }}
                  >
                    Custom Color
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      opacity: 0.5,
                      background: theme.border,
                    }}
                  />
                </div>

                <div
                  style={{
                    borderRadius: 12,
                    padding: "12px 14px",
                    background: theme.background,
                    border: `1.5px solid ${theme.border}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: theme.textSecondary,
                      margin: 0,
                    }}
                  >
                    Pick any color to create your custom theme
                  </p>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      type="color"
                      value={customColorInput}
                      onChange={(e) => setCustomColorInput(e.target.value)}
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 8,
                        border: `2px solid ${theme.border}`,
                        cursor: "pointer",
                        padding: 2,
                        background: theme.background,
                        flexShrink: 0,
                      }}
                    />

                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 8,
                        flexShrink: 0,
                        background: customColorInput,
                        border: `2px solid ${theme.border}`,
                        boxShadow: `0 2px 8px ${customColorInput}55`,
                      }}
                    />

                    <motion.button
                      variants={applyBtnVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      onClick={handleCustomApply}
                      style={{
                        flex: 1,
                        height: 42,
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        color: applyButtonTextColor,
                        background: customColorInput,
                        border: "none",
                        cursor: "pointer",
                        boxShadow: `0 2px 8px ${customColorInput}55`,
                      }}
                    >
                      Apply
                    </motion.button>
                  </div>

                  <p
                    style={{
                      margin: 0,
                      textAlign: "center",
                      fontSize: "0.65rem",
                      fontFamily: "monospace",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      color: theme.textSecondary,
                    }}
                  >
                    {customColorInput.toUpperCase()}
                  </p>
                </div>
              </motion.div>

              {/* Reset */}
              {customColor && (
                <motion.button
                  variants={resetBtnVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  custom={3}
                  onClick={handleReset}
                  style={{
                    width: "100%",
                    padding: "8px 0",
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    background: "transparent",
                    border: `1.5px solid ${theme.border}`,
                    color: theme.textSecondary,
                    cursor: "pointer",
                  }}
                >
                  ↩ Reset to {themeMeta[themeName]?.label ?? themeName} theme
                </motion.button>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "8px 16px",
                borderTop: `1px solid ${theme.border}`,
                textAlign: "center",
                fontSize: "0.65rem",
                color: theme.textSecondary,
                flexShrink: 0,
              }}
            >
              Theme preference is saved automatically
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePicker;