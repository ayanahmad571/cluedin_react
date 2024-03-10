/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext, useState} from 'react';
import {View, Text, ScrollView, Button} from 'react-native';
import checkUserAuthentication from '../checkUserAuth'; // import the checkUserAuthentication function
import AuthContext from '../AuthContext'; // import your AuthContext
import LoadingPageBody from '../LoadingPageBody';
import {CLUEDIN_DARK_SCHEME, CLUEDIN_THEME} from '../constants';
import ErrorPageBody from '../ErrorPageBody';
import {useRevenueCat} from '../RevenueCatProvider';
import RevenueCatUI, {PAYWALL_RESULT} from 'react-native-purchases-ui';

const presentPaywall = async (): Promise<boolean> => {
  // Present paywall for current offering:
  const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall();

  switch (paywallResult) {
    case PAYWALL_RESULT.NOT_PRESENTED:
    case PAYWALL_RESULT.ERROR:
    case PAYWALL_RESULT.CANCELLED:
      console.log('cancelled');
      return false;
    case PAYWALL_RESULT.PURCHASED:
      console.log('purchased');
    case PAYWALL_RESULT.RESTORED:
      console.log('restored');
      return true;
    default:
      return false;
  }
};
const UserAuthCheckPremComp = ({children}) => {
  const {setUser} = useContext(AuthContext);
  const [userAuthResp, setUserAuthResp] = useState(0);

  const pageAuthSetup = async () => {
    setUserAuthResp(await checkUserAuthentication(setUser));
  };

  useEffect(() => {
    console.log('UserAuthCheckComp --- WRAPPER IS LOADING ...  ');
    pageAuthSetup();
  }, []);

  const renderPage = () => {
    switch (userAuthResp) {
      case 0:
        return <LoadingPageLoad />;
      case 1:
        return <AuthenticatedPage>{children}</AuthenticatedPage>;
      case 2:
        return <UnauthenticatedPage />;
      case 3:
        return <OfflinePage />;
      default:
        return <OfflinePage />;
    }
  };

  return <PageBG>{renderPage()}</PageBG>;
};

const LoadingPageLoad = () => {
  return <LoadingPageBody />;
};

const UnauthenticatedPage = () => {
  return (
    <ErrorPageBody
      errorMsg={'User is not authenticated. Please Login to continue.'}
    />
  );
};

const AuthenticatedPage = ({children}) => {
  console.log('Auth Page Loaded\n');
  const {userInfoPrem, checkPrem} = useRevenueCat();
  checkPrem(); // Calling the function returned by the hook

  console.log('isUserPrem Response:', userInfoPrem);

  if (userInfoPrem) {
    return children;
  } else {
    return <PaywallComp />;
  }
};

const OfflinePage = () => {
  return (
    <ErrorPageBody
      errorMsg={
        'Please close the app and re-open once connected to the internet.'
      }
    />
  );
};

const PageBG = ({children}) => {
  return (
    <View style={{backgroundColor: CLUEDIN_DARK_SCHEME.background, flex: 1}}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

const PaywallComp = () => {
  useEffect(() => {
    loadPaywall();
  }, []);

  const loadPaywall = async () => {
    try {
      await presentPaywall();
    } catch (error) {
      console.error('Error presenting paywall:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'white', marginBottom: 20}}>
        Please purchase the premium pack to continue.
      </Text>
      <Button title="Purchase Premium Pack" onPress={loadPaywall} />
    </View>
  );
};

export default UserAuthCheckPremComp;
