import CookieService from "@/services/CookieServices/CookieServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // ✅ Remove token
    CookieService.remove("token", { path: "/" });

    // ✅ Optional: Clear other stored user info
    localStorage.removeItem("user");

    // ✅ Show notification
    toast.success("Logged out successfully");

    // ✅ Redirect to login page
    navigate("/signin");
  };

  return logout;
};

export default useLogout;
