import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CLUEDIN_DARK_SCHEME, CLUEDIN_THEME} from '../utils/constants';

const styles = {
  container: {
    flex: 1,
    backgroundColor: CLUEDIN_DARK_SCHEME.background,
  },
  sectionContainer: {
    backgroundColor: CLUEDIN_DARK_SCHEME.help.container1_bg,
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  sectionContainerTwo: {
    backgroundColor: CLUEDIN_DARK_SCHEME.help.container2_bg,
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  mainTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: CLUEDIN_DARK_SCHEME.help.container1_bg_text,
    margin: 10,
  },
  mainTitleTwo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: CLUEDIN_DARK_SCHEME.help.container2_bg_text,
    margin: 10,
  },
  bulletContainer: {
    marginLeft: 20,
  },
  bullet: {
    color: CLUEDIN_DARK_SCHEME.help.container1_bg_text,
    marginBottom: 5,
  },
  bulletTwo: {
    color: CLUEDIN_DARK_SCHEME.help.container2_bg_text,
    marginBottom: 5,
  },
  table: {
    borderWidth: 1,
    borderColor: CLUEDIN_THEME.light_grey,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: CLUEDIN_THEME.light_grey,
  },
  cell: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  cellText: {
    fontSize: 16,
    color: CLUEDIN_DARK_SCHEME.text_on_background,
  },
};
const iconOneCol = CLUEDIN_DARK_SCHEME.help.container1_bg_text;
const iconTwoCol = CLUEDIN_DARK_SCHEME.help.container2_bg_text;

const HelpPage = () => {
  const clueTableData = [
    ['Hard', 'Medium', 'Easy'],
    ['-10', '-20', '-30'],
  ];
  const optionTableData = [
    ['1', '2', '3', '4', '5'],
    ['-15', '-30', '-45', '-60', '-75'],
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.mainTitle}>The Game</Text>
        <View style={styles.bulletContainer}>
          <Text style={styles.bullet}>
            <Ionicons
              name="caret-forward-circle-sharp"
              style={{color: iconOneCol}}
            />{' '}
            You will be presented with 1 question each day at 2pm UTC.
          </Text>
          <Text style={styles.bullet}>
            <Ionicons
              name="caret-forward-circle-sharp"
              style={{color: iconOneCol}}
            />{' '}
            Questions of each month follow a set theme, all questions of that
            month will be of that theme.
          </Text>
          <Text style={styles.bullet}>
            <Ionicons
              name="caret-forward-circle-sharp"
              style={{color: iconOneCol}}
            />{' '}
            You must pick a clue before you can answer any questions.
          </Text>
        </View>
      </View>

      <View style={styles.sectionContainerTwo}>
        {/* Different background color */}
        <Text style={styles.mainTitleTwo}>The Points</Text>
        <View style={styles.bulletContainer}>
          <Text style={styles.bulletTwo}>
            <Ionicons
              name="caret-forward-circle-sharp"
              style={{color: iconTwoCol}}
            />{' '}
            Every day when a new question is loaded, you start with a total of
            125 points. Think of this like your budget.
          </Text>
          <Text style={styles.bulletTwo}>
            <Ionicons
              name="caret-forward-circle-sharp"
              style={{color: iconTwoCol}}
            />{' '}
            Everyday you are presented with 3 clues and 5 options. You must pick
            a clue before you can start answering. Each clue costs a certain
            amount of points, refer to the table below:
          </Text>
          <View style={styles.table}>
            {clueTableData.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, cellIndex) => (
                  <View key={cellIndex} style={styles.cell}>
                    <Text style={styles.cellText}>{cell}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
          <Text style={styles.bulletTwo}>
            <Ionicons
              name="caret-forward-circle-sharp"
              style={{color: iconTwoCol}}
            />{' '}
            Easy, Medium, and Hard take off 30, 20, & 10 points respectively.
          </Text>
          <Text style={styles.bulletTwo}>
            <Ionicons
              name="caret-forward-circle-sharp"
              style={{color: iconTwoCol}}
            />{' '}
            Once you select at least 1 clue, the ability to select an answer
            will be enabled. You must now pick at least 1 option as your answer
            to obtain a score for the day. Each option you select takes off 15
            points. The table below demonstrates number of points and
            their respective costs.
          </Text>
        
          <View style={styles.table}>
            {optionTableData.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, cellIndex) => (
                  <View key={cellIndex} style={styles.cell}>
                    <Text style={styles.cellText}>{cell}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        
          <Text style={styles.bulletTwo}>
            <Ionicons
              name="caret-forward-circle-sharp"
              style={{color: iconTwoCol}}
            />{' '}
            The highest number of points you can achieve in a day = 100 points.
            This is achieved through selecting 1 Hard Clue (125 - 10 = 115) &
            1 Option (115 - 15) {'=>'} 100 points.
          </Text>
          <Text style={styles.bulletTwo}>
            <Ionicons
              name="caret-forward-circle-sharp"
              style={{color: iconTwoCol}}
            />{' '}
            Similarly, the lowest attainable score a day = -10 points. This can be
            achieved by selecting all clues (125 - 10 - 20 - 30 = 65),
            & then selecting 5 Options (65 - 15 - 15 - 15 - 15 - 15 = -10). 
            This gives you a score of -10 points {':('}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HelpPage;
