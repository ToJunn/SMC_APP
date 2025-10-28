
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';

interface ScanCardProps {
  onPress: () => void;
}

const ScanCard: React.FC<ScanCardProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Icon name="camera-alt" size={50} color="#E67E22" style={styles.icon} />
      <Text style={styles.text}>Scan your ingredients</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 20,
    width: '60%',
    alignSelf: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#E67E22',
  },
});

export default ScanCard;
