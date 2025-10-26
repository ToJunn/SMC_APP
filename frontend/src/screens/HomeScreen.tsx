import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { COLORS, Spacing, Radius, FontSize } from "../ui/theme";
import { suggest } from "../api/recipes";

export default function HomeScreen() {
  const [input, setInput] = useState("");
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchRecipe = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      console.log("Calling API with ingredients:", input.split(","));
      const res = await suggest(input.split(","));
      console.log("API Response:", res);
      setRecipe(res.recipe);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>SmartChef</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập nguyên liệu (vd: trứng, thịt bò)"
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity style={styles.btn} onPress={fetchRecipe}>
        <Text style={styles.btnText}>Gợi ý món ăn</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator color={COLORS.primary} style={{ marginTop: 20 }} />}

      {recipe && (
        <View style={styles.card}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.section}>Nguyên liệu:</Text>
          {recipe.ingredients.map((i: string, idx: number) => (
            <Text key={idx}>• {i}</Text>
          ))}
          <Text style={styles.section}>Cách nấu:</Text>
          {recipe.steps.map((s: string, idx: number) => (
            <Text key={idx}>{idx + 1}. {s}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: Spacing.large },
  header: { fontSize: FontSize.heading, fontWeight: "bold", marginBottom: 12, color: COLORS.darkGray },
  input: { borderWidth: 1, borderColor: COLORS.mediumGray, borderRadius: Radius.medium, padding: 12, marginBottom: 12 },
  btn: { backgroundColor: COLORS.primary, paddingVertical: 12, borderRadius: Radius.large },
  btnText: { color: COLORS.white, textAlign: "center", fontWeight: "600" },
  card: { marginTop: 20, backgroundColor: COLORS.lightGray, padding: Spacing.medium, borderRadius: Radius.large },
  title: { fontWeight: "700", fontSize: FontSize.large },
  section: { marginTop: 8, fontWeight: "600" },
});
