import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import RankDisplayBox from '../../utils/RankDisplayBox';
import {CLUEDIN_DARK_SCHEME, CLUEDIN_THEME} from '../../utils/constants';
// Create the RankDisplayBox component

const LeaderboardItem = ({leaderboard}) => {
  const [firstPoints, setfirstPoints] = useState(0);
  const [secondPoints, setsecondPoints] = useState(0);
  const [thirdPoints, setthirdPoints] = useState(0);
  const [secondMargin, setsecondMargin] = useState(50);
  const [thirdMargin, setthirdMargin] = useState(50);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: CLUEDIN_DARK_SCHEME.background,
      flex: 1,
      paddingBottom: 20,
    },
    containerRanks: {
      backgroundColor: CLUEDIN_THEME.white,
      flex: 1,
      paddingBottom: 20,
      marginRight: 10,
      marginLeft: 10,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
    },
    textSubT: {
      color: CLUEDIN_DARK_SCHEME.text_on_background,
      fontWeight: '300',
      fontSize: 16,
      textAlign: 'left',
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: CLUEDIN_DARK_SCHEME.text_on_background,
      margin: 10,
    },
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
    rankText: {
      color: CLUEDIN_THEME.white,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '700',
    },
    navigatorRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: CLUEDIN_THEME.dark_grey,
      padding: 5,
      borderRadius: 10,
      marginRight: 10,
      marginLeft: 10,
    },
    button: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 5,
      backgroundColor: '#ccc',
      flex: 1,
      alignItems: 'center',
      color: CLUEDIN_THEME.white,
      backgroundColor: CLUEDIN_THEME.dark_grey, // Change to your active color
    },
    activeButton: {
      backgroundColor: CLUEDIN_THEME.dark_grey, // Change to your active color
      borderBottomWidth: 3,
      borderBottomColor: CLUEDIN_THEME.orange,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: CLUEDIN_THEME.white,
    },
    leaderRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 5,
      borderRadius: 10,
      marginRight: 10,
      marginLeft: 10,
    },
    leaderCol: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    thirdCol: {
      color: CLUEDIN_THEME.white,
      justifyContent: 'flex-end',
      // flex: 1,
      backgroundColor: CLUEDIN_THEME.yellow,
      paddingTop: thirdMargin,
      paddingBottom: 5,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      opacity: 0.7,
      borderBottomLeftRadius: 10,
    },
    secondCol: {
      color: CLUEDIN_THEME.white,
      // flex: 1,
      backgroundColor: CLUEDIN_THEME.yellow,
      opacity: 0.8,
      paddingTop: secondMargin,
      paddingBottom: 5,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    firstCol: {
      color: CLUEDIN_THEME.white,
      // flex: 1,
      backgroundColor: CLUEDIN_THEME.yellow,
      paddingTop: 50,
      paddingBottom: 5,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    pointsText: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      color: CLUEDIN_THEME.white,
    },
    pointsInfo: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '300',
      color: CLUEDIN_THEME.dark_grey,
    },
  });

  const diffFromFirst = (first, current) => {
    const percentageDiff = (1 - (first - current) / first) * 50;
    console.log(percentageDiff);
    return percentageDiff;
  };

  const extractRankVal = (leaderboardObj, rank) => {
    // Check if leaderboardObj.leaderboard is not empty and rank is a valid index
    if (
      leaderboardObj.leaderboard &&
      leaderboardObj.leaderboard.length > 0 &&
      rank <= leaderboardObj.leaderboard.length
    ) {
      const rankObj = leaderboardObj.leaderboard[rank - 1];

      // Check if the rankObj exists
      if (rankObj) {
        return rankObj.points;
      }
    }

    return 'N/A';
  };

  useEffect(() => {
    const firstVal = extractRankVal(leaderboard, 1);
    const secondVal = extractRankVal(leaderboard, 2);
    const thirdVal = extractRankVal(leaderboard, 3);

    setfirstPoints(firstVal);
    setsecondPoints(secondVal);
    setthirdPoints(thirdVal);

    if (firstVal !== 'N/A') {
      if (secondVal !== 'N/A') {
        const secondMarginTemp = diffFromFirst(firstVal, secondVal);
        setsecondMargin(secondMarginTemp);
      }
      if (thirdVal !== 'N/A') {
        const thirdMarginTemp = diffFromFirst(firstVal, thirdVal);
        setthirdMargin(thirdMarginTemp);
      }
    } else {
      setsecondMargin(30);
      setthirdMargin(10);
    }
  }, [leaderboard]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: CLUEDIN_DARK_SCHEME.background,
      }}>
      <View style={styles.row}>
        <View style={styles.leaderRow}>
          <View style={styles.leaderCol}>
            <View style={{flex: 1}} />
            <Text style={styles.rankText}>3rd</Text>
            <View style={styles.thirdCol}>
              <View>
                <Text style={styles.pointsText}>{thirdPoints}</Text>
                <Text style={styles.pointsInfo}>pts</Text>
              </View>
            </View>
          </View>
          <View style={styles.leaderCol}>
            <View style={{flex: 1}} />
            <Text style={styles.rankText}>1st</Text>
            <View style={styles.firstCol}>
              <View>
                <Text style={styles.pointsText}>{firstPoints}</Text>
                <Text style={styles.pointsInfo}>pts</Text>
              </View>
            </View>
          </View>
          <View style={styles.leaderCol}>
            <View style={{flex: 1}} />
            <Text style={styles.rankText}>2nd</Text>
            <View style={styles.secondCol}>
              <View>
                <Text style={styles.pointsText}>{secondPoints}</Text>
                <Text style={styles.pointsInfo}>pts</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{flex: 1, backgroundColor: CLUEDIN_DARK_SCHEME.background}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.containerRanks}>
            {/* <View style={styles.row}>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  Rank:{' '}
                  <Text style={{fontWeight: 'bold'}}>
                    {leaderboard.user_rank}
                  </Text>
                </Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  Points:{' '}
                  <Text style={{fontWeight: 'bold'}}>
                    {leaderboard.user_points}
                  </Text>
                </Text>
              </View>
            </View> */}

            {leaderboard.leaderboard.map(data => (
              <RankDisplayBox
                key={data.rank}
                rank={data.rank}
                points={data.points}
                users={data.users}
                currentUser={leaderboard.user_rank}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default LeaderboardItem;
