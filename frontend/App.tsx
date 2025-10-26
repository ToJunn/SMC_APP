// App.tsx
import * as React from "react";
import { StatusBar, useColorScheme, ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppNavigator from "./src/navigation/AppNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { appTheme, COLORS } from "./src/ui/theme";
import { initToken } from "./src/api/auth";

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const isDarkMode = useColorScheme() === "dark";
  const checkInterval = React.useRef<ReturnType<typeof setInterval>>(null);

  const checkAuthStatus = React.useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      console.log("[Auth] Token status:", !!token);
      if (token) {
        await initToken();
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("[Auth] Error checking token:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check auth status on mount and periodically
  React.useEffect(() => {
    // Initial check
    checkAuthStatus();

    // Set up periodic check every second
    checkInterval.current = setInterval(checkAuthStatus, 1000);

    // Cleanup interval on unmount
    return () => {
      if (checkInterval.current) {
        clearInterval(checkInterval.current);
      }
    };
  }, [checkAuthStatus]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={appTheme}>
        <AppContent />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
