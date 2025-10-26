import { api } from "./client";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Lưu trữ token nhận được và thiết lập header xác thực mặc định.
 * @param access Access Token (có thể null/undefined)
 * @param refresh Refresh Token (có thể null/undefined)
 */
async function setAuthTokens(access?: string, refresh?: string) {
  // Nếu không có access → xóa luôn token cũ
  if (access) await AsyncStorage.setItem("access_token", access);
  else await AsyncStorage.removeItem("access_token");

  if (refresh) await AsyncStorage.setItem("refresh_token", refresh);
  else await AsyncStorage.removeItem("refresh_token");

  // Nếu có access → gắn vào header mặc định
  if (access)
    api.defaults.headers.common.Authorization = `Bearer ${access}`;
  else
    delete api.defaults.headers.common.Authorization;
}

/**
 * Đăng nhập bằng username + password (đúng với SmartChef API)
 */
export async function login(username: string, password: string) {
  const endpoint = "/api/accounts/login/";

  // Gửi request POST (SmartChef backend nhận username/password)
  const res = await api.post(endpoint, { username, password });

  // Lấy access & refresh token từ response
  const access = res.data?.access ?? res.data?.access_token ?? null;
  const refresh = res.data?.refresh ?? res.data?.refresh_token ?? null;

  await setAuthTokens(access, refresh);
  return res.data;
}

/**
 * Đăng ký người dùng mới (và tự động lưu token nếu backend trả về)
 */
export async function register(
  username: string,
  email: string,
  password: string
) {
  const endpoint = "/api/accounts/register/";

  const res = await api.post(endpoint, { username, email, password });

  // Một số backend không trả token khi đăng ký → cần check
  const access = res.data?.access ?? res.data?.access_token ?? null;
  const refresh = res.data?.refresh ?? res.data?.refresh_token ?? null;

  await setAuthTokens(access, refresh);
  return res.data;
}

/**
 * Khởi tạo token từ bộ nhớ (khi mở lại app)
 */
export async function initToken() {
  const token = await AsyncStorage.getItem("access_token");
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return true;
  }
  return false;
}

/**
 * Đăng xuất người dùng: xoá token + header
 */
export async function logout() {
  await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
  delete api.defaults.headers.common.Authorization;
}
