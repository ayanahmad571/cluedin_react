import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {CLUEDIN_DARK_SCHEME} from '../utils/constants';

const LoadingPageBody = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={CLUEDIN_DARK_SCHEME.text_on_background}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CLUEDIN_DARK_SCHEME.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingPageBody;
