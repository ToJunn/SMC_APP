import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: Platform.select({
    android: "http://10.0.2.2:8000",
    ios: "http://127.0.0.1:8000",
    default: "http://192.168.x.x:8000",
  }),
  timeout: 15000,
});

export async function initToken() {
  const token = await AsyncStorage.getItem("access_token");
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
  return token;
}

export async function login(username: string, password: string) {
  const res = await api.post("/api/accounts/token/", { username, password });
  const { access, refresh } = res.data;
  await AsyncStorage.setItem("access_token", access);
  await AsyncStorage.setItem("refresh_token", refresh);
  api.defaults.headers.common.Authorization = `Bearer ${access}`;
  return res.data;
}

export async function clearTokens() {
  await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
  delete api.defaults.headers.common.Authorization;
}

export default api;