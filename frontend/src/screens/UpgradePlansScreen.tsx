// src/screens/UpgradePlansScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BottomMenuBar from '../components/BottomMenuBar';
import BackButton from '../components/HeaderBar';

const UpgradePlansScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.background}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />

      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={styles.topBackground}
          resizeMode="cover"
        >
          <BackButton label="Upgrade plans" color="#333" />

          <TouchableOpacity
            style={styles.buttonTry}
            onPress={() => console.log('Upgrade plan pressed')}
          >
            <Text style={styles.tryText}>Try 1 month for đ65,000</Text>
          </TouchableOpacity>

          {/* Info card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>
              Unlock the full flavor of your kitchen with:
            </Text>
            <Text style={styles.infoItem}>Unlimited recipe generations</Text>
            <Text style={styles.infoItem}>
              Unlimited saved favorite recipes
            </Text>
            <Text style={styles.infoItem}>Ad-free cooking experiences</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>

      <BottomMenuBar />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  topBackground: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },

  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },

  buttonTry: {
    marginTop: 100,
    backgroundColor: '#DD643C',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    elevation: 4,
  },
  tryText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoCard: {
    marginTop: 20,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
    width: '85%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#DD643C',
    textAlign: 'left',
  },
  infoItem: {
    fontSize: 16,
    color: '#DD643C',
    fontWeight: 'bold',
    marginBottom: 6,
  },
});

export default UpgradePlansScreen;
