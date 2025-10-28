// src/components/HeaderBar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderBarProps {
  style?: object;
  title?: string;
  rightText?: string;
  onRightPress?: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ style, title, rightText, onRightPress }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { top: insets.top + 10 }, style]}>
      <View style={styles.leftRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backCircle}>
            <MaterialIcons name="arrow-back" size={28} color="#333" />
          </View>
        </TouchableOpacity>

        {title && <Text style={styles.title}>{title}</Text>}
      </View>

      {rightText && (
        <TouchableOpacity onPress={onRightPress}>
          <Text style={styles.rightText}>{rightText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 4,
    borderColor: '#333',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 12,
  },
  rightText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DD643C',
  },
});

export default HeaderBar;