import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../utils/stylesHome';

const QuestionMainBody = ({question, handleAnswerButtonPress, handleClueButtonPress}) => {
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

  return (
    <>
      <View style={styles.fifthRow}>
        <View style={styles.boxL}>
          <Text style={styles.boxTextTitle}>Clues</Text>
          <Text style={styles.boxTextNormal}>
            Picking the hardest clue maximizes your chances of scoring the
            highest point. Picking a clue deducts points based on the Clue
            Rating Matrix (Point Matrix).
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
            Lets answer - You must pick a clue before you can begin answering
            and remember, you have 5 total attempts (Point Matrix). Happy
            guessing !
          </Text>
        </View>
      </View>
      <View style={styles.eightRow}>{renderAnswerRows()}</View>
    </>
  );
};

export default QuestionMainBody;
