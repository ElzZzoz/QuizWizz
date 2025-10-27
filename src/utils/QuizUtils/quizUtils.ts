// src/utils/quizUtils.ts

// A helper object to map difficulty levels to Tailwind classes
export const difficultyConfig: Record<string, string> = {
  Advanced: "bg-red-100 text-red-800",
  "Mid Level": "bg-yellow-100 text-yellow-800",
  "Entry Level": "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  easy: "bg-green-100 text-green-800",
  hard: "bg-red-100 text-red-800",
};

// Helper to format date
export const formatDate = (isoString: string | undefined) => {
  if (!isoString) return "N/A";
  try {
    const date = new Date(isoString);
    // Format as "DD / MM / YYYY"
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  } catch (error) {
    console.error("Invalid date string:", isoString);
    return "Invalid Date";
  }
};
