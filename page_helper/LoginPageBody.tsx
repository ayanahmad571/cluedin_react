import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import LoaderOverlay from './LoaderOverlay'; // Import the LoaderOverlay component
import {API_BASE_URL, CLUEDIN_DARK_SCHEME} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPageBody = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to validate email format using a regular expression
  const validateEmail = email => {
    // setErrorMessage('');
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(email);
  };

  const handleLogin = async () => {
    setErrorMessage('');
    Keyboard.dismiss();
    setIsLoading(true);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `email=${email}`,
    };

    try {
      setErrorMessage('');
      const response = await fetch(`${API_BASE_URL}/login`, requestOptions);

      if (response.status === 200) {
        // Successful response (HTTP status code 200)
        const data = await response.json();

        // Check if "consumer_ref_id" and "otp_sent" keys exist
        if (!data.consumer_ref_id || !data.otp_status) {
          setErrorMessage('Bad server response, contact site admin');
        } else {
          try {
            await AsyncStorage.setItem('TR_REF', data.consumer_ref_id);
            // Navigate to the EnterOtp.tsx screen (make sure to import the necessary modules for navigation)
            navigation.navigate('Verify OTP');
          } catch (error) {
            // Handle storage error
            setErrorMessage(
              'Credentials were not authenticated, please contact admin',
            );
          }
        }
      } else if (response.status === 400) {
        // Bad request (HTTP status code 400)
        setErrorMessage('Invalid Email, please re-enter and try again!');

        // Handle bad request, e.g., show an error message to the user
      } else if (response.status === 429) {
        // Unauthorized (HTTP status code 401)
        // Handle unauthorized access, e.g., show an error message
        setErrorMessage(
          'Maximum number of attempts reached. Please wait 3 minutes before requesting a new OTP.',
        );
      } else {
        // Handle other response codes
        setErrorMessage('Unable to login, please contact Site Admin');

        // Handle other response codes as needed
      }

      // Do something with the response data
    } catch (error) {
      setErrorMessage(
        'Your internet connection is currently unstable, please retry at a later time',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const keyboardClose = () => Keyboard.dismiss();

  const isButtonEnabled = validateEmail(email) && !isLoading;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.kb_cont}>
      <TouchableWithoutFeedback onPress={keyboardClose}>
        <View style={styles.loginPageBody}>
          <Text style={styles.loginText}>Login / Sign-up</Text>
          <Text style={styles.infoText}>
            Enter your email below to receive a One Time Password.
          </Text>
          <Text style={styles.dangerText}>{errorMessage}</Text>
          <TextInput
            keyboardType='email-address'
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity
            style={[
              styles.loginButton,
              isButtonEnabled
                ? styles.loginButtonEnabled
                : styles.loginButtonDisabled,
            ]}
            activeOpacity={0.8}
            onPress={handleLogin}
            disabled={!isButtonEnabled}>
            <Text
              style={
                isButtonEnabled
                  ? styles.buttonTextEnabled
                  : styles.buttonTextDisabled
              }>
              Next
            </Text>
          </TouchableOpacity>
          <LoaderOverlay visible={isLoading} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  kb_cont: {
    flex: 1,
  },
  loginPageBody: {
    flex: 1,
    backgroundColor: CLUEDIN_DARK_SCHEME.background,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CLUEDIN_DARK_SCHEME.text_on_background,
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: CLUEDIN_DARK_SCHEME.text_on_background,
    marginBottom: 20,
    textAlign: 'center',
  },
  dangerText: {
    fontSize: 16,
    color: CLUEDIN_DARK_SCHEME.general_danger_text,
    marginBottom: 20,
    textAlign: 'left',
  },
  input: {
    backgroundColor: CLUEDIN_DARK_SCHEME.login.input_background,
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 10,
    margin: 20,
  },
  loginButton: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loginButtonEnabled: {
    backgroundColor: CLUEDIN_DARK_SCHEME.login.btn_enabled_bg,
  },
  loginButtonDisabled: {
    backgroundColor: CLUEDIN_DARK_SCHEME.login.btn_disabled_bg,
  },
  buttonTextEnabled: {
    fontSize: 18,
    color: CLUEDIN_DARK_SCHEME.login.btn_enabled_txt,
  },
  buttonTextDisabled: {
    fontSize: 18,
    color: CLUEDIN_DARK_SCHEME.login.btn_disabled_txt,
  },
});

export default LoginPageBody;
