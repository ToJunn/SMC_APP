// src/screens/LoginScreen.tsx - MERGED: UI MỚI + AUTH CŨ
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, Spacing, Radius, FontSize, Shadow } from '../ui/theme';
import { login as apiLogin } from '../api/auth';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      // Sử dụng API từ project CŨ (JWT auth)
      await apiLogin(username, password);
      
      // Navigate to Home after successful login
      navigation.replace('Home');
    } catch (error: any) {
      Alert.alert(
        'Login Failed',
        error.message || 'Invalid credentials. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.background}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={styles.topBackground}
          resizeMode="cover"
        >
          {/* Header với Sign Up link */}
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signUpLink}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back! 👋</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor={COLORS.placeholder}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              editable={!loading}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.placeholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />

            <TouchableOpacity 
              style={[styles.signInButton, loading && { opacity: 0.6 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.signInButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Alert.alert('Feature coming soon!')}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  topBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerRow: {
    position: 'absolute',
    top: 60,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpLink: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.error,
  },
  formContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: Radius.large,
    padding: Spacing.large,
    ...Shadow.medium,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: 'bold',
    color: COLORS.accent,
    textAlign: 'center',
    marginBottom: Spacing.small,
  },
  subtitle: {
    fontSize: FontSize.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.large,
  },
  label: {
    fontSize: FontSize.medium,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: Spacing.small,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: Radius.medium,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: FontSize.medium,
    marginBottom: Spacing.medium,
    color: COLORS.text,
  },
  signInButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: Radius.medium,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: Spacing.small,
    marginBottom: Spacing.medium,
  },
  signInButtonText: {
    color: COLORS.white,
    fontSize: FontSize.large,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    textAlign: 'center',
    color: COLORS.text,
    textDecorationLine: 'underline',
    fontSize: FontSize.regular,
  },
});

export default LoginScreen;