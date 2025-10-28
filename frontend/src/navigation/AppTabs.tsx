import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { AppTabParamList } from './types';
import { COLORS } from '../ui/theme';

import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#e6e6e6',
        // Để tránh bị che, trước mắt KHÔNG absolute
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          height: 115,
          paddingTop: 15,
          paddingBottom: 15,
          borderTopWidth: 0,
        },
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, focused }) => {
          const map: Record<keyof AppTabParamList, [string, string]> = {
            Home: ['home-outline', 'home'],
            Favorites: ['heart-outline', 'heart'],
            Post: ['add-circle-outline', 'add-circle'],
            Profile: ['person-outline', 'person'],
            Settings: ['settings-outline', 'settings'],
          };
          const [off, on] = map[route.name as keyof AppTabParamList] ?? ['ellipse-outline', 'ellipse'];
          return <Ionicons name={focused ? on : off} size={30} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '' }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: '' }} />
      <Tab.Screen name="Post" component={PostScreen} options={{ title: '' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: '' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: '' }} />
    </Tab.Navigator>
  );
}
