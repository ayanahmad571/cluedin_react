import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LeaderboardWrapper from './LeaderboardWrapper'; // Adjust the import path as needed
import { CLUEDIN_DARK_SCHEME, CLUEDIN_THEME } from '../../utils/constants';

const ShowSelectedOption = ({ setselectedYear, selectedYear }) => {
  const handleGoBack = () => {
    // Set the value from setselectedYear to 1 when "Go Back" is pressed
    setselectedYear(1);
  };

  // Function to extract month and year from selectedYear
  const getMonthYearText = () => {
    const year = selectedYear.slice(-4);
    const month = selectedYear.length === 6 ? selectedYear.slice(0, 2) : selectedYear.slice(0, 1);
    const monthName = new Date(`${year}-${month}-01`).toLocaleString('en-us', { month: 'long' });
    return { month: monthName, year };
  };

  const { month, year } = getMonthYearText();

  return (
    <View style={styles.masterContainer}>
      <View style={styles.row}>
        <View style={styles.goBackButtonContainer}>
          <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
            <Text style={styles.textC}>Go Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.monthYearContainer}>
          <Text style={styles.monthText}>{month} {year}</Text>
        </View>
      </View>

      <View style={styles.rowLeader}>
        <LeaderboardWrapper monthYear={selectedYear} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  masterContainer: {
    flexDirection: 'column',
    height: '100%',
  },
  rowLeader: {
    flexDirection: 'row',
    flex: 1,
  },
  textC: {
    color: CLUEDIN_DARK_SCHEME.background,
    fontWeight: '600',
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  goBackButtonContainer: {
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  goBackButton: {
    borderRadius: 20,
    padding: 15,
    backgroundColor: CLUEDIN_THEME.white,
  },
  monthYearContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  monthText: {
    color: CLUEDIN_DARK_SCHEME.text_on_background,
    fontSize: 20,
    fontWeight: 'bold',
  },
  yearText: {
    color: CLUEDIN_DARK_SCHEME.text_on_background,
    fontSize: 15,
  },
});

export default ShowSelectedOption;
