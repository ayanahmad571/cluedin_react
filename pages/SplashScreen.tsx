import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {CLUEDIN_DARK_SCHEME} from '../utils/constants';

const SplashScreenPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.cluedInText}>CluedIn</Text>
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
  cluedInText: {
    color: CLUEDIN_DARK_SCHEME.text_on_background,
    fontSize: 36, // Adjust the font size as needed
    fontWeight: 'bold',
  },
});

export default SplashScreenPage;
