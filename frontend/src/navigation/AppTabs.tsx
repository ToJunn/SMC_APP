import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../ui/theme';
import { AppTabParamList } from './types';
import { Animated } from 'react-native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';

// AppTabs.tsx (rút gọn phần Navigator)

const Tab = createBottomTabNavigator<AppTabParamList>();

function TabBarIcon({
  focused,
  color,
  name,
  value,
}: {
  focused: boolean;
  color: string;
  name: string;
  value: Animated.Value;
}) {
  React.useEffect(() => {
    Animated.spring(value, {
      toValue: focused ? 1 : 0,
      useNativeDriver: true,
      tension: 50,
      friction: 4,
    }).start();
  }, [focused, value]);

  const scale = value.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] });

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Ionicons name={name} size={30} color={color} />
    </Animated.View>
  );
}

export default function AppTabs() {
  const tabIconRefs = React.useMemo(
    () => ({
      Home: new Animated.Value(0),
      Post: new Animated.Value(0),
      Profile: new Animated.Value(0),
      Settings: new Animated.Value(0),
    }),
    []
  );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.mediumGray,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopWidth: 0,
          elevation: 5,
          height: 100,
          paddingBottom: 9,
          paddingTop: 15,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          position: 'absolute',
        },
        tabBarIcon: ({ focused, color }) => {
          const iconName =
            route.name === 'Home' ? (focused ? 'home' : 'home-outline') :
            route.name === 'Post' ? (focused ? 'add-circle' : 'add-circle-outline') :
            route.name === 'Profile' ? (focused ? 'person' : 'person-outline') :
            (focused ? 'settings' : 'settings-outline');

          return (
            <TabBarIcon
              focused={focused}
              color={color}
              name={iconName}
              value={tabIconRefs[route.name as keyof typeof tabIconRefs]}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '' }} />
      <Tab.Screen name="Post" component={PostScreen} options={{ title: '' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: '' }} />
      <Tab.Screen name="Settings" component={SettingScreen} options={{ title: '' }} />
    </Tab.Navigator>
  );
}

