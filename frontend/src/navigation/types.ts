import { NavigatorScreenParams } from '@react-navigation/native';
import type { Recipe } from '../types/recipe';

// Auth stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

// Tabs
export type AppTabParamList = {
  Home: undefined;
  Post: undefined;
  Profile: undefined;
  Settings: undefined;
};

// Root stack (bọc Tabs + các màn chi tiết)
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<AppTabParamList>;
  DishDetails: { recipe: Recipe };
  Scan: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
