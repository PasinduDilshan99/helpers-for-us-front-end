import { type Variants } from "framer-motion";

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN: [number, number, number, number] = [0.42, 0, 1, 1];

export const overlayVariants: Variants = {
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

export const sidebarVariants: Variants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
      duration: 0.3,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      duration: 0.28,
      ease: EASE_IN,
    },
  },
};

export const headerVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
};

export const navVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      duration: 0.4,
    },
  },
};

export const navItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.03,
      duration: 0.25,
      ease: EASE_OUT,
    },
  }),
};

export const subItemVariants: Variants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    marginTop: 8,
    transition: {
      duration: 0.28,
      ease: EASE_OUT,
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: {
      duration: 0.22,
      ease: EASE_IN,
    },
  },
};

export const grandSubItemVariants: Variants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    marginTop: 8,
    transition: {
      duration: 0.25,
      ease: EASE_OUT,
      staggerChildren: 0.02,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: {
      duration: 0.2,
      ease: EASE_IN,
    },
  },
};

export const chevronVariants: Variants = {
  closed: { rotate: 0 },
  open: { rotate: 180 },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: EASE_OUT },
  },
};

export const buttonHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.15 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

export const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      duration: 0.25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.2,
      ease: EASE_IN,
    },
  },
};

export const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      ease: EASE_IN,
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: EASE_OUT,
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      ease: EASE_IN,
    },
  },
};

export const mobileItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.15 },
  },
};

export const logoVariants: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.05, rotate: 3, transition: { duration: 0.2 } },
  tap: { scale: 0.95, rotate: 0, transition: { duration: 0.1 } },
};

export const breadcrumbVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, x: -5 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: EASE_OUT },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.15, ease: "easeOut" },
  },
};

export const separatorVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: EASE_OUT },
  },
};

export const titleVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.1, duration: 0.35, ease: EASE_OUT },
  },
};

export const descriptionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.2, duration: 0.3, ease: EASE_OUT },
  },
};

export const actionVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.15, duration: 0.3, ease: EASE_OUT },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

export const fieldGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

export const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: EASE_OUT },
  },
};

export const modifiedBadgeVariants: Variants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    marginTop: 6,
    transition: { duration: 0.22, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

export const pillVariants: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { y: -2, transition: { duration: 0.15, ease: "easeOut" } },
  tap: { scale: 0.97, transition: { duration: 0.1 } },
};

export const bodyVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.32, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

export const tagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.22, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.82,
    transition: { duration: 0.16, ease: "easeIn" },
  },
};

export const rowVariants: Variants = {
  rest: { x: 0 },
  hover: { x: 3, transition: { duration: 0.15, ease: "easeOut" } },
};

export const errorVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.22, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.16, ease: "easeIn" },
  },
};

export const modifiedVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE_OUT } },
  exit: { opacity: 0, y: 6, transition: { duration: 0.16 } },
};

export const formVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.32, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: { duration: 0.24, ease: "easeIn" },
  },
};

export const activityCardVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const activityBodyVariants: Variants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    marginTop: 12,
    transition: { duration: 0.28, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

export const confirmVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, x: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.2, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    x: 10,
    transition: { duration: 0.16, ease: "easeIn" },
  },
};

export const sectionVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const contentVariants: Variants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    marginTop: 8,
    transition: {
      duration: 0.28,
      ease: EASE_OUT,
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: {
      duration: 0.22,
      ease: "easeIn",
    },
  },
};

export const infoRowVariants: Variants = {
  hidden: { opacity: 0, x: -5 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: EASE_OUT },
  },
};

export const categoryVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.18, ease: EASE_OUT },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.15 },
  },
};

export const emptyVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
};

export const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.15 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

export const valueVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: EASE_OUT },
  },
};

export const statCardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.38,
      ease: EASE_OUT,
    },
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

export const destinationCardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const detailVariants: Variants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    marginTop: 12,
    transition: {
      duration: 0.25,
      ease: EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

export const imageVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.4 } },
};

export const quickViewVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, delay: 0.1 } },
};

export const thumbnailVariants: Variants = {
  rest: { scale: 1, opacity: 0.7 },
  active: { scale: 1.05, opacity: 1 },
  hover: { scale: 1.02, transition: { duration: 0.15 } },
};

export const shineVariants: Variants = {
  rest: { x: "-100%" },
  hover: { x: "100%", transition: { duration: 0.6, ease: "easeInOut" } },
};

export const requirementsVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: EASE_OUT, staggerChildren: 0.03 },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

export const requirementItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.15 },
  },
};

export const seasonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: EASE_OUT },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.15 },
  },
};

export const categoryBadgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: EASE_OUT },
  },
  hover: {
    scale: 1.05,
    x: 2,
    transition: { duration: 0.15 },
  },
};

export const imageCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.28, ease: EASE_OUT },
  },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.2 } },
  hover: { y: -4, transition: { duration: 0.2 } },
};

export const scheduleCardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const tipVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: EASE_OUT } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
};

export const dayVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE_OUT } },
};

export const tourCardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const featureVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: EASE_OUT } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
};

export const packageCardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const accommodationCardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};
export const typeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: EASE_OUT },
  },
  hover: {
    y: -2,
    scale: 1.02,
    transition: { duration: 0.15 },
  },
};

export const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
      duration: 0.4,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.2 },
  },
};

export const statusBadgeVariants: Variants = {
  hidden: { opacity: 0, x: 10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
};

export const privilegeCardVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
  hover: {
    x: 4,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};
