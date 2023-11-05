import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.cluedInText}>CluedIn</Text>
      <ActivityIndicator size="large" color="white" />
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
  cluedInText: {
    color: 'white',
    fontSize: 36, // Adjust the font size as needed
    fontWeight: 'bold',
  },
});

export default SplashScreen;
