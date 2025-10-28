import { FaHome } from "react-icons/fa";
import { MdGroups, MdQuiz } from "react-icons/md";
import { PiExamFill, PiStudentFill } from "react-icons/pi";

import { ROUTES } from "@/services/Endpoints/Endpoints";

export const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <FaHome />,
    path: ROUTES.DASHBOARD,
  },
  {
    key: "groups",
    label: "Groups",
    icon: <MdGroups />,
    path: `${ROUTES.DASHBOARD}${ROUTES.GROUPS}`,
  },
  {
    key: "quizzes",
    label: "Quizzes",
    icon: <MdQuiz />,
    path: `${ROUTES.DASHBOARD}${ROUTES.QUIZZES}`,
  },
  {
    key: "students",
    label: "Students",
    icon: <PiStudentFill />,
    path: `${ROUTES.DASHBOARD}${ROUTES.STUDENTS}`,
  },
  {
    key: "results",
    label: "Results",
    icon: <PiExamFill />,
    path: `${ROUTES.DASHBOARD}${ROUTES.RESULTS}`,
  },
];

export const getMenuItems = (role: string) => {
  // Use 'string' for safety
  if (role === "Student") {
    // If user is a student, only return Quizzes and Results
    return menuItems.filter(
      (item) => item.key === "quizzes" || item.key === "results"
    );
  }

  // Otherwise (e.g., "instructor"), return the full list
  return menuItems;
};
