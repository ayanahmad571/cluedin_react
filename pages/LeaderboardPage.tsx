import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, RefreshControl, AppState} from 'react-native';
import RankDisplayBox from '../utils/RankDisplayBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../utils/AuthContext';
import {
  API_BASE_URL,
  CLUEDIN_DARK_SCHEME,
  CLUEDIN_THEME,
} from '../utils/constants';
import {appStateJS} from '../utils/appStateScript';
// Create the RankDisplayBox component

const LeaderboardPage = () => {
  // Dummy data for RankDisplay boxes
  const [leaderboard, setLeaderboard] = useState('');
  const [errorMsg, setErrorMsg] = useState('Page is Loading ...');
  const [refreshing, setRefreshing] = useState(false);
  const {user, setUser} = useContext(AuthContext);
  const appState = useRef(AppState.currentState);

  const handleRefresh = () => {
    setRefreshing(true); // Show the loading indicator

    // Perform data fetching or any other async operation
    getLeaderBoard()
      .then(() => {
        setRefreshing(false); // Hide the loading indicator when done
      })
      .catch(error => {
        setRefreshing(false); // Make sure to hide it even in case of an error
        setErrorMsg('Error while refreshing:');
      });
  };

  const getLeaderBoard = async () => {
    try {
      const jwtUser = await AsyncStorage.getItem('JWT_USER');

      if (!jwtUser) {
        setUser('');
        setErrorMsg('User authorization needed to view this page.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/get_leaderboard`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtUser}`,
        },
      });
      // console.log('The API has been called');

      if (response.status === 200) {
        // Successful response, parse and set the question
        const data = await response.json();
        // console.log(data);
        const keysToCheck = ['leaderboard', 'user_rank', 'user_points'];

        // Iterate through the keys and check if they exist in the data
        for (const key of keysToCheck) {
          if (!(key in data)) {
            throw new Error('Response key invalid');
          }
        }

        setLeaderboard(data);
        setErrorMsg('');
      } else if (response.status === 500) {
        setErrorMsg('Internal Server Error - Please contact admin');
      } else {
        setErrorMsg('An error occurred - Please contact admin');
      }
    } catch (error) {
      setErrorMsg(
        'Your internet connection is unstable, please re-load the app at a later time!',
      );
    }
  };

  useEffect(() => {
    getLeaderBoard(); // Ensure this is called only once on component mount
  }, []); // Empty dependency array means this effect runs once on mount

  appStateJS(appState, handleRefresh);
  
  return (
    <View style={{flex: 1, backgroundColor: CLUEDIN_DARK_SCHEME.background}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#000']} // Customize the loading indicator color
            tintColor='white'
          />
        }>
        <View style={styles.container}>
          {errorMsg === '' ? (
            <>
              <View style={styles.row}>
                <Text style={styles.textSubT}>
                  Your Monthly Stats (Leaderboard is reset on the 1st of every
                  month :) )
                </Text>
              </View>
              <View style={styles.row}>
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
              </View>

              {leaderboard.leaderboard.map(data => (
                <RankDisplayBox
                  key={data.rank}
                  rank={data.rank}
                  points={data.points}
                  users={data.users}
                />
              ))}
            </>
          ) : (
            <View style={styles.row}>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>{errorMsg}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CLUEDIN_DARK_SCHEME.background,
    flex: 1,
    paddingBottom: 20,
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
});

export default LeaderboardPage;
