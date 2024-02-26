import {Platform} from 'react-native';
import Purchases from 'react-native-purchases';
import {REVCAT_API} from './constants';
import jwtDecodeHelper from './jwtDecodeHelper';

export const setupRevCat = async userJWT => {
  Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
  const userID = jwtDecodeHelper(userJWT).user_id;
  console.log('REV CAT UID: ', userID);

  if (Platform.OS === 'ios') {
    console.log('REV CAT ios');
    await Purchases.configure({apiKey: REVCAT_API.ios, appUserID: userID});
  } else if (Platform.OS === 'android') {
    console.log('REV CAT android');
    await Purchases.configure({apiKey: REVCAT_API.android, appUserID: userID});
  }

  const {customerInfo, created} = await Purchases.logIn(userID);

};
