import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../utils/stylesHome';

const HomeTopInfoRow = ({handleRefresh, setCountdown, question, countdown}) => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCountdown = updateCountdown();
      setCountdown(updatedCountdown);

      if (
        updatedCountdown === '00:00:00' ||
        updatedCountdown === '00:00:01' ||
        updatedCountdown === '23:59:59'
      ) {
        // Trigger the handleRefresh function
        handleRefresh();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <View>
      <View style={styles.firstPillRow}>
        <View style={styles.box}>
          <Text style={styles.boxText}>Day</Text>
          <Text style={styles.boxText}>{question.question_raw.day}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Next Refresh In</Text>
          <Text style={styles.countdown}>{countdown}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.onBgTitle}>Today's Question</Text>
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
      </View>
    </View>
  );
};

export default HomeTopInfoRow;
