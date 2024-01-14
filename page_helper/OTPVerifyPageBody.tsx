import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import LoaderOverlay from './LoaderOverlay';
import {API_BASE_URL, CLUEDIN_DARK_SCHEME} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import AuthContext from '../utils/AuthContext'; // Adjust the import path as needed
import {setupFirebase} from '../utils/firebaseScripts';
import OTPResend from '../utils/OTPResend';

const OTPVerifyPageBody = ({route, navigation}) => {
  const {emailID} = route.params;
  const [otp, setOTP] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [isLoading, setIsLoading] = useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState('');
  const {user, setUser} = useContext(AuthContext);

  const validateOtp = otp => {
    return !otp.every(digit => digit.length === 1);
  };

  const handleInputChange = (text, index) => {
    if (text.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
    otp[index] = text;
    setOTP([...otp]);
  };

  const handleButtonPress = () => {
    if (otp.every(digit => digit.length === 1)) {
      // All OTP digits are entered, initiate API request here
      Keyboard.dismiss();
      handleAPIRequest();
    }
  };

  const handleAPIRequest = async () => {
    setIsLoading(true);
    setOtpErrorMessage('');
    // Get "TR_REF" from AsyncStorage
    const trRef = await AsyncStorage.getItem('TR_REF');

    if (!trRef) {
      // Handle the case where "TR_REF" is not found
      // Set an error message or take appropriate action
      setOtpErrorMessage(
        'Please login again, you are not authorised to make this request.',
      );
      setIsLoading(false);
      return;
    }

    const otpValue = otp.join(''); // Combine the OTP digits

    // Create the request body
    const requestBody = `tr_ref=${trRef}&otp=${otpValue}`;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/verify`, requestOptions);

      if (response.status === 200) {
        // Successful response (HTTP status code 200)
        // Handle success, e.g., navigate to the next screen
        const otpRespData = await response.json();
        // Check if "Access-Token" keys exists
        if (!otpRespData['Access-Token']) {
          setOtpErrorMessage('Bad server OTP response, contact site admin');
        } else {
          try {
            await AsyncStorage.setItem('JWT_USER', otpRespData['Access-Token']);
            await AsyncStorage.setItem('NEW_LOGIN', 'yes');
            // Navigate to the EnterOtp.tsx screen (make sure to import the necessary modules for navigation)
            setupFirebase();
            setUser(otpRespData['Access-Token']);
            return;
          } catch (error) {
            // Handle storage error
            setOtpErrorMessage(
              'Server response was not authenticated, please contact admin if this issue persists.',
            );
          }
        }
      } else if (response.status === 400) {
        // Bad request (HTTP status code 400)
        // Handle bad request, e.g., show an error message to the user
        setOtpErrorMessage('Invalid Request - Please go back and re-login.');
      } else if (response.status === 401) {
        // Unauthorized (HTTP status code 401)
        // Handle unauthorized access, e.g., show an error message
        setOtpErrorMessage('OTP Incorrect or Expired');
      } else if (response.status === 406) {
        // Unauthorized (HTTP status code 401)
        // Handle unauthorized access, e.g., show an error message
        setOtpErrorMessage(
          'Maximum number of attempts reached. Request New OTP',
        );
      } else if (response.status === 500) {
        // Internal Server Error (HTTP status code 500)
        // Handle server error, e.g., show an error message
        setOtpErrorMessage(
          'Our servers are currently experiencing downtime, please contact site admin.',
        );
      } else {
        // Handle other response codes
        setOtpErrorMessage(
          'We are unable to process this request, please contact site admin.',
        );
      }

      // Do something with the response data, if needed
    } catch (error) {
      // Handle any network or other errors
      setOtpErrorMessage(
        'Your internet connection is currently unstable, please retry at a later time',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setOtpErrorMessage('');
    Keyboard.dismiss();
    setIsLoading(true);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `email=${emailID}`,
    };

    try {
      setOtpErrorMessage('');
      const response = await fetch(`${API_BASE_URL}/login`, requestOptions);

      if (response.status === 200) {
        // Successful response (HTTP status code 200)
        const data = await response.json();

        // Check if "consumer_ref_id" and "otp_sent" keys exist
        if (!data.consumer_ref_id || !data.otp_status) {
          setOtpErrorMessage('Bad server response, contact site admin');
        } else {
          try {
            await AsyncStorage.setItem('TR_REF', data.consumer_ref_id);
            // Navigate to the EnterOtp.tsx screen (make sure to import the necessary modules for navigation)
          } catch (error) {
            // Handle storage error
            setOtpErrorMessage(
              'Credentials were not authenticated, please contact admin',
            );
          }
        }
      } else if (response.status === 400) {
        // Bad request (HTTP status code 400)
        setOtpErrorMessage('Invalid Email, please re-enter and try again!');

        // Handle bad request, e.g., show an error message to the user
      } else if (response.status === 429) {
        // Unauthorized (HTTP status code 401)
        // Handle unauthorized access, e.g., show an error message
        setOtpErrorMessage(
          'Maximum number of attempts reached. Please wait 1 minute before requesting a new OTP.',
        );
      } else {
        // Handle other response codes
        setOtpErrorMessage('Unable to login, please contact Site Admin');

        // Handle other response codes as needed
      }

      // Do something with the response data
    } catch (error) {
      setOtpErrorMessage(
        'Your internet connection is currently unstable, please retry at a later time',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const keyboardClose = () => Keyboard.dismiss();

  const isButtonEnabled = !isLoading && !validateOtp(otp);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.kb_cont}>
      <TouchableWithoutFeedback onPress={keyboardClose}>
        <View style={styles.container}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.description}>
            An email has been sent to{' '}
            <Text style={{fontWeight: 'bold'}}>"{emailID}"</Text> with the One
            Time Password. If you haven't received the OTP, you can request a
            new one in 60 seconds.
          </Text>
          <Text style={styles.dangerText}>{otpErrorMessage}</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={text => handleInputChange(text, index)}
                ref={inputRefs[index]}
              />
            ))}
          </View>
          <View style={styles.resendRow}>
            <OTPResend emailID={emailID} handleResend={handleResend }/>
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              isButtonEnabled
                ? styles.otpButtonEnabled
                : styles.otpButtonDisabled,
            ]}
            onPress={handleButtonPress}
            disabled={!isButtonEnabled}>
            <Text
              style={
                isButtonEnabled
                  ? styles.buttonTextEnabled
                  : styles.buttonTextDisabled
              }>
              Verify
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
  container: {
    flex: 1,
    backgroundColor: CLUEDIN_DARK_SCHEME.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: CLUEDIN_DARK_SCHEME.text_on_background,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    color: CLUEDIN_DARK_SCHEME.text_on_background,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  dangerText: {
    fontSize: 16,
    color: CLUEDIN_DARK_SCHEME.general_danger_text,
    marginBottom: 20,
    textAlign: 'left',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    width: 60,
    height: 60,
    backgroundColor: CLUEDIN_DARK_SCHEME.background,
    borderBottomWidth: 1,
    borderBottomColor: CLUEDIN_DARK_SCHEME.otp.otp_input_border,
    fontSize: 24,
    color: CLUEDIN_DARK_SCHEME.text_on_background,
    textAlign: 'center',
    margin: 5,
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: CLUEDIN_DARK_SCHEME.login.btn_enabled_bg,
    borderRadius: 10,
    padding: 10,
  },
  otpButtonEnabled: {
    backgroundColor: CLUEDIN_DARK_SCHEME.login.btn_enabled_bg,
  },
  otpButtonDisabled: {
    backgroundColor: CLUEDIN_DARK_SCHEME.login.btn_disabled_bg,
  },
  buttonTextEnabled: {
    fontSize: 18,
    color: CLUEDIN_DARK_SCHEME.login.btn_enabled_txt,
    textAlign: 'center',
  },
  buttonTextDisabled: {
    fontSize: 18,
    color: CLUEDIN_DARK_SCHEME.login.btn_disabled_txt,
    textAlign: 'center',
  },
});

export default OTPVerifyPageBody;
