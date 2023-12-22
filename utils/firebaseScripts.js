import messaging from '@react-native-firebase/messaging';

export const setupFirebase = async () => {
  // Function is executed when a user is logged in.

  // User is logged in, subscribe to the "cluedinmain" topic
  messaging()
    .subscribeToTopic('cluedinmain')
    .then(() => console.log('Subscribed to topic: cluedinmain'))
    .catch(error =>
      console.error('Error subscribing to topic cluedinmain:', error),
    );
};

export const unSetFirebase = async () => {
  // Function is executed when a user logs out.

  // Unsubscribe from the "cluedinmain" topic
  messaging()
    .unsubscribeFromTopic('cluedinmain')
    .then(() => console.log('Unsubscribed from topic: cluedinmain'))
    .catch(error =>
      console.error('Error unsubscribing from topic cluedinmain:', error),
    );

  // Cleanup or any additional logic when the user logs out
  console.log('Unset the FIREBASE');
};
