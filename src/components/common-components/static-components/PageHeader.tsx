import { useTheme } from "@/contexts/ThemeContext";
import { Breadcrumb } from "./Breadcrumb";
import { motion } from "framer-motion";
import {
  EASE_OUT,
  headerVariants,
  titleVariants,
} from "@/app/animations/variants";
import { hexToRgba } from "@/utils/functions";
import { PageHeaderProps } from "@/types/page-header-types";

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbItems,
  action,
  icon,
}) => {
  const { theme } = useTheme();

  return (
    <div className="sm:mb-2">
      <Breadcrumb customItems={breadcrumbItems} />

      {/* Animated Divider */}
      <motion.hr
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="h-0.5 transition-colors duration-300 origin-left"
        style={{
          backgroundColor: theme.primary,
          boxShadow: `0 0 8px ${hexToRgba(theme.primary, 0.5)}`,
        }}
      />

      {/* Title and Description Section */}
      {(title || description || action) && (
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="mt-2 sm:mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex-1">
            {title && (
              <motion.div
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-2 sm:gap-3"
              >
                {icon && (
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl"
                    style={{
                      backgroundColor: hexToRgba(theme.primary, 0.1),
                      color: theme.primary,
                    }}
                  >
                    {icon}
                  </motion.span>
                )}
                <h1
                  className="text-xl sm:text-2xl md:text-3xl font-bold transition-colors duration-300"
                  style={{ color: theme.text }}
                >
                  {title}
                </h1>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PageHeader;
