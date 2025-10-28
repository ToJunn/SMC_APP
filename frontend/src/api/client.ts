// api/client.ts - SIMPLIFIED (remove duplicates)
import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tạo axios instance
export const api = axios.create({
  baseURL: Platform.select({
    android: "http://10.0.2.2:8000",
    ios: "http://127.0.0.1:8000",
    default: "http://localhost:8000", // Fallback
  }),
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Response interceptor để handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = await AsyncStorage.getItem("refresh_token");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const res = await axios.post(
          `${api.defaults.baseURL}/api/accounts/token/refresh/`,
          { refresh: refreshToken }
        );

        const newAccess = res.data?.access;
        if (newAccess) {
          await AsyncStorage.setItem("access_token", newAccess);
          api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          
          // Retry original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed -> clear tokens
        await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
        delete api.defaults.headers.common.Authorization;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ✅ Helper function để clear tokens (dùng cho logout)
export async function clearTokens() {
  try {
    await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
    delete api.defaults.headers.common.Authorization;
    console.log("[Client] Tokens cleared");
  } catch (error) {
    console.error("[Client] Error clearing tokens:", error);
    throw error;
  }
}

export default api;