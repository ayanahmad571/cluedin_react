import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  RefreshControl,
  AppState,
} from 'react-native';
import OverlayComponent from '../utils/OverlayComponent';
import {styles} from '../utils/stylesHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL, CLUEDIN_DARK_SCHEME} from '../utils/constants';
import AuthContext from '../utils/AuthContext';
import OverlayAnswerComponent from '../utils/OverlayAnswerComponent';
import ScoreBody from '../utils/ScoreBody';
import HomeTopInfoRow from '../page_helper/HomeTopInfoRow.tsx';
import QuestionMainBody from '../page_helper/QuestionMainBody';
import {appStateJS} from '../utils/appStateScript';
import PushNotification from 'react-native-push-notification';
import ErrorPageBody from '../utils/ErrorPageBody';

const Home = () => {
  const [countdown, setCountdown] = useState('00:00:00');
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showAnswerOverlay, setShowAnswerOverlay] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [question, setQuestion] = useState('');
  const [errorMsg, setErrorMsg] = useState('Page is Loading ...');
  const {user, setUser} = useContext(AuthContext);
  const [answerOption, setAnswerOption] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const appState = useRef(AppState.currentState);
  const [refreshCount, setrefreshCount] = useState(1);

  const handleRefresh = () => {
    setRefreshing(true); // Show the loading indicator
    setrefreshCount(refreshCount + 1);
    PushNotification.removeAllDeliveredNotifications();
    PushNotification.setApplicationIconBadgeNumber(0);
    // Perform data fetching or any other async operation
    fetchTodayQuestion()
      .then(() => {
        setRefreshing(false); // Hide the loading indicator when done
      })
      .catch(error => {
        setRefreshing(false); // Make sure to hide it even in case of an error
        // console.error('Error while refreshing:', error);
      });
  };

  const handleClueButtonPress = async id => {
    setSelectedId(id);
    setShowOverlay(true);
  };

  const fetchTodayQuestion = async () => {
    try {
      const jwtUser = await AsyncStorage.getItem('JWT_USER');

      if (!jwtUser) {
        setUser('');
        setErrorMsg('User authorization needed to view this page.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/today_question`, {
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
        const keysToCheck = [
          'clues_used',
          'clues_used_values',
          'complete',
          'answer',
          'options_used',
          'question_raw',
          'today_points',
        ];

        // Iterate through the keys and check if they exist in the data
        for (const key of keysToCheck) {
          if (!(key in data)) {
            throw new Error('Response key invalid');
          }
        }

        const keysCluesUsed = ['1', '2', '3'];
        const keysCluesUsedVals = ['1', '2', '3'];
        const keysOptionsUsed = ['1', '2', '3', '4', '5'];
        const keysQuestionRaw = [
          'master_title',
          'day',
          'theme',
          'option_5',
          'option_4',
          'option_3',
          'option_2',
          'option_1',
          'question_id',
        ];

        // Iterate through the keys and check if they exist in the data
        for (const key of keysCluesUsed) {
          if (!(key in data.clues_used)) {
            throw new Error('Response key invalid');
          }
        }
        for (const key of keysCluesUsedVals) {
          if (!(key in data.clues_used_values)) {
            throw new Error('Response key invalid');
          }
        }
        for (const key of keysOptionsUsed) {
          if (!(key in data.options_used)) {
            throw new Error('Response key invalid');
          }
        }
        for (const key of keysQuestionRaw) {
          if (!(key in data.question_raw)) {
            throw new Error('Response key invalid');
          }
        }
        setQuestion(data);
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

  // Function to handle the answer button press
  const handleAnswerButtonPress = async rowNumber => {
    setSelectedAnswerId(rowNumber);
    setShowAnswerOverlay(true);
  };


  useEffect(() => {
    fetchTodayQuestion(); // Ensure this is called only once on component mount
    PushNotification.removeAllDeliveredNotifications();
    PushNotification.setApplicationIconBadgeNumber(0);
  }, []); // Empty dependency array means this effect runs once on mount

  appStateJS(appState, handleRefresh);

  return errorMsg === '' ? (
    <View style={{flex: 1, backgroundColor: CLUEDIN_DARK_SCHEME.background}}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#000']} // Customize the loading indicator color
            tintColor='white'
          />
        }>
        <View style={styles.container}>
          <HomeTopInfoRow
            handleRefresh={handleRefresh}
            setCountdown={setCountdown}
            question={question}
            countdown={countdown}
          />
          {question.complete === '0' ? (
            <QuestionMainBody
              question={question}
              handleAnswerButtonPress={handleAnswerButtonPress}
              handleClueButtonPress={handleClueButtonPress}
            />
          ) : (
            <ScoreBody
              question={question}
              fetchTodayQuestion={fetchTodayQuestion}
              refreshCount={refreshCount}
            />
          )}

          <Modal visible={showOverlay} transparent animationType="slide">
            <OverlayComponent
              id={selectedId}
              question={question}
              user={user}
              setQuestion={setQuestion}
              onClose={() => setShowOverlay(false)}
            />
          </Modal>
          <Modal visible={showAnswerOverlay} transparent animationType="slide">
            <OverlayAnswerComponent
              id={selectedAnswerId}
              question={question}
              user={user}
              setQuestion={setQuestion}
              onClose={() => setShowAnswerOverlay(false)}
            />
          </Modal>
        </View>
      </ScrollView>
    </View>
  ) : (
    <ErrorPageBody errorMsg={errorMsg} />
  );
};

export default Home;
