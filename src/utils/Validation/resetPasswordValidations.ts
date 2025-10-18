import * as Yup from "yup";

export const resetPasswordInitialValues = {
  email: "",
  otp: "",
  password: "",
  confirmPassword: "",
};

export const resetPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  otp: Yup.string()
    .length(6, "OTP must be exactly 6 digits")
    .required("OTP is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
