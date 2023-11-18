import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { CLUEDIN_DARK_SCHEME } from './constants';

const TopBarRealComponent = () => {
  return (
    <View style={styles.topBar}>
      <Text style={styles.logoText}>CluedIn</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flex: 1,
    width: '100%',
    backgroundColor: CLUEDIN_DARK_SCHEME.header_background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: CLUEDIN_DARK_SCHEME.header_background_text,
    fontSize: 20,
    fontWeight: "500",
  },
});

export default TopBarRealComponent;
