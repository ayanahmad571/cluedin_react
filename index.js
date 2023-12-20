import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

// Register the main component
AppRegistry.registerComponent(appName, () => App);

// Centralized PushNotification configuration
const pushNotificationConfig = {
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },
  onNotification: function (notification) {

    PushNotification.removeAllDeliveredNotifications();
    PushNotification.setApplicationIconBadgeNumber(0);
    if (Platform.OS === 'ios')  {notification.finish(PushNotificationIOS.FetchResult.NoData);}
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
  senderID: '188135123071', // For Android
};

// Configure PushNotification
PushNotification.configure(pushNotificationConfig);

// Set the badge number elsewhere in your code if needed
PushNotification.setApplicationIconBadgeNumber(0);
