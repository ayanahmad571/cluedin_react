import React from 'react';
import {View, StyleSheet} from 'react-native';
import OTPVerifyPageBody from '../page_helper/OTPVerifyPageBody';

const OTPVerify = ({navigation}) => {
  return (
    <View style={styles.container}>
      <OTPVerifyPageBody navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OTPVerify;
