import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {styles} from './stylesHome';

const ScoreBody = ({question, fetchTodayQuestion}) => {
  const cluesUsedNumber = Object.values(question.clues_used).reduce(
    (count, value) => {
      return count + (value === '1' ? 1 : 0);
    },
    0,
  );

  const optionsUsedNumber = Object.values(question.options_used).reduce(
    (count, value) => {
      return count + (value === '1' ? 1 : 0);
    },
    0,
  );

  const getUsedCluesString = question => {
    const complexities = {
      '1': 'Easy',
      '2': 'Medium',
      '3': 'Hard',
    };

    const usedClueComplexities = [];

    for (const key in question.clues_used) {
      if (question.clues_used[key] === '1') {
        usedClueComplexities.push(complexities[key]);
      }
    }

    if (usedClueComplexities.length === 0) {
      return 'No Clues Used';
    }

    return `(${usedClueComplexities.join(', ')})`;
  };

  const usedCluesString = getUsedCluesString(question);

  useEffect(() => {
    fetchTodayQuestion(); // Ensure this is called only once on component mount
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <View style={styles.sevenRow}>
        <View style={styles.boxL}>
          <Text style={styles.boxTextTitle}>Congratulations !!</Text>
          <Text style={styles.boxTextNormal}>
            You have finished todays quiz!! Below are the answers for today.
          </Text>
          <Text style={styles.boxTextNormal}>
            <Text style={{fontWeight: 'bold'}}> Question:</Text>{' '}
            {question.question_raw.master_title}
          </Text>
          <Text style={styles.boxTextNormal}>
            <Text style={{fontWeight: 'bold'}}> Clue 1 (Easy):</Text>{' '}
            {question.clues_used_values['1']}
          </Text>
          <Text style={styles.boxTextNormal}>
            <Text style={{fontWeight: 'bold'}}> Clue 2 (Medium):</Text>{' '}
            {question.clues_used_values['2']}
          </Text>
          <Text style={styles.boxTextNormal}>
            <Text style={{fontWeight: 'bold'}}> Clue 3 (Hard):</Text>{' '}
            {question.clues_used_values['3']}
          </Text>
          <Text style={styles.boxTextNormal}>
            <Text style={{fontWeight: 'bold'}}> Answer:</Text>{' '}
            {question.question_raw[`option_${question.answer}`]}
          </Text>
        </View>
      </View>
      <View style={styles.sixthRow}>
        <View style={styles.boxL}>
          <Text style={styles.boxTextTitle}>Performance - (100 points)</Text>
          <Text style={styles.boxTextNormal}>
            Below is an analysis of your performance today, checkout the
            leaderboard for your ranking !
          </Text>
          <Text style={styles.boxTextNormal}>
            <Text style={{fontWeight: 'bold'}}> Clues Used:</Text>{' '}
            {cluesUsedNumber} - {usedCluesString}
          </Text>
          <Text style={styles.boxTextNormal}>
            <Text style={{fontWeight: 'bold'}}> Number of Options Used:</Text>{' '}
            {optionsUsedNumber}
          </Text>
          <Text style={styles.boxTextNormal}>
            <Text style={{fontWeight: 'bold'}}> Total Points Obtained:</Text>{' '}
            {'TODO: Val to be Added'}
          </Text>
        </View>
      </View>
    </>
  );
};

export default ScoreBody;
