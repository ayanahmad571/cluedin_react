import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AuthContext from '../utils/AuthContext';
import {jwtDecode} from 'jwt-decode';
import {decode} from 'base-64';
import LoaderOverlay from './LoaderOverlay';
import {API_BASE_URL, CLUEDIN_DARK_SCHEME} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

global.atob = decode;

const UserProfileBody = () => {
  const [username, setUsername] = useState('Loading..');
  const [username_initial, setUsernameInitial] = useState('Loading..');
  const [user_jwt, setUserJwt] = useState({});
  const [isUsernameChanged, setIsUsernameChanged] = useState(false);
  const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {user, setUser} = useContext(AuthContext);

  useEffect(() => {
    const decodeUsername = () => {
      try {
        const decodedToken = jwtDecode(user);
        setUsernameInitial(decodedToken.user_name);
        setUserJwt(decodedToken);
        setUsername(decodedToken.user_name);
      } catch (error) {
        console.error('Error decoding JWT:', error.message);
      }
    };

    decodeUsername();
  }, [user]);

  useEffect(() => {
    // setUsername(username_initial);
    setIsUsernameChanged(username !== username_initial);
    setIsSaveButtonActive(username !== username_initial);
  }, [username]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('JWT_USER', '');

      const jwtUser = await AsyncStorage.getItem('JWT_USER');
      // Navigate to the EnterOtp.tsx screen (make sure to import the necessary modules for navigation)

      setTimeout(() => {
        // Code to be executed after a 2-second delay
        setUser('');
      }, 2000);
    } catch (error) {
      console.log('Error whilst deleting storage');
    }
    // Perform any additional logout logic here
  };

  const getUsernameApi = async () => {
    try {
      const requestBody = `new_username=${username}`;

      const response = await fetch(`${API_BASE_URL}/update_username`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody,
      });

      if (response.status === 200) {
        // Successfully submitted the answer, update the question data
        Alert.alert(
          'Success',
          'Username has been updated, you will now be logged out.',
        );
        handleLogout();
        setIsLoading(false);
      } else if (response.status === 406) {
        Alert.alert(
          'Error',
          'Username is not unique, please chose another one :)',
        );
        setIsLoading(false);
      } else {
        // Handle the error cases as needed
        Alert.alert('Error', 'Failed to update username, contact site admin.');
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Your network is unstable, please try again at a later time',
      );
      setIsLoading(false);
    }
  };
  const validateUsername = username => {
    // Validation 1: Number of characters must be between 3 and 15 (inclusive)
    if (!(username.length >= 3 && username.length <= 15)) {
      Alert.alert('Error', 'Number of characters must be between 3 and 15');
      return false;
    }

    // Validation 2: Only numbers and alphabets allowed
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      Alert.alert('Error', 'Only numbers and alphabets allowed');
      return false;
    }

    // Validation 3: No spaces allowed in the username
    if (/\s/.test(username)) {
      Alert.alert('Error', 'No spaces allowed in the username');
      return false;
    }

    return true;
  };

  const handleSave = () => {
    setIsLoading(true);
    console.log('Username saved:', username);
    console.log(user_jwt);

    // Send a request to your API using the provided id
    // For demonstration, we'll simulate an API response after 2 seconds
    if (validateUsername(username)) {
      setTimeout(() => {
        getUsernameApi();
      }, 2000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.editText}>Edit User Info</Text>
      <Text style={styles.editText}> </Text>

      <View style={styles.row}>
        <Text style={[styles.col1, styles.boldText]}>Username</Text>
        <TextInput
          style={styles.col2Input}
          value={username}
          onChangeText={text => {
            setUsername(text);
            setIsUsernameChanged(username !== username_initial);
            setIsSaveButtonActive(username !== username_initial);
          }}
        />
      </View>

      <View>
        <View style={styles.row}>
          <Text style={[styles.col1, styles.boldText]}>Email</Text>
          <Text style={styles.col2Text}>{user_jwt.user_email}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.col1, styles.boldText]}>User Login Time</Text>
          <Text style={styles.col2Text}>
            {new Date(Number(user_jwt.iat) * 1000).toLocaleString()}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.col1, styles.boldText]}>
            User Login Expiry Time
          </Text>
          <Text style={styles.col2Text}>
            {new Date(Number(user_jwt.exp) * 1000).toLocaleString()}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.saveButton,
          isSaveButtonActive
            ? styles.activeSaveButton
            : styles.inActiveSaveButton,
        ]}
        onPress={handleSave}
        disabled={!isSaveButtonActive && !isLoading}>
        <Text
          style={
            isSaveButtonActive
              ? styles.saveButtonTextEn
              : styles.saveButtonTextDi
          }>
          Save
        </Text>
      </TouchableOpacity>
      <LoaderOverlay visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CLUEDIN_DARK_SCHEME.header_background,
    padding: 20,
  },
  editText: {
    color: CLUEDIN_DARK_SCHEME.header_background_text,
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 25,
    paddingBottom: 10,
  },
  col1: {
    color: 'white',
    flex: 1,
  },
  col2Input: {
    flex: 2,
    backgroundColor: CLUEDIN_DARK_SCHEME.login.input_background,
    padding: 10,
    borderRadius: 5,
    color: CLUEDIN_DARK_SCHEME.login.input_background_text,
  },
  col2Text: {
    flex: 2,
    color: CLUEDIN_DARK_SCHEME.header_background_text,
    padding: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  saveButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  activeSaveButton: {
    backgroundColor: CLUEDIN_DARK_SCHEME.login.btn_enabled_bg,
    opacity: 1,
  },
  inActiveSaveButton: {
    backgroundColor: CLUEDIN_DARK_SCHEME.login.btn_disabled_bg,
    opacity: 0.5,
  },
  saveButtonTextEn: {
    color: CLUEDIN_DARK_SCHEME.login.btn_enabled_txt,
    fontSize: 18,
  },
  saveButtonTextDi: {
    fontSize: 18,
    color: CLUEDIN_DARK_SCHEME.login.btn_disabled_txt,
  },
});

export default UserProfileBody;
