import React from 'react';
import {View, StyleSheet} from 'react-native';

const TopBarComponent = () => {
  return <View style={styles.topBar}></View>;
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: 'black',
    height: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1, // Add a bottom border
    borderBottomColor: 'grey', // Set the border color to grey
  },
  logoText: {
    color: 'white',
    fontSize: 24,
  },
});

export default TopBarComponent;
