import React from 'react';
import {View, StyleSheet} from 'react-native';
import OTPVerifyPageBody from '../page_helper/OTPVerifyPageBody';

const OTPVerify = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <OTPVerifyPageBody route={route} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OTPVerify;
