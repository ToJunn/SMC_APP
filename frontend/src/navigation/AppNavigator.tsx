import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

import AppTabs from './AppTabs';
import DishDetailsScreen from '../screens/DishDetailsScreen';
import ScanScreen from '../screens/ScanScreen';
import PremiumScreen from "../screens/PremiumScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={AppTabs} />
      <Stack.Screen name="DishDetails" component={DishDetailsScreen} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="Premium" component={PremiumScreen} options={{ title: "Mua Premium", headerShown: false }} />
    </Stack.Navigator>
  );
}
