import { api } from "./client"; // axios instance đã cấu hình baseURL + token

export type PayMethod = "vnpay" | "momo" | "stripe";
export type PlanId = "monthly" | "yearly" | "lifetime";

export async function createCheckout(payload: {
  plan: PlanId;
  method: PayMethod;
  coupon?: string;
}) {
  // Backend trả về: { order_id, payment_url, expire_at }
  const { data } = await api.post("/api/payments/checkout/", payload);
  return data as { order_id: string; payment_url: string; expire_at?: string };
}
