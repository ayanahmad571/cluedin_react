import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Logout from './Logout';
import SettingsBody from '../page_helper/SettingsBody';
import ProfileBody from '../page_helper/ProfileBody';
import DeleteAccountBody from '../page_helper/DeleteAccountBody';
import AboutUsBody from '../page_helper/AboutUsBody';
import { CLUEDIN_DARK_SCHEME } from '../utils/constants';

const Stack = createNativeStackNavigator();

const SettingsPage = () => {
  return (
    <Stack.Navigator
      initialRouteName="User Settings"
      backBehavior="initialRoute"
      screenOptions={{
        headerStyle: {
          backgroundColor: CLUEDIN_DARK_SCHEME.header_background,
        },
        headerTintColor: CLUEDIN_DARK_SCHEME.header_background_text, // Set the text color to white
        headerTitleStyle: {
          fontSize: 20, // Customize the font size
          fontWeight: '500', // Customize the font weight
          color: CLUEDIN_DARK_SCHEME.header_background_text, // Set the text color to white
        },
        headerTitleAlign: 'center', // Center align the title
      }}>
      <Stack.Screen name="User Settings" component={SettingsBody} />
      <Stack.Screen name="Profile" component={ProfileBody} />
      <Stack.Screen name="About Us" component={AboutUsBody} />
      <Stack.Screen name="Delete" component={DeleteAccountBody} />
      <Stack.Screen name="Logout" component={Logout} />
    </Stack.Navigator>
  );
};
export default SettingsPage;
