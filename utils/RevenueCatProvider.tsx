import {createContext, useContext, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import Purchases, {LOG_LEVEL, PurchasesPackage} from 'react-native-purchases';
import {REVCAT_API} from './constants';
import jwtDecodeHelper from './jwtDecodeHelper';
import AuthContext from './AuthContext';
import SplashScreenPage from '../pages/SplashScreen';

const RevenueCatContext = createContext(null);

// Export context for easy usage
export const useRevenueCat = () => {
  return useContext(RevenueCatContext);
};

// Provide RevenueCat functions to our app
export const RevenueCatProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [userInfoPrem, setuserInfoPrem] = useState(false);
  const userIn = useContext(AuthContext).user;

  useEffect(() => {
    const init = async () => {
      const userIDHash = jwtDecodeHelper(userIn).user_id;

      // Use more logging during debug if want!
      Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
      if (Platform.OS === 'android') {
        await Purchases.configure({
          apiKey: REVCAT_API.android,
          appUserID: userIDHash,
        });
      } else {
        await Purchases.configure({
          apiKey: REVCAT_API.ios,
          appUserID: userIDHash,
        });
      }
      const {customerInfo} = await Purchases.logIn(userIDHash);
      setUserInfo(customerInfo);
      const isPremium =
        customerInfo?.entitlements?.active['CluedIn Premium'] !== undefined;

      setuserInfoPrem(isPremium);

      setIsReady(true);
    };
    init();
  }, []);

  const checkPrem = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      console.log('RCProvider, refreshCust:', customerInfo);

      // Check if the 'CluedIn Premium' entitlement exists in active entitlements
      const isPremium =
        customerInfo?.entitlements?.active['CluedIn Premium'] !== undefined;

      setuserInfoPrem(isPremium);
    } catch (e) {
      console.error(e);
      setuserInfoPrem(false); // Handle error gracefully
    }
  };

  const value = {
    userInfo,
    userInfoPrem,
    checkPrem,
  };

  // Return empty fragment if provider is not ready (Purchase not yet initialised)
  if (!isReady) {
    return <SplashScreenPage />;
  } else {
    return (
      <RevenueCatContext.Provider value={value}>
        {children}
      </RevenueCatContext.Provider>
    );
  }
};
