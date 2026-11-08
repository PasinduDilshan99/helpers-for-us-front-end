"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, X, ExternalLink } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { ToastNotificationProps } from "@/types/common-components-types";

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  type,
  title,
  message,
  duration = 30000,
  onClose,
  actionLink,
  actionText = "Go to Destination",
}) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  const handleAction = () => {
    if (actionLink) {
      window.location.href = actionLink;
    }
    handleClose();
  };

  if (!isVisible) return null;

  const colors = {
    success: {
      bg: theme.success,
      light: `${theme.success}10`,
      border: `${theme.success}30`,
      icon: theme.success,
    },
    error: {
      bg: theme.error,
      light: `${theme.error}10`,
      border: `${theme.error}30`,
      icon: theme.error,
    },
  };

  const currentColor = colors[type];

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100%);
          }
        }
        
        .toast-enter {
          animation: slideInRight 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        .toast-exit {
          animation: slideOutRight 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>

      <div
        className={`fixed top-24 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] toast-enter ${
          isLeaving ? "toast-exit" : ""
        }`}
      >
        <div
          className="relative rounded-2xl shadow-xl overflow-hidden"
          style={{
            backgroundColor: theme.surface,
            border: `1px solid ${currentColor.border}`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.15), 0 0 0 1px ${currentColor.border}`,
          }}
        >
          <div
            className="absolute top-0 left-0 h-1"
            style={{
              backgroundColor: currentColor.icon,
              animation: `progress ${duration}ms linear forwards`,
            }}
          />

          <div className="p-4">
            <div className="flex items-start gap-3">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: currentColor.light }}
              >
                {type === "success" ? (
                  <CheckCircle
                    className="w-5 h-5"
                    style={{ color: currentColor.icon }}
                  />
                ) : (
                  <AlertCircle
                    className="w-5 h-5"
                    style={{ color: currentColor.icon }}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  className="text-sm font-semibold mb-1"
                  style={{ color: theme.text }}
                >
                  {title}
                </h3>
                <p className="text-sm" style={{ color: theme.textSecondary }}>
                  {message}
                </p>

                {/* Action Button */}
                {actionLink && type === "success" && (
                  <button
                    onClick={handleAction}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium transition-all hover:gap-2"
                    style={{ color: currentColor.icon }}
                  >
                    {actionText}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={handleClose}
                className="flex-shrink-0 p-1.5 rounded-lg transition-all hover:scale-110"
                style={{
                  color: theme.textSecondary,
                  backgroundColor: `${theme.border}30`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${theme.border}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${theme.border}30`;
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
