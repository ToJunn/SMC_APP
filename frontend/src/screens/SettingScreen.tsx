import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { COLORS, FontSize, Spacing } from '../ui/theme';
import { clearTokens } from '../api/client';
import { useNavigation } from '@react-navigation/native';

export default function SettingScreen() {
  const navigation = useNavigation();

  const onLogout = async () => {
    try {
      await clearTokens();
      // App.tsx will handle navigation after token is cleared
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tài khoản</Text>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Text style={styles.itemText}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Text style={styles.itemText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ứng dụng</Text>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Text style={styles.itemText}>Ngôn ngữ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Text style={styles.itemText}>Thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Text style={styles.itemText}>Chính sách bảo mật</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  section: {
    marginTop: Spacing.large,
    paddingHorizontal: Spacing.large,
  },
  sectionTitle: {
    fontSize: FontSize.medium,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: Spacing.medium,
  },
  item: {
    backgroundColor: COLORS.white,
    padding: Spacing.medium,
    borderRadius: 8,
    marginBottom: Spacing.small,
  },
  itemText: {
    fontSize: FontSize.regular,
    color: COLORS.darkGray,
  },
  logoutButton: {
    margin: Spacing.large,
    padding: Spacing.medium,
    backgroundColor: COLORS.error,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.white,
    fontSize: FontSize.regular,
    fontWeight: '600',
  },
});
