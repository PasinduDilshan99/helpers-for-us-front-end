export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "N/A";

  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

export const formatTime = (timeString: string): string => {
  if (!timeString) return "N/A";
  if (timeString.match(/^\d{2}:\d{2}$/)) return timeString;
  if (timeString.match(/^\d{2}:\d{2}:\d{2}$/)) {
    return timeString.substring(0, 5);
  }
  return timeString;
};

export const truncateDescription = (
  description: string,
  maxLength: number = 120,
): string => {
  if (!description) return "";
  if (typeof description !== "string") return String(description);
  if (description.length <= maxLength) return description;

  let truncated = description.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex > 0 && lastSpaceIndex > maxLength - 20) {
    truncated = truncated.substring(0, lastSpaceIndex);
  }

  return truncated + "...";
};

export const getSafeString = (value: any, fallback: string = ""): string => {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  if (typeof value === "object") {
    if (value.name) return getSafeString(value.name, fallback);
    if (value.label) return getSafeString(value.label, fallback);
    try {
      const stringified = JSON.stringify(value);
      if (stringified.length > 50) return fallback;
      return stringified;
    } catch {
      return fallback;
    }
  }
  return fallback;
};

export const getSafeArray = (value: any, fallback: any[] = []): any[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.includes(",")) {
    return value.split(",").map((s) => s.trim());
  }
  return fallback;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const getMonthName = (monthNumber: number): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber - 1] || "Unknown";
};

export const formatMonth = (month: number): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month - 1] || "N/A";
};

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const getFileIcon = (type: string) => {
  if (type.includes("pdf")) return "📄";
  if (type.includes("image")) return "🖼️";
  if (type.includes("word") || type.includes("doc")) return "📝";
  if (type.includes("excel") || type.includes("sheet")) return "📊";
  return "📁";
};

export const formatDateTime = (dateStr: string): string => {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
};
