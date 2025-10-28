import { Formik, Form, ErrorMessage, Field } from "formik";
import { toast } from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputFields";
import CookieServices from "@/services/CookieServices/CookieServices";
import {
  registerValidationSchema,
  registerInitialValues,
} from "@/utils/Validation/registerValidations";
import { registerUser } from "@/services/Auth/authService";
import { SpinnerMini } from "@/components"; // ✅ Correct import
import type { IRegisterFormValues } from "@/interfaces/AuthInterfaces/AuthInterfaces";

export default function RegisterForm() {
  const navigate = useNavigate();

  const handleSubmit = async (values: IRegisterFormValues) => {
    try {
      toast.loading("Creating your account...", { id: "register" });

      const data = await registerUser(
        values.first_name,
        values.last_name,
        values.email,
        values.password,
        values.role
      );

      const token = data?.data?.token;
      if (token) CookieServices.set("token", token);

      toast.success("Account created successfully!", { id: "register" });
      navigate("/signIn", { replace: true });
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMsg, { id: "register" });
    }
  };

  return (
    <Formik
      initialValues={registerInitialValues}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-5 w-full text-white">
          {/* First & Last Name in one row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* First Name */}
            <div className="flex-1">
              <InputField
                label="First Name"
                name="first_name"
                type="text"
                placeholder="John"
                autoComplete="given-name"
              />
            </div>
            {/* Last Name */}
            <div className="flex-1">
              <InputField
                label="Last Name"
                name="last_name"
                type="text"
                placeholder="Doe"
                autoComplete="family-name"
              />
            </div>
          </div>

          {/* Email */}
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />

          {/* Password */}
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />

          {/* Confirm Password */}
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium mb-1 text-gray-200"
            >
              Role
            </label>
            <Field
              as="select"
              name="role"
              id="role"
              className="w-full bg-[#1A2035] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C5D86D]"
            >
              <option value="">Select your role</option>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </Field>
            <ErrorMessage
              name="role"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-between gap-1 items-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-40 h-12 bg-[#F5F5F5] text-black font-semibold rounded-md hover:bg-gray-200 transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <SpinnerMini />
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign Up <FaUserPlus size={20} />
                </span>
              )}
            </button>

            <p>
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-sm text-[#C5D86D] hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}
