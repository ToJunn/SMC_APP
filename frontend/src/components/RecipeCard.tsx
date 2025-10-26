// src/components/RecipeCard.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Share } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, Spacing, Radius, FontSize } from "../ui/theme";
import { Recipe } from "../types/recipe";

export default function RecipeCard({
  data,
  onSave,
}: {
  data: Recipe;
  onSave?: (r: Recipe) => void;
}) {
  const shareRecipe = async () => {
    const body =
      `🍽️ ${data.title}\n\n` +
      `Nguyên liệu:\n- ${data.ingredients.join("\n- ")}\n\n` +
      `Cách nấu:\n${data.steps.map((s: string, i: number) => `${i + 1}. ${s}`).join("\n")}`;
    await Share.share({ message: body });
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity onPress={shareRecipe} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="share-social-outline" size={20} color={COLORS.darkGray} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSave?.(data)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="bookmark-outline" size={20} color={COLORS.darkGray} />
          </TouchableOpacity>
        </View>
      </View>

      {data.nutrition && (
        <View style={styles.badges}>
          {typeof data.nutrition.calories === "number" && (
            <Badge label={`${data.nutrition.calories} kcal`} />
          )}
          {typeof data.nutrition.protein_g === "number" && (
            <Badge label={`${data.nutrition.protein_g}g protein`} />
          )}
          {typeof data.nutrition.fat_g === "number" && (
            <Badge label={`${data.nutrition.fat_g}g fat`} />
          )}
          {typeof data.nutrition.carb_g === "number" && (
            <Badge label={`${data.nutrition.carb_g}g carb`} />
          )}
        </View>
      )}

      <Text style={styles.section}>Nguyên liệu</Text>
      <View style={{ marginTop: 6 }}>
        {data.ingredients.map((ing: string, idx: number) => (
          <Text key={idx} style={styles.bullet}>• {ing}</Text>
        ))}
      </View>

      <Text style={styles.section}>Cách nấu</Text>
      <View style={{ marginTop: 6 }}>
        {data.steps.map((s: string, idx: number) => (
          <Text key={idx} style={styles.step}>{idx + 1}. {s}</Text>
        ))}
      </View>

      {data.created_at && (
        <Text style={styles.time}>
          Tạo lúc: {new Date(data.created_at).toLocaleString()}
        </Text>
      )}
    </View>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 18,
    backgroundColor: COLORS.white,
    padding: Spacing.large,
    borderRadius: Radius.large,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  title: {
    fontWeight: "800",
    fontSize: FontSize.large,
    color: COLORS.darkGray,
    flex: 1,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
    marginBottom: 6,
  },
  badge: {
    backgroundColor: "#f1f5f9",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: { color: COLORS.darkGray, fontSize: 12, fontWeight: "600" },
  section: {
    marginTop: 14,
    fontWeight: "700",
    color: COLORS.darkGray,
  },
  bullet: { color: COLORS.darkGray, marginTop: 4 },
  step: { color: COLORS.darkGray, marginTop: 6, lineHeight: 20 },
  time: { marginTop: 14, color: COLORS.mediumGray, fontSize: 12 },
});
