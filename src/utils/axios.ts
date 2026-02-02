import axios from "axios";

const axiosRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const newAccess = await refreshFun();
      if (newAccess) {
        error.config.headers.Authorization = `Bearer ${newAccess}`;
        return axiosRequest(error.config);
      }
    }
    return Promise.reject(error);
  },
);

const refreshFun = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/token/refresh/`,
      { refresh },
    );
    localStorage.setItem("access", data.access);
    return data.access;
  } catch (error) {
    console.error("Refresh token error");
    return null;
  }
};

export default axiosRequest;
