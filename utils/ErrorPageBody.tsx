import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CLUEDIN_DARK_SCHEME, CLUEDIN_THEME} from '../utils/constants';

const ErrorPageBody = ({errorMsg}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={100}
          style={{color: CLUEDIN_DARK_SCHEME.text_on_background}}
        />
      </View>
      <Text style={styles.errorText}>{errorMsg}</Text>
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
  iconContainer: {
    borderRadius: 100,
    padding: 20,
    marginBottom: 20,
  },
  errorText: {
    color: CLUEDIN_THEME.white,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ErrorPageBody;
