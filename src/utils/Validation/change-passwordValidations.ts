import * as Yup from "yup";

export const validationSchema = Yup.object({
  password: Yup.string().required("Current password is required"),
  password_new: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password_new")], "Passwords must match")
    .required("Please confirm your new password"),
});
