import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
import AuthContext from '../utils/AuthContext';
import {jwtDecode} from 'jwt-decode';
import {decode} from 'base-64';
import {CLUEDIN_DARK_SCHEME, ANDROID_APP_VERSION, IOS_APP_VERSION} from '../utils/constants';
import SettingsRow from './SettingsRow';

global.atob = decode;

const SettingsBody = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [userJwt, setUserJwt] = useState({});
  const os = Platform.OS; // 'ios' or 'android'

  useEffect(() => {
    const decodeUsername = () => {
      try {
        const decodedToken = jwtDecode(user);
        setUserJwt(decodedToken);
      } catch (error) {
        console.error('Error decoding JWT:', error.message);
      }
    };

    decodeUsername();
  }, [user]);

  const handleButtonPress = (id: string) => {
    navigation.navigate(id);
  };

  return (
    <ScrollView style={styles.SVcontainer}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hi, {userJwt.user_name} !</Text>
      </View>

      <SettingsRow
        icon="person-sharp"
        title="My Profile"
        description="View and edit your profile. You can change your username and view your login status."
        onPress={() => handleButtonPress('Profile')}
      />

      <SettingsRow
        icon="trash-bin-sharp"
        title="Delete Account"
        description="Reqeust to Permanently delete your account. Are you sure you want to go?"
        onPress={() => handleButtonPress('Delete')}
      />

      <SettingsRow
        icon="storefront"
        title="About Us"
        description="Learn more about our app, the team and our vision. This page also links to our Privacy Policy and T&Cs."
        onPress={() => handleButtonPress('About Us')}
      />

      <SettingsRow
        icon="exit"
        title="Logout"
        description="Sign out of your account. Your progress is saved on the cloud, you just need to login again with the same email."
        onPress={() => handleButtonPress('Logout')}
      />

      <View style={styles.greetingContainer}>
        <Text style={styles.infoText}>OS: {os}</Text>
        <Text style={styles.infoText}>
          App Version: {os === 'ios' ? IOS_APP_VERSION : ANDROID_APP_VERSION}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  SVcontainer: {
    flex: 1,
    padding: 10,
    backgroundColor: CLUEDIN_DARK_SCHEME.header_background,
  },
  greetingContainer: {
    paddingVertical: 20,
    alignItems: 'left',
  },
  greetingText: {
    marginLeft: 25,
    fontSize: 24,
    fontWeight: 'bold',
    color: CLUEDIN_DARK_SCHEME.header_background_text,
  },
  infoText: {
    alignSelf: 'center',

    fontSize: 12,
    fontWeight: '300',
    color: CLUEDIN_DARK_SCHEME.header_background_text,
  },
});

export default SettingsBody;
