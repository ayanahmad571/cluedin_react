import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CLUEDIN_DARK_SCHEME} from '../utils/constants';

const NavHome = ({route, navigation}) => {
  const renderBox = (title, chevron, isPremium, routeName = 'Soon') => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(routeName)}
        style={styles.halfRow}>
        <View
          style={[
            styles.boxContainer,
            isPremium && styles.premiumBox,
            !isPremium && styles.notPremiumBox,
          ]}>
          <Text style={styles.boxTitle}>{title}</Text>
          <Ionicons name={chevron} size={16} style={styles.iconStyle} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick a Journey</Text>
      <ScrollView>
        <Text style={styles.subject}>Our Classics</Text>
        <View style={styles.row}>
          {renderBox('Daily Trivia', 'calendar-number-sharp', false, 'Home')}
          {renderBox('Suggestions', 'add-circle', false)}
        </View>
        <View style={styles.row}>
          {renderBox('Standard Offline Edition', 'cloud-download', false)}
          {renderBox('Wallet', 'wallet', false)}
        </View>

        <Text style={styles.subject}>CluedIn Premiums</Text>
        <View style={styles.row}>
          {renderBox('CluedIn Leagues', 'trophy', true)}
          {renderBox('Community Trivia', 'globe-outline', true)}
        </View>
        <View style={styles.row}>
          {renderBox('Multi-Player', 'people', true)}
          {renderBox('Offline Trivia', 'cloud-download', true)}
        </View>

        <Text style={styles.subject}>General Admin</Text>
        <View style={styles.row}>
          {renderBox('Help', 'help', false, 'Help')}
          {renderBox('Settings', 'settings', false, 'Settings')}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CLUEDIN_DARK_SCHEME.navigator.background,
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'left',
    marginTop: 20,
    fontWeight: '800',
    color: CLUEDIN_DARK_SCHEME.navigator.backgroundText,
    marginBottom: 10,
  },
  subject: {
    fontSize: 18,
    textAlign: 'right',
    marginTop: 10,
    fontWeight: '500',
    color: CLUEDIN_DARK_SCHEME.navigator.backgroundText,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfRow: {
    width: '48%', // Adjust as needed to leave a small gap between boxes
    backgroundColor: CLUEDIN_DARK_SCHEME.navigator.box,
    borderRadius: 10,
  },
  boxContainer: {
    backgroundColor: CLUEDIN_DARK_SCHEME.navigator.box,
    padding: 15,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  notPremiumBox: {},
  premiumBox: {
    borderBottomColor: CLUEDIN_DARK_SCHEME.navigator.premiumAccent,
    borderLeftColor: CLUEDIN_DARK_SCHEME.navigator.premiumAccent,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 3,
    borderBottomWidth: 4,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: CLUEDIN_DARK_SCHEME.navigator.boxText,
  },
  boxText: {
    fontSize: 16,
    marginBottom: 5,
    color: CLUEDIN_DARK_SCHEME.navigator.boxText,
  },
  iconStyle: {
    color: CLUEDIN_DARK_SCHEME.navigator.boxText,
    fontSize: 40,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default NavHome;
