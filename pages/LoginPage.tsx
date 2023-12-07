import React from 'react';
import {View, StyleSheet} from 'react-native';
import LoginPageBody from '../page_helper/LoginPageBody';

const LoginPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LoginPageBody navigation={navigation}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginPage;
