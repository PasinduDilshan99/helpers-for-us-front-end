"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { BreadcrumbItem, BreadcrumbProps } from "@/types/breadcrumb-types";
import { HOME_PAGE_URL } from "@/utils/urls";
import {
  breadcrumbVariants,
  itemVariants,
  separatorVariants,
} from "@/app/animations/variants";
import { hexToRgba } from "@/utils/functions";

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  customItems,
}) => {
  const pathname = usePathname();
  const { theme } = useTheme();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems;
    if (items) return items;

    const paths = pathname?.split("/").filter((path) => path) || null;
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Home", href: HOME_PAGE_URL },
    ];

    let currentPath = "";
    paths?.forEach((path) => {
      currentPath += `/${path}`;
      const label = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      breadcrumbs.push({ label, href: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <motion.nav
      variants={breadcrumbVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm mb-3 sm:mb-4"
      aria-label="Breadcrumb"
    >
      <motion.div variants={itemVariants} whileHover="hover">
        <Link
          href="/"
          className="flex items-center gap-1 transition-all duration-200 rounded-md p-1"
          style={{ color: theme.textSecondary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = theme.primary;
            e.currentTarget.style.backgroundColor = hexToRgba(
              theme.primary,
              0.08,
            );
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = theme.textSecondary;
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="sr-only">Home</span>
        </Link>
      </motion.div>

      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.href}>
          <motion.div
            variants={separatorVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center"
          >
            <ChevronRight
              className="w-3 h-3 sm:w-3.5 sm:h-3.5"
              style={{ color: theme.textSecondary }}
            />
          </motion.div>

          {index === breadcrumbs.length - 1 ? (
            <motion.span
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="font-semibold px-2 py-1 rounded-md"
              style={{
                color: theme.primary,
                backgroundColor: hexToRgba(theme.primary, 0.08),
              }}
            >
              {crumb.label}
            </motion.span>
          ) : (
            <motion.div variants={itemVariants} whileHover="hover">
              <Link
                href={crumb.href}
                className="px-2 py-1 rounded-md transition-all duration-200"
                style={{ color: theme.textSecondary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.primary;
                  e.currentTarget.style.backgroundColor = hexToRgba(
                    theme.primary,
                    0.05,
                  );
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.textSecondary;
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {crumb.label}
              </Link>
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </motion.nav>
  );
};
