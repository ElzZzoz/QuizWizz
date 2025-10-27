import { FaBars, FaUserCircle } from "react-icons/fa";
import { useState, useContext } from "react";
import { IoTimer } from "react-icons/io5";
import CookieService from "@/services/CookieServices/CookieServices";
import { jwtDecode } from "jwt-decode";
import { IoIosPerson } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import useLogout from "@/hooks/useLogout";
import { ModalContext } from "@/components/Quizzes/modal/ModalContext"; // import modal context
import AddQuizForm from "@/components/Quizzes/modal/AddQuizForm";

interface NavbarProps {
  currentTab: string;
  onMenuClick: () => void;
}

interface TokenPayload {
  username?: string;
  email?: string;
  role?: string;
}

export default function Navbar({ currentTab, onMenuClick }: NavbarProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const logout = useLogout();
  const modal = useContext(ModalContext); // access modal context

  let username = "Guest";
  let role = "student";
  const token = CookieService.get("token");

  if (token) {
    const decoded = jwtDecode<TokenPayload>(token);
    username = decoded.email || "Guest";
    role = decoded.role || "student";
  }

  const handleNewQuiz = () => {
    modal?.openModal(<AddQuizForm />); // open the AddQuizForm modal
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
      {/* Sidebar Toggle (Mobile) */}
      <button
        className="md:hidden p-2 rounded hover:bg-gray-200"
        onClick={onMenuClick}
      >
        <FaBars size={20} />
      </button>

      {/* Page Title */}
      <h1 className="text-xl font-semibold">{currentTab}</h1>

      <button
        onClick={handleNewQuiz} // open modal here
        className="flex items-center justify-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100 transition"
        style={{
          width: "150px",
          height: "40px",
          borderRadius: "30px",
          position: "relative",
        }}
      >
        <IoTimer size={30} />
        New Quiz
      </button>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
          >
            <FaUserCircle size={22} />
            <span className="hidden md:block">{username}</span>
          </button>
          <span className="hidden md:block font-nunito font-bold text-[16px] leading-none text-[#C5D86D] capitalize">
            ({role})
          </span>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded border border-gray-200">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                  <IoIosPerson size={20} />
                  Profile
                </li>

                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500 flex items-center gap-2"
                  onClick={logout}
                >
                  <CiLogout size={20} />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
