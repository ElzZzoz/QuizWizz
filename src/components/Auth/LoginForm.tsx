import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputFields";
import CookieServices from "@/services/CookieServices/CookieServices";
import {
  loginValidationSchema,
  loginInitialValues,
} from "@/utils/Validation/loginValidations";
import { loginUser } from "@/services/Auth/authService";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof loginInitialValues) => {
    try {
      toast.loading("Signing in...", { id: "login" });
      const data = await loginUser(values.email, values.password);
      const token = data?.data?.token;

      if (token) CookieServices.set("token", token);

      toast.success("Login successful!", { id: "login" });
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed", {
        id: "login",
      });
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
