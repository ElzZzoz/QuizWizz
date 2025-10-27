import { FaHome } from "react-icons/fa";
import { MdGroups, MdQuiz } from "react-icons/md";
import { PiExamFill } from "react-icons/pi";
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
    key: "results",
    label: "Results",
    icon: <PiExamFill />,
    path: `${ROUTES.DASHBOARD}${ROUTES.RESULTS}`,
  },
];
