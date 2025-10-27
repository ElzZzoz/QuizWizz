import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputFields";
import CookieService from "@/services/CookieServices/CookieServices";
import {
  loginValidationSchema,
  loginInitialValues,
} from "@/utils/Validation/loginValidations";
import { loginUser } from "@/services/Auth/authService";
import { isAxiosError } from "axios";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof loginInitialValues) => {
    try {
      toast.loading("Signing in...", { id: "login" });

      const data = await loginUser(values.email, values.password);

      // ✅ Correct token path
      const token = data?.data?.accessToken;

      if (token) {
        CookieService.set("token", token, {
          path: "/",
          secure: false, // ✅ must be false on localhost
          sameSite: "lax",
        });
        console.log("✅ Token saved in cookie:", document.cookie);
      } else {
        console.log("❌ No token found in response");
      }

      toast.success("Login successful!", { id: "login" });
      navigate("/dashboard");
    } catch (error: unknown) {
      // --- START: Updated Error Block ---

      let errorMessage = "Login failed. Please try again."; // 1. Set a default message

      // 2. Check if it's an Axios error
      if (isAxiosError(error)) {
        // 3. Now it's safe to access error.response
        // Check if your backend sent a specific 'message' field
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else {
          // Fallback to the general error message from Axios
          errorMessage = error.message;
        }
      }
      // 4. (Optional) Handle non-Axios JavaScript errors
      else if (error instanceof Error) {
        errorMessage = error.message;
      }

      // 5. Show the final error message
      toast.error(errorMessage, {
        id: "login",
      });

      // --- END: Updated Error Block ---
    }
  };

  return (
    <Formik
      initialValues={loginInitialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-5 w-full text-white">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
          />

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[150px] h-[50px] bg-[#F5F5F5] text-black font-semibold rounded-md hover:bg-gray-200 transition-colors"
            >
              {isSubmitting ? (
                "Signing in..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <FaCheckCircle size={20} />
                </span>
              )}
            </button>

            <p>
              Forgot Password?{" "}
              <Link
                to="/forget-password"
                className="text-sm text-[#C5D86D] hover:underline"
              >
                Click here
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}
