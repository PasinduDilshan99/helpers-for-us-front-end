"use client";

import React from "react";
import { XCircle, AlertTriangle, RefreshCw, ArrowLeft, Home } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { CommonErrorStateProps } from "@/types/common-components-types";
import { hexToRgba } from "@/utils/functions";

const CommonErrorState: React.FC<CommonErrorStateProps> = ({
  error,
  title,
  message,
  variant = "error",
  showIcon = true,
  showBackButton = false,
  showRetryButton = true,
  showHomeButton = false,
  onBack,
  onRetry,
  onHome,
  backButtonText = "Go Back",
  retryButtonText = "Try Again",
  homeButtonText = "Go to Dashboard",
  fullScreen = true,
  className = "",
}) => {
  const { theme } = useTheme();

  const getVariantConfig = () => {
    switch (variant) {
      case "warning":
        return {
          icon: AlertTriangle,
          iconColor: theme.warning || "#f59e0b",
          bgGradient: `linear-gradient(135deg, ${hexToRgba(theme.warning, 0.1)}, ${hexToRgba(theme.warning, 0.05)})`,
          borderColor: hexToRgba(theme.warning, 0.3),
          defaultTitle: "Warning",
          defaultMessage: "Something went wrong. Please try again.",
        };
      case "info":
        return {
          icon: AlertTriangle,
          iconColor: theme.primary,
          bgGradient: `linear-gradient(135deg, ${hexToRgba(theme.primary, 0.1)}, ${hexToRgba(theme.primary, 0.05)})`,
          borderColor: hexToRgba(theme.primary, 0.3),
          defaultTitle: "Information",
          defaultMessage: "No data available at this time.",
        };
      case "not-found":
        return {
          icon: AlertTriangle,
          iconColor: theme.accent || "#8b5cf6",
          bgGradient: `linear-gradient(135deg, ${hexToRgba(theme.accent, 0.1)}, ${hexToRgba(theme.accent, 0.05)})`,
          borderColor: hexToRgba(theme.accent, 0.3),
          defaultTitle: "Not Found",
          defaultMessage: "The requested resource could not be found.",
        };
      default:
        return {
          icon: XCircle,
          iconColor: theme.error,
          bgGradient: `linear-gradient(135deg, ${hexToRgba(theme.error, 0.1)}, ${hexToRgba(theme.error, 0.05)})`,
          borderColor: hexToRgba(theme.error, 0.3),
          defaultTitle: "Error",
          defaultMessage: "An unexpected error occurred. Please try again.",
        };
    }
  };

  const config = getVariantConfig();
  const IconComponent = config.icon;
  const finalTitle = title || config.defaultTitle;
  const finalMessage = message || error || config.defaultMessage;

  const containerClasses = `flex items-center justify-center transition-colors duration-300 ${className} ${
    fullScreen ? "min-h-screen" : ""
  }`;

  return (
    <div
      className={containerClasses}
      style={{ backgroundColor: theme.background }}
    >
      <div
        className="rounded-2xl p-8 md:p-12 text-center max-w-md shadow-sm border animate-fadeIn"
        style={{
          backgroundColor: theme.surface,
          borderColor: theme.border,
          background: config.bgGradient,
          border: `1px solid ${config.borderColor}`,
        }}
      >
        {showIcon && (
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{
              background: `linear-gradient(135deg, ${hexToRgba(config.iconColor, 0.2)}, ${hexToRgba(config.iconColor, 0.1)})`,
            }}
          >
            <IconComponent
              size={48}
              className="animate-bounceIn"
              style={{ color: config.iconColor }}
            />
          </div>
        )}

        <h2
          className="text-xl md:text-2xl font-bold mb-2"
          style={{ color: theme.text }}
        >
          {finalTitle}
        </h2>

        <p
          className="text-sm md:text-base mb-6"
          style={{ color: theme.textSecondary }}
        >
          {finalMessage}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: theme.background,
                border: `1px solid ${theme.border}`,
                color: theme.text,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hexToRgba(theme.primary, 0.05);
                e.currentTarget.style.borderColor = theme.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.background;
                e.currentTarget.style.borderColor = theme.border;
              }}
            >
              <ArrowLeft size={16} />
              {backButtonText}
            </button>
          )}

          {showRetryButton && onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: theme.primary,
                color: "#fff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              <RefreshCw size={16} />
              {retryButtonText}
            </button>
          )}

          {showHomeButton && onHome && (
            <button
              onClick={onHome}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: theme.accent,
                color: "#fff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              <Home size={16} />
              {homeButtonText}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default CommonErrorState;