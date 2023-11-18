import React, {useState} from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import TopBarComponent from '../utils/TopBarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import AuthContext from '../utils/AuthContext'; // Adjust the import path as needed
import SplashScreenPage from './SplashScreen';
import { CLUEDIN_DARK_SCHEME } from '../utils/constants';

const Logout = ({navigation}) => {
  const {setUser} = useContext(AuthContext);
  const [isSplash, setSpash] = useState(false);

  const handleLogout = async () => {
    setSpash(true);
    try {
      await AsyncStorage.setItem('JWT_USER', '');

      const jwtUser = await AsyncStorage.getItem('JWT_USER');
      // Navigate to the EnterOtp.tsx screen (make sure to import the necessary modules for navigation)

      setTimeout(() => {
        // Code to be executed after a 2-second delay
        setSpash(false);
        setUser('');
      }, 2000);
    } catch (error) {
      console.log('Error whilst deleting storage');
    }
    // Perform any additional logout logic here
  };
  return isSplash ? (
    <SplashScreenPage />
  ) : (
    // User is not logged in
    <View style={styles.container}>
      <TopBarComponent />
      <Text style={styles.text}>
        Are you sure you want to Logout? (Don't worry progress is always saved)
      </Text>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.8} // Adjust the opacity as desired
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CLUEDIN_DARK_SCHEME.header_background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: CLUEDIN_DARK_SCHEME.header_background_text,
    fontSize: 18,
    marginBottom: 20,
    marginHorizontal: 20, // Add horizontal margin
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: CLUEDIN_DARK_SCHEME.logout.btn_bg,
    borderRadius: 10, // Add border-radius for rounded edges
    paddingHorizontal: 20, // Add horizontal padding
    height: 50, // Increase the button's height to make it bigger
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
  },
  buttonText: {
    color: CLUEDIN_DARK_SCHEME.logout.btn_bg_text,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default Logout;
