import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  sectionContainer: {
    backgroundColor: '#B57F50', // Change to the desired background color
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  mainTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    margin: 10,
  },
  bulletContainer: {
    marginLeft: 20,
  },
  bullet: {
    color: 'white',
    marginBottom: 5,
  },
};

const HelpPage = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.mainTitle}>Rules</Text>
        <View style={styles.bulletContainer}>
          <Text style={styles.bullet}>
            <Ionicons name='caret-forward-circle-sharp' style={{color: 'white'}}  /> You will be presented with 1 question each day at 2pm UTC.
          </Text>
          <Text style={styles.bullet}>
            <Ionicons name='caret-forward-circle-sharp' style={{color: 'white'}}  /> Questions of each month follow a set theme, all questions of that
            month will be of that theme.
          </Text>
          <Text style={styles.bullet}>
            <Ionicons name='caret-forward-circle-sharp' style={{color: 'white'}}  /> You must pick a clue before you can answer any questions.
          </Text>
        </View>
      </View>

      <View style={{...styles.sectionContainer, backgroundColor: '#4B543B'}}>
        {/* Different background color */}
        <Text style={styles.mainTitle}>Points</Text>
        <View style={styles.bulletContainer}>
          <Text style={styles.bullet}>
          <Ionicons name='caret-forward-circle-sharp' style={{color: 'white'}}  /> You start with a total of 125 points.
          </Text>
          <Text style={styles.bullet}><Ionicons name='caret-forward-circle-sharp' style={{color: 'white'}}  /> Hard clue takes off 10 points.</Text>
          <Text style={styles.bullet}><Ionicons name='caret-forward-circle-sharp' style={{color: 'white'}}  /> Medium takes off 20 points.</Text>
          <Text style={styles.bullet}><Ionicons name='caret-forward-circle-sharp' style={{color: 'white'}}  /> Easy takes off 30 points.</Text>
          <Text style={styles.bullet}>
            <Ionicons name='caret-forward-circle-sharp' style={{color: 'white'}}  /> Each answer you guess takes off 15 points.
          </Text>
          <Text style={styles.bullet}>
            <Ionicons name='caret-forward-circle-sharp' style={{color: 'white'}}  /> So best case scenario = Hard Clue and 1 guess, this gives you a
            full score = 100 points.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HelpPage;
