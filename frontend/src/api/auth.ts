// api/auth.ts - CLEANED UP VERSION
import { api } from "./client";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Lưu token và cập nhật header Authorization
 */
async function setAuthTokens(access?: string, refresh?: string) {
  try {
    if (access) {
      await AsyncStorage.setItem("access_token", access);
      api.defaults.headers.common.Authorization = `Bearer ${access}`;
    } else {
      await AsyncStorage.removeItem("access_token");
      delete api.defaults.headers.common.Authorization;
    }

    if (refresh) {
      await AsyncStorage.setItem("refresh_token", refresh);
    } else {
      await AsyncStorage.removeItem("refresh_token");
    }
  } catch (error) {
    console.error("[Auth] Error setting tokens:", error);
    throw error;
  }
}

/**
 * Đăng nhập
 */
export async function login(username: string, password: string) {
  try {
    const endpoint = "/api/accounts/login/";
    const res = await api.post(endpoint, { username, password });

    const access = res.data?.access ?? res.data?.access_token;
    const refresh = res.data?.refresh ?? res.data?.refresh_token;

    if (!access) {
      throw new Error("Không nhận được access token");
    }

    await setAuthTokens(access, refresh);
    console.log("[Auth] Login successful");
    return res.data;
  } catch (error: any) {
    console.error("[Auth] Login failed:", error);
    throw new Error(
      error.response?.data?.detail || 
      error.response?.data?.error || 
      "Đăng nhập thất bại"
    );
  }
}

/**
 * Đăng ký
 */
export async function register(
  username: string,
  email: string,
  password: string
) {
  try {
    const endpoint = "/api/accounts/register/";
    const res = await api.post(endpoint, { username, email, password });

    const access = res.data?.access ?? res.data?.access_token;
    const refresh = res.data?.refresh ?? res.data?.refresh_token;

    // Backend có thể trả token hoặc không
    if (access) {
      await setAuthTokens(access, refresh);
    }

    console.log("[Auth] Registration successful");
    return res.data;
  } catch (error: any) {
    console.error("[Auth] Registration failed:", error);
    
    // Parse error messages từ backend
    const errorData = error.response?.data;
    let message = "Đăng ký thất bại";
    
    if (errorData) {
      if (errorData.username) {
        message = Array.isArray(errorData.username) 
          ? errorData.username[0] 
          : "Username đã tồn tại";
      } else if (errorData.email) {
        message = Array.isArray(errorData.email)
          ? errorData.email[0]
          : "Email đã được sử dụng";
      } else if (errorData.detail) {
        message = errorData.detail;
      }
    }
    
    throw new Error(message);
  }
}

/**
 * Khởi tạo token từ storage khi app start
 */
export async function initToken() {
  try {
    const token = await AsyncStorage.getItem("access_token");
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      console.log("[Auth] Token initialized");
      return true;
    }
    console.log("[Auth] No token found");
    return false;
  } catch (error) {
    console.error("[Auth] Error initializing token:", error);
    return false;
  }
}

/**
 * Đăng xuất
 */
export async function logout() {
  try {
    await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
    delete api.defaults.headers.common.Authorization;
    console.log("[Auth] Logout successful");
  } catch (error) {
    console.error("[Auth] Logout error:", error);
    throw error;
  }
}

/**
 * Refresh access token
 */
export async function refreshAccessToken() {
  try {
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const res = await api.post("/api/accounts/token/refresh/", {
      refresh: refreshToken,
    });

    const newAccess = res.data?.access;
    if (newAccess) {
      await AsyncStorage.setItem("access_token", newAccess);
      api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
      return newAccess;
    }

    throw new Error("No access token in refresh response");
  } catch (error) {
    console.error("[Auth] Token refresh failed:", error);
    // Token hết hạn hoàn toàn -> logout
    await logout();
    throw error;
  }
}