// ForceAPIUpdate.tsx
import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

const ForceAPIUpdate: React.FC = () => {
  const platformStore =
    Platform.OS === 'ios'
      ? 'App Store'
      : Platform.OS === 'android'
      ? 'Play Store'
      : '';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Please update to the latest version of the app from the {platformStore}.
        This version is no longer supported by CluedIn.
      </Text>
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
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 20,
  },
});

export default ForceAPIUpdate;
