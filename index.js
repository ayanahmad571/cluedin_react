import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging'; // Import messaging from @react-native-firebase/messaging


// Register the main component
AppRegistry.registerComponent(appName, () => App);

// Initialize Firebase
messaging().setBackgroundMessageHandler(async remoteMessage => {
  PushNotification.setApplicationIconBadgeNumber(1);
  console.log('Message handled in the background!', remoteMessage);
});

// Get the FCM token
messaging().getToken().then(token => {
  console.log('FCM Token:', token);
});

// Listen for token refresh
messaging().onTokenRefresh((token) => {
  console.log('Refreshed FCM Token:', token);
});



PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    notification.finish(PushNotificationIOSicationIOS.FetchResult.NoData);
    PushNotification.removeAllDeliveredNotifications();
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: true,
  senderID: '188135123071', // For Android
});

PushNotification.setApplicationIconBadgeNumber(0);
