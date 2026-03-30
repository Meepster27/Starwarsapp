import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Planets = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Planets</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default Planets;