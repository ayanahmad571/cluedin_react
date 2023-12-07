import React from 'react';
import {View, StyleSheet} from 'react-native';
import { CLUEDIN_DARK_SCHEME } from './constants';

const TopBarComponent = () => {
  return <View style={styles.topBar}></View>;
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: CLUEDIN_DARK_SCHEME.header_background,
    height: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: CLUEDIN_DARK_SCHEME.header_background_text,
    fontSize: 24,
  },
});

export default TopBarComponent;
