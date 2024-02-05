/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import { CLUEDIN_THEME } from './constants';

const DailyRankComponent = ({ userData, cur = false }) => {
  const bgCol = cur === false ? CLUEDIN_THEME.white : CLUEDIN_THEME.yellow;
  const txt_you = cur === false ? '' : ' (You)';

  const styles = {
    container: {
      marginBottom: 10,
      padding: 20,
      paddingTop: 10,
      backgroundColor: bgCol,
      borderRadius: 20,
    },
    username: {
      fontWeight: 'bold',
      color: CLUEDIN_THEME.black,
      fontSize: 20,
    },
    cluesUsedContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    cluesUsedLabel: {
      color: CLUEDIN_THEME.black,
      fontSize: 14,
      fontWeight: '400',
    },
    cluesUsedValue: {
      color: CLUEDIN_THEME.black,
      fontSize: 14,
      fontWeight: '600',
    },
    totalOptionsLabel: {
      color: CLUEDIN_THEME.black,
      fontSize: 14,
      fontWeight: '400',
    },
    totalOptionsValue: {
      color: CLUEDIN_THEME.black,
      fontSize: 14,
      fontWeight: '600',
    },
    points: {
      color: CLUEDIN_THEME.black,
      fontSize: 18,
      fontWeight: '700',
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{userData[2]}{txt_you}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.cluesUsedContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.cluesUsedLabel}>Clues Used: </Text>
            {userData[0][0] === 1 && <Text style={styles.cluesUsedValue}>Easy </Text>}
            {userData[0][1] === 1 && <Text style={styles.cluesUsedValue}>Medium </Text>}
            {userData[0][2] === 1 && <Text style={styles.cluesUsedValue}>Hard </Text>}
          </View>
          <View>
            <Text style={styles.totalOptionsLabel}>Total Options Used: 
              <Text style={styles.totalOptionsValue}>
                {' '}{userData[1].reduce((acc, val) => acc + val, 0)}
              </Text>
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.points}>{userData[3]} Pts</Text>
        </View>
      </View>
    </View>
  );
};

export default DailyRankComponent;
