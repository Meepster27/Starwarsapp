import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TextInput, Image } from 'react-native';
import SearchModal from '../components/SearchModal';
import SwipeableListItem from '../components/SwipeableListItem';
import AnimatedButton from '../components/AnimatedButton';
import { checkNetworkStatus } from '../utils/networkUtils';

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isNetworkAvailable, setIsNetworkAvailable] = useState(true);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      setLoading(true);
      const networkAvailable = await checkNetworkStatus();
      setIsNetworkAvailable(networkAvailable);
      
      if (!networkAvailable) {
        setError('No internet connection. Please check your network and try again.');
        setLoading(false);
        return;
      }
      
      const response = await fetch('https://swapi.dev/api/planets/');
      const data = await response.json();
      setPlanets(data.results);
      setError(null);
    } catch (err) {
      setError('Failed to fetch planets. Please check your internet connection.');
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

  return (
    <View style={styles.container}>
      {!isNetworkAvailable && (
        <View style={styles.networkWarning}>
          <Text style={styles.networkWarningText}>⚠️ No internet connection</Text>
        </View>
      )}
      <ScrollView style={styles.listContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=250&fit=crop' }}
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
          <AnimatedButton 
            onPress={() => setModalVisible(true)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Search</Text>
          </AnimatedButton>
        </View>
        {planets.map((planet, index) => (
          <SwipeableListItem key={index} item={planet} itemName="Planet" />
        ))}
      </ScrollView>
      <SearchModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        searchText={searchText}
      />
    </View>
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
  networkWarning: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  networkWarningText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  headerImage: {
    width: '100%',
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
  button: {
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Planets;