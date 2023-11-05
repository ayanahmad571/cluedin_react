import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  RefreshControl,
} from 'react-native';
import OverlayComponent from '../utils/OverlayComponent';
import {styles} from '../utils/stylesHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from '../utils/constants';
import AuthContext from '../utils/AuthContext';
import OverlayAnswerComponent from '../utils/OverlayAnswerComponent';
import ScoreBody from '../utils/ScoreBody';

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

  const handleRefresh = () => {
    setRefreshing(true); // Show the loading indicator

    // Perform data fetching or any other async operation
    fetchTodayQuestion()
      .then(() => {
        setRefreshing(false); // Hide the loading indicator when done
      })
      .catch(error => {
        setRefreshing(false); // Make sure to hide it even in case of an error
        console.error('Error while refreshing:', error);
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
      console.log('The API has been called');

      if (response.status === 200) {
        // Successful response, parse and set the question
        const data = await response.json();
        console.log(data);
        const keysToCheck = [
          'clues_used',
          'clues_used_values',
          'complete',
          'answer',
          'options_used',
          'question_raw',
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
  // Function to update the countdown
  const updateCountdown = () => {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setUTCHours(14, 0, 0, 0);
    if (targetTime <= now) {
      targetTime.setUTCDate(targetTime.getUTCDate() + 1);
    }
    const timeDiff = targetTime - now;
    const hoursRemaining = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesRemaining = Math.floor(
      (timeDiff % (1000 * 60 * 60)) / (1000 * 60),
    );
    const secondsRemaining = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${String(hoursRemaining).padStart(2, '0')}:${String(
      minutesRemaining,
    ).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;
  };

  // Function to handle the answer button press
  const handleAnswerButtonPress = async rowNumber => {
    setSelectedAnswerId(rowNumber);
    setShowAnswerOverlay(true);
  };

  // Render the rows with answer buttons
  const renderAnswerRows = () => {
    const rows = [];
    let ansDisabled = true;
    if (
      question.clues_used['1'] === '1' ||
      question.clues_used['2'] === '1' ||
      question.clues_used['3'] === '1'
    ) {
      ansDisabled = false;
    }
    for (let i = 1; i <= 5; i++) {
      const optionKey = `option_${i}`;
      const isAnsUsed = question.options_used[i] === '1';
      rows.push(
        <View key={i} style={styles.optionRow}>
          <Text style={styles.optionRowText}>Option {i}</Text>
          <TouchableOpacity
            disabled={ansDisabled || isAnsUsed}
            style={[
              ansDisabled ? styles.disabledButtonAnswer : styles.buttonAnswer,
              isAnsUsed ? styles.usedAnsButton : null,
            ]}
            onPress={() => handleAnswerButtonPress(i)}>
            <Text
              style={isAnsUsed ? styles.usedAnsButtonText : styles.buttonText}>
              {question.question_raw[optionKey]}
            </Text>
          </TouchableOpacity>
        </View>,
      );
    }

    return rows;
  };

  // Render the rows with answer buttons
  const renderClueRows = () => {
    const clue_master = ['Easy', 'Medium', 'Hard'];
    const rows = [];
    for (let i = 1; i <= 3; i++) {
      const isClueUsed = question.clues_used[i] === '1';
      rows.push(
        <TouchableOpacity
          key={'c' + i}
          style={[styles.button, isClueUsed ? styles.usedClueButton : null]}
          onPress={() => handleClueButtonPress(i)} // 1 for Easy
        >
          <Text style={styles.buttonText}>{clue_master[i - 1]}</Text>
        </TouchableOpacity>,
      );
    }

    return rows;
  };

  useEffect(() => {
    fetchTodayQuestion(); // Ensure this is called only once on component mount

    const interval = setInterval(() => {
      setCountdown(updateCountdown());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return errorMsg === '' ? (
    <View style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: 'black'}}
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#000']} // Customize the loading indicator color
          />
        }>
        <View style={styles.container}>
          <View style={styles.firstRow}>
            <View style={styles.box}>
              <Text style={styles.boxText}>Day</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxText}>Next Refresh In</Text>
            </View>
          </View>
          <View style={styles.secondRow}>
            <View style={styles.box}>
              <Text style={styles.boxText}>{question.question_raw.day}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.countdown}>{countdown}</Text>
            </View>
          </View>
          <View style={styles.thirdRow}>
            <View style={styles.box}>
              <Text style={styles.boxTextL}>
                Theme:{' '}
                <Text style={{fontWeight: 'bold'}}>
                  {question.question_raw.theme}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.forthRow}>
            <View style={styles.box}>
              <Text style={styles.boxTextL}>
                Today's Question:{' '}
                <Text style={{fontWeight: 'bold'}}>
                  {question.question_raw.master_title}
                </Text>
              </Text>
            </View>
          </View>
          {question.complete === '0' ? (
            <>
              <View style={styles.fifthRow}>
                <View style={styles.boxL}>
                  <Text style={styles.boxTextTitle}>Clues</Text>
                  <Text style={styles.boxTextNormal}>
                    Picking the hardest clue maximizes your chances of scoring
                    the highest point. Picking a clue deducts points based on
                    the Clue Rating Matrix (Point Matrix).
                  </Text>
                </View>
              </View>
              <View style={styles.sixthRow}>
                <View style={styles.buttonContainer}>{renderClueRows()}</View>
              </View>
              <View style={styles.sevenRow}>
                <View style={styles.boxL}>
                  <Text style={styles.boxTextTitle}>Answer</Text>
                  <Text style={styles.boxTextNormal}>
                    Lets answer - You must pick a clue before you can begin
                    answering and remember, you have 5 total attempts (Point
                    Matrix). Happy guessing !
                  </Text>
                </View>
              </View>
              <View style={styles.eightRow}>{renderAnswerRows()}</View>
            </>
          ) : (
            <ScoreBody
              question={question}
              fetchTodayQuestion={fetchTodayQuestion}
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
    <View style={styles.container}>
      <View style={styles.fifthRow}>
        <Text>{errorMsg}</Text>
      </View>
    </View>
  );
};

export default Home;
