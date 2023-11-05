import React from 'react';
import {View, StyleSheet} from 'react-native';
import TopBarComponent from '../utils/TopBarComponent';
import OTPVerifyPageBody from '../page_helper/OTPVerifyPageBody';

const OTPVerify = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TopBarComponent />
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
