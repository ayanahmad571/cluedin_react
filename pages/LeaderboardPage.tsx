import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  AppState,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../utils/AuthContext';
import {
  API_BASE_URL,
  CLUEDIN_DARK_SCHEME,
  CLUEDIN_THEME,
} from '../utils/constants';
import {appStateJS} from '../utils/appStateScript';
import LastMonthLB from '../page_helper/Leaderboards/LastMonthLB';
import LeaderboardWrapper from '../page_helper/Leaderboards/LeaderboardWrapper';
import LoadingPageBody from '../utils/LoadingPageBody';
// Create the RankDisplayBox component

const LeaderboardPage = () => {
  // Dummy data for RankDisplay boxes
  const appState = useRef(AppState.currentState);
  const [activeButton, setActiveButton] = useState(1);
  const [monthYear, setMonthYear] = useState('');
  const [monthPrevYear, setMonthPrevYear] = useState('');
  const [monthYearString, setMonthYearString] = useState('');
  const [monthPrevYearString, setMonthPrevYearString] = useState('');

  const handleButtonClick = buttonName => {
    console.log(buttonName);
    setActiveButton(buttonName);
    // Add logic here to render different parts of the display based on the clicked button
  };

  // Function to get short month string
  const getShortMonthString = monthNumber => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return monthNames[monthNumber - 1];
  };

  const setMonthYVars = () => {
    const currentDate = new Date();
    const currentUTCHour = currentDate.getUTCHours();

    // Adjust the current date based on UTC time
    const adjustedDate =
      currentUTCHour >= 14
        ? currentDate
        : new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    const month = String(adjustedDate.getUTCMonth() + 1).padStart(2, '0');
    const year = String(adjustedDate.getUTCFullYear());

    const currentMonthYear = `${month}${year}`;
    const currentMonthYearString =
      getShortMonthString(Number(month)) + ' ' + year.slice(-2);
    setMonthYear(currentMonthYear);
    console.log(monthYear);
    setMonthYearString(currentMonthYearString);

    // Populate the monthPrevYear variable with the value of the previous month
    const prevMonthDate = new Date(adjustedDate);
    prevMonthDate.setUTCMonth(adjustedDate.getUTCMonth() - 1);

    const prevMonth = String(prevMonthDate.getUTCMonth() + 1).padStart(2, '0');
    const prevYear = String(prevMonthDate.getUTCFullYear());

    const prevMonthYear = `${prevMonth}${prevYear}`;
    const currentMonthPrevYearString =
      getShortMonthString(Number(prevMonth)) + ' ' + prevYear.slice(-2);
    setMonthPrevYear(prevMonthYear);
    setMonthPrevYearString(currentMonthPrevYearString);
  };
  

  useEffect(() => {
    setMonthYVars();
  }, []); // Empty dependency array means this effect runs once on mount

  return (monthYear !== '') && (monthPrevYear !== '') ? (
    <View style={{flex: 1, backgroundColor: CLUEDIN_DARK_SCHEME.background}}>
      <View style={styles.row}>
        <View style={styles.navigatorRow}>
          <TouchableOpacity
            style={[styles.button, activeButton === 1 && styles.activeButton]}
            onPress={() => handleButtonClick(1)}>
            <Text style={styles.buttonText}>{monthYearString}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeButton === 2 && styles.activeButton]}
            onPress={() => handleButtonClick(2)}>
            <Text style={styles.buttonText}>{monthPrevYearString}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeButton === 3 && styles.activeButton]}
            onPress={() => handleButtonClick(3)}>
            <Text style={styles.buttonText}>Past..</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        {activeButton === 1 ? (
          <LeaderboardWrapper monthYear={monthYear} />
        ) : activeButton === 2 ? (
          <LeaderboardWrapper monthYear={monthPrevYear} />
        ) : (
          <LastMonthLB monthToStop={monthPrevYear} />
        )}
      </View>
  </View>
  ) : (
    <LoadingPageBody />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CLUEDIN_DARK_SCHEME.background,
    flex: 1,
  },
  textSubT: {
    color: CLUEDIN_DARK_SCHEME.text_on_background,
    fontWeight: '300',
    fontSize: 16,
    textAlign: 'left',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CLUEDIN_DARK_SCHEME.text_on_background,
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  infoBox: {
    backgroundColor: CLUEDIN_DARK_SCHEME.home.row2_bg,
    padding: 10,
    borderRadius: 10,
    margin: 1,
    flex: 1,
  },
  infoText: {
    fontSize: 20,
    fontWeight: '300',
    color: CLUEDIN_DARK_SCHEME.home.row2_bg_text,
  },
  rankText: {
    color: CLUEDIN_THEME.white,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  navigatorRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: CLUEDIN_THEME.dark_grey,
    padding: 5,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: '#ccc',
    flex: 1,
    alignItems: 'center',
    color: CLUEDIN_THEME.white,
    backgroundColor: CLUEDIN_THEME.dark_grey, // Change to your active color
  },
  activeButton: {
    backgroundColor: CLUEDIN_THEME.dark_grey, // Change to your active color
    borderBottomWidth: 3,
    borderBottomColor: CLUEDIN_THEME.orange,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: CLUEDIN_THEME.white,
  },
});

export default LeaderboardPage;
