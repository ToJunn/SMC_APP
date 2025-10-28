import * as React from 'react';
import { StatusBar, AppState, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import { appTheme, COLORS } from './src/ui/theme';
import { initToken } from './src/api/auth';

// (optional) Context để màn Login/Logout gọi refresh
export const AuthContext = React.createContext<{ refreshAuth: () => void }>({
  refreshAuth: () => {},
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const appStateRef = React.useRef(AppState.currentState);

  const checkAuth = React.useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        await initToken(); // set header, validate token if needed
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Mount + khi app quay lại foreground
  React.useEffect(() => {
    checkAuth();
    const sub = AppState.addEventListener('change', (s) => {
      if (appStateRef.current.match(/inactive|background/) && s === 'active') checkAuth();
      appStateRef.current = s;
    });
    return () => sub.remove();
  }, [checkAuth]);

  const refreshAuth = React.useCallback(() => {
    setLoading(true);
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={appTheme}>
        <AuthContext.Provider value={{ refreshAuth }}>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
