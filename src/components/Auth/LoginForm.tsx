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
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: string;
  email: string;
  role: "Student" | "Instructor"; // <-- The important part
  iat: number;
}

export default function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof loginInitialValues) => {
    toast.loading("Signing in...", { id: "login" });

    try {
      const data = await loginUser(values.email, values.password);
      const token = data?.data?.accessToken;

      if (token) {
        // 2. Decode the token to get the user's data
        const decodedPayload = jwtDecode<TokenPayload>(token);
        const userRole = decodedPayload.role; // Get the role

        // 3. Set BOTH cookies
        CookieService.set("token", token, {
          path: "/",
          secure: false,
          sameSite: "lax",
        });
        CookieService.set("role", userRole, {
          // <-- 4. Save the role
          path: "/",
          secure: false,
          sameSite: "lax",
        });

        toast.success("Login successful!", { id: "login" });

        // 5. Add conditional navigation based on role
        if (userRole.toLowerCase() === "student") {
          navigate("/dashboard/quizzes");
        } else {
          navigate("/dashboard");
        }
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (error: unknown) {
      let errorMessage = "Login failed. Please try again.";
      if (isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage, { id: "login" });
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

          <div className="flex justify-between gap-1 items-center mt-6">
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
