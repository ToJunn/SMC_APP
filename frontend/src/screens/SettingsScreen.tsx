// src/screens/SettingsScreen.tsx — FIXED
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { COLORS, FontSize, Spacing, Radius, Shadow } from '../ui/theme';
import { logout } from '../api/auth';
import type { AppTabParamList, RootStackParamList } from '../navigation/types';

// Navigation type: Settings là TAB + có thể điều hướng sang Stack (DishDetails, Scan)
type NavProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, 'Settings'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function SettingsScreen() {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout(); // xoá token
            // Không reset điều hướng ở đây; App.tsx sẽ tự chuyển sang Auth khi token mất.
            // Nếu muốn phản hồi tức thì, có thể điều hướng tạm về Home:
            // navigation.navigate('MainTabs', { screen: 'Home' });
          } catch (error) {
            Alert.alert('Error', 'Unable to logout. Please try again.');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.background}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={styles.topBackground}
          resizeMode="cover"
        >
          <Text style={styles.headerTitle}>Settings</Text>
        </ImageBackground>

        <ScrollView
          style={styles.whiteSection}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>

            <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Coming soon!')}>
              <View style={styles.itemLeft}>
                <Icon name="person-outline" size={24} color={COLORS.accent} />
                <Text style={styles.itemText}>Edit Profile</Text>
              </View>
              <Icon name="chevron-right" size={24} color={COLORS.mediumGray} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Coming soon!')}>
              <View style={styles.itemLeft}>
                <Icon name="lock-outline" size={24} color={COLORS.accent} />
                <Text style={styles.itemText}>Change Password</Text>
              </View>
              <Icon name="chevron-right" size={24} color={COLORS.mediumGray} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 12, padding: 14, borderRadius: 12, backgroundColor: COLORS.primary }}
              onPress={() => navigation.navigate("Premium")}
            >
              <Text style={{ color: "#fff", fontWeight: "700", textAlign: "center" }}>Nâng cấp Premium</Text>
            </TouchableOpacity>
            
          </View>

          {/* Preferences Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <Icon name="notifications-outline" size={24} color={COLORS.accent} />
                <Text style={styles.itemText}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                thumbColor={notificationsEnabled ? COLORS.secondary : COLORS.lightGray}
                trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              />
            </View>

            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <Icon name="dark-mode" size={24} color={COLORS.accent} />
                <Text style={styles.itemText}>Dark Mode</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                thumbColor={darkMode ? COLORS.secondary : COLORS.lightGray}
                trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              />
            </View>

            <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Coming soon!')}>
              <View style={styles.itemLeft}>
                <Icon name="language" size={24} color={COLORS.accent} />
                <Text style={styles.itemText}>Language</Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.valueText}>English</Text>
                <Icon name="chevron-right" size={24} color={COLORS.mediumGray} />
              </View>
            </TouchableOpacity>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>

            <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Coming soon!')}>
              <View style={styles.itemLeft}>
                <Icon name="help-outline" size={24} color={COLORS.accent} />
                <Text style={styles.itemText}>Help & Support</Text>
              </View>
              <Icon name="chevron-right" size={24} color={COLORS.mediumGray} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Coming soon!')}>
              <View style={styles.itemLeft}>
                <Icon name="privacy-tip" size={24} color={COLORS.accent} />
                <Text style={styles.itemText}>Privacy Policy</Text>
              </View>
              <Icon name="chevron-right" size={24} color={COLORS.mediumGray} />
            </TouchableOpacity>

            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <Icon name="info-outline" size={24} color={COLORS.accent} />
                <Text style={styles.itemText}>App Version</Text>
              </View>
              <Text style={styles.valueText}>1.0.0</Text>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={24} color={COLORS.white} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>SmartChef © 2025</Text>
        </ScrollView>

        {/* ❌ BỎ hoàn toàn: <BottomMenuBar /> vì đã có TabBar của AppTabs */}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: COLORS.white },
  container: { flex: 1 },
  topBackground: { paddingVertical: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: FontSize.title, fontWeight: 'bold', color: COLORS.white, marginTop: 20 },
  whiteSection: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: Radius.xlarge,
    borderTopRightRadius: Radius.xlarge,
    marginTop: -20,
  },
  scrollContent: { padding: Spacing.large },
  section: { marginBottom: Spacing.large },
  sectionTitle: { fontSize: FontSize.large, fontWeight: 'bold', color: COLORS.accent, marginBottom: Spacing.medium },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: Radius.medium,
    padding: Spacing.medium,
    marginBottom: Spacing.small,
    ...Shadow.small,
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  itemRight: { flexDirection: 'row', alignItems: 'center' },
  itemText: { fontSize: FontSize.medium, color: COLORS.text, marginLeft: Spacing.medium, fontWeight: '500' },
  valueText: { fontSize: FontSize.regular, color: COLORS.textSecondary, marginRight: Spacing.small },
  logoutButton: {
    backgroundColor: COLORS.error,
    borderRadius: Radius.large,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.large,
    ...Shadow.medium,
  },
  logoutText: { color: COLORS.white, fontSize: FontSize.large, fontWeight: 'bold', marginLeft: Spacing.small },
  footer: { textAlign: 'center', color: COLORS.mediumGray, marginTop: Spacing.large, fontSize: FontSize.small },
});
