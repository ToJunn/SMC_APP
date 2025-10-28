// src/components/BottomMenuBar.tsx - UPDATED
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { COLORS } from '../ui/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BottomMenuBar = () => {
  const navigation = useNavigation<NavigationProp>();
  const currentRouteName = useNavigationState((state) => {
    const route = state.routes[state.index];
    return route.name;
  });

  const isActive = (routeName: string) => currentRouteName === routeName;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon 
          name="home" 
          size={30} 
          color={isActive('Home') ? COLORS.primary : COLORS.mediumGray} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Icon 
          name="favorite-border" 
          size={30} 
          color={isActive('Favorites') ? COLORS.primary : COLORS.mediumGray} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab}
        onPress={() => navigation.navigate('Profile')}
      >
        <Icon 
          name="person" 
          size={30} 
          color={isActive('Profile') ? COLORS.primary : COLORS.mediumGray} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab}
        onPress={() => navigation.navigate('Settings')}
      >
        <Icon 
          name="settings" 
          size={30} 
          color={isActive('Settings') ? COLORS.primary : COLORS.mediumGray} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 70,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomMenuBar;