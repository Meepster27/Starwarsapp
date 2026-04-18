import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TextInput, Button, Image } from 'react-native';
import SearchModal from '../components/SearchModal';
import SwipeableListItem from '../components/SwipeableListItem';

const Spaceships = () => {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchSpaceships();
  }, []);

  const fetchSpaceships = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://swapi.dev/api/starships/');
      const data = await response.json();
      setSpaceships(data.results);
      setError(null);
    } catch (err) {
      setError('Failed to fetch spaceships');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffd700" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderSpaceshipItem = ({ item }) => (
    <SwipeableListItem item={item} itemName="Spaceship" />
  );

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.listContainer}>
          <Image 
            source={require('../assets/deathstar.png')}
            style={styles.headerImage}
          />
          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchInput}
              placeholder="Type to search..."
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={() => setModalVisible(true)}
            />
            <Button title="Search" color="#ffd700" onPress={() => setModalVisible(true)} />
          </View>
          {spaceships.map((spaceship, index) => (
            <SwipeableListItem key={index} item={spaceship} itemName="Spaceship" />
          ))}
        </ScrollView>
      </View>
      <SearchModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        searchText={searchText}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  listContainer: {
    flex: 1,
  },
  headerImage: {
    width: 400,
    height: 250,
    resizeMode: 'cover',
    backgroundColor: '#333',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#222',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    fontSize: 16,
  },
});

export default Spaceships;