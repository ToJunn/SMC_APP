// api/recipes.ts
import { api } from "./client";

export async function suggest(ingredients: string[]) {
  try {
    const res = await api.post("/api/recipes/suggest/", { ingredients });
    const data = res.data;

    // Chuẩn hóa: chấp nhận {recipe}, {result}, hoặc trả thẳng object
    const recipe = data?.recipe ?? data?.result ?? data;

    // Tối thiểu phải có title/steps
    if (!recipe || (!recipe.title && !recipe.steps)) {
      throw new Error("Dữ liệu trả về không đúng format");
    }

    return { latency_ms: data?.latency_ms ?? null, recipe };
  } catch (err: any) {
    const detail =
      err?.response?.data?.detail ||
      err?.response?.data?.error ||
      err?.message ||
      "Không thể gọi API gợi ý món ăn";
    throw new Error(detail);
  }
}
