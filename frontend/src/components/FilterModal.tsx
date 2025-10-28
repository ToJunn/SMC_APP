
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import FilterChip from './FilterChip';

interface Filter {
  title: string;
  options: string[];
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filter: Filter | null;
  onApply: (filterTitle: string, selectedOptions: string[]) => void;
  initialSelectedOptions: string[];
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, filter, onApply, initialSelectedOptions }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    setSelectedOptions(initialSelectedOptions);
  }, [initialSelectedOptions]);

  if (!filter) return null;

  const handleOptionToggle = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleApply = () => {
    onApply(filter.title, selectedOptions);
    onClose();
  };

  const handleClear = () => {
    setSelectedOptions([]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.modalView}>
        <Text style={styles.title}>{filter.title}</Text>
        <View style={styles.optionsContainer}>
          {filter.options.map(option => (
            <FilterChip
              key={option}
              label={option}
              onPress={() => handleOptionToggle(option)}
              selected={selectedOptions.includes(option)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClear}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: '#27ae60',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#000000',
  },
});

export default FilterModal;
