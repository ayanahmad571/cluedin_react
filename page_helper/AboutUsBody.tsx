import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {CLUEDIN_DARK_SCHEME} from '../utils/constants';

const AboutUsBody = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to CluedIn</Text>
      <Text style={styles.description}>
        Discover the world of CluedIn, where knowledge and fun meet every day.
        Our app brings you a brand-new question daily at 2pm GMT, offering a
        chance to test your wits and learn something new.
      </Text>
      <Text style={styles.description}>
        With monthly themes that keep things exciting and a leaderboard reset on
        the first day of each month, CluedIn is the ultimate destination for
        trivia enthusiasts. Join us now and Clue In to the thrill of daily
        challenges!
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL('https://cluedin.me/privacy-policy')}>
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Linking.openURL('https://cluedin.me/terms-and-conditions')
          }>
          <Text style={styles.buttonText}>Terms and Conditions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CLUEDIN_DARK_SCHEME.background,
    padding: 20,
  },
  header: {
    color: CLUEDIN_DARK_SCHEME.text_on_background,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  description: {
    color: CLUEDIN_DARK_SCHEME.text_on_background,
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'left',
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    backgroundColor: CLUEDIN_DARK_SCHEME.about.btn_bg,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 10,
  },
  buttonText: {
    color: CLUEDIN_DARK_SCHEME.about.btn_bg_text,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AboutUsBody;
