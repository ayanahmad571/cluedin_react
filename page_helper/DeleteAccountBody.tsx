import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';

const DeleteAccountBody = () => {
  const sendEmail = () => {
    // Replace 'admin@cluedin.me' with your actual support email address
    const email = 'admin@cluedin.me';
    const subject = 'Account Deletion Request';
    const body =
      'Dear Admin,\n\nI would like to request the deletion of my account. Please assist me with the process.\n\nSincerely, [Your Name]';

    // Use `Linking` to open the user's preferred email app
    Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        We're sorry to see you go 😢 If you would like to delete your account,
        please send an email to{' '}
        <Text style={styles.emailLink} onPress={sendEmail}>
          admin@cluedin.me
        </Text>{' '}
        from the registered email address, and we will be happy to assist you.
      </Text>
      <TouchableOpacity style={styles.button} onPress={sendEmail}>
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  emailLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DeleteAccountBody;
