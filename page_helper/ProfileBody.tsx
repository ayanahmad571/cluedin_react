import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AuthContext from '../utils/AuthContext';
import {jwtDecode} from 'jwt-decode';
import {decode} from 'base-64';
global.atob = decode;

const UserProfileBody = () => {
  const [username, setUsername] = useState('Loading..');
  const [username_initial, setUsernameInitial] = useState('Loading..');
  const [user_jwt, setUserJwt] = useState({});
  const [isUsernameChanged, setIsUsernameChanged] = useState(false);
  const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);
  const {user} = useContext(AuthContext);

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

  const handleSave = () => {
    console.log('Username saved:', username);
    console.log(user_jwt);
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
          isSaveButtonActive ? styles.activeSaveButton : {},
        ]}
        onPress={handleSave}
        disabled={!isSaveButtonActive}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  editText: {
    color: 'white',
    fontSize: 34,
    fontWeight: '500',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  col1: {
    color: 'white',
    flex: 1,
  },
  col2Input: {
    flex: 2,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
  col2Text: {
    flex: 2,
    color: 'white',
    padding: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  saveButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#3498db',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  activeSaveButton: {
    opacity: 1,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default UserProfileBody;
