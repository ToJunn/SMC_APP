import { api } from "./client";

export async function suggest(ingredients: string[]) {
  // KHÔNG có dấu '/' cuối:
  const res = await api.post("/api/recipes/suggest/", { ingredients });
  return res.data; // { latency_ms, recipe: {...} }
}
