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
  Linking,
} from 'react-native';
import LoaderOverlay from './LoaderOverlay'; // Import the LoaderOverlay component
import {
  API_BASE_URL,
  CLUEDIN_DARK_SCHEME,
  CLUEDIN_THEME,
} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Modal} from 'react-native';

const LoginPageBody = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to validate email format using a regular expression
  const validateEmail = email => {
    // setErrorMessage('');
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(email);
  };

  const clickedNext = () => {
    keyboardClose();
    // Show the email in a modal
    setIsModalVisible(true);
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

  const handleTermsOfUsePress = () => {
    Linking.openURL('https://cluedin.me/terms-and-conditions');
  };

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
            keyboardType="email-address"
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
            onPress={clickedNext}
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
          {/* Modal for showing the email */}
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.mTitle}>Are you sure?</Text>
                <Text style={styles.mSubText}>
                  Please ensure that the email provided is free of any typos. By
                  clicking "Yes," you acknowledge and accept our
                  <Text style={{color: 'blue'}} onPress={handleTermsOfUsePress}>
                    {' '}
                    Terms of Use
                  </Text>
                  , which can be reviewed on our website. Upon proceeding, an
                  OTP (One-Time Password) will be sent to the provided email for
                  verification.
                </Text>
                <View style={styles.emailCont}>
                  <Text style={styles.robotFont}>{email}</Text>
                </View>
                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity
                    onPress={() => setIsModalVisible(false)}
                    style={styles.noButton}>
                    <Text style={styles.buttonText}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalVisible(false);
                      handleLogin();
                    }}
                    style={styles.yesButton}>
                    <Text style={styles.buttonText}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
  mTitle: {
    fontSize: 24,
    color: CLUEDIN_THEME.black,
    fontWeight: '800',
    margin: 10,
    marginLeft: 0,
    marginBottom: 20,
  },
  mSubText: {
    fontSize: 13,
    color: CLUEDIN_THEME.black,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  emailCont: {
    alignContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 20,
    padding: 5,
    borderRadius: 10,
  },
  robotFont: {
    fontSize: 18,
    fontWeight: '800',
    color: CLUEDIN_THEME.black,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noButton: {
    backgroundColor: CLUEDIN_THEME.dark_red, // Replace with your desired color
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: CLUEDIN_THEME.yellow, // Replace with your desired color
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginPageBody;
