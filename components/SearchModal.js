import React from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';

const SearchModal = ({ visible, onClose, searchText }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>You entered:</Text>
          <Text style={styles.text}>{searchText}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#222',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 250,
  },
  title: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
});

export default SearchModal;
