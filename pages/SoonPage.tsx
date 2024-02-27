import React from 'react';
import {View, Text} from 'react-native';
import UserAuthCheckPremComp from '../utils/components/UserAuthCheckPremComp';

const SoonPage = () => {
  return (
    <UserAuthCheckPremComp>
      <Text style={{color: 'red', fontSize: 72}}>This is a test paid page. User cant see this in free version.</Text>
    </UserAuthCheckPremComp>
  );
};

export default SoonPage;
