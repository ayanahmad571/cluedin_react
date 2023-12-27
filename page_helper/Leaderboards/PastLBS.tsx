import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CLUEDIN_DARK_SCHEME, CLUEDIN_THEME} from '../../utils/constants';

const PastLBS = () => {
  return (
    <View style={styles.row}>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>This is a dummy PastLBS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default PastLBS;
