import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CLUEDIN_THEME} from './constants';

const RankDisplayBox = ({rank, users, points, currentUser}) => {
  const [color, setColor] = useState(CLUEDIN_THEME.black);
  const [bgcolor, setbgColor] = useState(CLUEDIN_THEME.white);
  const [accentCol, setaccentCol] = useState(CLUEDIN_THEME.light_grey);

  const styles = StyleSheet.create({
    iconStyle: {
      fontSize: 18,
      color: color,
    },
    middleColumn: {
      flex: 3,
    },
    rankDisplayBox: {
      flexDirection: 'row',
      backgroundColor: bgcolor,
      margin: 15,
      marginBottom: 5,
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: accentCol,
    },
    rankColumn: {
      flex: 1,
      justifyContent: 'center',
    },
    rankCircle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: CLUEDIN_THEME.black,
      textAlign: 'center',
      borderWidth: 1,
      borderColor: accentCol,
      borderRadius: 50, // Make it a circle by setting borderRadius to half of width and height
      width: 40,
      height: 40,
      lineHeight: 38, // Center text vertically
    },
    rankUser: {
      fontSize: 16,
      color: CLUEDIN_THEME.black,
    },
    rankPoints: {
      fontSize: 16,
      fontWeight: 'bold',
      color: CLUEDIN_THEME.black,
      textAlign: 'center',
    },
  });

  useEffect(() => {
    if (rank === 1) {
      setColor('#E5B80B');
    }

    if (rank === 2) {
      setColor('#C0C0C0');
    }

    if (rank === 3) {
      setColor('#905923');
    }

    if (rank == currentUser) {
      setbgColor(CLUEDIN_THEME.orange);
      setaccentCol(CLUEDIN_THEME.white);
    }
    
  }, []);

  return (
    <View style={styles.rankDisplayBox}>
      <View style={styles.rankColumn}>
        <Text style={styles.rankCircle}>{rank}</Text>
      </View>
      <View style={styles.rankColumn}>
        <Ionicons name="game-controller" style={styles.iconStyle} />
      </View>
      <View style={[styles.rankColumn, styles.middleColumn]}>
        {users.map((user, index) => (
          <Text key={index} style={styles.rankUser}>
            {user}
          </Text>
        ))}
      </View>
      <View style={styles.rankColumn}>
        <Text style={styles.rankPoints}>{points} pts</Text>
      </View>
    </View>
  );
};

export default RankDisplayBox;
