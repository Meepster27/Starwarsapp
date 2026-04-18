import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, Button, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const SwipeableListItem = ({ item, itemName }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [modalVisible]);

  const handleSwipe = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setModalVisible(false));
  };

  return (
    <>
      <Swipeable
        onSwipeableRightOpen={handleSwipe}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.name || item.title}</Text>
          {item.climate && <Text style={styles.itemDetail}>Climate: {item.climate}</Text>}
          {item.terrain && <Text style={styles.itemDetail}>Terrain: {item.terrain}</Text>}
          {item.population && <Text style={styles.itemDetail}>Population: {item.population}</Text>}
          {item.model && <Text style={styles.itemDetail}>Model: {item.model}</Text>}
          {item.manufacturer && <Text style={styles.itemDetail}>Manufacturer: {item.manufacturer}</Text>}
          {item.starship_class && <Text style={styles.itemDetail}>Class: {item.starship_class}</Text>}
          {item.episode_id && <Text style={styles.itemDetail}>Episode: {item.episode_id}</Text>}
          {item.director && <Text style={styles.itemDetail}>Director: {item.director}</Text>}
          {item.release_date && <Text style={styles.itemDetail}>Release Date: {item.release_date}</Text>}
        </View>
      </Swipeable>

      <Modal
        visible={modalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={closeModal}
      >
        <Animated.View 
          style={[
            styles.overlay,
            {
              opacity: opacityAnim,
            }
          ]}
        >
          <Animated.View 
            style={[
              styles.modalContent,
              {
                transform: [{ scale: scaleAnim }],
              }
            ]}
          >
            <Text style={styles.modalTitle}>Item Selected</Text>
            <Text style={styles.modalText}>{item.name || item.title}</Text>
            <Button title="Close" onPress={closeModal} />
          </Animated.View>
        </Animated.View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ffd700',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 8,
  },
  itemDetail: {
    fontSize: 14,
    color: '#ccc',
    marginVertical: 2,
  },
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
  modalTitle: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
});

export default SwipeableListItem;
