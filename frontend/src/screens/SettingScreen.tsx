import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Switch,
  Platform,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FontSize, Spacing, Radius } from '../ui/theme';
import { clearTokens } from '../api/client';

export default function SettingScreen() {
  const navigation = useNavigation();
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');

  const onLogout = async () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất không?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đăng xuất',
        style: 'destructive',
        onPress: async () => {
          try {
            await clearTokens();
            // Reset navigation stack và chuyển về màn Auth
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          } catch (e) {
            Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
          }
        },
      },
    ]);
  };

  const openPrivacy = () => {
    // thay link thật của bạn
    Linking.openURL('https://example.com/privacy').catch(() =>
      Alert.alert('Lỗi', 'Không mở được đường dẫn')
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Tài khoản */}
      <SectionHeader title="Tài khoản" />
      <Card>
        <Item
          icon="person-outline"
          label="Chỉnh sửa hồ sơ"
          onPress={() => {}}
        />
        <Divider />
        <Item
          icon="key-outline"
          label="Đổi mật khẩu"
          onPress={() => {}}
        />
      </Card>

      {/* Ứng dụng */}
      <SectionHeader title="Ứng dụng" />
      <Card>
        <Item
          icon="language-outline"
          label="Ngôn ngữ"
          value={language === 'vi' ? 'Tiếng Việt' : 'English'}
          onPress={() => setLanguage((prev) => (prev === 'vi' ? 'en' : 'vi'))}
        />
        <Divider />
        <Item
          icon="notifications-outline"
          label="Thông báo"
          right={
            <Switch
              value={notifEnabled}
              onValueChange={setNotifEnabled}
              thumbColor={Platform.OS === 'android' ? (notifEnabled ? COLORS.primary : '#f4f3f4') : undefined}
              trackColor={{ false: '#d1d5db', true: '#a7f3d0' }}
            />
          }
          onPress={() => setNotifEnabled((v) => !v)}
        />
        <Divider />
        <Item
          icon="shield-checkmark-outline"
          label="Chính sách bảo mật"
          onPress={openPrivacy}
        />
      </Card>

      {/* Khu vực nguy hiểm */}
      <SectionHeader title=" " />
      <Card danger>
        <Item
          icon="exit-outline"
          label="Đăng xuất"
          labelStyle={{ color: COLORS.white }}
          iconColor={COLORS.white}
          chevron={false}
          onPress={onLogout}
          containerStyle={{ backgroundColor: COLORS.error }}
        />
      </Card>

      {/* Footer nhỏ */}
      <Text style={styles.footer}>SmartChef • v1.0.0</Text>
    </ScrollView>
  );
}

/* ------- Components nhỏ ------- */

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function Card({
  children,
  danger,
}: {
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <View
      style={[
        styles.card,
        danger && { padding: 0, overflow: 'hidden' },
      ]}
    >
      {children}
    </View>
  );
}

function Item({
  icon,
  label,
  value,
  right,
  onPress,
  chevron = true,
  containerStyle,
  labelStyle,
  iconColor,
}: {
  icon: string;
  label: string;
  value?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  chevron?: boolean;
  containerStyle?: object;
  labelStyle?: object;
  iconColor?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#e5e7eb' }}
      style={[styles.item, containerStyle]}
    >
      <View style={styles.itemLeft}>
        <Ionicons name={icon} size={22} color={iconColor || COLORS.darkGray} />
        <Text style={[styles.itemText, labelStyle]} numberOfLines={1}>
          {label}
        </Text>
      </View>

      <View style={styles.itemRight}>
        {value ? <Text style={styles.value}>{value}</Text> : null}
        {right}
        {chevron && <Ionicons name="chevron-forward" size={18} color={COLORS.mediumGray} />}
      </View>
    </Pressable>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

/* ------- Styles ------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  sectionTitle: {
    fontSize: FontSize.medium,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginTop: Spacing.large,
    marginBottom: Spacing.small,
    paddingHorizontal: Spacing.large,
  },
  card: {
    marginHorizontal: Spacing.large,
    backgroundColor: COLORS.white,
    borderRadius: Radius.large,
    paddingVertical: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 3 },
    }),
  },
  item: {
    minHeight: 48,
    paddingHorizontal: Spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemText: {
    fontSize: FontSize.regular,
    color: COLORS.darkGray,
    flexShrink: 1,
  },
  value: {
    fontSize: 13,
    color: COLORS.mediumGray,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ececec',
    marginLeft: Spacing.medium + 22 + 10, // thẳng hàng sau icon
  },
  footer: {
    textAlign: 'center',
    color: COLORS.mediumGray,
    marginTop: Spacing.large,
    fontSize: 12,
  },
});
