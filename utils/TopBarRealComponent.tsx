import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TopBarRealComponent = () => {
  return (
    <View style={styles.topBar}>
      <Text style={styles.logoText}>CluedIn</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 24,
  },
});

export default TopBarRealComponent;
