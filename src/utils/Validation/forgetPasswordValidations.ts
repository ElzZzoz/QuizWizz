import * as Yup from "yup";

export const forgetPasswordInitialValues = {
  email: "",
};

export const forgetPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
