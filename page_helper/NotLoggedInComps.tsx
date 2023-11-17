import React from 'react';
import LoginPage from '../pages/LoginPage';
import OTPVerify from '../pages/OTPVerify';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { CLUEDIN_DARK_SCHEME } from '../utils/constants';

const Stack = createNativeStackNavigator();

const NotLoggedInComponents = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: CLUEDIN_DARK_SCHEME.header_background, // Change the background color
      },
      headerTintColor: CLUEDIN_DARK_SCHEME.header_background_text, // Set the text color to white
      headerTitle: 'Clued In', // Set the title text to your company title
      headerTitleStyle: {
        fontSize: 24, // Customize the font size
        fontWeight: 'bold', // Customize the font weight
        color: CLUEDIN_DARK_SCHEME.header_background_text, // Set the text color to white
      },
      headerTitleAlign: 'center', // Center align the title
    }}>
    <Stack.Screen name="Login" component={LoginPage} />
    <Stack.Screen name="Verify OTP" component={OTPVerify} />
    {/* Add more screens for not-logged-in users */}
  </Stack.Navigator>
);

export default NotLoggedInComponents;
