import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CLUEDIN_DARK_SCHEME, CLUEDIN_THEME } from './constants';

// Create the RankDisplayBox component
const RankDisplayBox = ({rank, users, points}) => {
  return (
    <View style={styles.rankDisplayBox}>
      <Text style={styles.rankTitle}>
        Rank: {rank}, Points: {points}
      </Text>
      {users.map((user, index) => (
        <Text key={index} style={styles.rankUser}>
          <Ionicons name="accessibility" style={{color: CLUEDIN_THEME.black}} /> {rank}, Points: {points} {user}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  rankDisplayBox: {
    backgroundColor: CLUEDIN_THEME.white,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  rankTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: CLUEDIN_THEME.black,
  },
  rankUser: {
    fontSize: 16,
    color: CLUEDIN_THEME.black,
  },
});

export default RankDisplayBox;
