import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {API_BASE_URL} from './constants';

const OverlayAnswerComponent = ({id, onClose, question, setQuestion, user}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorOptionMsg, setErrorOptionMsg] = useState('');
  const ansTextDisplay = ['Incorrect - Try Again', 'Correct, Great Job!!'];

  useEffect(() => {
    const getAnsAPI = async () => {
      try {
        const requestBody = `option_id=${id}`;

        const response = await fetch(`${API_BASE_URL}/check_answer`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: requestBody,
        });

        if (response.status === 200) {
          // Successfully submitted the answer, update the question data
          const data = await response.json();
          const keysToCheck = ['options_used', 'complete', 'answer'];

          // Iterate through the keys and check if they exist in the data
          for (const key of keysToCheck) {
            if (!(key in data)) {
              throw new Error('Response key invalid');
            }
          }

          const keysOptionsUsed = ['1', '2', '3', '4', '5'];

          // Iterate through the keys and check if they exist in the data
          for (const key of keysOptionsUsed) {
            if (!(key in data.options_used)) {
              throw new Error('Response key invalid');
            }
          }

          const tempQ = question;
          tempQ.options_used = data.options_used;
          tempQ.complete = data.complete;
          tempQ.answer = data.answer;
          setQuestion(tempQ);
          setIsLoading(false);
        } else {
          // Handle the error cases as needed
          setErrorOptionMsg('Failed to check the answer.');
        }
      } catch (error) {
        setErrorOptionMsg(
          'You network is unstable, please try again at a later time',
        );
      }
    };

    // Send a request to your API using the provided id
    // For demonstration, we'll simulate an API response after 2 seconds
    if (question.options_used[id] === '0') {
      getAnsAPI();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  return (
    <View style={styles.overlayContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <View style={styles.overlayContent}>
        {errorOptionMsg !== '' ? (
          <Text style={styles.apiResponse}>{errorOptionMsg}</Text>
        ) : isLoading ? (
          <Text style={styles.loadingText}>
            Please Wait: Checking Answer with the Cloud ...
          </Text>
        ) : (
          <Text style={styles.apiResponse}>
            <Text style={styles.apiResponseHeader}>
              {ansTextDisplay[question['complete']]}
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'black',
  },
  overlayContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  apiResponseHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  apiResponse: {
    fontSize: 18,
  },
  loadingText: {
    fontSize: 20,
    color: 'gray',
    fontWeight: '500',
  },
});

export default OverlayAnswerComponent;
