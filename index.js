import { AppRegistry, Platform} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import BackgroundTimer from 'react-native-background-timer';

// Register the main component
AppRegistry.registerComponent(appName, () => App);

const os = Platform.OS; // 'ios' or 'android'

PushNotification.configure({
  onRegister: function (token) {
    // console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    // // console.log("NOTIFICATION:", notification);
    // Remove badge number when notification is opened
    PushNotification.setApplicationIconBadgeNumber(0);

    notification.finish(PushNotificationIOS.FetchResult.NoData);
    PushNotification.removeAllDeliveredNotifications();
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios'
});


if(os === 'android'){
  // Create a notification channel
  PushNotification.createChannel(
    {
      channelId: 'default-channel-id',
      channelName: 'Default Channel',
      channelDescription: 'A default channel for app notifications',
      playSound: true,
      soundName: 'default',
      importance: 4,
    },
    // created => // console.log(`Channel created: ${created}`)
  );
}

// Function to check if the current time is 2pm UTC
const isTwoPMUTC = () => {
  const now = new Date();
  const hours_req = 14;
  const mins_req = 0;
  const checker = (now.getUTCHours() === hours_req && now.getUTCMinutes() === mins_req)
  return checker;
};

// Function to be executed by the timer
const timerFunction = () => {
  // // console.log('Timer executed at:', new Date());

  // Check if the current time is 2pm UTC
  if (isTwoPMUTC()) {
    const msg_notif = {
      "title": 'CluedIn Trivia',
      "body": 'Your daily trivia is ready, open the app to answer today\'s question and see what others are scoring!'
    }
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: msg_notif.title,
      message: msg_notif.body,
      sound: 'default',
      number: 1,
      
    });
  }
};

// Start the timer with a 1-minute interval
BackgroundTimer.runBackgroundTimer(timerFunction, 60000);