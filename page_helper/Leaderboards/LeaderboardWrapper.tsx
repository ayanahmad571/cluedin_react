import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  AppState,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import RankDisplayBox from '../../utils/RankDisplayBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../utils/AuthContext';
import {
  API_BASE_URL,
  CLUEDIN_DARK_SCHEME,
  CLUEDIN_THEME,
} from '../../utils/constants';
import {appStateJS} from '../../utils/appStateScript';
import LeaderboardItem from './LeaderboardItem';
import ErrorPageBody from '../../utils/ErrorPageBody';
import LoadingPageBody from '../../utils/LoadingPageBody';
// Create the RankDisplayBox component

const LeaderboardWrapper = ({monthYear}) => {
  // Dummy data for RankDisplay boxes
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState('');
  const [errorMsg, setErrorMsg] = useState('Page is Loading ...');
  const [refreshing, setRefreshing] = useState(false);
  const {user, setUser} = useContext(AuthContext);
  const appState = useRef(AppState.currentState);
  const [activeButton, setActiveButton] = useState(1);

  const handleRefresh = () => {
    // console.log('Current Leaderboard Refresh');
    setRefreshing(true); // Show the loading indicator
    setLoading(true);

    // Perform data fetching or any other async operation
    getLeaderBoard()
      .then(() => {
        setRefreshing(false); // Hide the loading indicator when done
        setLoading(false);
      })
      .catch(error => {
        setRefreshing(false); // Make sure to hide it even in case of an error
        setErrorMsg('Error while refreshing:');
        setLoading(false);
      });
  };

  const getLeaderBoard = async () => {
    try {
      // console.log('this is: ', monthYear);
      const jwtUser = await AsyncStorage.getItem('JWT_USER');

      if (!jwtUser) {
        setUser('');
        setErrorMsg('User authorization needed to view this page.');
        setLoading(false);
        return;
      }

      const requestBody = `month_year=${monthYear}`;
      const response = await fetch(`${API_BASE_URL}/get_leaderboard_from_id`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody,
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
        setLoading(false);
      } else if (response.status === 401 || response.status === 403) {
        setErrorMsg(
          'Your login session has been terminated. Please Re-Login to continue.',
        );
        setLoading(false);
      } else if (response.status === 500) {
        setErrorMsg('Internal Server Error - Please contact admin');
        setLoading(false);
      } else {
        setErrorMsg('An error occurred - Please contact admin');
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg(
        'Your internet connection is unstable, please re-load the app at a later time!',
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getLeaderBoard(); // Ensure this is called only once on component mount
  }, [monthYear]); // Empty dependency array means this effect runs once on mount

  appStateJS(appState, handleRefresh);

  return loading ? (
    <LoadingPageBody />
  ) : (
    <View style={{flex: 1, backgroundColor: CLUEDIN_DARK_SCHEME.background}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#000']} // Customize the loading indicator color
            tintColor="white"
          />
        }>
        <View style={styles.container}>
          {errorMsg === '' ? (
            <LeaderboardItem leaderboard={leaderboard} />
          ) : (
            <ErrorPageBody errorMsg={errorMsg} />
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
  },
});

export default LeaderboardWrapper;
