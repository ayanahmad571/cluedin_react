import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {API_BASE_URL} from './constants';

const OverlayComponent = ({id, onClose, question, setQuestion, user}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorClueMsg, setErrorClueMsg] = useState('');
  const difficulty =
    id === 1 ? 'Easy' : id === 2 ? 'Medium' : id === 3 ? 'Hard' : '';

  useEffect(() => {
    const getClueApi = async () => {
      try {
        const requestBody = `clue_id=${id}`;

        const response = await fetch(`${API_BASE_URL}/fetch_clue`, {
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
          const keysToCheck = ['clues_used', 'clues_used_values'];

          // Iterate through the keys and check if they exist in the data
          for (const key of keysToCheck) {
            if (!(key in data)) {
              throw new Error('Response key invalid');
            }
          }

          const keysCluesUsed = ['1', '2', '3'];
          const keysCluesUsedVals = ['1', '2', '3'];

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
          const tempQ = question;
          tempQ.clues_used = data.clues_used;
          tempQ.clues_used_values = data.clues_used_values;
          setQuestion(tempQ);
          setIsLoading(false);
        } else {
          // Handle the error cases as needed
          setErrorClueMsg('Failed to fetch the clue');
        }
      } catch (error) {
        setErrorClueMsg(
          'You network is unstable, please try again at a later time',
        );
      }
    };

    // Send a request to your API using the provided id
    // For demonstration, we'll simulate an API response after 2 seconds
    if (question.clues_used[id] === '0') {
      getClueApi();
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
        {errorClueMsg !== '' ? (
          <Text style={styles.apiResponse}>{errorClueMsg}</Text>
        ) : isLoading ? (
          <Text style={styles.loadingText}>
            Please Wait: Extracting Clue from the Cloud ...
          </Text>
        ) : (
          <Text style={styles.apiResponse}>
            <Text style={styles.apiResponseHeader}>{difficulty} Clue: </Text>
            {question.clues_used_values[id]}
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

export default OverlayComponent;
