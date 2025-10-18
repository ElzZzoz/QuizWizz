import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import InputField from "@/components/Auth/InputFields";
import { resetPassword } from "@/services/Auth/authService";
import { SpinnerMini } from "@/components";
import {
  resetPasswordValidationSchema,
  resetPasswordInitialValues,
} from "@/utils/Validation/resetPasswordValidations";
import { useEffect, useState } from "react";

export default function ResetPass() {
  const navigate = useNavigate();
  const location = useLocation();

  const [emailFromUrl, setEmailFromUrl] = useState<string>("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get("email");
    if (emailParam) {
      setEmailFromUrl(emailParam);
    }
  }, [location.search]);

  const handleSubmit = async (values: typeof resetPasswordInitialValues) => {
    try {
      toast.loading("Resetting your password...", { id: "resetPass" });

      const data = await resetPassword(
        values.email,
        values.otp,
        values.password
      );

      toast.success(data?.message || "Password reset successful!", {
        id: "resetPass",
      });

      navigate("/signin", { replace: true });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to reset password. Please try again.",
        { id: "resetPass" }
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white">
      <Formik
        enableReinitialize // important so emailFromUrl updates the form
        initialValues={{
          ...resetPasswordInitialValues,
          email: emailFromUrl || resetPasswordInitialValues.email,
        }}
        validationSchema={resetPasswordValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5 w-full max-w-md">
            {/* Email (read-only if from URL) */}
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              disabled={!!emailFromUrl}
            />

            <InputField
              label="OTP Code"
              name="otp"
              type="text"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />

            <InputField
              label="New Password"
              name="password"
              type="password"
              placeholder="Enter new password"
              autoComplete="new-password"
            />

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#F5F5F5] text-black font-semibold rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              {isSubmitting ? <SpinnerMini /> : "Reset Password"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
