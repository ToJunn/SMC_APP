import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { COLORS, Spacing, Radius, FontSize } from "../ui/theme";

export default function AuthLanding({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to SmartChef 🍳</Text>
      <Text style={styles.subtitle}>
        Ứng dụng gợi ý món ăn từ nguyên liệu bạn có.
      </Text>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: COLORS.primary }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: COLORS.lightGray }]}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={[styles.btnText, { color: COLORS.darkGray }]}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
    padding: Spacing.large,
  },
  image: { width: 180, height: 180, marginBottom: 20 },
  title: {
    fontSize: FontSize.heading,
    fontWeight: "bold",
    color: COLORS.darkGray,
  },
  subtitle: {
    textAlign: "center",
    marginVertical: 8,
    color: COLORS.mediumGray,
  },
  btn: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: Radius.large,
    marginTop: 14,
    alignItems: "center",
  },
  btnText: { color: COLORS.white, fontSize: FontSize.large, fontWeight: "600" },
});
