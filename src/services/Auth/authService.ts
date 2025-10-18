import api from "@/utils/api/AxiosInstance";

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const registerUser = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  role: string
) => {
  const response = await api.post("/auth/register", {
    first_name,
    last_name,
    email,
    password,
    role,
  });

  return response.data;
};

export const changePassword = async (
  password: string,
  password_new: string
) => {
  const response = await api.post("/change-password", {
    password,
    password_new,
  });
  return response.data;
};

export const resetPassword = async (
  email: string,
  otp: string,
  password: string
) => {
  const response = await api.post("/auth/reset-password", {
    email,
    otp,
    password,
  });
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });
  return response.data;
};
