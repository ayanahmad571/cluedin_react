import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CLUEDIN_DARK_SCHEME } from './constants';

// Create the RankDisplayBox component
const RankDisplayBox = ({rank, users, points}) => {
  return (
    <View style={styles.rankDisplayBox}>
      <Text style={styles.rankTitle}>
        Rank: {rank}, Points: {points}
      </Text>
      {users.map((user, index) => (
        <Text key={index} style={styles.rankUser}>
          <Ionicons name="accessibility" style={{color: 'white'}} /> {user}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  rankDisplayBox: {
    backgroundColor: CLUEDIN_DARK_SCHEME.leader.rank_bg,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  rankTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: CLUEDIN_DARK_SCHEME.leader.rank_bg_text,
  },
  rankUser: {
    fontSize: 18,
    color: CLUEDIN_DARK_SCHEME.leader.rank_bg_text,
  },
});

export default RankDisplayBox;
