import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { GoPersonFill } from "react-icons/go";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import logo from "@/assets/AuthImages/Logo-white.png";
import authImage from "@/assets/AuthImages/Image.png";

export default function AuthLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeForm, setActiveForm] = useState<"signIn" | "signUp">("signIn");

  // keep activeForm synced with current route
  useEffect(() => {
    if (location.pathname.includes("signup")) setActiveForm("signUp");
    else setActiveForm("signIn");
  }, [location.pathname]);

  const handleFormSwitch = (form: "signIn" | "signUp") => {
    setActiveForm(form);
    navigate(form === "signIn" ? "/signin" : "/signup");
  };

  // 🧠 Hide the toggle buttons on password-related routes
  const hideAuthButtons =
    location.pathname.includes("forget") ||
    location.pathname.includes("reset") ||
    location.pathname.includes("change");

  return (
    <div className="w-screen h-screen bg-[#0D1321] flex justify-center items-center gap-[100px]">
      {/* Left Form Section */}
      <div className="h-[620px] w-[590px] bg-[#0D1321] text-white p-10 rounded-xl shadow-lg flex flex-col overflow-auto scrollbar-custom">
        {/* Logo and Header */}
        <div className="flex flex-col items-start gap-4 mb-6">
          <img src={logo} alt="QuizWiz Logo" className="w-[200px] h-[45.4px]" />
          <h1 className="text-2xl font-bold whitespace-nowrap text-[#C5D86D]">
            Continue your learning journey with QuizWiz!
          </h1>
        </div>

        {/* Sign In / Sign Up Button Group (conditionally hidden) */}
        {!hideAuthButtons && (
          <div className="flex justify-start gap-[30px] my-2">
            <button
              onClick={() => handleFormSwitch("signIn")}
              className={`h-[170px] w-[120px] bg-white/5 rounded-lg
              flex flex-col items-center justify-center gap-3
              text-gray-300 hover:bg-white/10 hover:text-white
              transition-all duration-300
              ${
                activeForm === "signIn"
                  ? "border-[5px] border-[#C5D86D]"
                  : "border border-white/10"
              }`}
            >
              <GoPersonFill
                size={40}
                color={`${activeForm === "signIn" ? "#C5D86D" : ""}`}
              />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => handleFormSwitch("signUp")}
              className={`h-[170px] w-[120px] bg-white/5 rounded-lg
              flex flex-col items-center justify-center gap-3
              text-gray-300 hover:bg-white/10 hover:text-white
              transition-all duration-300
              ${
                activeForm === "signUp"
                  ? "border-[5px] border-[#C5D86D]"
                  : "border border-white/10"
              }`}
            >
              <BsFillPersonPlusFill
                size={40}
                color={`${activeForm === "signUp" ? "#C5D86D" : ""}`}
              />
              <span>Sign Up</span>
            </button>
          </div>
        )}

        {/* Dynamic Form */}
        <div className="flex-grow mt-6 w-full min-h-0">
          <Outlet />
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:block h-[620px] w-[540px] my-[50px] mr-[40px] rounded-[16px] sticky top-20">
        <img
          src={authImage}
          alt="Authentication Visual"
          className="h-full w-full object-cover rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}
