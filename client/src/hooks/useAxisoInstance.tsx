import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { baseURL } from "@/utils/baseURL";

export const axiosInstance = axios.create({
  baseURL,
});

// Add token to every request by interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Include the token in the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for logging out user if token expires
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 403 &&
      error.response?.data?.message === "Invalid or expired token."
    ) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Using window.location since we're outside React context
    }
    return Promise.reject(error);
  }
);

export default function useTanstackQuery(endpoint: string) {
  const query = useQuery({
    queryKey: [endpoint],

    queryFn: async () => {
      const res = await axiosInstance.get(`${endpoint}`);

      return res.data;
    },
  });

  return query;
}
