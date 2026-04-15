import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, Button } from 'react-native';
import SearchModal from '../components/SearchModal';

const Films = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://swapi.dev/api/films/');
      const data = await response.json();
      setFilms(data.results);
      setError(null);
    } catch (err) {
      setError('Failed to fetch films');
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

  const renderFilmItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDetail}>Episode: {item.episode_id}</Text>
      <Text style={styles.itemDetail}>Director: {item.director}</Text>
      <Text style={styles.itemDetail}>Release Date: {item.release_date}</Text>
      <Text style={styles.itemDetail} numberOfLines={3}>Opening Crawl: {item.opening_crawl}</Text>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
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
        <FlatList
          data={films}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderFilmItem}
          contentContainerStyle={styles.listContent}
        />
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
  listContent: {
    padding: 10,
  },
  itemContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
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
  errorText: {
    fontSize: 16,
    color: '#ff6b6b',
    textAlign: 'center',
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

export default Films;