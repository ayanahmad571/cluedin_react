import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AuthContext from '../utils/AuthContext';
import {jwtDecode} from 'jwt-decode';
import {decode} from 'base-64';
global.atob = decode;

const SettingsBody = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [user_jwt, setUserJwt] = useState({});

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
        <Text style={styles.greetingText}>Hi, {user_jwt.user_name} !</Text>
      </View>

      <TouchableOpacity
        style={styles.row}
        onPress={() => handleButtonPress('Profile')}>
        <Text style={styles.text}>My Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.row}
        onPress={() => handleButtonPress('Delete')}>
        <Text style={styles.text}>Delete Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.row}
        onPress={() => handleButtonPress('About Us')}>
        <Text style={styles.text}>About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.row}
        onPress={() => handleButtonPress('Logout')}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  SVcontainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  greetingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    padding: 16,
    backgroundColor: '#242323',
    margin: 10,
    borderRadius:15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

export default SettingsBody;
