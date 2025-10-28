// src/screens/ScanScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, AppState, Linking } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import HeaderBar from '../components/HeaderBar';

const ScanScreen = () => {
  const navigation = useNavigation();
  const device = useCameraDevice('back');
  const [hasPermission, setHasPermission] = useState(false);
  const [isAppActive, setIsAppActive] = useState(AppState.currentState === 'active');

  useEffect(() => {
    const checkPermissions = async () => {
      const status = await Camera.getCameraPermissionStatus();
      if (status === 'granted') {
        setHasPermission(true);
      } else {
        const newStatus = await Camera.requestCameraPermission();
        setHasPermission(newStatus === 'granted');
      }
    };
    checkPermissions();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setIsAppActive(nextAppState === 'active');
    });
    return () => {
      subscription.remove();
    };
  }, []);

  if (device == null) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Camera not available.</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Camera permission denied.</Text>
        <Text style={styles.linkText} onPress={() => Linking.openSettings()}>
          Open Settings
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderBar/>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isAppActive}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
  },
  linkText: {
    color: '#61dafb',
    fontSize: 16,
    marginTop: 10,
  }
});

export default ScanScreen;