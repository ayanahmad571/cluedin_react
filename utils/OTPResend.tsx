import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { CLUEDIN_THEME } from './constants';

const OTPResend = ({ emailID, handleResend}) => {
  const [isButtonDisabled, setButtonDisabled] = useState(true); // Set to true initially
  const [countdown, setCountdown] = useState(60);

  const reSendOTP = () => {
    handleResend();
    setButtonDisabled(true);
    setCountdown(60);
    startCountdown();
  };

  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown(prevCount => {
        if (prevCount === 1) {
          setButtonDisabled(false); // Enable the button after the first countdown cycle
          clearInterval(timer);
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startCountdown();
  }, []);

  return (
    <View style={{ marginTop: 40, marginBottom: 50 }}>
      <TouchableOpacity onPress={reSendOTP} disabled={isButtonDisabled}>
        <View
          style={{
            backgroundColor: isButtonDisabled ? CLUEDIN_THEME.dark_grey : CLUEDIN_THEME.white,
            padding: 10,
            borderRadius: 5,
          }}>
          <Text style={{ color: CLUEDIN_THEME.black }}>
            {isButtonDisabled
              ? `Resend OTP in ${countdown} seconds`
              : 'Resend OTP'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OTPResend;
