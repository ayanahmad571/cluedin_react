import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    backgroundColor: '#B57F50',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  rankTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  rankUser: {
    fontSize: 18,
    color: 'white',
  },
});

export default RankDisplayBox;
