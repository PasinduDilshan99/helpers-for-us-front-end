// utils/employeeDetailsHelpers.ts

export const formatDate = (dateString?: string): string => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (dateString?: string): string => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusStyle = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return {
        bg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
        dot: "bg-emerald-500",
        ring: "ring-emerald-200 dark:ring-emerald-800",
      };
    case "INACTIVE":
      return {
        bg: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
        dot: "bg-amber-400",
        ring: "ring-amber-200 dark:ring-amber-800",
      };
    case "TERMINATED":
      return {
        bg: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
        dot: "bg-red-500",
        ring: "ring-red-200 dark:ring-red-800",
      };
    default:
      return {
        bg: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
        dot: "bg-gray-400",
        ring: "ring-gray-200 dark:ring-gray-700",
      };
  }
};

export const getProficiencyStyle = (level: string) => {
  const map: Record<string, { label: string; className: string }> = {
    beginner: {
      label: "Beginner",
      className: "bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:ring-sky-800",
    },
    intermediate: {
      label: "Intermediate",
      className: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-400 dark:ring-cyan-800",
    },
    advanced: {
      label: "Advanced",
      className: "bg-violet-50 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-900/20 dark:text-violet-400 dark:ring-violet-800",
    },
    expert: {
      label: "Expert",
      className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:ring-amber-800",
    },
  };
  return map[level] || { label: level, className: "bg-gray-100 text-gray-600 ring-1 ring-gray-200" };
};

export const getPlatformIcon = (platform: string): string => {
  const icons: Record<string, string> = {
    LinkedIn: "🔗",
    Twitter: "🐦",
    Facebook: "📘",
    Instagram: "📸",
    GitHub: "🐙",
    YouTube: "▶️",
  };
  return icons[platform] || "🌐";
};

export const getAssetIcon = (type: string): string => {
  const icons: Record<string, string> = {
    LAPTOP: "💻",
    PHONE: "📱",
    MONITOR: "🖥️",
    KEYBOARD: "⌨️",
    MOUSE: "🖱️",
    TABLET: "📲",
    HEADSET: "🎧",
  };
  return icons[type] || "📦";
};