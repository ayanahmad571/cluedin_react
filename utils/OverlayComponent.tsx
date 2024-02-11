/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {API_BASE_URL, CLUEDIN_DARK_SCHEME, CLUEDIN_THEME} from './constants';

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
    <View style={styles.modalContainer}>
      <View style={styles.overlayContainer}>
        <View style={styles.popupContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentRow}>
            <View style={styles.row}>
              {errorClueMsg !== '' ? (
                <Text style={styles.body}>{errorClueMsg}</Text>
              ) : isLoading ? (
                <Text style={styles.body}>
                  Please Wait: Extracting Clue ...
                </Text>
              ) : (
                <>
                  <Text style={styles.title}>{difficulty} Clue</Text>
                  <View
                    style={{
                      width: '100%',
                      borderBottomColor: CLUEDIN_THEME.dark_grey,
                      borderBottomWidth: 2,
                    }}
                  />
                  <View>
                    <ScrollView>
                      <Text style={styles.body}>
                        {question.clues_used_values[id]}
                      </Text>
                    </ScrollView>
                  </View>
                </>
              )}
            </View>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.closeBtnBottomBtn}
              onPress={onClose}>
              <Text style={styles.closeBtnBottomText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: CLUEDIN_DARK_SCHEME.text_on_background,
    borderRadius: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentRow: {
    flex: 1,
    width: '100%',
    padding: 5,
    marginBottom: 80,
  },
  row: {
    width: '100%',
    padding: 5,
  },
  overlayContainer: {
    width: '80%',
    height: '60%',
  },
  closeBtnBottomBtn: {
    padding: 10,
    margin: 2,
    backgroundColor: CLUEDIN_DARK_SCHEME.about.btn_bg,
  },
  closeBtnBottomText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 15,
    color: CLUEDIN_DARK_SCHEME.about.btn_bg_text,
  },
  closeButton: {
    textAlign: 'right',
    padding: 20,
  },
  closeButtonText: {
    textAlign: 'right',
    color: 'black',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: CLUEDIN_THEME.black,
  },
  body: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '300',
    color: CLUEDIN_THEME.black,
  },
});

export default OverlayComponent;
