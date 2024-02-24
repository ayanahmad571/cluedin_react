import React from 'react';
import {View, Text} from 'react-native';
import UserAuthCheckComp from '../utils/components/UserAuthCheckComp';

const SoonPage = () => {
  return (
    <UserAuthCheckComp>
      <Text style={{color: 'red', fontSize: 72}}>This is the SoonPage after loading</Text>
    </UserAuthCheckComp>
  );
};

export default SoonPage;
