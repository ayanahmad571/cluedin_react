import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CLUEDIN_THEME} from '../../utils/constants';

const PastOptions = ({setselectedYear, monthToStop}) => {
  const renderOption = (formattedDate: string, date: Date) => {
    return (
      <TouchableOpacity
        key={formattedDate}
        style={styles.optionBox}
        onPress={handlePress.bind(null, date)}>
        <Text style={styles.optionText}>{formattedDate}</Text>
      </TouchableOpacity>
    );
  };

  const handlePress = (date: Date) => {
    const formattedMonthYear = `${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, '0')}${date.getUTCFullYear()}`;
    // setselectedYear(parseInt(formattedMonthYear, 10));
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

  return <View style={styles.container}>{renderPastOptions()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // Change to column layout
  },
  optionBox: {
    backgroundColor: CLUEDIN_THEME.white,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  optionText: {
    color: CLUEDIN_THEME.black,
    fontSize: 20,
  },
});

export default PastOptions;
