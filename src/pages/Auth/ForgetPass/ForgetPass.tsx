import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InputField from "@/components/Auth/InputFields";
import { forgotPassword } from "@/services/Auth/authService";
import { SpinnerMini } from "@/components";
import {
  forgetPasswordValidationSchema,
  forgetPasswordInitialValues,
} from "@/utils/Validation/forgetPasswordValidations";

export default function ForgetPass() {
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof forgetPasswordInitialValues) => {
    try {
      toast.loading("Sending reset instructions...", { id: "forgotPass" });

      const data = await forgotPassword(values.email);

      if (!data || !data.message) {
        throw new Error("Unexpected server response");
      }

      toast.success(data?.message || "OTP sent to your email!", {
        id: "forgotPass",
      });

      navigate(`/reset-password?email=${values.email}`);
    } catch (error: any) {
      console.error("Forget Password Error:", error);

      let errorMessage = "Something went wrong. Please try again.";

      // Handle API-specific errors
      const serverMsg = error?.response?.data?.message;

      if (
        serverMsg?.toLowerCase().includes("provided endpoint does not exist")
      ) {
        errorMessage =
          "Our servers are temporarily unavailable. Please try again later.";
      } else if (serverMsg?.toLowerCase().includes("not found")) {
        errorMessage = "Email not found. Please check and try again.";
      } else if (serverMsg) {
        errorMessage = serverMsg;
      } else if (error?.message === "Network Error") {
        errorMessage = "Network error. Check your connection.";
      }

      toast.error(errorMessage, { id: "forgotPass" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white">
      <h2 className="text-3xl font-semibold text-[#C5D86D] mb-6">
        Forgot Password
      </h2>

      <p className="text-gray-400 text-center mb-8 max-w-md">
        Enter your registered email below. We’ll send you a 6-digit OTP to reset
        your password.
      </p>

      <Formik
        initialValues={forgetPasswordInitialValues}
        validationSchema={forgetPasswordValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5 w-full max-w-md">
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#F5F5F5] text-black font-semibold rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              {isSubmitting ? <SpinnerMini /> : "Send OTP"}
            </button>
          </Form>
        )}
      </Formik>

      {/* --- ADDED BACK BUTTON --- */}
      <button
        type="button"
        onClick={() => navigate(-1)} // Goes back one page in history
        className="mt-6 text-gray-400 hover:text-white transition-colors"
      >
        &larr; Back to Login
      </button>
    </div>
  );
}
