import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {API_BASE_URL, CLUEDIN_DARK_SCHEME, CLUEDIN_THEME} from './constants';

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
    <TouchableOpacity style={styles.modalContainer} onPress={onClose}>
      <TouchableOpacity activeOpacity={1} style={styles.overlayContainer}>
        <View style={styles.popupContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentRow}>
            <View style={styles.row}>
              {errorOptionMsg !== '' ? (
                <Text style={styles.body}>{errorOptionMsg}</Text>
              ) : isLoading ? (
                <Text style={styles.body}>
                  Please Wait: Checking Answer ...
                </Text>
              ) : (
                <>
                  <Text style={styles.body}>
                    {ansTextDisplay[question['complete']]}
                  </Text>
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
      </TouchableOpacity>
    </TouchableOpacity>
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
  },
  row: {
    width: '100%',
    padding: 5,
  },
  overlayContainer: {
    width: '80%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  body: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '500',
    color: CLUEDIN_THEME.black,
  },
});

export default OverlayAnswerComponent;
