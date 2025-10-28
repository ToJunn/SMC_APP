import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { createCheckout, PayMethod, PlanId } from "../api/payments";
import { COLORS, Spacing, Radius } from "../ui/theme";
import { RootStackParamList } from "../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Premium">;

type Plan = { id: PlanId; title: string; price: string; note: string; best?: boolean };

const PLANS: Plan[] = [
  { id: "monthly", title: "Gói tháng", price: "49.000đ", note: "Gia hạn mỗi tháng" },
  { id: "yearly", title: "Gói năm", price: "399.000đ", note: "Tiết kiệm 32%", best: true },
];

const METHODS: Array<{ id: PayMethod; label: string; icon: string }> = [
  { id: "vnpay", label: "VNPay", icon: "card-outline" },
  { id: "momo", label: "MoMo", icon: "cash-outline" },
  { id: "stripe", label: "Thẻ quốc tế (Stripe)", icon: "help-circle-outline" },
];

export default function PremiumScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [selectedPlan, setSelectedPlan] = useState<PlanId>("yearly");
  const [method, setMethod] = useState<PayMethod>("vnpay");
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);

  const [webUrl, setWebUrl] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const successUrls = useMemo(
    () => [
      "smartchef://pay/success",
      "https://smc.example.com/pay/success",
      "http://127.0.0.1:8000/pay/success",
    ],
    []
  );
  const cancelUrls = useMemo(
    () => [
      "smartchef://pay/cancel",
      "https://smc.example.com/pay/cancel",
      "http://127.0.0.1:8000/pay/cancel",
    ],
    []
  );

  async function onPay() {
    try {
      setLoading(true);
      const res = await createCheckout({
        plan: selectedPlan,
        method,
        coupon: coupon || undefined,
      });
      setOrderId(res.order_id);
      setWebUrl(res.payment_url);
    } catch (e: any) {
      console.error(e?.response?.data || e);
      Alert.alert("Không tạo được thanh toán", e?.response?.data?.detail || "Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  function onNavChange(navState: any) {
    const url = navState?.url as string;
    if (!url) return;
    if (successUrls.some((u) => url.startsWith(u))) {
      setWebUrl(null);
      Alert.alert("✅ Thanh toán thành công", `Mã đơn: ${orderId ?? "-"}`);
    }
    if (cancelUrls.some((u) => url.startsWith(u))) {
      setWebUrl(null);
      Alert.alert("Giao dịch đã hủy", "Bạn có thể thử lại khi sẵn sàng.");
    }
  }

  const priceText = PLANS.find((p) => p.id === selectedPlan)?.price ?? "";

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Nâng cấp Premium</Text>
        <View style={{ width: 34 }} />
      </View>

      <Text style={styles.subtitle}>
        Mở khóa gợi ý món ăn nâng cao, không quảng cáo và tốc độ phản hồi nhanh hơn.
      </Text>

      {/* Plans */}
      <View style={[styles.section, { marginBottom: 18 }]}>
        <Text style={styles.sectionTitle}>Chọn gói</Text>

        <View style={styles.planRow}>
          {PLANS.map((p) => {
            const active = selectedPlan === p.id;
            return (
              <TouchableOpacity
                key={p.id}
                activeOpacity={0.9}
                onPress={() => setSelectedPlan(p.id)}
                style={[styles.planCard, active && styles.planCardActive]}
              >
                {p.best && <Text style={styles.badge}>Best Choice</Text>}
                <Text style={[styles.planTitle, active && styles.planTitleActive]}>{p.title}</Text>
                <Text style={[styles.planPrice, active && styles.planPriceActive]}>{p.price}</Text>
                <Text style={[styles.planNote, active && styles.planNoteActive]}>{p.note}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
        <View style={{ rowGap: 10 }}>
          {METHODS.map((m) => {
            const active = method === m.id;
            return (
              <TouchableOpacity
                key={m.id}
                style={[styles.methodItem, active && styles.methodItemActive]}
                onPress={() => setMethod(m.id)}
                activeOpacity={0.85}
              >
                <Ionicons
                  name={m.icon}
                  size={18}
                  color={active ? COLORS.primary : "#666"}
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={[styles.methodText, { color: active ? COLORS.primary : "#222" }]}
                >
                  {m.label}
                </Text>
                {active && <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Coupon */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mã giảm giá (nếu có)</Text>
        <View style={styles.couponRow}>
          <TextInput
            placeholder="Nhập mã coupon"
            placeholderTextColor="#9aa0a6"
            value={coupon}
            onChangeText={setCoupon}
            style={styles.input}
          />
          <TouchableOpacity style={styles.couponBtn} onPress={() => Alert.alert("Áp dụng", coupon || "Không có mã.")}>
            <Text style={styles.couponTxt}>Áp dụng</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Pay */}
      <TouchableOpacity style={styles.payBtn} onPress={onPay} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.payTxt}>Thanh toán {priceText}</Text>}
      </TouchableOpacity>

      {/* WebView */}
      <Modal visible={!!webUrl} animationType="slide" onRequestClose={() => setWebUrl(null)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={styles.webHeader}>
            <TouchableOpacity onPress={() => setWebUrl(null)} style={{ padding: 8 }}>
              <Ionicons name="close" size={22} />
            </TouchableOpacity>
            <Text style={styles.webTitle}>Thanh toán</Text>
            <View style={{ width: 22 }} />
          </View>
          {webUrl ? (
            <WebView
              source={{ uri: webUrl }}
              onNavigationStateChange={onNavChange}
              startInLoadingState
            />
          ) : null}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  backBtn: {
    width: 34, height: 34, borderRadius: 12,
    alignItems: "center", justifyContent: "center",
    backgroundColor: "#f2f2f2",
    ...(Platform.OS === "android" ? { elevation: 1 } : {}),
  },
  title: { fontSize: 20, fontWeight: "800" },
  subtitle: { fontSize: 14, color: "#555", marginTop: 8, marginBottom: 14, lineHeight: 20 },

  section: { marginTop: 10 },
  sectionTitle: { fontSize: 15, fontWeight: "700", marginBottom: 8 },

  // Plans
  planRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 12,
  },
  planCard: {
    flex: 1,
    height: 122,                // cố định để tránh chồng chéo
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e9e9e9",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    position: "relative",
    ...(Platform.OS === "android" ? { elevation: 2 } : { shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } }),
  },
  planCardActive: {
    borderColor: "#FFB300",
    backgroundColor: "#FFF3CD", // vàng nhạt
  },
  badge: {
    position: "absolute",
    top: 8,
    backgroundColor: "#FFB300",
    color: "#000",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: "800",
  } as any,
  planTitle: { fontSize: 14, fontWeight: "600", color: "#444" },
  planTitleActive: { color: "#000" },
  planPrice: { fontSize: 20, fontWeight: "800", color: "#111", marginTop: 6 },
  planPriceActive: { color: "#000" },
  planNote: { fontSize: 12, color: "#777", marginTop: 2 },
  planNoteActive: { color: "#222" },

  // Methods
  methodItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fafafa",
  },
  methodItemActive: {
    borderColor: COLORS.primary,
    backgroundColor: "#f0f8ff",
  },
  methodText: { flex: 1, fontSize: 14 },

  // Coupon
  couponRow: { flexDirection: "row", columnGap: 8 },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 12,
  },
  couponBtn: {
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#FFD700",
    alignItems: "center",
    justifyContent: "center",
  },
  couponTxt: { fontWeight: "800", color: "#000" },

  // Pay
  payBtn: {
    marginTop: 18,
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  payTxt: { color: "#fff", fontWeight: "800", fontSize: 16 },

  // WebView header
  webHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    height: 48,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  webTitle: { fontSize: 16, fontWeight: "700" },
});
