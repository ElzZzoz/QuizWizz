import { Formik, Form } from "formik";

import { toast } from "react-hot-toast";
import InputField from "@/components/Auth/InputFields";
import { changePassword } from "@/services/Auth/authService";
import { SpinnerMini } from "@/components";
import { validationSchema } from "@/utils/Validation/change-passwordValidations";

export default function ChangePass() {
  // Initial Values
  const initialValues = {
    password: "",
    password_new: "",
    confirmPassword: "",
  };

  // Handle Submit
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      toast.loading("Updating password...", { id: "changePass" });
      const data = await changePassword(values.password, values.password_new);

      toast.success(data?.message || "Password updated successfully!", {
        id: "changePass",
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update password. Please try again.",
        { id: "changePass" }
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white">
      <h2 className="text-3xl font-semibold text-[#C5D86D] mb-6">
        Change Password
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5 w-full max-w-md">
            <InputField
              label="Current Password"
              name="password"
              type="password"
              placeholder="Enter your current password"
            />

            <InputField
              label="New Password"
              name="password_new"
              type="password"
              placeholder="Enter your new password"
            />

            <InputField
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#F5F5F5] text-black font-semibold rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              {isSubmitting ? <SpinnerMini /> : "Update Password"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
