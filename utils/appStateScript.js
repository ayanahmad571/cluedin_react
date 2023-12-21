import React, {useState, useEffect, useRef} from 'react';
import {AppState} from 'react-native';

export const appStateJS = (appState, refreshFunction) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // console.log('App has come to the foreground!');
        refreshFunction();
      }

      appState.current = nextAppState;
    //   console.log('AppState', appState.current);
    });

    return () => {
        // console.log('remove sub')
      subscription.remove();
    };
  }, []);
};
