import axiosRequest from "../utils/axios";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export const login = async (data: LoginPayload) => {
  if (data.username !== "Ismoil" || data.password !== "Ismoil.95") {
    throw new Error("Вы не админ");
  }

  const response = await axiosRequest.post<LoginResponse>(
    "/api/users/token/",
    data,
  );

  return response.data;
};
