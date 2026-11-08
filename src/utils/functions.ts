// export const hexToRgba = (hex: string, opacity: number): string => {
//   const h = hex.replace("#", "");
//   const r = parseInt(h.substring(0, 2), 16);
//   const g = parseInt(h.substring(2, 4), 16);
//   const b = parseInt(h.substring(4, 6), 16);
//   return `rgba(${r}, ${g}, ${b}, ${opacity})`;
// };

// src/utils/functions.ts
export const hexToRgba = (hex: string | null | undefined, opacity: number): string => {
  if (!hex) return `rgba(0,0,0,${opacity})`;
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const truncateDescription = (
  description: string,
  maxLength: number = 130,
): string => {
  if (!description) return "";
  if (description.length <= maxLength) return description;

  let truncated = description.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex > 0 && lastSpaceIndex > maxLength - 20) {
    truncated = truncated.substring(0, lastSpaceIndex);
  }

  return truncated + "...";
};
