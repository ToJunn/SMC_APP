import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS, FontSize, Spacing } from "../ui/theme";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/Junn.png")} style={styles.avatar} />
      <Text style={styles.name}>Junn</Text>
      <Text style={styles.info}>Food Lover 🍜 | AI Student</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.background },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: Spacing.medium },
  name: { fontSize: FontSize.large, fontWeight: "bold", color: COLORS.darkGray },
  info: { color: COLORS.mediumGray },
});
