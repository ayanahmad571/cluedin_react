import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TestBackground from '../utils/components/TestBackground';

const SoonPage = () => {
  return (
      <View style={styles.container}>
        <Text style={styles.text}>Feature Coming Soon</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    flex :1,
  },
  text: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});

export default SoonPage;
