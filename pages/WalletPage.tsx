import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WalletPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>WalletPage Page</Text>
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

export default WalletPage;
