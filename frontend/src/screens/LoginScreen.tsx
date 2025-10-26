import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS, FontSize, Radius, Spacing } from "../ui/theme";
import { login as apiLogin, initToken } from "../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!username || !pw) return Alert.alert("Vui lòng nhập đủ thông tin");
    setLoading(true);
    try {
      // apiLogin sẽ tự động lưu token vào AsyncStorage
      await apiLogin(username, pw);
      // Reload auth state để App.tsx cập nhật
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        throw new Error("Lỗi xác thực");
      }
      // Sau khi đăng nhập thành công, App.tsx sẽ tự chuyển sang Home
    } catch (error: any) {
      Alert.alert(
        "Đăng nhập thất bại", 
        error.response?.data?.detail || error.message || "Đã có lỗi xảy ra"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>
      {/* Input Username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={pw}
        onChangeText={setPw}
      />

      <TouchableOpacity style={styles.btn} onPress={onLogin} disabled={loading}>
        {loading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.btnText}>Login</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>Don’t have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: Spacing.large,
    justifyContent: "center",
  },
  title: {
    fontSize: FontSize.heading,
    fontWeight: "bold",
    color: COLORS.darkGray,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.mediumGray,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    borderRadius: Radius.medium,
    padding: 12,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: Radius.large,
    paddingVertical: 12,
    marginTop: 10,
  },
  btnText: { color: COLORS.white, textAlign: "center", fontWeight: "600" },
  linkText: {
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 10,
  },
});
