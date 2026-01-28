import axios from "axios";
import { useAuthStore } from "../../stores/auth.store";

//Create instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, //10s timeout
  withCredentials: true,
});

//request Interceptor: attach token
apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken; // dung getState vi ts la tinh chi lay gia tri, kh phai tsx nen kh dc dung hook, dung hook no re render
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

//response Interceptor
apiClient.interceptors.response.use(
  //
  (response) => {
    return response.data;
  },

  //
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // tránh loop vô hạn
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // gọi refresh token
        const response = await axios.post(
          "/auth/refresh",
          {},
          { withCredentials: true },
        );

        const { accessToken } = response.data;

        // lưu token mới
        useAuthStore.getState().setTokens(accessToken, refreshToken);

        // gắn lại Authorization header
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // gọi lại request cũ
        return apiClient(originalRequest);
      } catch (err) {
        // refresh fail → logout
        useAuthStore.getState().clearTokens();
        window.location.href = "/login"; // redirect cung xoa toan bo state cua app
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
