export const getTabName = (path: string): string => {
  switch (path) {
    case "/dashboard":
      return "Dashboard";
    case "/dashboard/quizzes":
      return "Quizzes";
    case "/dashboard/results":
      return "Results";
    case "/dashboard/settings":
      return "Settings";
    default: {
      const parts = path.split("/").filter(Boolean);
      if (parts.length > 0) {
        return parts[parts.length - 1]
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      }
      return "Dashboard";
    }
  }
};
