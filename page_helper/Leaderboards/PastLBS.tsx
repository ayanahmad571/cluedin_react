import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CLUEDIN_DARK_SCHEME, CLUEDIN_THEME} from '../../utils/constants';
import PastOptions from './PastOptions';

const LastMonthLB = ({monthToStop}) => {
  const [selectedYear, setselectedYear] = useState(1);

  return (
    <View style={styles.container}>
      {selectedYear === 1 ? (
        <PastOptions
          setselectedYear={setselectedYear}
          monthToStop={monthToStop}
        />
      ) : (
        <Text style={styles.infoText}>Current Year</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default LastMonthLB;
