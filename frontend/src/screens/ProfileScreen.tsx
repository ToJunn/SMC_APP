import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, FontSize, Spacing } from "../ui/theme";

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<"grid" | "bookmark">("grid");

  return (
    <View style={styles.container}>
      {/* Avatar + Info */}
      <Image
        source={require("../../assets/images/Junn.png")}
        style={styles.avatar}
      />
      <Text style={styles.name}>Junn</Text>
      <Text style={styles.info}>Food Lover | AI Student</Text>

      {/* Icon Tabs */}
      <View style={styles.iconRow}>
        <TouchableOpacity
          onPress={() => setActiveTab("grid")}
          activeOpacity={0.7}
          style={styles.iconWrap}
        >
          <Ionicons
            name="grid-outline"
            size={26}
            color={activeTab === "grid" ? COLORS.primary : COLORS.mediumGray}
          />
          <Text
            style={[
              styles.iconLabel,
              { color: activeTab === "grid" ? COLORS.primary : COLORS.mediumGray },
            ]}
          >
            Bài đăng
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("bookmark")}
          activeOpacity={0.7}
          style={styles.iconWrap}
        >
          <Ionicons
            name="bookmark-outline"
            size={26}
            color={activeTab === "bookmark" ? COLORS.primary : COLORS.mediumGray}
          />
          <Text
            style={[
              styles.iconLabel,
              { color: activeTab === "bookmark" ? COLORS.primary : COLORS.mediumGray },
            ]}
          >
            Đã lưu
          </Text>
        </TouchableOpacity>
      </View>

      {/* Placeholder Content */}
      <View style={styles.content}>
        {activeTab === "grid" ? (
          <Text style={styles.placeholder}>Các món ăn đã đăng sẽ hiển thị ở đây</Text>
        ) : (
          <Text style={styles.placeholder}>Món ăn bạn đã lưu sẽ hiển thị ở đây</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingTop: 60,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: Spacing.medium,
  },
  name: {
    fontSize: FontSize.large + 2,
    fontWeight: "700",
    color: COLORS.darkGray,
  },
  info: {
    color: COLORS.mediumGray,
    marginBottom: 24,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginBottom: 20,
  },
  iconWrap: {
    alignItems: "center",
  },
  iconLabel: {
    fontSize: 13,
    marginTop: 4,
  },
  content: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    color: COLORS.text,
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
