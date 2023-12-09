import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';

// Create a notification channel
PushNotification.createChannel(
  {
    channelId: 'default-channel-id', // Provide a unique channel ID
    channelName: 'Default Channel',
    channelDescription: 'A default channel for app notifications',
    playSound: true,
    soundName: 'default',
    importance: 4, // Importance level (4 means high importance)
  },
  created => console.log(`Channel created: ${created}`)
);

// Function to check if the current time is 2pm UTC
const isTwoPMUTC = () => {
  const now = new Date();
  return now.getUTCHours() === 14 && now.getUTCMinutes() === 0;
};

// Function to be executed by the timer
const timerFunction = () => {
  console.log('Timer executed at:', new Date());

  // Check if the current time is 2pm UTC
  if (isTwoPMUTC()) {
    // Send a push notification with the created channel ID
    PushNotification.localNotification({
      channelId: 'default-channel-id', // Specify the channel ID here
      title: 'CluedIn Trivia',
      message: 'Your daily trivia is ready, open the app to answer today\'s question and see what others are scoring!',
    });
  }
};

// Start the timer with a 1-minute interval
BackgroundTimer.runBackgroundTimer(timerFunction, 60000);

AppRegistry.registerComponent(appName, () => App);
