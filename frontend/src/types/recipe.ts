// src/types/recipe.ts
export type Recipe = {
  id: number;
  title: string;
  ingredients: string[];
  steps: string[];
  nutrition?: {
    calories?: number;
    protein_g?: number;
    fat_g?: number;
    carb_g?: number;
  };
  created_at?: string;
};
