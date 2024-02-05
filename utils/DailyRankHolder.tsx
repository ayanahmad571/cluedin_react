import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from './stylesHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL, CLUEDIN_DARK_SCHEME, CLUEDIN_THEME} from './constants';
import AuthContext from './AuthContext';
import ErrorPageBody from './ErrorPageBody';
import LoadingPageBody from './LoadingPageBody';
import DailyRankComponents from './DailyRankComponents';

const DailyRankHolder = ({refreshCount}) => {
  const [errorMsg, setErrorMsg] = useState('Page is Loading ...');
  const {user, setUser} = useContext(AuthContext);
  const [currentUserData, setcurrentUserData] = useState([]);
  const [allUserData, setallUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDailyLeaderboard = async () => {
    try {
      const jwtUser = await AsyncStorage.getItem('JWT_USER');

      if (!jwtUser) {
        setUser('');
        setErrorMsg('User authorization needed to view this page.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/get_daily_performance`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtUser}`,
        },
      });

      if (response.status === 200) {
        // Successful response, parse and set the question
        const data = await response.json();
        const keysToCheck = ['cu_usr', 'all_usrs'];

        // Iterate through the keys and check if they exist in the data
        for (const key of keysToCheck) {
          if (!(key in data)) {
            throw new Error('Response key invalid');
          }
        }
        setcurrentUserData(data.cu_usr);
        const sortedAr = sortAllArray(data.all_usrs);
        setallUserData(sortedAr);
        setErrorMsg('');
      } else if (response.status === 401 || response.status === 403) {
        setErrorMsg(
          'Your login session has been terminated. Please Re-Login to continue.',
        );
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

  const sortAllArray = inAr => {
    if (inAr.length > 0) {
      const sortedRanks = [...JSON.parse(inAr)].sort((a, b) => b[3] - a[3]);
      return sortedRanks;
    } else {
      const basicAr = [[[0, 0, 0], [0, 0, 0, 0, 0], 'N/A', 0]];
      return basicAr;
    }
  };

  const loadDailyRank = async () => {
    setLoading(true);
    console.log('fetch daily called');
    await fetchDailyLeaderboard(); // Ensure this is called only once on component mount
    console.log('fetch daily and sorted ended');
    setLoading(false);
  };

  useEffect(() => {
    loadDailyRank();
  }, [refreshCount]);

  return errorMsg === '' ? (
    <View>
      {loading === true ? (
        <View style={{marginTop: 20}}>
          <LoadingPageBody />
        </View>
      ) : (
        <DailyRankComponents allData={allUserData} curData={currentUserData} />
      )}
    </View>
  ) : (
    <ErrorPageBody errorMsg={errorMsg} />
  );
};

export default DailyRankHolder;
