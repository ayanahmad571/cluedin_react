import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommunityTriviaPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Community Trivia Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default CommunityTriviaPage;
