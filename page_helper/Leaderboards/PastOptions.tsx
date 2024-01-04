import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {CLUEDIN_THEME} from '../../utils/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PastOptions = ({setselectedYear, monthToStop}) => {
  const renderOption = (formattedDate: string, date: Date) => {
    return (
      <TouchableOpacity
        key={formattedDate}
        style={styles.optionBox}
        onPress={handlePress.bind(null, date)}>
        <View style={styles.row}>
          {/* Column 1 */}
          <View style={styles.col1}>
            <Ionicons name="bar-chart" style={{color: CLUEDIN_THEME.black, fontSize: 20}} />
          </View>

          {/* Column 2 */}
          <View style={styles.col2}>
            <Text style={styles.infoText}>CluedIn - Global Leaderboard</Text>
            <Text style={styles.optionText}>{formattedDate}</Text>
          </View>

          {/* Column 3 */}
          <View style={styles.col3}>
            <Ionicons
              name="arrow-forward-circle"
              style={{color: CLUEDIN_THEME.black, fontSize: 30}}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handlePress = (date: Date) => {
    const formattedMonthYear = `${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, '0')}${date.getUTCFullYear()}`;
    setselectedYear(formattedMonthYear);
    console.log(formattedMonthYear);
  };

  const renderPastOptions = () => {
    const startDate = new Date('2023-11-01T00:00:00Z');
    const stopDate = new Date(
      `${monthToStop.slice(2, 6)}-${monthToStop.slice(0, 2)}-01T00:00:00Z`,
    );
    stopDate.setUTCDate(stopDate.getUTCDate() - 1);

    let options = [];

    // Iterate from startDate to stopDate
    for (
      let date = new Date(startDate); // create a new instance of Date
      date <= stopDate;
      date.setUTCMonth(date.getUTCMonth() + 1)
    ) {
      const formattedMonthYear = `${(date.getUTCMonth() + 1)
        .toString()
        .padStart(2, '0')}${date.getUTCFullYear()}`;

      const formattedDate = `${date.toLocaleString('en-us', {
        month: 'short',
      })} ${date.getUTCFullYear()}`;
      options.push({formattedDate, date: new Date(date)}); // push an object with formattedDate and date
    }

    // Sort the options array in descending order based on date
    options = options.sort((a, b) => b.date.getTime() - a.date.getTime());

    return options.map(option =>
      renderOption(option.formattedDate, option.date),
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>{renderPastOptions()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // Change to column layout
  },
  optionBox: {
    backgroundColor: CLUEDIN_THEME.white,
    padding: 20,
    margin: 5,
    marginBottom: 20,
    borderRadius: 20,
  },
  optionText: {
    color: CLUEDIN_THEME.black,
    fontSize: 24,
    fontWeight: '600',
  },
  infoText: {
    color: CLUEDIN_THEME.black,
    fontSize: 14,
    fontWeight: '300',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  col1: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  col2: {
    flex: 4,
  },
  col3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PastOptions;
