import React, {useEffect, useContext, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import checkUserAuthentication from '../checkUserAuth'; // import the checkUserAuthentication function
import AuthContext from '../AuthContext'; // import your AuthContext
import LoadingPageBody from '../LoadingPageBody';
import {CLUEDIN_DARK_SCHEME, CLUEDIN_THEME} from '../constants';
import ErrorPageBody from '../ErrorPageBody';
import jwtDecodeHelper from '../jwtDecodeHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserAuthCheckComp = ({children}) => {
  const {setUser} = useContext(AuthContext);
  const [userAuthResp, setUserAuthResp] = useState(0);
  const [userDecodedJWT, setuserDecodedJWT] = useState(null);

  const setUpJWT = () => {
    setTimeout(async () => {
      const jwtUser = await AsyncStorage.getItem('JWT_USER');
      const jwtDecoded = jwtDecodeHelper(jwtUser);
      setuserDecodedJWT(jwtDecoded);
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  const pageAuthSetup = async () => {
    setUserAuthResp(await checkUserAuthentication(setUser));
    await setUpJWT();

    console.log('auth: ', userAuthResp);
    console.log('jwt: ', userDecodedJWT);
  };

  useEffect(() => {
    console.log('WRAPPER IS LOADING ...  ');
    pageAuthSetup();
  }, []);

  const renderPage = () => {
    switch (userAuthResp) {
      case 0:
        return <LoadingPageLoad />;
      case 1:
        return (
          <AuthenticatedPage userDecodedJWT={userDecodedJWT}>
            {children}
          </AuthenticatedPage>
        );
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
  return <ErrorPageBody errorMsg={'User is not authenticated.'} />;
};

const AuthenticatedPage = ({children, userDecodedJWT}) => {
  return userDecodedJWT === null ? (
    <LoadingPageBody />
  ) : userDecodedJWT === '' ? (
    <View style={{flex :1}}><ErrorPageBody errorMsg={'User is not asdasd authenticated.'} /></View>
  ) : (
    children
  );
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

export default UserAuthCheckComp;
