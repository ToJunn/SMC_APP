

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FilterChipProps {
  label: string;
  onPress: () => void;
  selected?: boolean;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, onPress, selected }) => {
  return (
    <TouchableOpacity 
      style={[styles.chip, selected && styles.selectedChip]} 
      onPress={onPress}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderWidth: 1,
    borderColor: '#39BF42',
  },
  selectedChip: {
    backgroundColor: '#E67E22',
    borderColor: '#39BF42',
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  selectedLabel: {
    color: 'white',
  },
});

export default FilterChip;
