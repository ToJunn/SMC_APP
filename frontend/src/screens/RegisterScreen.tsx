import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 

// Nhập hàm API từ dịch vụ xác thực mới
import { register, initToken } from '../api/auth'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
// Nhập Theme (COLORS, Spacing, v.v.)
import { COLORS, Spacing, Radius, FontSize } from '../ui/theme'; 


// Định nghĩa kiểu điều hướng
type AuthStackParamList = {
  Login: undefined;
  Home: undefined; 
};
type NavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Lỗi', 'Vui lòng điền đủ Tên, Email và Mật khẩu.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    setIsLoading(true);
    try {
      await register(username, email, password);
      
      // Trigger token check to navigate to Home
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        await initToken();
        Alert.alert('Thành công', 'Đăng ký tài khoản thành công!');
      }
      
    } catch (error: any) {
      console.error('Registration failed:', error.response || error);
      
      let errorMessage = 'Đăng ký thất bại. Vui lòng thử lại.';

      if (error.response && error.response.data) {
        // Xử lý lỗi từ API (giả định cấu trúc lỗi)
        const data = error.response.data;
        if (data.email) {
          errorMessage = 'Email này đã được sử dụng.';
        } else if (data.username) {
          errorMessage = 'Tên người dùng này đã tồn tại.';
        }
      } 
      
      Alert.alert('Lỗi Đăng ký', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContainer}
      enableOnAndroid={true}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Bắt đầu nào! 👩‍🍳</Text>
        <Text style={styles.subText}>Tham gia cộng đồng và khám phá công thức mới.</Text>

        {/* Input Tên người dùng */}
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/images/user.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Tên người dùng"
            placeholderTextColor={COLORS.mediumGray}
            autoCapitalize="words"
            value={username}
            onChangeText={setUsername}
            editable={!isLoading}
          />
        </View>
        
        {/* Input Email */}
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/images/email.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.mediumGray}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
          />
        </View>

        {/* Input Mật khẩu */}
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/images/password.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu (tối thiểu 6 ký tự)"
            placeholderTextColor={COLORS.mediumGray}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
          />
        </View>

        {/* Nút Đăng ký */}
        <TouchableOpacity
          style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.primaryButtonText}>Tạo tài khoản</Text>
          )}
        </TouchableOpacity>
        
        {/* Liên kết đến Đăng nhập */}
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => navigation.navigate('Login')}
          disabled={isLoading}
        >
          <Text style={styles.secondaryButtonText}>
            Đã có tài khoản? <Text style={styles.highlightText}>Đăng nhập</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: COLORS.background },
  container: {
    flex: 1,
    padding: Spacing.large, 
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: FontSize.heading,
    fontWeight: '800',
    color: COLORS.darkGray,
    marginBottom: Spacing.small,
    textAlign: 'center',
  },
  subText: {
    fontSize: FontSize.large,
    color: COLORS.darkGray,
    marginBottom: Spacing.large * 1.5,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55, 
    backgroundColor: COLORS.lightGray,
    borderRadius: Radius.large, 
    paddingHorizontal: Spacing.medium,
    marginBottom: Spacing.medium,
    width: '100%',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: Spacing.small,
    tintColor: COLORS.mediumGray, 
  },
  input: {
    flex: 1,
    fontSize: FontSize.large,
    color: COLORS.darkGray,
  },
  primaryButton: {
    backgroundColor: COLORS.primary, 
    paddingVertical: Spacing.medium,
    borderRadius: Radius.large, 
    marginTop: Spacing.large,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 55, 
  },
  buttonDisabled: {
    backgroundColor: COLORS.mediumGray,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: FontSize.large, 
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginTop: Spacing.large,
    padding: Spacing.small,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.darkGray,
    fontSize: FontSize.large,
  },
  highlightText: {
    color: COLORS.primary, 
    fontWeight: 'bold',
  },
});

export default RegisterScreen;