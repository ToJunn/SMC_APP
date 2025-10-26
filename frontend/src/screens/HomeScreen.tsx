import React, { useMemo, useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  ActivityIndicator, StyleSheet
} from "react-native";
import { COLORS, Spacing, Radius, FontSize } from "../ui/theme";
import { suggest } from "../api/recipes";
import RecipeCard from "../components/RecipeCard";

type Recipe = { title: string; ingredients: string[]; steps: string[]; };

const splitIngredients = (s: string) =>
  Array.from(
    new Set(
      s.split(/[,\n]/g)
        .map(x => x.trim())
        .filter(Boolean)
    )
  );

export default function HomeScreen() {
  const [text, setText] = useState("");
  const ingredients = useMemo(() => splitIngredients(text), [text]);

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const fetchRecipe = async () => {
    const ings = ingredients;
    if (ings.length === 0) return;
    setLoading(true);
    setErrMsg(null);
    setRecipe(null);
    try {
      const res = await suggest(ings);
      setRecipe(res.recipe);
    } catch (error: any) {
      setErrMsg(error?.message || "Không thể gợi ý món ăn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 140, flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >

    <Text style={styles.header}>SmartChef</Text>

      {/* Ô nhập duy nhất (không còn nút Thêm) */}
      <TextInput
        style={styles.input}
        placeholder="Nhập nguyên liệu… (vd: trứng, thịt bò)"
        placeholderTextColor="#9aa0a6"
        value={text}
        onChangeText={(v) => { setText(v); if (errMsg) setErrMsg(null); }}
        multiline

        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        importantForAutofill="no"
        textContentType="none"
        returnKeyType="done"
      />

      {/* Chips xem trước (tách tự động) */}
      {ingredients.length > 0 && (
        <View style={styles.chipsWrap}>
          {ingredients.map((it) => (
            <View key={it} style={styles.chip}>
              <Text style={styles.chipText}>{it}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Nút gợi ý */}
      <TouchableOpacity
        style={[
          styles.btn,
          (ingredients.length === 0 || loading) && { opacity: 0.6 },
        ]}
        onPress={fetchRecipe}
        disabled={ingredients.length === 0 || loading}
        activeOpacity={0.9}
      >
        <Text style={styles.btnText}>{loading ? "Đang gợi ý…" : "Gợi ý món ăn"}</Text>
      </TouchableOpacity>

      {/* Loading */}
      {loading && (
        <View style={styles.loadingCard}>
          <ActivityIndicator color={COLORS.primary} />
          <Text style={styles.loadingText}>Đang suy nghĩ công thức ngon nhất…</Text>
        </View>
      )}

      {/* Error */}
      {errMsg && (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>Ôi! Có lỗi rồi</Text>
          <Text style={styles.errorMsg}>{errMsg}</Text>
        </View>
      )}

      {/* Kết quả */}
      {recipe && !loading && (
        <RecipeCard
          data={recipe}
          onSave={(r) => console.log("Saved recipe:", r.title)}
        />
      )}

      {/* Trạng thái rỗng */}
      {!recipe && !loading && !errMsg && ingredients.length === 0 && (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyEmoji}>🍳</Text>
          <Text style={styles.emptyTitle}>Bạn đang có nguyên liệu gì?</Text>
          <Text style={styles.emptyDesc}>
            Nhập như: <Text style={{ fontWeight: "700" }}>trứng, thịt bò, rau</Text><Text> hoặc xuống dòng từng nguyên liệu.</Text>
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: Spacing.large },
  header: { fontSize: FontSize.heading, fontWeight: "800", marginBottom: 14, color: COLORS.darkGray },
  input: {
    minHeight: 48,
    backgroundColor: "#f7f7f8",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: COLORS.darkGray,
  },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  chip: {
    backgroundColor: COLORS.white,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e6e6e6",
  },
  chipText: { color: COLORS.darkGray },
  btn: { backgroundColor: COLORS.primary, paddingVertical: 12, borderRadius: Radius.large, alignItems: "center", marginTop: 14 },
  btnText: { color: COLORS.white, fontWeight: "700" },
  loadingCard: { marginTop: 18, backgroundColor: COLORS.white, borderRadius: Radius.large, padding: Spacing.medium, alignItems: "center", gap: 8 },
  loadingText: { color: COLORS.mediumGray },
  errorCard: { marginTop: 18, backgroundColor: "#fff0f0", borderRadius: Radius.large, padding: Spacing.medium, borderWidth: 1, borderColor: "#ffd6d6" },
  errorTitle: { color: "#b42318", fontWeight: "700", marginBottom: 4 },
  errorMsg: { color: "#b42318" },
  emptyWrap: { marginTop: 30, padding: Spacing.large, alignItems: "center" },
  emptyEmoji: { fontSize: 36, marginBottom: 6 },
  emptyTitle: { fontWeight: "700", color: COLORS.darkGray, fontSize: 16, marginBottom: 6 },
  emptyDesc: { color: COLORS.mediumGray, textAlign: "center" },
});
